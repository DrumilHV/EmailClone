from flask import Flask, jsonify
from Database.connection import getData, putData

def send(origin, dest , content):
    query = 'SELECT EMAIL FROM USERS WHERE EMAIL=%s'
    params = (dest,)
    data = getData(query, params)
    if not data:
        return jsonify({"error": "Such user does not exist!, check destination again!"})
    

    query = "INSERT INTO EMAILS(origin, dest, content) values (%s ,%s, %s) RETURNING dest ;"
    params = (origin, dest, content)

    try:
        data = putData(query, params)
        if data:
            return jsonify({"message":"your mail was sent!"}), 200
        else:
            return jsonify({"message":"could not send mail, try again !"}), 400
    except:
        return jsonify({"error":"error occured !"}), 200
        