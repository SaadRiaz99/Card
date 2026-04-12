from flask import Flask, render_template, request
import random

app = Flask(__name__)

# List of birthday messages
messages_list = [
    "Wishing you a day filled with happiness!",
    "May all your dreams come true!",
    "Have a fantastic birthday!",
    "Hope your birthday is as amazing as you!",
    "Cheers to you on your special day!",
    "Celebrate big today and always!",
    "Another year older, another year wiser!",
]

@app.route("/", methods=["GET", "POST"])
def home():
    name = None
    message = None
    if request.method == "POST":
        name = request.form.get("name")
        message = random.choice(messages_list)  
    return render_template("index.html", name=name, message=message)

if __name__ == "__main__":
    app.run(debug=True)
