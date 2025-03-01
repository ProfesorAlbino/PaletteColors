from flask import Blueprint, request, jsonify
from services.AiService import generate_color_palette

palette_bp = Blueprint("palette", __name__)

@palette_bp.route("/generate", methods=["POST"])
def generate_palette():
    data = request.get_json()
    prompt = data.get("prompt", "")
    palette = generate_color_palette(prompt)
    
    return jsonify(palette)
