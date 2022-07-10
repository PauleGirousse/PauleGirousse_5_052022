let items = document.getElementById("cart__items");
let lsPanier = localStorage.getItem("lsPanier");
let panier = JSON.parse(lsPanier);

let panierFinal = [];
let canape = {};
let canapeFinal = {};
let nbCanape = [];
let article = {};
let products = [];

function upDateQuantity(id, color, quantity) {
  let ancienPanier = JSON.parse(localStorage.getItem("lsPanier")); //conversion du panier Json en javascript

  //Création de l'objet article
  let article = {
    _id: id,
    color: color,
    quantity: quantity,
  };

  //recherche un produit identique dans le panier par son id et sa couleur qui doit être identique à celle de l'article
  let recherchearticleidentique = ancienPanier.find(
    (produit) => produit._id === article._id && produit.color === article.color
  );

  console.log(recherchearticleidentique.quantity); //si il existe un article identique dans le panier
  console.log(article.quantity);
  recherchearticleidentique.quantity = article.quantity; //ajout de la quantité de l'article à l'article identique
  console.log(recherchearticleidentique.quantity);

  console.log(panierFinal);
  localStorage.setItem("lsPanier", JSON.stringify(ancienPanier)); // conversion en JSON du panier mis à jour
}
function upDateItems(id, color) {
  let ancienPanier = JSON.parse(localStorage.getItem("lsPanier")); //conversion du panier Json en javascript

  let deleteArticle = {
    _id: id,
    color: color,
  };
  // console.log(deleteArticle);
  // console.log(panier);
  //recherche un produit identique dans le panier par son id et sa couleur qui doit être identique à celle de l'article
  let recherchearticleidentique = panierFinal.find(
    (produit) =>
      produit._id === deleteArticle._id && produit.color === deleteArticle.color
  );
  // console.log(recherchearticleidentique);
  //le panier final est égal  à tout sauf l'article à retirer
  panierFinal = panierFinal.filter(
    (produit) => produit !== recherchearticleidentique
  );
  // console.log(panierFinal);

  let rechercheLsArticleIdentique = panier.find(
    (produit) =>
      produit._id === deleteArticle._id && produit.color === deleteArticle.color
  );
  console.log(rechercheLsArticleIdentique);
  panier = panier.filter((produit) => produit !== rechercheLsArticleIdentique);
  console.log(panier);
  updateLsPanier();
  location.reload();
}
// récupère le panier depuis le localstorage et met à jour le dom
function getLsPanier() {
  let updatepanier = JSON.parse(localStorage.getItem("lsPanier"));
}

// envoi du panier dans le localstorage
function updateLsPanier() {
  let updateLsPanier = localStorage.setItem("lsPanier", JSON.stringify(panier));
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
    canapes.then(
      (data) => {
        // console.log(data);
        for (canape of panier) {
          //pour les canapes du panier, création  des différents articles suivant leur id et leur couleur
          article = document.createElement("article");
          article.classList.add("cart__item");

          article.setAttribute("data-id", canape._id);
          article.setAttribute("data-color", canape.color);
          // console.log(canape);

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
          // insertion dans le panier final des canapés complets
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

          // Changer la quantité de l'objet canapé

          input.addEventListener("change", changeQuantity);
          function changeQuantity() {
            let rowArticle = input.closest("article");

            console.log(rowArticle.dataset.id);
            upDateQuantity(
              rowArticle.dataset.id,
              rowArticle.dataset.color,
              parseInt(this.value)
            );
            canapeFinal.quantity = parseInt(this.value);
            nbArticles();
            price();
          }

          deleteItem.addEventListener("click", removeItem);
          function removeItem() {
            let rowDeleteArticle = deleteItem.closest("article");

            console.log(rowDeleteArticle.dataset.id);
            console.log(rowDeleteArticle.dataset.color);

            upDateItems(
              rowDeleteArticle.dataset.id,
              rowDeleteArticle.dataset.color
            );
            nbArticles();
          }
          price();

          // Récupérer l'Id des articles dans un tableau

          function creationtableauproductId() {
            products = panier.map((item) => item._id);
          }
          creationtableauproductId();

          console.log(panier);

          //Affichage de la quantité des articles
          function nbArticles() {
            let totalNbCanapes = 0;
            let totalQuantity = document.querySelector("#totalQuantity");
            let quantityArray = panierFinal.map((item) => item.quantity);
            console.log(quantityArray);
            for (let i = 0; i < quantityArray.length; i++) {
              totalNbCanapes += quantityArray[i];
              // console.log(totalNbCanapes);
              totalQuantity.innerText = totalNbCanapes;
              // localStorage.setItem(
              //   "lsTotalQuantity",
              //   JSON.stringify(totalNbCanapes)
              // );
            }
          }
          nbArticles();

          // Affichage du prix total

          function price() {
            let canapePrice = 0;
            let priceArray = [];
            let total = 0;
            let totalPrice = document.querySelector("#totalPrice");

            panierFinal.forEach((canapeFinal) => {
              canapePrice = canapeFinal.price * canapeFinal.quantity;

              priceArray.push(canapePrice);
              // console.log(priceArray);
              total += canapePrice;
              // console.log(total);
              totalPrice.innerText = total.toFixed(2);
              // localStorage.setItem("lsTotalPrice", JSON.stringify(total));
            });
          }
        }
        price();
      }
      // });
    );
  });
}

