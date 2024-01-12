from flask import Flask, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import os
import jwt

SECRET_KEY = os.getenv('SECRET_KEY')

from Database.connection import getData
        
def login(mail, password):
    query = 'SELECT * FROM USERS WHERE email=%s'
    param = (mail,)

    data = getData(query, param)


    # Check if data is empty (user not found)
    if not data:
        return jsonify({"error": "Wrong email or password!"}), 400

    # Assuming data is a tuple with email at index 0 and hashed_password at index 1
    if check_password_hash(data[0][1], password):
        # Correct password, generate JWT token
        token = jwt.encode({"user": mail}, SECRET_KEY)
        return jsonify({"token": token}), 200  # Decode the byte string to a UTF-8 string
    else:
        return jsonify({"error": "Wrong email or password!"}), 400