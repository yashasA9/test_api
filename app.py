from flask import Flask, render_template
import requests
import random

app = Flask(__name__)

POSTS_API = "https://jsonplaceholder.typicode.com/posts"
COMMENTS_API = "https://jsonplaceholder.typicode.com/comments"

# Home route
@app.route("/")
def home():
    return render_template("home.html")


# Posts list
@app.route("/posts")
def posts():
    response = requests.get(POSTS_API)
    posts = response.json()

    # Add random image to each post
    for post in posts:
        post["image"] = f"https://picsum.photos/seed/{random.randint(1,1000)}/400/200"

    return render_template("posts.html", posts=posts)


# Single post + comments
@app.route("/posts/<int:post_id>")
def post_detail(post_id):
    post = requests.get(f"{POSTS_API}/{post_id}").json()
    comments = requests.get(COMMENTS_API, params={"postId": post_id}).json()

    post["image"] = f"https://picsum.photos/seed/{random.randint(1,1000)}/600/300"

    return render_template("post_detail.html", post=post, comments=comments)


# Comments list
@app.route("/comments")
def comments():
    response = requests.get(COMMENTS_API)
    comments = response.json()

    return render_template("comments.html", comments=comments)


if __name__ == "__main__":
    app.run(debug=True)