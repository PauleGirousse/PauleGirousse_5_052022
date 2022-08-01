// ****************************************************    Récupération de l'ID de commande et affichage sur la page   **********************************//
let url = new URLSearchParams(window.location.search);
console.log(url);
let id = url.get("orderId");
console.log(id);

let orderId = document.querySelector("#orderId");
orderId.innerText = id;

//*****************************************************   Suppression des données du localstorage    ********************************************//
localStorage.removeItem("lsPanier");
