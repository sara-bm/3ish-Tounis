from flask import Flask, request, jsonify
from functools import lru_cache
import json
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
from transformers import T5Tokenizer, T5ForConditionalGeneration
from tunispeak import transform_en_to_tun
from flask_cors import CORS
from embeddings import load_json

app = Flask(__name__)
CORS(app)

# Load models and index at startup
index = faiss.read_index("faiss_index_recipes")
retrieval_model = SentenceTransformer('all-MiniLM-L6-v2')
tokenizer = T5Tokenizer.from_pretrained("t5-small")
generation_model = T5ForConditionalGeneration.from_pretrained("t5-small")
recipes_data = load_json()

# Cache based on query text instead of the list of dictionaries
@lru_cache(maxsize=100)
def retrieve_relevant_text(query, top_k=3):
    query_embedding = retrieval_model.encode([query], convert_to_numpy=True)
    distances, indices = index.search(query_embedding, top_k)
    return [recipes_data[i] for i in indices[0]]

# Cache based on query, as relevant_text will be the same for repeated queries
@lru_cache(maxsize=100)
def generate_response(query):
    relevant_text = retrieve_relevant_text(query)
    context = " ".join([f"Title: {r['title']} Instructions: {r['instructions'][:100]}" for r in relevant_text])
    input_text = f"Generate a recipe suggestion based on the following context: {context}"
    inputs = tokenizer(input_text, return_tensors="pt", truncation=True, max_length=512)
    outputs = generation_model.generate(inputs["input_ids"], max_length=150)
    return tokenizer.decode(outputs[0], skip_special_tokens=True)

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    query = data.get('query', '')
    
    # Generate response for the given query
    response_en = generate_response(query)
    response_tn = transform_en_to_tun(response_en)

    return jsonify({"response_en": response_en, "response_tn": response_tn})

if __name__ == '__main__':
    app.run(debug=False)
