"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity


api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route('/user', methods=['POST'])
def create_user():
    email = request.json.get('email')
    password = request.json.get('password')

    if not (email and password):
        return jsonify({"message": "Error datos", "created": False}), 400
    
    user = User(email=email, password=password, is_active=True)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Usuario creado", "created": True}), 200

@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    if email is None or password is None:
        return jsonify({"message": "Email y password requeridos"}), 400

    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        return jsonify({"message": "Usuario no existe"}), 400
    
    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id})