from flask import Flask, jsonify, request # type: ignore

app = Flask(__name__)


current_color = "white"


@app.route("/say-hello", methods=["GET"])
def say_hello():
    return jsonify(message="Hello from Python J.A.R.V.I.S!")


@app.route("/button-clicked", methods=["POST"])
def print_message():
    global current_color
    new_color = "white" if current_color != "white" else "blue"
    current_color = new_color
    print(f"Button was clicked, changing color to {new_color}")
    return jsonify(message=f"Color changed to {new_color}", color=new_color)


if __name__ == "__main__":
    app.run(port=5000, debug=True, threaded=True)
