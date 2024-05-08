from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
db = SQLAlchemy()

class User(db.Model,UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False) 
    firstName = db.Column(db.String(100), nullable=False) 
    lastName = db.Column(db.String(100), nullable=False) 
    email = db.Column(db.String(120), unique=True, nullable=False) 
    password = db.Column(db.String(255), nullable=False) 
    phoneNum = db.Column(db.String(15), nullable=True)
    token = db.Column(db.String(1000), nullable=True) 

class Predictions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False) 
    image = db.Column(db.String(1000), nullable=False) 
    result = db.Column(db.String(100), nullable=False) 
    plantname = db.Column(db.String(120), nullable=False) 
    
