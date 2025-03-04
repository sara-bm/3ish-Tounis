import streamlit as st
import requests
from PIL import Image

# FastAPI backend URL
BACKEND_URL = "http://127.0.0.1:8000"

# Character details
characters = {
    "Hannibal": "./images/hannibal.jpg",
    "Ibn Khaldoun": "./images/ibn_khaldoun.jpg",
    "Bourguiba": "./images/bourguiba.jpg",
}

# Streamlit Page Config
st.set_page_config(page_title="Letters to the Past", layout="wide")

# UI Header
st.title("📜 Letters to the Past")
st.write("Choose a historical figure to write a letter to.")

# Display characters as selectable images
cols = st.columns(len(characters))  # Create columns dynamically
for idx, (name, img_path) in enumerate(characters.items()):
    with cols[idx]:
        image = Image.open(img_path)  # Load the character image
        st.image(image, caption=name, use_column_width=True)
        if st.button(f"Write to {name}", key=name):
            st.session_state["selected_character"] = name  # Store selected character

# Show Letter Writing UI when a character is selected
if "selected_character" in st.session_state:
    selected_character = st.session_state["selected_character"]

    st.markdown(f"### ✉️ Writing to {selected_character}")
    
    # Letter input
    user_letter = st.text_area("Write your letter:", height=200)

    # Submit button
    if st.button("Send Letter"):
        if user_letter.strip():
            response = requests.post(
                # f"{BACKEND_URL}/ask/{selected_character.lower()}",
                f"{BACKEND_URL}/ask_hannibal",
                json={"letter": user_letter}
            )

            if response.status_code == 200:
                ai_reply = response.json().get("response", "No response received.")
                st.success(f"📜 Response from {selected_character}:")
                st.write(ai_reply)
            else:
                st.error("❌ Failed to get a response. Try again.")
        else:
            st.warning("⚠️ Please write something before sending.")

