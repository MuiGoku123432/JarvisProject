from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/say-hello", methods=["GET"])
def say_hello():
    return jsonify(message="Hello from Python J.A.R.V.I.S! 5")


if __name__ == "__main__":
    app.run(port=5000, debug=True)
