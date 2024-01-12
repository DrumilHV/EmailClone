from app import app

# app = app()

if __name__ == "__main__":
    app.run()


# gunicorn -w 4 -b 127.0.0.1:5000 wsgi:app