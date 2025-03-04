import ollama
import numpy as np
import faiss
import pickle
from sentence_transformers import SentenceTransformer

INDEX_PATH = "faiss_index"
MODEL = "sentence-transformers/all-MiniLM-L6-v2"

def load_faiss():
    """Load FAISS index & text chunks"""
    index = faiss.read_index(INDEX_PATH)
    with open("embeddings.pkl", "rb") as f:
        chunks = pickle.load(f)
    return index, chunks

def retrieve_relevant_text(query, top_k=3):
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
    You are Hannibal, the legendary Carthaginian general. A modern person has written to you. Respond as you would in your time, referencing your experiences and strategies.
    
    User's letter:
    {user_letter}
    
    Historical context:
    {relevant_text}
    
    Your response:
    """

    response = ollama.chat(model="deepseek-r1:latest", messages=[{"role": "user", "content": prompt}])
    return response["message"]["content"]

# if __name__ == "__main__":
#     user_letter = "I am a modern person writing to you, Hannibal. I am fascinated by your military strategies and would love to learn more about your life."
#     response = generate_response(user_letter)
#     print(response)