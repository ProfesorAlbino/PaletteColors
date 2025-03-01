import os
from dotenv import load_dotenv

load_dotenv()  # Cargar variables desde .env

IA_API_KEY = os.getenv("IA_API_KEY")

print(f"API Key 1: {IA_API_KEY}")

if not IA_API_KEY:
    raise ValueError("Falta la API Key de la IA en el archivo .env")
