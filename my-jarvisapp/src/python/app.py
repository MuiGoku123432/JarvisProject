from flask import Flask, jsonify # type: ignore

app = Flask(__name__)


@app.route("/say-hello", methods=["GET"])
def say_hello():
    return jsonify(message="Hello from Python J.A.R.V.I.S! 6")

@app.route("/button-clicked", methods=["POST"])
def buttonClicked():
    print("Button clicked from python backend")
    return jsonify(message="Button clicked, python to front end communication successful!", color='white')


if __name__ == "__main__":
    app.run(port=5000, debug=True)
