import fitz  # PyMuPDF
import faiss
import pickle
import numpy as np
from sentence_transformers import SentenceTransformer

PDF_PATH = "./data/hannibal.pdf"
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"  # Small & efficient

def extract_text(pdf_path):
    """Extract text from a PDF file"""
    doc = fitz.open(pdf_path)
    text_chunks = [page.get_text("text") for page in doc]
    return text_chunks

def embed_text(chunks, model):
    """Generate embeddings for text chunks"""
    embeddings = model.encode(chunks, convert_to_numpy=True, show_progress_bar=True)
    return embeddings

def save_faiss_index(embeddings, chunks, index_path="faiss_index"):
    """Save embeddings to FAISS"""
    dimension = embeddings.shape[1]
    index = faiss.IndexFlatL2(dimension)
    index.add(embeddings)

    with open("embeddings.pkl", "wb") as f:
        pickle.dump(chunks, f)

    faiss.write_index(index, index_path)

def load_faiss_index(index_path="faiss_index"):
    """Load FAISS index"""
    index = faiss.read_index(index_path)
    with open("embeddings.pkl", "rb") as f:
        chunks = pickle.load(f)
    return index, chunks

if __name__ == "__main__":
    print("Extracting text from PDF...")
    text_chunks = extract_text(PDF_PATH)
    
    print("Generating embeddings...")
    model = SentenceTransformer(EMBEDDING_MODEL)
    embeddings = embed_text(text_chunks, model)

    print("Saving embeddings to FAISS...")
    save_faiss_index(embeddings, text_chunks)
    print("Embedding process complete!")
