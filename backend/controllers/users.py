from flask import Blueprint, request, jsonify
from models.user import User, UserSchema
from app import db
#from lib.secure_route import secure_route

user_schema = UserSchema()

router = Blueprint(__name__, 'users')

@router.route('/register', methods=['POST'])
def index():
  user = user_schema.load(request.get_json())
  user.save()
  return user_schema.jsonify(user)

@router.route('/login', methods=["POST"])
def login():
  data = request.get_json()
  user = User.query.filter_by(email=data['email']).first()
  if not user or not user.validate_password(data['password']):
    return jsonify( {'message': 'Unauthorized'})
  token = user.generate_token()

  return jsonify( { 'token': token, 'message': 'I am not a photographer but I can picture us together!'})

