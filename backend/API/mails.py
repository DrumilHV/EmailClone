from flask import Flask,jsonify
from Database.connection import getData


def mails(mail, page):
    query = "SELECT * FROM EMAILS WHERE dest = %s ORDER BY sentat LIMIT 10 OFFSET %s;"
    params = (mail, page)

    try:
        data = getData(query, params)
        return jsonify(data),200
    except:
        return jsonify({"error": "error fetching mails"}), 400
