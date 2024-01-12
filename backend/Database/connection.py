import psycopg2
from dotenv import load_dotenv
from  flask import Flask, jsonify
import os

load_dotenv()
def getData(query , params):


    EXTERNAL_URL = os.getenv("EXTERNEL_URL")

    conn = psycopg2.connect(EXTERNAL_URL)

    cur = conn.cursor() 

    cur.execute(query, params)

    data = cur.fetchall()


    conn.close()

    return data

def putData(query, params):
    try:
        EXTERNAL_URL = os.getenv("EXTERNEL_URL")

        conn = psycopg2.connect(EXTERNAL_URL)

        cur = conn.cursor()

        cur.execute(query, params)

        # Commit the changes
        conn.commit()

        # Fetch the result if needed
        data = cur.fetchone()

        conn.close()

        return data
    except Exception as e:
        return jsonify({"error":"error in inserting data!"}), 400
