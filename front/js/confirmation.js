// ********   Récupération de l'ID de commande et affichage sur la page *******//
let url = new URLSearchParams(window.location.search);
let id = url.get("orderId");

let orderId = document.querySelector("#orderId");
orderId.innerText = id;

//***********   Suppression des données du localstorage    *****************//
localStorage.removeItem("lsPanier");
