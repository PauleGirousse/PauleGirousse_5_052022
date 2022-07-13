// ****************************************************    Récupération de l'ID de commande et affichage sur la page   **********************************//

let order_Id = localStorage.getItem("_id");
console.log(order_Id);

let orderId = document.querySelector("#orderId");
orderId.innerText = order_Id;

//*****************************************************   Suppression de l'ID de commande du localstorage    ********************************************//

order_Id = localStorage.removeItem("_id");
