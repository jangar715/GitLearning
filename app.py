from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def hello_world():
    try:
        return render_template('index.html')
    except Exception as e:
        return str(e)

    