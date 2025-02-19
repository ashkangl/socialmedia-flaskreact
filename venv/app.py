from flask import Flask, jsonify, request, session
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from flask_cors import CORS
from dotenv import load_dotenv
import os
import hashlib
from db import *
from posts import *

app = Flask(__name__)
CORS(app, supports_credentials=True) 
login_manager = LoginManager()
login_manager.init_app(app)
load_dotenv()
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SESSION_TYPE'] = 'filesystem'


class User(UserMixin):
    def __init__(self, id, name, username, email, password):
        self.id = id
        self.name = name
        self.username = username
        self.email = email
        self.password = password



@login_manager.user_loader
def load_user(user_id):
    connect = dbconnection()
    cur = connect.cursor()
    cur.execute('SELECT * FROM users WHERE id = %s',(user_id,))
    user_data = cur.fetchone()
    cur.close()
    connect.close()
    if user_data:
        return User(*user_data)
    return None

@app.route('/users',methods=["GET"])
def getusers():
    connect = dbconnection()
    cur = connect.cursor()
    cur.execute('SELECT * FROM users')
    users = cur.fetchall()
    cur.close()
    connect.close()
    return jsonify({'users':users}),200


@app.route('/login',methods=["POST"])
def login():
    data = request.get_json()
    email = data["email"]
    password = hashlib.sha256(data.get("password").encode()).hexdigest()
    connect = dbconnection()
    cur = connect.cursor()
    cur.execute('SELECT * FROM users WHERE email = %s AND password = %s',(email,password))
    user_data = cur.fetchone()
    cur.close()
    connect.close()
    if user_data:
        user = User(*user_data)
        login_user(user, remember = True)
        return jsonify({'message': 'Login Success','user':{'name':user.name,'username':user.username,'email':user.email}}), 200
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/register',methods=["POST"])
def register():
    data = request.get_json()
    username = data["username"]
    name = data["name"]
    email = data["email"]
    p = hashlib.sha256(data["password"].encode())
    password = p.hexdigest()
    connect = dbconnection()
    cur = connect.cursor()
    cur.execute('INSERT INTO users (name, username, email, password) VALUES (%s,%s,%s,%s)',(name,username,email,password))
    connect.commit()
    cur.close()
    connect.close()
    return jsonify({'messages':'User Signup Success'}),201


@login_required
@app.route('/logout')
def logout():
    logout_user()
    return 'Logged out'

@app.route('/posts',methods=["GET"])
def get_posts_route():
    return getposts()

if (__name__) == "__main__":
    create_post_table()
    create_users_table()
    app.run(debug=True)
    