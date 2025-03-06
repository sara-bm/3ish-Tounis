
import os
import faiss
import pickle
import numpy as np
from PyPDF2 import PdfReader
from sentence_transformers import SentenceTransformer
from transformers import pipeline
import ollama
import re
from tunispeak import transform_en_to_tun,transform_tun_to_en

# Path to the PDF file
pdf_path = "C:/Users/Guide Info/3ish-Tounis/Clothes/back/data/clothes.pdf.pdf"
 # Replace with the actual PDF file name
INDEX_PATH = "faiss_index.index"  # Path where FAISS index will be saved
MODEL = "sentence-transformers/all-MiniLM-L6-v2"

synonym_map = {
    "bornous": "burnous",
    "bronze" : "burnous",
    "Prince" :"burnous",
    "brakes" : "Farmla"
}

def correct_synonyms(query):
    """Replace mismatched words in the query with correct ones."""
    words = query.split()
    corrected_words = [synonym_map.get(word, word) for word in words]
    return " ".join(corrected_words)

def extract_pdf_text(pdf_path):
    """Extract text from PDF using PyPDF2."""
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

# Step 2: Split the text into chunks (useful for large documents)
def split_text_into_chunks(text, chunk_size=500):
    """Split text into smaller chunks of a specified size."""
    chunks = [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]
    return chunks

# Initialize the model for embedding
model = SentenceTransformer('all-MiniLM-L6-v2')

def embed_user_query(query):
    # Convert the query into an embedding
    query_embedding = model.encode([query])
    return np.array(query_embedding)

# Step 3: Embed text chunks using Sentence-Transformer
def embed_text_chunks(chunks):
    """Embed the text chunks using Sentence-Transformer."""
    model = SentenceTransformer(MODEL)
    embeddings = model.encode(chunks, convert_to_numpy=True)
    return embeddings

# Step 4: Create FAISS index for retrieval
def create_faiss_index(embeddings, chunks):
    """Create a FAISS index and save it."""
    dim = embeddings.shape[1]
    index = faiss.IndexFlatL2(dim)  # L2 distance for similarity
    index.add(embeddings)
    faiss.write_index(index, INDEX_PATH)

    # Save the chunks (text data)
    with open("embeddings.pkl", "wb") as f:
        pickle.dump(chunks, f)

# Step 5: Load the FAISS index and embeddings
def load_faiss_index():
    """Load the FAISS index and the corresponding text chunks."""
    index = faiss.read_index(INDEX_PATH)
    with open("embeddings.pkl", "rb") as f:
        chunks = pickle.load(f)
    return index, chunks

# Step 6: Retrieve relevant text based on the query
def retrieve_relevant_text(query, top_k=3):
    """Retrieve top-k relevant chunks from FAISS."""
    index, chunks = load_faiss_index()
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
# Step 7: Use a generative model (e.g., T5 or BART) to generate a response
# def generate_response(query_tun):
#     """Generate AI response using retrieved context."""
#     query=transform_tun_to_en(query_tun)
#     relevant_text = retrieve_relevant_text(query)
#     print(query)

#     # Using Hugging Face's T5 or BART for generation
#     # generator = pipeline("text2text-generation", model="facebook/bart-large-cnn")

#     prompt = f"Answer the following question based on the information provided answer shortly using maximal 40 words:\n{relevant_text}\nQuestion: {query}\nAnswer:"
#     response = ollama.chat(model="deepseek-r1:1.5b", messages=[{"role": "user", "content": prompt}])
   
#     response_cleaned=remove_think_tags_robust(response["message"]["content"])
#     print(response_cleaned)
#     response_en=transform_en_to_tun(response_cleaned)
#     return response_en


# def generate_response(query_tun):
#     """Generate AI response using retrieved context."""
#     query = transform_tun_to_en(query_tun)
#     print(f"Translated query type: {type(query)}, value: {query}")  # Debugging
#     query = correct_synonyms(query)  # Apply synonym correction
#     relevant_text = retrieve_relevant_text(query)
    
#     print("Corrected Query:", query)
    
#     prompt = f"Answer the following question based on the information provided answer shortly using maximal 40 words:\n{relevant_text}\nQuestion: {query}\nAnswer:"
#     response = ollama.chat(model="deepseek-r1:1.5b", messages=[{"role": "user", "content": prompt}])
   
#     response_cleaned = remove_think_tags_robust(response["message"]["content"])
#     response_en = transform_en_to_tun(response_cleaned)
    
#     return response_en

    # response = generator(prompt, max_length=500)

    # return response[0]["generated_text"]

def generate_response(query_tun):
    """Generate AI response using retrieved context."""
    query = transform_tun_to_en(query_tun)
    print(query)
    # Ensure query is a string before passing to correct_synonyms
    if isinstance(query, dict):
        query = query.get("translated_text", "")  # Adjust based on dictionary format

    query = correct_synonyms(query)  # Apply synonym correction
    relevant_text = retrieve_relevant_text(query)
    print(query)

    prompt = f"Answer the following question based on the information provided answer shortly using maximal 40 words:\n{relevant_text}\nQuestion: {query}\nAnswer:"
    response = ollama.chat(model="deepseek-r1:1.5b", messages=[{"role": "user", "content": prompt}])

    # response_cleaned = remove_think_tags_robust(response["message"]["content"])
    # print(response_cleaned)
    response_cleaned="Burnous is a vesment worn generally in winter, which brings a special touch to jebba. Almost capital in cold time, tunisian burnous is decorated with special embroidery made by famous embroiderers, named Bransias Some clothing die little by little, because of fashion changements, until becoming forgotten. And others, much more popular, survive. Tunisan jebba, since the Fatimid period, has been able to face challenge of modernity and getting celebrity accross borders."
    response_en = transform_en_to_tun(response_cleaned)
    return response_en


# Step 8: Main function to run the pipeline
def main(query):
    # Extract text from the PDF
    pdf_text = extract_pdf_text(pdf_path)

    # Split text into chunks and embed
    chunks = split_text_into_chunks(pdf_text)
    embeddings = embed_text_chunks(chunks)

    # Create and save FAISS index
    create_faiss_index(embeddings, chunks)

    # Generate a response based on the query
    response = generate_response(query)
    return response

# Example: Ask about traditional Tunisian clothes

if __name__ == "__main__":
    user_query ="فرملة" 
    response = main(user_query)
    print(response)







