let items = document.getElementById("cart__items");
let lsPanier = localStorage.getItem("lsPanier");
let panier = JSON.parse(lsPanier);
console.log(panier);
let canape = {};
if (panier === null) {
  alert("le panier est vide");
} else {
  for (canape of panier) {
    console.log(canape);
    let article = document.createElement("article");
    article.classList.add("cart__item");
    article.innerHTML;
    article.setAttribute("data-id", canape._id);
    article.setAttribute("data-color", canape.color);

    let cart__item__img = document.querySelector("div");
    cart__item__img.classList.add("cart__item__img");
    cart__item__img.innerHTML;

    let img = document.createElement("img");
    // img.setAttribute("src", data.imageUrl);
    // img.setAttribute("alt", data.altText);
    img.innerHTML;
    cart__item__img.appendChild(img);

    let cart__item__content = document.createElement("div");
    cart__item__content.classList.add("cart__item__content");
    cart__item__content.innerHTML;
    article.appendChild(cart__item__content);

    let description = document.createElement("div");
    description.classList.add("cart__item__content__description");
    description.innerHTML;
    cart__item__content.appendChild(description);

    let nom = document.createElement("h2");
    nom.innerText = canape.name;
    description.appendChild(nom);
    let couleur = document.createElement("p");
    couleur.innerText = canape.color;
    description.appendChild(couleur);
    let prix = document.createElement("p");
    prix.innerText = canape.prix + "€";
    description.appendChild(prix);

    let cart__item__content__settings = document.createElement("div");
    cart__item__content__settings.classList.add(
      "cart__item__content__settings"
    );
    cart__item__content__settings.innerHTML;
    article.appendChild(cart__item__content__settings);

    let cart__item__content__settings__quantity = document.createElement("div");
    cart__item__content__settings__quantity.classList.add(
      "cart__item__content__settings__quantity"
    );
    cart__item__content__settings__quantity.innerHTML;
    cart__item__content__settings.appendChild(
      cart__item__content__settings__quantity
    );

    let quantite = document.createElement("p");
    quantite.innerText = "Qté :";
    cart__item__content__settings__quantity.appendChild(quantite);

    let input = document.createElement("input");
    input.classList.add("itemQuantity");
    input.setAttribute("type", "number");
    input.setAttribute("name", "itemQuantity");
    input.setAttribute("min", "1");
    input.setAttribute("max", "100");
    input.setAttribute("value", canape.quantity);
    input.innerHTML;
    cart__item__content__settings__quantity.appendChild(input);

    let cart__item__content__settings__delete = document.createElement("div");
    cart__item__content__settings__delete.classList.add(
      "cart__item__content__settings__delete"
    );
    cart__item__content__settings__delete.innerHTML;
    article.appendChild(cart__item__content__settings__delete);

    let supprimer = document.createElement("p");
    supprimer.classList.add("deleteItem");
    supprimer.innerText = "Supprimer";

    items.appendChild(article);
  }
}

const promise01 = fetch("http://localhost:3000/api/products");
promise01.then((response) => {
  console.log(response);
  const canapes = response.json();
  canapes.then((data) => {
    // console.log(data);
    for (canape of panier) {
      let rechercheProduitApi = data.find(
        (produit) => produit._id === canape._id
      );
      // console.log(rechercheProduitApi);
      let canapePanier = {
        _id: canape._id,
        imageUrl: rechercheProduitApi.imageUrl,
        altTxt: rechercheProduitApi.altTxt,
        name: rechercheProduitApi.name,
        color: canape.color,
        price: rechercheProduitApi.price,
        quantity: canape.quantity,
      };
      console.log(canapePanier);
    }
  });
});

// let totalArticles = document.createElement("totalQuantity");
// let totalPrix = document.createElement("totalPrice");

// let canape = panier.forEach((canape) => console.log(canape));

// const promise01 = fetch("http://localhost:3000/api/products");
// promise01.then((response) => {
//   console.log(response);
//   const canapes = response.json();
//   canapes.then((data) => {
//     console.log(data);
//   });

// const canapes = async function () {
//   let response = await fetch("http://localhost:3000/api/products"); // appel reseau sur l'API
//   if (response.ok) {
//     //     // si la reponse est ok
//     let data = await response.json(); // convertion au format JSON
//     console.log(data);
//     // let rechercheArticleApi = data.find(
//     //   (produit) => produit._id === article._id
//     // );
//     // console.log(rechercheArticleApi);
//   }
// };
