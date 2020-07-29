from flask import Blueprint, request, jsonify, g
from models.user import User
from schemas.user import UserSchema
from app import db
from lib.secure_route import secure_route


user_schema = UserSchema()

router = Blueprint(__name__, 'users')

@router.route('/register', methods=['POST'])
def index():
  user = user_schema.load(request.get_json())
  user.save()
  return user_schema.jsonify(user)


@router.route('/preferences/user', methods=['PUT'])
@secure_route
def update():
  existing_user = User.query.get(g.current_user.id)
  print(existing_user)
  user = user_schema.load(request.get_json(), instance=existing_user, partial=True)
  print(user)
  user.save()
  return user_schema.jsonify(user)


@router.route('/preferences/user', methods=['GET'])
@secure_route
def show():
  existing_user = User.query.get(g.current_user.id)
  if not existing_user:
    return 'User does not exist'
  else:
    return user_schema.jsonify(existing_user)







@router.route('/login', methods=["POST"])
def login():
  data = request.get_json()
  user = User.query.filter_by(email=data['email']).first()
  if not user:
    return jsonify( { 'email': 'Email address not found' }), 404
  if not user.validate_password(data['password']):
    return jsonify( {'password': 'Incorrect password'}), 401
  token = user.generate_token()

  return jsonify( { 'token': token, 'message': 'I am not a photographer but I can picture us together!'})

