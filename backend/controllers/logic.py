from flask import Blueprint, request, jsonify
from models.user import User, UserSchema
from app import db

users_schema - UsersSchema()
likes_schema = LikesSchema()
dislikes_schema = DislikesSchema()

# GET all users

router = Blueprint(__name__, 'users')

@router.route('/users', methods=['GET'])
def index():
  users = User.query.all()
  return users_schema.jsonify(users, many=True), 200









