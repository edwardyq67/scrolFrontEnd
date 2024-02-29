const mover = document.getElementById("mover");

Sortable.create(mover, {
  group: {
    name: "lista-tarea",
  },
  animation: 150, //timepo
  easing: "cubic-bezier(0.5, 0, 0.75, 0)", //efecto de movimiento

  //ghostClass:"active"//cambia el color cuando se arrastra
  dragClass: "invisible", //cambia de color cuando se arrastra,
  chosenClass: "active", //cambia el color cuando se da click
  disabled: false, //cancela movimiento con true
  onEnd:()=>{
    console.log("se puede")
  },
  group:"lista-persona",
  store:{
    set:(sortable)=>{
      const orden=sortable.toArray()
      localStorage.setItem(sortable.options.group.name,orden.join("|"))
  },
  get:(sortable)=>{
      const orden=localStorage.getItem(sortable.options.group.name)
      return orden? orden.split("|"):[]
  }
  }
});

// file
const label = document.querySelector(".label");
const file = document.getElementById("file");
const dentro = document.querySelector(".dentro");


// get
const contenido = document.querySelector(".resultado");
const getInformacion = async () => {
  const body=document.querySelector(".body")
  body.style.overflow = "auto";
  try {
    const respuesta = await axios.get("http://localhost:8080/informacion");

    // Accede a la propiedad "data" de la respuesta
    for (let i = 0; i < respuesta.data.length; i++) {
      const estado = respuesta.data[i];

      const conten = ` <div data-id=${estado.id} class="conten border rounded-3 border-3 border-secondary">
<img
  class=""
  src=${estado.url}
  alt=""
  id='url'
/>

<div class="contInfo">


  <div class="informacion"><div class="iconDen">
  <i style="{color: 'wheat'}" id=${estado.id} class="mb-2 tacho  fa-solid fa-trash"></i>
</div>

    <h3 class="titulo">${estado.title}</h3>
    <p>${estado.contend}</p>
    <button id=${estado.id} type="button" class="botonVisualisacion btn btn-dark">VISUALIZAR <i id="lapiz" class="lapiz fa-solid fa-pen-to-square"></i></button>


    </div>
</div>
</div>`;
      contenido.innerHTML += conten;
     
    }

    const tachos = document.querySelectorAll(".tacho");

    tachos.forEach((tacho) => {
      tacho.addEventListener("click", async (event) => {
        const tachoId = event.target.id;
        try {
          const response = await axios.delete(
            `http://localhost:8080/informacion/${tachoId}`
          );

          if (response.status >= 200 && response.status < 300) {
            // Recargar la página después de realizar la solicitud
            location.reload();
          } else {
            console.error(`Error en la solicitud: ${response.status}`);
          }
        } catch (error) {
          console.error("Error al procesar la solicitud DELETE:", error);
        }
      });
    });
    const visualizar = document.querySelectorAll(".botonVisualisacion");

const handleButtonClick = async (e) => {
        const tachoId = e.target.id;
        try {
          const getInfo = await axios.get(
            `http://localhost:8080/informacion/${tachoId}`
          );
          if (getInfo.status >= 200 && getInfo.status < 300) {
            const vista = `<div class="visualizar">
        <div class="contenido card mb-3" style="width: 50%;">
        <div class="row g-0">
          <div  style="cursor:pointer" class="col-md-5 col-sm-12">
        <div style="display: flex; align-items: center; justify-content: center; padding: 5px 0;">
  <img id="imgnew" style="height: 20vh; width: auto;" src="${getInfo.data.url}" class="img-fluid rounded-start" alt="...">
</div>    </div>
          <div class="InformacionV col-md-7 col-sm-12">
          <i class="x fa-solid fa-xmark"></i>
            <div class="card-body">
            <div className="contenidoh5"  style="display: grid">
            <div className="h5">
               <h5 class="card-title" id="h5" style="display:inline-block; padding:2px"  contenteditable="true">${getInfo.data.title}</h5>
     
            </div>
             
            
                 <p class="card-text" id="p" style="display:inline-block; padding:2px" contenteditable="true">${getInfo.data.contend}</p>
            <div className="boton">
            <button style="display:inline-block;"  type="button" id=${getInfo.data.id} class="guardar btn btn-dark">GUARDAR</button>

            </div>
                             </div>
             </div>
           
          </div>
        </div>
      </div>
        </div>`;
            body.style.overflow="hidden"
            window.scrollTo(0, 0);
            todo.style.visibility = "hidden";
            mostrar.innerHTML = vista;
            const x = document.querySelector(".x");
            x.addEventListener("click", () => {
              location.reload();
            });
            const imgnew = document.getElementById("imgnew");
            imgnew.addEventListener("click", () => {
              const visualizar = document.querySelector(".visualizar");
              const mostrarCambio = document.querySelector(".mostrarCambio");
              const img = `<div class="inoutTextUrl">
        <i class="xURl fa-solid fa-xmark"></i>
        <div class="row g-3 align-items-center">
          <label for="inputPassword5" class="text-white form-label">URL IMG:</label>
          <input type="text" id="inputTextImg" class="col form-control" aria-describedby="passwordHelpBlock">
          <button type="submitDentro" id="buttonTextImg" class="btn btn-dark">GUARDAR</button>
        </div>
      </div>`;
              visualizar.style.visibility = "hidden";
              body.style.overflow = "hidden";
              mostrarCambio.innerHTML = img;
              let valorUrl = document.getElementById("inputTextImg");
              const inoutTextUrl = document.querySelector(".inoutTextUrl");
              const submitDentro = document.getElementById("buttonTextImg");
              submitDentro.addEventListener("click", () => {
                imgnew.src = valorUrl.value;
                inoutTextUrl.style.visibility = "hidden";
                visualizar.style.visibility = "visible";
              });
              const xURl = document.querySelector(".xURl");
              xURl.addEventListener("click", () => {
                inoutTextUrl.style.visibility = "hidden";
                visualizar.style.visibility = "visible";
              });
            });
            const guardar = document.querySelector(".guardar");
            guardar.addEventListener("click", async (e) => {
              e.preventDefault();
              let title = document.getElementById("h5").textContent;
              let contend = document.getElementById("p").textContent;
              let imgnew = document.getElementById("imgnew").src;
              try {
                const tachoId = e.target.id;

                const response = await axios.put(
                  `http://localhost:8080/informacion/${tachoId}`,
                  {
                    title,
                    contend,
                    url: imgnew,
                  }
                );
                if (response.status >= 200 && response.status < 300) {
                  // Recargar la página después de realizar la solicitud
                  location.reload();
                } else {
                  console.error(`Error en la solicitud: ${response.status}`);
                }
              } catch (error) {}
            });
          } else {
            console.error(`Error en la solicitud: ${response.status}`);
          }
        } catch (error) {}
      };
      visualizar.forEach((visualizarElement) => {
        visualizarElement.addEventListener("click", handleButtonClick);
      });

  } catch (error) {
    console.log(error);
  }
};

