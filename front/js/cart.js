let items = document.getElementById("cart__items");
let lsPanier = localStorage.getItem("lsPanier");
let panier = JSON.parse(lsPanier);
console.log(panier);
let article = {};
let panierFinal = [];
let canape = {};
let canapeFinal = {};
// let nbCanape = [];
// Pour forcer le rechargement de la page
function rechargement() {
  location.reload();
}

// recupere le panier depuis le localstorage et met à jour le dom
function MAJpanierFinal() {
  let MAJpanierFinal = JSON.parse(localStorage.getItem("lsPanier"));
  console.log(MAJpanierFinal);
}

if (panier === null) {
  //si le panier est vide
  alert("le panier est vide");
} else {
  //si le panier n'est pas vide
  const promise01 = fetch("http://localhost:3000/api/products"); // appel de l'API pour récupérer tous les attributs des canapés
  promise01.then((response) => {
    console.log(response);
    const canapes = response.json();
    canapes.then((data) => {
      // console.log(data);
      for (canape of panier) {
        //pour les canapes du panier, création  des différents articles suivant leur id et leur couleur
        article = document.createElement("article");
        article.classList.add("cart__item");

        article.setAttribute("data-id", canape._id);
        article.setAttribute("data-color", canape.color);
        console.log(canape);

        // boucle sur les canapés du panier pour rechercher le même id dans les canapés de l'API
        let rechercheProduitApi = data.find(
          (produit) => produit._id === canape._id
        );
        // console.log(rechercheProduitApi);

        //création de l'article combiné des attributs de l'API et du panier
        let canapeFinal = {
          _id: canape._id,
          imageUrl: rechercheProduitApi.imageUrl,
          altTxt: rechercheProduitApi.altTxt,
          name: rechercheProduitApi.name,
          color: canape.color,
          price: rechercheProduitApi.price,
          quantity: canape.quantity,
        };
        // insertion dans le panier final des canapés combinés
        panierFinal.push(canapeFinal);
        // Création de l'affichage dynamique du panier
        let cart__item__img = document.createElement("div");
        cart__item__img.classList.add("cart__item__img");

        article.appendChild(cart__item__img);

        let img = document.createElement("img");
        img.setAttribute("src", canapeFinal.imageUrl);
        img.setAttribute("alt", canapeFinal.altTxt);

        cart__item__img.appendChild(img);

        let cart__item__content = document.createElement("div");
        cart__item__content.classList.add("cart__item__content");

        article.appendChild(cart__item__content);

        let description = document.createElement("div");
        description.classList.add("cart__item__content__description");

        cart__item__content.appendChild(description);

        let nom = document.createElement("h2");
        nom.innerText = canapeFinal.name;
        description.appendChild(nom);
        let couleur = document.createElement("p");
        couleur.innerText = canapeFinal.color;
        description.appendChild(couleur);
        let prix = document.createElement("p");
        prix.innerText = canapeFinal.price + " " + "€";
        description.appendChild(prix);

        let cart__item__content__settings = document.createElement("div");
        cart__item__content__settings.classList.add(
          "cart__item__content__settings"
        );

        cart__item__content.appendChild(cart__item__content__settings);

        let cart__item__content__settings__quantity =
          document.createElement("div");
        cart__item__content__settings__quantity.classList.add(
          "cart__item__content__settings__quantity"
        );

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
        input.setAttribute("value", canapeFinal.quantity);

        cart__item__content__settings__quantity.appendChild(input);

        let cart__item__content__settings__delete =
          document.createElement("div");
        cart__item__content__settings__delete.classList.add(
          "cart__item__content__settings__delete"
        );

        cart__item__content__settings.appendChild(
          cart__item__content__settings__delete
        );

        let deleteItem = document.createElement("p");
        deleteItem.classList.add("deleteItem");
        deleteItem.innerText = "Supprimer";
        cart__item__content__settings__delete.appendChild(deleteItem);
        //insertion dans le HTML
        items.appendChild(article);

        // Changer la quantité de canapés
        input.addEventListener("change", changeQuantity);
        function changeQuantity() {
          canapeFinal.quantity = parseInt(this.value);

          console.log(canapeFinal.quantity);
          console.log(canapeFinal);
          //dans le DOM
          let inp = document.querySelector("input");
          let rangArticle = inp.closest("article");
          console.log(rangArticle);
          rangArticle.dataset.quantity = canapeFinal.quantity;
          //dans le localstorage
          canape.quantity = canapeFinal.quantity;
          console.log(panier);
          localStorage.setItem("lsPanier", JSON.stringify(panier));
          // let item = document.querySelector("cart_item");
          // console.log(item.$(data.id));
          // item.dataset.quantity.value = canapeFinal.quantity;
          // console.log(item.dataset.quantity.value);
          // localStorage.setItem("lsPanier", JSON.stringify(panierFinal)); //envoi du nouveau panier dans le localstorage
          // MAJpanierFinal();
        }
      }
    });
  });
}

