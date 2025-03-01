from flask import Flask, render_template
from flask_cors import CORS
from routes.PaletteRoutes import palette_bp

app = Flask(__name__, template_folder="templates", static_folder="static")
CORS(app)

app.register_blueprint(palette_bp, url_prefix="/api/palette")

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
