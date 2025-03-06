import ollama
import numpy as np
import faiss
import pickle
from sentence_transformers import SentenceTransformer

INDEX_PATH = "faiss_indextouri"
MODEL = "sentence-transformers/all-MiniLM-L6-v2"

def load_faiss():
    """Load FAISS index & text chunks"""
    index = faiss.read_index(INDEX_PATH)
    with open("embeddingstouri.pkl", "rb") as f:
        chunks = pickle.load(f)
    return index, chunks

def retrieve_relevant_text(query, top_k=2):
    """Retrieve top-k relevant chunks using FAISS"""
    index, chunks = load_faiss()
    model = SentenceTransformer(MODEL)

    query_embedding = model.encode([query], convert_to_numpy=True)
    distances, indices = index.search(query_embedding, top_k)

    retrieved_text = [chunks[i] for i in indices[0]]
    return "\n\n".join(retrieved_text)

def generate_response(user_letter):
    """Generate AI response using Ollama & DeepSeek R1"""
    relevant_text = retrieve_relevant_text(user_letter)

    prompt = f"""
    You are a knowledgeable guide to Tunisia always answer directly. A traveler from the modern era has reached out to you, seeking recommendations for the most beautiful and historic places to visit. Respond in english, as if you were guiding them through Tunisia today. Use simple, clear phrases, easy for translation to arabic tunisian dialect. By default, reply in 1 sentence (5-20 words). Only expand to 2 lines (max 50 words) if the question demands deeper explanation, keeping it direct and clever.


    User's letter:
    {user_letter}
    
    Historical context:
    {relevant_text}
    
    Your response:
    """

    response = ollama.chat(model="deepseek-r1:1.5b", messages=[{"role": "user", "content": prompt}])
    return response["message"]["content"]

if __name__ == "__main__":
    user_letter = "Where to stay in Tunisia."
    response = generate_response(user_letter)
    print(response)