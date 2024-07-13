
async function traerDatosDeLaAPI(tipo) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/${tipo}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los datos desde la API:', error);
        return await leerJson(); // Llamar a leerJson en caso de error
    }
}
async function ordenarMenu(tipo){
    const cardContainer = document.getElementById(`container-fluid-${tipo}`);
    
    try {
        // Esperar a que se resuelva la promesa
        const hamburguesas = await traerDatosDeLaAPI(tipo);
        
        // Verificar si hamburguesas es un array antes de iterar
        if (Array.isArray(hamburguesas)) {
            hamburguesas.forEach(hamburguesa => {
                const card = `
                    <div class="card" style="width: 20rem;">
                        <img src="${hamburguesa.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${hamburguesa.name}</h5>
                            <p class="card-text">${hamburguesa.description}</p>
                            <p class="card-price">${hamburguesa.price}</p>
                        </div>
                    </div>
                `;
                cardContainer.innerHTML += card;
            });
        } else {
            console.error('Los datos obtenidos no son un array:', hamburguesas);
        }
    } catch (error) {
        console.error('Error en la carga de datos:', error);
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    var tipos = ['carne', 'vegan', 'acompañamientos'];
    for (let tipo of tipos) {  // Usar for...of en lugar de for...in
        await ordenarMenu(tipo);  // Usar await para esperar a que ordenarMenu termine
    }
    const toTop = document.querySelector(".to-top");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            toTop.classList.add("active");
        } else {
            toTop.classList.remove("active");
        }
    });
});