from flask import Flask, request, jsonify
import json
import os
import atexit

app = Flask(__name__)

DATA_FILE = "serverdata.json"
serverdata = []


# --- Load data from JSON file on startup ---
def load_data():
    global serverdata
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r") as f:
            try:
                serverdata = json.load(f)
            except json.JSONDecodeError:
                print("Warning: JSON file empty or invalid, starting with empty data.")
                serverdata = []
    else:
        serverdata = []
        save_data()


# --- Save data to JSON file ---
def save_data():
    with open(DATA_FILE, "w") as f:
        json.dump(serverdata, f, indent=4)


# --- Auto-save on exit ---
atexit.register(save_data)


# --- Routes ---

@app.route("/init", methods=["GET"])
def init():
    """Return all server data as JSON"""
    return jsonify(serverdata)


@app.route("/update", methods=["POST"])
def update():
    """Update user data based on matching username"""
    new_userdata = request.get_json()
    if not new_userdata or "username" not in new_userdata:
        return jsonify({"error": "Invalid userdata"}), 400

    username = new_userdata["username"]
    updated = False

    for i, user in enumerate(serverdata):
        if user.get("username") == username:
            serverdata[i] = new_userdata
            updated = True
            break

    if not updated:
        # If user not found, append them
        serverdata.append(new_userdata)

    save_data()
    return jsonify({"status": "success"})


# --- Entry point ---
if __name__ == "__main__":
    load_data()
    print("Server data loaded.")
    app.run(host="0.0.0.0", port=5000, debug=True)
