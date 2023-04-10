# from flask import Flask, send_from_directory
# from flask_restful import Api, Resource, reqparse
# from flask_cors import CORS  # comment this on deployment
# from HelloApiHandler import HelloApiHandler

# app = Flask(__name__, static_url_path='', static_folder='frontend/build')
# # CORS(app)  # comment this on deployment
# api = Api(app)


# @app.route("/", defaults={'path': ''})
# def serve(path):
#     return send_from_directory(app.static_folder, 'index.html')


# api.add_resource(HelloApiHandler, '/flask/hello')

from flask import Flask

app = Flask(__name__)


@app.route("/")
def index():
    return "Hello this is the new version!"
