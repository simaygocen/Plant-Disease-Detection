from prediction import predict
from flask import Flask, jsonify,request
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from models import db, User,Predictions  # Import db and User from model.py
from flask_jwt_extended import create_access_token,jwt_required,JWTManager,get_jwt_identity

app = Flask(__name__)

#app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://appuser:Uykusuz01@localhost/plantdisease'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/plantdisease'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'thisisasecretkey'

#db = SQLAlchemy()
bcrypt = Bcrypt(app)

db.init_app(app)
CORS(app)
jwt=JWTManager(app)


#---------------HOME ------------- 
@app.route('/')
def home():
    return jsonify({"status": "success"})

@app.route('/protected',methods=['GET'])
@jwt_required()
def protected():
    current_user_id=get_jwt_identity()
    return {'message': f"hello user {current_user_id}, you accessed protected resources"}

#---------------LOGIN ------------- 
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print(data)
    username = data.get('username')
    password = data.get('password')
    user = User.query.filter_by(username=username).first()
    
    if user and bcrypt.check_password_hash(user.password, password):

        access_token=create_access_token(identity=user.id)
        user.token=access_token
        db.session.commit()
        return jsonify({'access_token': access_token}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

#---------------REGISTER -------------
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    print(data)
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

@app.route('/dashboard', methods=['GET'])
@jwt_required()
def dashboard():
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()
    if user:
        return jsonify({"username": user.username, "email": user.email}), 200
    else:
        return jsonify({"message": "User not found"}), 404

@app.route('/edit', methods=['POST'])
@jwt_required()
def edit():
    data = request.get_json()
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()
    user.username=data.get('usernameText')
    user.email = data.get('mailText')
    db.session.commit()
    return jsonify({'message': 'User updated successfully'}), 200

@app.route('/saveprediction', methods=['POST'])
@jwt_required()
def save_prediction():
    data = request.get_json()
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()
    user_id=user.id
    image=data.get('photoUri')
    result=data.get('prediction')
    plantname=data.get('inputText')
    try:
         prediction = Predictions(user_id=user_id, image=image, result=result, plantname=plantname)
         db.session.add(prediction)
         db.session.commit()
    except IntegrityError:
         db.session.rollback()
         return jsonify({"message": "Failed to prediction saving"}), 500

    return jsonify({"message": "Prediction saved successfully"}), 201

@app.route('/getplants', methods=['GET'])
@jwt_required()
def get_plants():
    current_user_id = get_jwt_identity()
    predictions = Predictions.query.filter_by(user_id=current_user_id).all()
    if predictions:
        result_list = []
        for prediction in predictions:
            result_list.append({
                "image": prediction.image,
                "result": prediction.result,
                "plantname": prediction.plantname
            })
        return jsonify(result_list), 200
    else:
        return jsonify({"message": "Predictions not found."}), 404
    
@app.route('/delete_account', methods=['GET'])
@jwt_required()
def delete_account():
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'Your account has been deleted.'})

#--------------PREDICITON--------------
app.add_url_rule('/predict', view_func=predict, methods=["POST"])

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        #app.run(host='192.168.1.9', port=3000, debug=True)
        app.run(host='192.168.1.7', port=3000, debug=True)



    