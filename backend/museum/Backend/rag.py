import ollama
import numpy as np
import faiss
import pickle
import re
from sentence_transformers import SentenceTransformer
from tunispeak import transform_en_to_tun,transform_tun_to_en

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

def remove_think_tags_robust(paragraph):
    # First, try to remove properly paired tags
    result = re.sub(r'<think>.*?</think>', '', paragraph, flags=re.DOTALL)
    # Then, clean up any leftover standalone <think> or </think> tags
    result = re.sub(r'</?think>', '', result)
    return result

def generate_response(user_letter_tun):
    user_letter_en=transform_tun_to_en(user_letter_tun)
    """Generate AI response using Ollama & DeepSeek R1"""
    relevant_text = retrieve_relevant_text(user_letter_en)
# You are Hannibal, the legendary Carthaginian general. A modern person has written to you. Respond as you would in your time, referencing your experiences and strategies.
    prompt = f"""
    You are Hannibal, the legendary Carthaginian general. Always use "I" as the subject. Respond to a modern person's letter in a friendly tone with a touch of witty simple phrases sarcasm. Use simple, clear phrases for easy translation to arabic. By default, reply in 1 sentence (5-20 words). Only expand to 2 lines (max 50 words) if the question demands deeper explanation, keeping it direct and clever.
    
    User's letter:
    {user_letter_en}
    
    Historical context:
    {relevant_text}
    
    Your response:
    """

    response = ollama.chat(model="deepseek-r1:latest", messages=[{"role": "user", "content": prompt}])
    cleaned_response=remove_think_tags_robust(response["message"]["content"])
    print("english response",cleaned_response)  
    response_tun=transform_en_to_tun(cleaned_response)
    print(response_tun)
    return response_tun


# if __name__ == "__main__":
#     # user_letter = "I am a modern person writing to you, Hannibal. I am fascinated by your military strategies and would love to learn more about your life."
#     user_letter = "شنو أحوالك حنبعل"
#     response = generate_response(user_letter)
#     print(response)