let order = document.querySelector("#order");
let lsContact = {};
let domFormulaire = {};
let error = "Format incorrect";
let firstName = document.querySelector("#firstName");

let firstName_m = document.querySelector("#firstNameErrorMsg");

let firstName_v = /^[a-zA-Zéèïî][a-zéèàçïî]+([-'\s][a-zA-Zéèîï][a-zéèêàçîï]+)?/;
let lastName = document.querySelector("#lastName");
let lastName_m = document.querySelector("#lastNameErrorMsg");
let lastName_v = /^[a-zA-Zéèîï]+([[a-zA-Zéèëêïîàç]+)/;
let address = document.querySelector("#address");
let address_m = document.querySelector("#addressErrorMsg");
let address_v = /^([0-9]*) ?([a-zA-Z,\. ]*) ?([a-zA-Z]*)/;
let city = document.querySelector("#city");
let city_m = document.querySelector("#cityErrorMsg");
let city_v = /^[0-9]{5}/;
let email = document.querySelector("#email");
let email_m = document.querySelector("#emailErrorMsg");
let email_v = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}/;

// let orderId = {
//   orderId: panier.map((item) => item._id),
// };
// products = [orderId];

// console.log(products);

// // tab_Id();
// getLsPanier();

order.addEventListener("click", valid);
function valid(e) {
  e.preventDefault();
  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };
  if (firstName_v.test(firstName.value) === false) {
    firstName_m.innerText = error;
    console.log(firstName_m);
  } else if (lastName_v.test(lastName.value) === false) {
    lastName_m.innerText = error;
    console.log(lastName_m);
  } else if (address_v.test(address.value) === false) {
    address_m.innerText = error;
    console.log(address_m);
  } else if (city_v.test(city.value) === false) {
    city_m.innerText = error;
    console.log(city_m);
  } else if (email_v.test(email.value) === false) {
    email_m.innerText = error;
    console.log(email_m);
  } else {
    lsContact = localStorage.setItem("lsContact", JSON.stringify(contact));
    contact = JSON.parse(localStorage.getItem("lsContact"));
    let jsonBody = {
      products,
      contact,
    };
    console.log(jsonBody);

    let promise = fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(jsonBody),
    });
    let orderId = {};
    promise.then(async (response) => {
      try {
        const retourOrder = await response.json();
        console.log(retourOrder);
        if (response.ok) {
          console.log(`resultat de response.ok: ${response.ok}`);
          console.log(retourOrder.orderId);
          function changepage() {
            location.href = "./confirmation.html";
          }
          changepage();
        } else {
          alert(`Erreur du serveur: ${response.status}`);
        }
      } catch (e) {
        console.log(e);
      }
    });
    // envoi du tableau des ID dans le localstorage
    // function upDateProduct_ID() {
    //   products = localStorage.setItem("lsProduct_Id", JSON.stringify(products));
    // }
    // upDateProduct_ID();
  }
}

// supprimerarticle();
// panierFinal = panierFinal.filter(
//   //le panier final est égal  à tout sauf l'article à retirer
//   (produit) => produit._id && produit.color !== articlearetirer
// );

// console.log(panierFinal);
///mettre à jour la page panier
// localStorage.setItem("lsPanier", JSON.stringify(panierFinal)); //envoi du nouveau panier dans le localstorage
// MAJpanierFinal();
// rechargement();
// panierFinal = JSON.parse(localStorage.getItem("lsPanier", panierFinal));

// localStorage.setItem("lsPanier", JSON.stringify(panier));
// console.log(item.dataset.quantity.value);
// localStorage.setItem("lsPanier", JSON.stringify(panierFinal)); //envoi du nouveau panier dans le localstorage
// MAJpanierFinal();

// for (canapeFinal of panierFinal) {
//   console.log(panierFinal);
// let canapePrice = canapeFinal.price * canapeFinal.quantity;
// console.log(canapePrice);

// /^[a-zA-Z0-9]+([a-zA-Z0-9éèêëîïàç,.°-]+)/;

// item.dataset.quantity.value = canapeFinal.quantity;
// ajouteraupanier.addEventListener("click", ajout);

// canape.quantity = canapeFinal.quantity;
// console.log(canape.quantity);
// console.log(panier);
// updateLsPanier();
// function changeQuantity() {
//   let rangArticle = inp.closest("article");
//   console.log(rangArticle);
// e.target._id = canape._id;
// e.target.color = canape.color;
// canape.quantity = parseInt(this.value);
// console.log(canape);

//   canape.quantity = canapeFinal.quantity;

//   totalNbCanapes += nbCanape;
//   console.log(totalNbCanapes);
//   localStorage.setItem(
//     "lsTotalQuantity",
//     JSON.stringify(totalNbCanapes)
//   );
//   totalQuantity.innerText = totalNbCanapes;

//supprime l'article dans le panier
// console.log(supprimer);
// function supprimerarticle() {
//   //   console.log(rangArticle);
//   //   let articlearetirer =
//   //     rangArticle.canape._id && rangArticle.canape.color; //sélectionné par son Id et sa couleur
//   //   console.log(articlearetirer);
// }
// updateLsPanier();
