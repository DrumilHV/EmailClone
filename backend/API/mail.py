from flask import Flask, jsonify
from Database.connection import getData

def mail(id):
    query = 'SELECT * FROM EMAILS WHERE id = %s'
    params = (id,)
    try:
        data = getData(query, params)
        return jsonify(data), 200
    except:
        return jsonify({"error": "Some error occured in feting mail."}), 400
