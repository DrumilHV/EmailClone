from flask import Flask, request, jsonify;
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

from flask_cors import CORS

from Database.connection import getData # this method returns the data data from the database
from API.login import login
from API.signup import signup
from API.mails import mails
from API.mail import mail
from API.send import send

app = Flask(__name__)
CORS(app)


@app.route("/signup", methods=["POST"])
def signUpHelper():
    # print(request.body.get("mail"))
    data = request.get_json()
    print(data)
    mail = data.get("mail")
    password = data.get("password")
    return signup(mail, password)


@app.route("/login", methods=["POST"])
def LoginHelper():
    data = request.get_json()
    print("login", data)
    mail = data.get("mail")
    password = data.get("password")
    return login(mail, password)

@app.route("/mails", methods=["POST"])
def mailsHelper():
    data = request.get_json()
    mail = data.get("mail")
    page = data.get("page")
    try:
        page = int(page)
    except:
        return ({"error":"please give valid page number"})
    print(mail, page)
    # print(mail, page)
    return mails(mail,page)

@app.route("/mail/<id>", methods=["GET"])
def mailHelper(id):
    return mail(id)

@app.route("/send", methods=["POST"])
def sendHelper():
    data = request.get_json()
    origin = data.get("origin")
    dest = data.get("dest")
    content = data.get("content")
    return send(origin, dest, content)

if __name__ == '__main__': 
    app.run() 