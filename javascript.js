// saber si una palabra es palindormo
function esPalindromo(cadena) {
    // Eliminar espacios, caracteres especiales y convertir a minúsculas
    const cadenaLimpia = cadena.toLowerCase().replace(/[^a-z0-9]/g, "");
    // Verificar si la cadena limpia es igual a su reverso
    if( cadenaLimpia === cadenaLimpia.split("").reverse().join("") )
    alert("La cadena es un palindromo");
    else
    alert("La cadena NO es un palindromo");
}


//mayor o menor a un numero
function esMayor(num1, num2) {
    if( num1 > num2 )
    alert("El numero " + num1 + " es mayor.");
    else
    alert("El numero " + num1 + " NO es mayor.");
}


//mostrar vocales
function mostrarVocales(frase) {
    // Pedir una frase al usuario
    if (!frase) {
        console.log("No ingresaste una frase.");
    return;
    }
    // Crear un conjunto para almacenar las vocales únicas encontradas
    let vocales = new Set();
    // Recorrer la frase y buscar vocales
    for (let letra of frase.toLowerCase()) {
        if ("aeiouáéíóúü".includes(letra)) {
            vocales.add(letra);
        }
    }
    // Convertir el conjunto a un array y mostrar las vocales encontradas
    if (vocales.size > 0) {
        alert(`Las vocales en la frase son: ${[...vocales].join(", ")}`);
    } else {
        alert("No se encontraron vocales en la frase.");
    }
}


//saber el numero de vocales 
function contarVocales() {
    // Obtener la frase del input
    let palabra = document.getElementById("palabra").value;
    // Inicializa los contadores para cada vocal
    let contadorA = 0;
    let contadorE = 0;
    let contadorI = 0;
    let contadorO = 0;
    let contadorU = 0;
    // Convierte la frase a minúsculas para contar sin distinción de mayúsculas
    palabra = palabra.toLowerCase();
    // Recorre cada carácter de la frase
    for (let i = 0; i < palabra.length; i++) {
      let caracter = palabra[i];
      // Verifica si el carácter es una vocal y aumenta el contador correspondiente
      if (caracter === 'a') {
        contadorA++;
      } else if (caracter === 'e') {
        contadorE++;
      } else if (caracter === 'i') {
        contadorI++;
      } else if (caracter === 'o') {
        contadorO++;
      } else if (caracter === 'u') {
        contadorU++;
      }
    }
    // Muestra el resultado en el div
    document.getElementById("resultado").innerHTML = `
      <p>Conteo de vocales:</p>
      <ul>
        <li>A: ${contadorA}</li>
        <li>E: ${contadorE}</li>
        <li>I: ${contadorI}</li>
        <li>O: ${contadorO}</li>
        <li>U: ${contadorU}</li>
      </ul> `;
}



function mostrarContenidos() {
  const url = document.getElementById("url").value;

  // Verificar si la URL no está vacía
  if (!url) {
    alert("Por favor, introduce una URL.");
    return;
  }

  // Inicializar secciones
  actualizarEstado("Cargando...");
  document.getElementById("cabeceras").innerHTML = "<h3>Cabeceras HTTP de la respuesta del servidor:</h3><p>Las cabeceras aparecerán aquí.</p>";
  document.getElementById("codigoEstado").innerHTML = "<h3>Código de estado de la respuesta:</h3><p>El código de estado aparecerá aquí.</p>";
  document.getElementById("contenido").innerHTML = "";

  // Realizar la solicitud AJAX usando fetch
  fetch(url)
    .then(response => {
      actualizarEstado("Respuesta recibida");
      mostrarCodigoEstado(response);

      // Verificar si la respuesta fue exitosa
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      
      mostrarCabeceras(response);
      return response.text();
    })
    .then(data => {
      actualizarEstado("Completada");
      document.getElementById("contenido").innerHTML = data;
    })
    .catch(error => {
      actualizarEstado("Error");
      document.getElementById("contenido").innerHTML = `<p>Error al cargar contenido: ${error.message}</p>`;
    });
}

// Función para actualizar el estado
function actualizarEstado(estado) {
  document.getElementById("estado").innerText = `Estado de la petición: ${estado}`;
}

// Función para mostrar el código de estado
function mostrarCodigoEstado(response) {
  const codigoEstado = `Código: ${response.status} - ${response.statusText}`;
  document.getElementById("codigoEstado").innerHTML = `<h3>Código de estado de la respuesta:</h3><p>${codigoEstado}</p>`;
}

// Función para mostrar las cabeceras HTTP
function mostrarCabeceras(response) {
  let cabecerasHTML = "<h3>Cabeceras HTTP de la respuesta del servidor:</h3><ul>";
  response.headers.forEach((value, key) => {
    cabecerasHTML += `<li><strong>${key}:</strong> ${value}</li>`;
  });
  cabecerasHTML += "</ul>";
  document.getElementById("cabeceras").innerHTML = cabecerasHTML;
}