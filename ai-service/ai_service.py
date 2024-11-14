from flask import Flask, request, jsonify
import tensorflow as tf  # For advanced ML models
from textblob import TextBlob  # For simpler NLP tasks like sentiment analysis

app = Flask(__name__)

# Example Endpoint for Email Classification
@app.route('/classify', methods=['POST'])
def classify_email():
    data = request.get_json()
    subject = data.get('subject', '')
    body = data.get('body', '')
    
    # Simple sentiment analysis using TextBlob
    text = subject + " " + body
    sentiment = TextBlob(text).sentiment.polarity
    category = 'Positive' if sentiment > 0 else 'Negative' if sentiment < 0 else 'Neutral'

    return jsonify({'category': category, 'sentiment': sentiment})

# Example Endpoint for Predictive Reply
@app.route('/predict_reply', methods=['POST'])
def predict_reply():
    data = request.get_json()
    body = data.get('body', '')
    
    # Dummy predictive reply (Replace with ML model prediction)
    if 'meeting' in body.lower():
        reply = 'Let me check my schedule and get back to you.'
    else:
        reply = 'Thank you for reaching out. I will get back to you soon.'

    return jsonify({'reply': reply})

if __name__ == '__main__':
    app.run(port=5001)
