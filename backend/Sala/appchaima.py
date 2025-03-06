from fastapi import FastAPI
import requests
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import json
from mousalslel import semantic_search, latin_to_arabic_text
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
def check_characters(phrase):
    # Unicode ranges for Arabic and Latin characters
    arabic_range = range(0x0600, 0x06FF)  # Basic Arabic block
    # Latin letters only (A-Z and a-z)
    latin_upper = range(0x0041, 0x005B)  # A-Z
    latin_lower = range(0x0061, 0x007B)  # a-z
   
    has_arabic = False
    has_latin = False
   
    for char in phrase:
        char_code = ord(char)
        if char_code in arabic_range:
            has_arabic = True
        elif char_code in latin_upper or char_code in latin_lower:
            has_latin = True
           
    return {
        "contains_arabic": has_arabic,
        "contains_latin": has_latin
    }

# @app.get("/mousalsel-recommend")
# def recommend_series(query: str):
#     """API endpoint to recommend a series based on user query."""
#     check = check_characters(query)
#     if(check ["has_latin"]):
#         query = latin_to_arabic_text(query)
#     recommended_series = semantic_search(query)
#     return {"title": recommended_series["title"], "description": recommended_series["description"]}
@app.get("/mousalsel-recommend")
def recommend_series(query: str):
    """API endpoint to recommend a series based on user query."""
    check = check_characters(query)
    if check["contains_latin"]:  # Fix applied here
        query = latin_to_arabic_text(query)
    recommended_series = semantic_search(query)
    return {"title": recommended_series["title"], "description": recommended_series["description"]}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=5177)
