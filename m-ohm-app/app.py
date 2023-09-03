from flask import Flask, render_template, Response
from kafka import KafkaConsumer

app = Flask(__name__, template_folder='templates', static_folder='static')

@app.route('/')
def index():
    return render_template('index.html')

def kafka_consumer():
    consumer = KafkaConsumer('system-info', bootstrap_servers='localhost:9092')
    for message in consumer:
        yield f"data: {message.value.decode()}\n\n"

@app.route('/stream')
def stream():
    return Response(kafka_consumer(), mimetype='text/event-stream')

if __name__ == '__main__':
    app.run(debug=True)