getInformacion();
const todo = document.querySelector(".todo");
const iconFile = document.querySelector(".iconFile");
const mostrar = document.querySelector(".mostrar");

file.addEventListener("change", () => {
  const reader=new FileReader()
  reader.readAsDataURL(file.files[0])
  reader.addEventListener("load",e=>{
  const mostrar=`<div class="imagen">
  <img src=${e.currentTarget.result} alt="">
</div>`
label.innerHTML=mostrar
  })
});
// post
// JavaScript
const myImage = document.getElementById("myImage");
document.querySelector(".enviar").addEventListener("click", async (e) => {
  e.preventDefault();
  let title = document.getElementById("titleInput").value;
  let contend = document.getElementById("comment").value;
  
  try {
    // Realizar la solicitud POST
    const formData = new FormData();
formData.append("image", file.files[0]);
await axios.post("http://localhost:8080/informacionImg", formData);
    const respuesta=await axios.get("http://localhost:8080/informacionImg")
    if(respuesta.data.length>0){
      const sortedData = respuesta.data.sort((a, b) => b.id - a.id);
       const response = await axios.post("http://localhost:8080/informacion", {
      title,
      contend,
      url: sortedData[0].url,
    });

    // Verificar si la solicitud fue exitosa (código de estado 200-299)
    if (response.status >= 200 && response.status < 300) {
      // Recargar la página después de realizar la solicitud
      location.reload();
    } else {
      console.error(`Error en la solicitud: ${response.status}`);
    }
     
    }
  
   
  } catch (error) {
    console.error("Error al procesar la solicitud:", error.message);
    // Aquí podrías mostrar un mensaje de error al usuario
  }
});
const limpiar = document.querySelector(".limpiar");
limpiar.addEventListener("click", () => {
  location.reload();
});
