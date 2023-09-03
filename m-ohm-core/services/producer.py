from kafka import KafkaProducer
import time, json, os
from services.information import fetchInformation

producer = KafkaProducer(bootstrap_servers='localhost:9092', value_serializer=lambda v: json.dumps(v).encode('utf-8'))

def produceMessage():
    while True:
        os.system('cls')
        message = fetchInformation();
        print(json.dumps(message, indent=3))
        future = producer.send('system-info', message)
        # result = future.get(timeout=60)
        time.sleep(1)