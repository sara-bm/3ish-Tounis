from fastapi import FastAPI
from pydantic import BaseModel
from rag import generate_response
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (not recommended in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello, FastAPI with CORS enabled!"}
class LetterRequest(BaseModel):
    letter: str

@app.post("/ask_hannibal/")
async def ask_hannibal(request: LetterRequest):
    print(request.letter)
    ai_reply = generate_response(request.letter)
    return {"response": ai_reply}
