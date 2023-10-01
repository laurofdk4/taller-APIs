// Obtener elementos del DOM por sus ID
const monedaEl_one = document.getElementById('moneda-uno');
const monedaEl_two = document.getElementById('moneda-dos');
const cantidadEl_one = document.getElementById('cantidad-uno');
const cantidadEl_two = document.getElementById('cantidad-dos');
const cambioEl = document.getElementById('cambio');
const tazaEl = document.getElementById('taza');

// Función para realizar el cálculo de la conversión de moneda
function calculate() {
    // Obtener las monedas seleccionadas
    const moneda_one = monedaEl_one.value;
    const moneda_two = monedaEl_two.value;

    // Realizar una solicitud fetch a la API de tasas de cambio
    fetch(`https://v6.exchangerate-api.com/v6/844ba945d1eebfb2ae6581ab/latest/${moneda_one}`)
        .then(res => res.json())
        .then(data => {
            // Obtener la tasa de cambio de la respuesta JSON
            const tasaCambio = data.conversion_rates[moneda_two];
            
            // Mostrar la tasa de cambio en el elemento de cambio
            cambioEl.textContent = `1 ${moneda_one} = ${tasaCambio} ${moneda_two}`;
            
            // Calcular la conversión y mostrarla en el campo cantidadEl_two
            cantidadEl_two.value = (cantidadEl_one.value * tasaCambio).toFixed(2); // Redondear a 2 decimales
        })
        .catch(error => console.error('Ocurrió un error:', error));
}

// Agregar event listeners para detectar cambios en las selecciones y los campos de entrada
monedaEl_one.addEventListener('change', calculate);
cantidadEl_one.addEventListener('input', calculate);
monedaEl_two.addEventListener('change', calculate);
cantidadEl_two.addEventListener('input', calculate);

// Agregar un evento de clic al botón "tazaEl" para intercambiar las monedas seleccionadas
tazaEl.addEventListener('click', () => {
    // Intercambiar las monedas seleccionadas
    const temp = monedaEl_one.value;
    monedaEl_one.value = monedaEl_two.value;
    monedaEl_two.value = temp;

    // Llamar a la función calculate() para realizar la conversión con las monedas intercambiadas
    calculate();
});

// Llamar a la función calculate() al cargar la página para realizar una conversión inicial
calculate();