let totalQuantity = document.querySelector("#totalQuantity");
let totalPrice = document.querySelector("totalPrice");
// console.log(totalPrice);
let prixCanapes = 0;
let totalNbCanapes = 0;

const quantityArray = panierFinal.map((item) => item.quantity);

console.log(quantityArray);

for (let i = 0; i < quantityArray.length; i++) {
  totalNbCanapes += quantityArray[i];
}
console.log(totalNbCanapes);
totalQuantity.innerText = totalNbCanapes;
localStorage.setItem("lsTotalQuantity", JSON.stringify(totalNbCanapes));

let canapePrice = canapeFinal.price * canapeFinal.quantity;
console.log(typeof canapePrice);

let PriceArray = [];
PriceArray.push(canapePrice);
console.log(PriceArray);

//   let nbCanape = parseInt(canapeFinal.quantity);
//   totalNbCanapes += nbCanape;
//   // console.log(totalNbCanapes);
//   localStorage.setItem("lsTotalQuantity", JSON.stringify(totalNbCanapes));
//   totalQuantity.innerText = totalNbCanapes;

//   prixCanapes += canapePrice;
//   console.log(prixCanapes);
//   localStorage.setItem("lsTotalPrice", JSON.stringify(prixCanapes));
// }
// totalPrice.innerText = prixCanapes;

// console.log(prixTotalcanape);

// console.log(totalPrice);
// canapeFinal.price = parseInt(canapeFinal.price, 10); //pour additionner, conversion de string en number

// totalPrice.innerText;

// debugger;
//supprime l'article dans le panier

// let supprimer = document.querySelector("deleteItem");
// console.log(supprimer);
// supprimer.addEventListener("click", supprimerarticle);
// function supprimerarticle() {
//   //   let rangArticle = supprimer.closest("article");
//   //   console.log(rangArticle);
//   //   let articlearetirer =
//   //     rangArticle.canape._id && rangArticle.canape.color; //sélectionné par son Id et sa couleur
//   //   console.log(articlearetirer);
// }

// supprimerarticle();
// panierFinal = panierFinal.filter(
//   //le panier final est égal  à tout sauf l'article à retirer
//   (produit) => produit._id && produit.color !== articlearetirer
// );
// panierFinal = panierFinal.filter(
//   //le panier final est égal  à tout sauf l'article à retirer
//   (produit) => produit._id && produit.color !== articleaenlever
// );
// console.log(panierFinal);
// // rechargement(); //mettre à jour la page panier
// localStorage.setItem("lsPanier", JSON.stringify(panierFinal)); //envoi du nouveau panier dans le localstorage
// MAJpanierFinal();
// rechargement();
// panierFinal = JSON.parse(localStorage.getItem("lsPanier", panierFinal));

// panierFinal = JSON.parse(localStorage.setItem("lsPanier", panierFinal));
