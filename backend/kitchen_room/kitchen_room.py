from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Dictionary containing recipes in Tunisian dialect
recipes = {
    "كيفة نطيب الكسكسي": """باش تطيب الكسكسي، لازمك: 
    - 500غ كسكسي 
    - 300غ لحم (خروف ولا دجاج)
    - بصل، طماطم، فلفل، حمص
    - زيت زيتون، ملح، فلفل أكحل، تابل وكروية

    طريقة التحضير:
    1. سخّن الزيت في الكسكاس وضيف البصل المفروم واللحم وقليهم مليح.
    2. ضيف الطماطم المصبّرة والتوابل، وبعد صب شوية ماء وخليها تطبخ.
    3. زيد الحمص والخضرة حسب الرغبة، وبعد صب شوية ماء سخون.
    4. في نفس الوقت، بلل الكسكسي بشوية ماء وزيت، وفورّو في الكسكاس فوق المرقة.
    5. كرر عملية التبخير مرتين أو ثلاثة حتى يولي الكسكسي طري ولذيذ.
    6. كي يطيب، صبّ الكسكسي في طبق كبير وخلّطو بالمرقة واللحم، وقدّم بالصحة والعافية!"""
}

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    query = data.get('query', '').strip()  # Get the query in Tunisian dialect

    # Check if the query exists in our predefined recipes
    response = recipes.get(query, "ما نعرش، أما نجّم تسأل على وصفة أخرى 🌸")

    return jsonify({"response_tn": response})  # Correct format: dictionary with key-value pair

if __name__ == '__main__':
    app.run(debug=True)
