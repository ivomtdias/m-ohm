# m-ohm-core
Mobile Open Hardware Monitor - Core

This is a Python application that produces messages to a Kafka broker with system information like CPU and GPU temperature. The application uses the psutil, gputil and cpuinfo libraries to collect the system information and the kafka-python library to produce the messages to the Kafka broker.

## Prerequisites
Before running this application, make sure you have the following software installed on your machine:

- Python 3.6 or later
- Docker
- psutil library (can be installed via pip)
- gputil library (can be installed via pip)
- cpuinfo library (can be installed via pip)
- kafka-python library (can be installed via pip)
- kafka library (can be installed via pip)
- pipreqs library (can be installed via pip)

## Installation
Clone this repository to your local machine:

´´´
git clone https://github.com/ivomtdias/m-ohm-core.git
´´´

Install pipreqs
´´´
pip install pipreqs
´´´

Install the libraries using pipreqs
´´´
pipreqs .
´´´

## Running the Application
To run the application, execute the following command from the root directory of the project:

´´´
docker-compose up -d
´´´

´´´
python app.py
´´´