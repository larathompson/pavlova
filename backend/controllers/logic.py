from flask import Blueprint, request, jsonify, g
from models.user import User
from schemas.user import UserSchema
from schemas.likes import LikeSchema
from app import db
from lib.secure_route import secure_route
from marshmallow import ValidationError
from models.likes import Like


user_schema = UserSchema()
like_schema = LikeSchema()
#dislike_schema = DislikeSchema()

# GET all users

router = Blueprint(__name__, 'users')

@router.route('/users', methods=['GET'])
@secure_route
def get_users():
  users = User.query.all()
  print('hello')
  return user_schema.jsonify(users, many=True), 200


@router.route('/likes', methods=['POST'])
@secure_route
def like():
  print('firstprint')
  like_data = request.get_json()
  print(like_data)
  like_instance = Like(
    liker_id=like_data['liker_id'],
    liked_id=like_data['liked_id']
  )
  print(like_instance)
  print('2print')
  #like_data['id'] = g.current_user.id
  like_instance.save()
  return like_schema.jsonify(like_data)

# @router.route('/likes', methods=['POST'])
# @secure_route
# def like():
#   json_im_posting = request.get_json()
#   json_im_posting['liker_id'] = g.current_user.id
#   like = like_schema.load(json_im_posting)
#   like.save()
#   return like_schema.jsonify(like), 201













