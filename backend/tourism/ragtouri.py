import ollama
import numpy as np
import faiss
import pickle
from sentence_transformers import SentenceTransformer
from tunispeak import transform_en_to_tun,transform_tun_to_en
import re

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

def remove_think_tags_robust(paragraph):
    # First, try to remove properly paired tags
    result = re.sub(r'<think>.*?</think>', '', paragraph, flags=re.DOTALL)
    # Then, clean up any leftover standalone <think> or </think> tags
    result = re.sub(r'</?think>', '', result)
    return result

def remove_unwanted_formatting(response):
    # Remove any numbers, bullet points, and line breaks to make the text a single paragraph
    response = re.sub(r'\d+\.|[\*\-]\s?', '', response)  # Removes numbered and bullet points
    response = re.sub(r'\n+', ' ', response)  # Replaces line breaks with a space
    response = re.sub(r'###', '', response)  # Remove "###"
    return response

def generate_response(query_tun):
    """Generate AI response using Ollama & DeepSeek R1"""
    
    query=transform_tun_to_en(query_tun)
    relevant_text = retrieve_relevant_text(query)

    prompt = f"""
    You are a knowledgeable guide to Tunisia always answer directly. A traveler from the modern era has reached out to you, seeking recommendations for the most beautiful and historic places to visit. Respond in english, as if you were guiding them through Tunisia today. Use simple, clear phrases, easy for translation to arabic tunisian dialect. keeping it direct and clever.


    User's letter:
    {user_letter}
    
    Historical context:
    {relevant_text}
    
    Your response:
    """

    response = ollama.chat(model="deepseek-r1:1.5b", messages=[{"role": "user", "content": prompt}])
    response_cleaned=remove_think_tags_robust(response["message"]["content"])
    print(response_cleaned)
    response_cleaned = remove_unwanted_formatting(response_cleaned)
    
    
    response_cleaned = response_cleaned.strip()
    print(response_cleaned)
    response_en=transform_en_to_tun(response_cleaned)
    return response_en
    

if __name__ == "__main__":
    user_letter = "وين تقعد في تونس؟"
    response = generate_response(user_letter)
    print(response)