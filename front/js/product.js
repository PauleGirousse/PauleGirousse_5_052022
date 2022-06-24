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
  }
};

canapes();

// let article = {};
// let lsPanier = [];
// let lsArticle = "";

// ajouteraupanier.addEventListener("click", ajout);
// function ajout() {
//   // lsPanier = localStorage.getItem("lsArticle");
//   // localStorage.getItem("lsPanier", JSON.stringify(lsPanier));
//   // lsPanier.push(lsArticle);

//   let ancienPanier = localStorage.getItem("lsPanier");

//   let canapes = JSON.parse(ancienPanier);

//   //Récupération par des valeurs de l'article
//   let article = {
//     _id: idParams,
//     color: colorSelect.options[colors.selectedIndex].value,
//     quantity: quantitySelect.value,
//   };
//   console.log(article);
//   let canapetrouve = false;
//   for (let canape of canapes) {
//     if (article._id == canape._id && article.color == canape.color) {
//       canape.quantity += article.quantity;
//       canapetrouve = true;
//     }
//   }
//   if (canapetrouve == false) {
//     canapes.push(article);
//   }
//   localStorage.setItem("lsPanier", JSON.stringify(canapes));
//   // lsPanier = localStorage.getItem("lsArticle");
//   // let panier = JSON.parse(localStorage.getItem(lsPanier)); //panier en format js
//   console.log(canapes);
// }

ajouteraupanier.addEventListener("click", ajout);
function ajout() {
  let ancienPanier = JSON.parse(localStorage.getItem("lsPanier")); //conversion du panier Json en javascript
  //Création de l'objet article
  let article = {
    _id: idParams,
    color: colorSelect.options[colors.selectedIndex].value,
    quantity: parseInt(quantitySelect.value, 10), //pour additionner, conversion de string en number
  };

  // Si le panier contient déja des articles
  if (ancienPanier) {
    let recherchearticleidentique = ancienPanier.find(
      //recherche un produit identique dans le panier par son id et sa couleur qui doit être identique à celle de l'article
      (produit) =>
        produit._id === article._id && produit.color === article.color
    );
    // console.log(recherchearticleidentique);
    if (recherchearticleidentique == undefined) {
      //si aucun article identique n'est trouvé, dépot de l'article dans le panier
      ancienPanier.push(article);
      localStorage.setItem("lsPanier", JSON.stringify(ancienPanier)); // conversion en JSON du panier mis à jour
      console.log(ancienPanier);
    } else {
      console.log(recherchearticleidentique.quantity); //si il existe un article identique dans le panier
      console.log(article.quantity);
      recherchearticleidentique.quantity += article.quantity; //ajout de la quantité de l'article à l'article identique
      console.log(recherchearticleidentique.quantity);
      localStorage.setItem("lsPanier", JSON.stringify(ancienPanier)); // conversion en JSON du panier mis à jour
    }
  }
  //Si le panier est vide
  else {
    ancienPanier = []; //création du panier
    ancienPanier.push(article); //dépot de l'article dans le panier
    localStorage.setItem("lsPanier", JSON.stringify(ancienPanier)); // conversion en JSON du panier mis à jour
    console.log(ancienPanier);
  }
  // for (article of ancienPanier) {
  //   if (article._id == )
  // };
}
