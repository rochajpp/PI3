function addPop(){
    const main = document.querySelector(".main");
    const body = document.querySelector("body");
    main.classList.toggle("active");
    body.classList.toggle("activeBody");
}

function addPopNota(){
    const main = document.querySelector(".main");
    const body = document.querySelector("body");
    main.classList.toggle("activeNota");
    body.classList.toggle("activeBodyNota");
}