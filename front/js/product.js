//Récupération de l'url
let params = new URLSearchParams(window.location.search);
console.log(params);
let idParams = params.get("id"); //récupération de l'Id de l'article
console.log(idParams);
let item = document.querySelector(".item");
let item__img = document.querySelector("item__img");
let img = document.createElement("img");
