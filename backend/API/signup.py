from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import jwt

from Database.connection import getData, putData


def signup(mail, password):
    if not mail or not password:
        return jsonify({"error": "Mail and password are required"}), 400

    hashed_password = generate_password_hash(password)

    # Check if the email already exists in the database
    check_query = 'SELECT * FROM USERS WHERE email = %s;'
    check_params = (mail,)

    existing_user = getData(check_query, check_params)

    if existing_user:
        return jsonify({"error": "This email is already in use, please use another email."}), 400

    # If the email is not found, proceed with signup
    signup_query = 'INSERT INTO USERS (email, pass) VALUES (%s, %s) RETURNING *;'
    signup_params = (mail, hashed_password)

    try:
        new_user_data = putData(signup_query, signup_params)
        putData("COMMIT;",())
        # You can return additional information about the newly created user if needed
        return jsonify({"message": "Signup successful!", "user": new_user_data}), 200
    except Exception as e:
        print(e)  # Log the exception for debugging purposes
        return jsonify({"error": "An error occurred while signing up."}), 500




