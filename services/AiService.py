from openai import OpenAI
from Config import IA_API_KEY

client = OpenAI(api_key=IA_API_KEY, base_url="https://api.deepseek.com")

print(f"API Key: {IA_API_KEY}")

def generate_color_palette(prompt):

    system_prompt = """
The user will provide a description of a theme or concept. Please generate a color palette based on that description with 5 colors in hexadecimal format. Return the output as a JSON object with the 5 colors.

format JSON:

{
    "color1": "#FFFFFF",
    "color2": "#FFFFFF",
    "color3": "#FFFFFF",
    "color4": "#FFFFFF",
    "color5": "#FFFFFF"
}

note:
- The colors should be suitable for use in a design or artwork.
- do not leave line break spaces in the important answer
- do not includes this simbols {/, |, \} in the json object
"""
    user_prompt = f"Generate a color palette based on {prompt}. Return a JSON with 5 colors in hexadecimal format."

    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]

    response = client.chat.completions.create(
    model="deepseek-chat",
    messages=messages,
    response_format={
        'type': 'json_object'
    }
    )
    
    return response.choices[0].message.content