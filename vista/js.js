const todoDentro1=document.querySelector(".todoDentro1")
const todoDentro2=document.querySelector(".todoDentro2")
// evento1
todoDentro1.addEventListener("mouseover", () => {
    // Aplicar estilos al elemento cuando el mouse está sobre él
    todoDentro1.style.transform = "scale(1.1)";
    todoDentro1.style.transition = "all ease .3s";
    
});

todoDentro1.addEventListener("mouseout", () => {
    // Revertir los estilos cuando el mouse sale del elemento
    todoDentro1.style.transform = "scale(1)";
    todoDentro1.style.transition = "all ease .3s";
});
todoDentro1.addEventListener("click", () => {
    // Redirigir a otro HTML cuando se hace clic en todoDentro1
    window.location.href = "../galeria/html.html";
});
// evento2
todoDentro2.addEventListener("mouseover", () => {
    // Aplicar estilos al elemento cuando el mouse está sobre él
    todoDentro2.style.transform = "scale(1.1)";
    todoDentro2.style.transition = "all ease .3s";
});

todoDentro2.addEventListener("mouseout", () => {
    // Revertir los estilos cuando el mouse sale del elemento
    todoDentro2.style.transform = "scale(1)";
    todoDentro2.style.transition = "all ease .3s";
});
todoDentro2.addEventListener("click", () => {
    // Redirigir a otro HTML cuando se hace clic en todoDentro1
    window.location.href = "../facebook/html.html";
});