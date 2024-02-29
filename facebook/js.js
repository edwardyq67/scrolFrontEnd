const contenido = document.querySelector(".contenido");

const visualizar = async () => {
    try {
        const getInformacion = await axios.get("http://localhost:8080/informacion");

        for (let i = 0; i < getInformacion.data.length; i++) {
            const estado = getInformacion.data[i];
            const informacionVista = `<div class="col-md-5 col-sm-12 dentro container mb-3">
                <div class="card bg-dark">
                    <div class="card-header h3 text-light">
                        ${estado.title}
                    </div>
                    <div class="card-body">
                        <blockquote class="blockquote mb-0">
                            <img src=${estado.url} class="mb-3" alt="" />
                            <p class="text-light h5">${estado.contend}</p>
                        </blockquote>
                    </div>
                </div>
            </div>`;
            contenido.innerHTML += informacionVista;
        }
        permitirCargarMasContenido=true
    } catch (error) {
        console.log(error);
    }
};

const cargarMasContenido = async () => {
  try {
    if (!permitirCargarMasContenido) {
      return;
  }
     const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Verificar si el usuario ha llegado al final de la página
    if (scrollPosition + windowHeight >= documentHeight - 100) {
        // Cargar más contenido
        await visualizar();
    }
  } catch (error) {
    
  }
   
};

// Agregar un evento de scroll para detectar cuando el usuario llega al final de la página
window.addEventListener("scroll", cargarMasContenido);

// Inicializar la carga de contenido al cargar la página
visualizar();

// busqueda
const inputText = document.querySelector(".inputText");
const btn = document.querySelector(".btn");

btn.addEventListener("click", async (e) => {
    e.preventDefault();

    try {
      permitirCargarMasContenido = false;
      contenido.innerHTML=""
        const response = await axios.get(`http://localhost:8080/informacion?title=${inputText.value}`);
        const informacionData = response.data;

        if (Array.isArray(informacionData)) {
            for (let i = 0; i < informacionData.length; i++) {
                const estado = informacionData[i];
                const informacionVista = `<div class="col-md-5 col-sm-12 dentro container mb-3">
                    <div class="card bg-dark">
                        <div class="card-header h3 text-light">
                            ${estado.title}
                        </div>
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                                <img src=${estado.url} class="mb-3" alt="" />
                                <p class="text-light h5">${estado.contend}</p>
                            </blockquote>
                        </div>
                    </div>
                </div>`;
                contenido.innerHTML += informacionVista;
            }
        } else {
            // Si la respuesta no es un array, puedes manejarla de otra manera o mostrar un mensaje de error.
            console.error("La respuesta no es un array.");
        }
    } catch (error) {
        console.log(error);
    }
   
});

//icon
const icon=document.querySelector(".icon")
icon.addEventListener("click",()=>{
  permitirCargarMasContenido=true
  cargarMasContenido();
})
