from app import app, db
from models.user import User
from models.likes import Like
from models.dislikes import Dislike
#from models.matches import Match

with app.app_context():
  db.drop_all()
  db.create_all()

lara=User(
  email="lara@lara.com",
	first_name="lara",
	last_name="lara",
	password="lara"

)

shaikh=User(
  email="shaikh@shaikh.com",
	first_name="shaikh",
	last_name="shaikh",
	password="shaikh"
)

ali=User(
  email="ali@ali.com",
	first_name="ali",
	last_name="ali",
	password="ali"
)

like_1=Like(
  # id=1,
  liker_id=1,
  liked_id=2
)

dislike_1=Dislike(
  disliker_id=1,
  disliked_id=2
)
# db.session.add(dislike_1)
db.session.add(lara)
db.session.add(shaikh)
db.session.add(ali)
db.session.commit()

db.session.add(like_1)
db.session.add(dislike_1)

db.session.commit()