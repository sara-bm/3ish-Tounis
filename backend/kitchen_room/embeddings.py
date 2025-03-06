from flask import Flask, request, jsonify
import json
import faiss
import pickle
import numpy as np
from sentence_transformers import SentenceTransformer
from transformers import T5Tokenizer, T5ForConditionalGeneration
import requests

# Load your recipes data
def load_json():
    with open("tunisian_recipes.json", "r", encoding="utf-8") as f:
        return json.load(f)

# Generate embeddings for recipes
def generate_embeddings(recipes_data):
    model = SentenceTransformer('all-MiniLM-L6-v2')
    recipes_text = [f"{recipe['title']}. {recipe['ingredients']} {recipe['instructions']}" for recipe in recipes_data]
    embeddings = model.encode(recipes_text, convert_to_numpy=True)
    with open("recipes_embeddings.pkl", "wb") as f:
        pickle.dump(embeddings, f)
    return embeddings

# Create FAISS index
def create_faiss_index(embeddings):
    dimension = embeddings.shape[1]
    index = faiss.IndexFlatL2(dimension)
    index.add(embeddings)
    faiss.write_index(index, "faiss_index_recipes")