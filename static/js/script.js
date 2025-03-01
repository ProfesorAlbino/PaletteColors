document
  .getElementById("paletteForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const description = document.getElementById("description").value;
    const buttonText = document.getElementById("buttonText");
    const loading = document.getElementById("loading");

    // Mostrar el estado de carga
    buttonText.textContent = "Generando...";
    loading.style.display = "inline-block";

    try {
      const response = await fetch("/api/palette/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: description }),
      });

      const data = await response.json();
      console.log(data);
      displayPalette(data);
    } catch (error) {
      console.error("Error al generar la paleta:", error);
      const paletteDiv = document.getElementById("palette");
      paletteDiv.innerHTML = `<div class="col-12 text-center">
                    <div class="alert alert-danger" role="alert">
                        <i class="bi bi-exclamation-triangle-fill me-2"></i>
                        Ocurrió un error al generar la paleta. Por favor, intenta de nuevo.
                    </div>
                </div>`;
    } finally {
      // Restaurar el botón a su estado original
      buttonText.textContent = "Generar";
      loading.style.display = "none";
    }
  });

function displayPalette(data) {
  // Verificar si data es una cadena
  if (typeof data === "string") {
    try {
      console.log("Parseando JSON...");
      data = JSON.parse(data); // Convertir a JSON si es string
    } catch (error) {
      console.error("Error al parsear JSON:", error);
      return;
    }
  }

  const paletteDiv = document.getElementById("palette");
  paletteDiv.innerHTML = "";
  console.log("JSON recibido:", data);

  Object.entries(data).forEach(([key, color]) => {
    console.log(`Nombre del color: ${key}, Valor: ${color}`);

    // Calcular color de texto contrastante
    const contrastColor = getContrastColor(color);

    // Crear columna para el color
    const colorCol = document.createElement("div");
    colorCol.className = "col-lg-3 col-md-4 col-sm-6";

    colorCol.innerHTML = `
                    <div class="color-card shadow-sm" style="background-color: ${color}">
                        <button class="copy-btn" data-color="${color}" title="Copiar color">
                            <i class="bi bi-clipboard"></i>
                        </button>
                        <div class="color-info">
                            <div class="color-name">${key}</div>
                            <div class="color-hex">${color}</div>
                        </div>
                    </div>
                `;

    paletteDiv.appendChild(colorCol);

    // Añadir evento para copiar el color
    colorCol.querySelector(".copy-btn").addEventListener("click", function () {
      copyToClipboard(this.getAttribute("data-color"));
    });
  });
}

// Función para copiar al portapapeles
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    function () {
      toast.show();
    },
    function (err) {
      console.error("No se pudo copiar el texto: ", err);
    }
  );
}

// Función para determinar si se debe usar texto blanco o negro en función del color de fondo
function getContrastColor(hexColor) {
  // Convertir hex a RGB
  hexColor = hexColor.replace("#", "");
  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);

  // Calcular luminosidad
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Retornar color de texto basado en luminosidad
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}
