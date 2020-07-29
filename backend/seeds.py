from app import app, db
from models.user import User
from models.likes import Like
from models.dislikes import Dislike
from models.matches import Match

with app.app_context():
  db.drop_all()
  db.create_all()

lara=User(
  email="lara@lara.com",
	first_name="lara",
	last_name="lara",
	password="C0r0naKaren",
  dob="1994-12-18",
  gender="female"

)

shaikh=User(
  email="shaikh@shaikh.com",
	first_name="shaikh",
	last_name="shaikh",
	password="Shaikh123123",
  dob="1993-11-30",
  gender="male",
  gender_pref = "female",
  age_pref_max = 29,
  age_pref_min = 22
)

ali=User(
  email="ali@ali.com",
	first_name="ali",
	last_name="ali",
	password="AliAli123",
  dob="1996-09-21",
  gender="male"
)

like_1=Like(
  # id=1,
  liker_id=1,
  liked_id=2
)

like_2=Like(
  liker_id=3,
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
db.session.add(like_2)
db.session.add(dislike_1)
db.session.commit()

