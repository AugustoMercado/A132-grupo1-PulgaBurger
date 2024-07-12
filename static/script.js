async function traerDatosDeLaAPI() {
    try {
        const response = await fetch('http://pruebapulga.kesug.com/api.php?type=burgers');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return []; // Devolver un array vacío en caso de error
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    const cardContainer = document.getElementById('container-fluid');
    
    try {
        // Esperar a que se resuelva la promesa
        const hamburguesas = await traerDatosDeLaAPI();
        
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
});