//Récupération de l'url
let params = new URLSearchParams(window.location.search);
console.log(params);
let idParams = params.get("_id"); //récupération de l'Id de l'article
console.log(idParams);
localStorage.setItem("_id", idParams); //Ajouter dans le localstorage et convertir en format JSON
let api = `http://localhost:3000/api/products/`;
let idApi = api + idParams;
console.log(idApi);
let colorSelect = document.querySelector("#colors");
let quantitySelect = document.querySelector("#quantity");

let ajouteraupanier = document.querySelector("#addToCart");

const canapes = async function () {
  let response = await fetch(idApi); // appel reseau sur l'article de l'API
  if (response.ok) {
    // si la reponse est ok
    let data = await response.json(); // convertion au format JSON
    console.log(data);
    let item__img = document.querySelector(".item__img");

    let img = document.createElement("img");
    item__img.appendChild(img);
    img.setAttribute("src", data.imageUrl);
    img.setAttribute("alt", data.altText);

    let name = document.querySelector("#title");
    name.innerHTML = data.name;

    let price = document.querySelector("#price");
    price.innerHTML = data.price;

    let description = document.querySelector("#description");
    description.innerHTML = data.description;

    //pour afficher toutes les couleurs de l'article
    for (let color of data.colors) {
      let option = document.createElement("option");
      option.setAttribute("value", color);
      option.innerHTML = color;
      colorSelect.appendChild(option);
      console.log(color);
    }
    function saveArticle() {
      colorSelect.addEventListener("click", choisircouleur);
      function choisircouleur() {
        let indexCouleur = colorSelect.options[colors.selectedIndex].value;
        console.log(indexCouleur);
        localStorage.setItem(
          "indexCouleur",
          colorSelect.options[colors.selectedIndex].value
        );
      }
      quantitySelect.addEventListener("click", choisirquantite);
      function choisirquantite() {
        let nbCanapes = quantitySelect.value;
        console.log(nbCanapes);
        localStorage.setItem("nbCanapes", quantitySelect.value);
      }
    }
  }
  saveArticle();
};

canapes();
// let color = localStorage.getItem("indexCouleur");
// let quantity = localStorage.getItem("indexCouleur");
// class article {
//   constructor(_id, color, quantity) {
//     this._id = _id;
//     this.color = color;
//     this.quantity = quantity;
//   }
// }
let article = "";
let lsPanier = [];
let lsArticle = "";

ajouteraupanier.addEventListener("click", ajout);
function ajout() {
  //   // lsPanier = localStorage.getItem("lsArticle");
  //   // localStorage.getItem("lsPanier", JSON.stringify(lsPanier));
  //   // lsPanier.push(lsArticle);

  article = {
    _id: localStorage.getItem("_id"),
    color: localStorage.getItem("indexCouleur"),
    quantity: localStorage.getItem("nbCanapes"),
  };
  console.log(article);
  let lsArticle = localStorage.setItem("article", JSON.stringify(article));
  lsArticle = localStorage.getItem("article");
  let lsPanier = localStorage.setItem("lsPanier", lsArticle);
  localStorage.getItem("lsPanier", JSON.stringify(lsPanier));
  lsPanier = localStorage.getItem("lsArticle");
  let panier = JSON.parse(localStorage.getItem(lsPanier)); //panier en format js
  console.log(panier);
}
ajout();

// let saveArticle = [];
// function saveProduit() {
//   let ls_id = localStorage.getItem("_id");
//   if (ls_id !== null) {
//     saveArticle.push((_id = localStorage.getItem("_id")));
//   }
//   let lsColor = localStorage.getItem("indexCouleur");
//   if (lsColor !== null)
//     saveArticle.push((color = localStorage.getItem("indexCouleur")));

//   let lsQuantity = localStorage.getItem("nbCanapes");
//   if (lsQuantity !== null) {
//     saveArticle.push((quantity = localStorage.getItem("nbCanapes")));
//   }
// }
// saveProduit();
// console.log(saveArticle);

// ajouteraupanier.addEventListener("click",function(envoyer)){

// }

// panier.push(idParams, color);

// const productById = data.find((element) => element._id === idParams); //trouve l'article dans le tableau en fonction de son Id
// quantite = data.quantity;
// let panier = document.querySelector("addToCart");
// console.log(quantite);

// if (color.article !== null && quantity.article !== null) {
// } else {
//   alert("Veuillez remplir le(s) champ(s)");
// }
