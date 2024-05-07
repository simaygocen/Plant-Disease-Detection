from prediction import predict
from flask import Flask, render_template, url_for, redirect, jsonify,request
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from models import db, User  # Import db and User from model.py



app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://appuser:Uykusuz01@localhost/plantdisease'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'thisisasecretkey'

#db = SQLAlchemy()
bcrypt = Bcrypt(app)

db.init_app(app)
CORS(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'



@login_manager.user_loader
def load_user(user_id):
    print(user_id)
    return User.query.get(int(user_id))


#---------------HOME ------------- 
@app.route('/')
def home():
    return jsonify({"status": "success"})

#---------------LOGIN ------------- 
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user = User.query.filter_by(username=username).first()
    
    if user and bcrypt.check_password_hash(user.password, password):
        login_user(user)
        return jsonify({'message': 'Login successful', 'user': {'id': user.id, 'username': user.username}}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

#---------------REGISTER -------------
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    email = data['email']

    # Check if the username or email already exists in the database
    existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
    if existing_user:
        return jsonify({"message": "Username or email already exists"}), 400

    # If username and email are not taken, proceed to create a new user
    firstName = data['firstName']
    lastName = data['lastName']
    phoneNum = data['phoneNum']
    password = data['password']
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    
    try:
        user = User(username=username, firstName=firstName, lastName=lastName, email=email, phoneNum=phoneNum, password=hashed_password)
        db.session.add(user)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({"message": "Failed to register user"}), 500

    return jsonify({"message": "User created successfully"}), 201

#---------------İŞE YARAMIYOR ŞUANLIK ------------- 
@app.route('/dashboard', methods=['GET'])
@login_required
def dashboard():
    user_info = {
        "username": current_user.username,
        "email": current_user.email,
        
    }
    return jsonify(user_info)

@app.route('/edit', methods=['POST'])
@login_required
def edit():
    data = request.get_json()

  
    current_user.username = data.get('username')
    current_user.email = data.get('email')
    db.session.commit()
    return jsonify({'message': 'User updated successfully'}), 200
    

#---------------LOG OUT İŞE YARAMIYOR ŞUANLIK ------------- 
@app.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))


#--------------PREDICITON--------------
app.add_url_rule('/predict', view_func=predict, methods=["POST"])



if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        app.run(host='192.168.1.9', port=3000, debug=True)
        #app.run(host='192.168.1.7', port=3000, debug=True)



class RegisterForm(FlaskForm):
    username = StringField(validators=[
                           InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Username"})

    password = PasswordField(validators=[
                             InputRequired(), Length(min=8, max=20)], render_kw={"placeholder": "Password"})

    submit = SubmitField('Register')

    def validate_username(self, username):
        existing_user_username = User.query.filter_by(
            username=username.data).first()
        if existing_user_username:
            raise ValidationError(
                'That username already exists. Please choose a different one.')

class LoginForm(FlaskForm):
    username = StringField(validators=[
                           InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Username"})

    password = PasswordField(validators=[
                             InputRequired(), Length(min=8, max=20)], render_kw={"placeholder": "Password"})

    submit = SubmitField('Login')
    
    