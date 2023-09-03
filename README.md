# m-ohm
Mobile Open Hardware Monitor

Web based application that provides real-time data regarding hardware information.

See [m-ohm-core README.md](/m-ohm-core/README.md) and [m-ohm-app README.md](/m-ohm-app/README.md) for more detailed information.


## Installation
Clone this repository to your local machine:

```
git clone https://github.com/ivomtdias/m-ohm.git
```

Go to m-ohm-core folder
```
cd m-ohm-core
```

Install pipreqs
```
pip install pipreqs
```

Install the libraries using pipreqs
```
pipreqs .
```

Do the same steps inside m-ohm-app folder

## Running the Application
To run the application, execute the following command from the root directory of the project:

### m-ohm-core

Go to m-ohm-core folder
```
cd m-ohm-core
```

Launch a docker container for kafka
```
docker-compose up -d
```

Launch the application
```
python app.py
```

### m-ohm-app
Go to m-ohm-app folder
```
cd m-ohm-app
```
Launch the application
```
python app.py
```
or
```
flask run --host=0.0.0.0
```

Navigate to http://127.0.0.1:5000 or http://192.168.50.238:5000