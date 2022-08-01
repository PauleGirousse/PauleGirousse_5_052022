let items = document.getElementById("cart__items");
let lsPanier = localStorage.getItem("lsPanier");
let panier = JSON.parse(lsPanier);

let panierFinal = [];
let canape = {};
let canapeFinal = {};
let nbCanape = [];
let article = {};
let products = [];

//Envoi du panier dans le localstorage
function upDateLsPanier() {
  localStorage.setItem("lsPanier", JSON.stringify(panier));
}

//Mise à jour de la quantité de l'article
function upDateQuantity(id, color, quantity) {
  let ancienPanier = JSON.parse(localStorage.getItem("lsPanier"));

  let article = {
    _id: id,
    color: color,
    quantity: quantity,
  };

  //Recherche un produit identique dans le panier par son id et sa couleur
  let recherchearticleidentique = ancienPanier.find(
    (produit) => produit._id === article._id && produit.color === article.color
  );
  //si il existe un article identique dans le panier
  console.log(recherchearticleidentique.quantity);
  console.log(article.quantity);
  //Ajout de la quantité de l'article à l'article identique
  recherchearticleidentique.quantity = article.quantity;
  console.log(recherchearticleidentique.quantity);

  console.log(panierFinal);

  localStorage.setItem("lsPanier", JSON.stringify(ancienPanier)); //conversion en JSON du panier mis à jour
}

//  Suppression d'un article du panier
function upDateItems(id, color) {
  // let ancienPanier = JSON.parse(localStorage.getItem("lsPanier")); // Conversion du panier Json en javascript

  let deleteArticle = {
    _id: id,
    color: color,
  };

  //Recherche un produit identique dans le panier par son id et sa couleur
  let recherchearticleidentique = panierFinal.find(
    (produit) =>
      produit._id === deleteArticle._id && produit.color === deleteArticle.color
  );

  //Le panier final est égal  à tout sauf l'article à retirer
  panierFinal = panierFinal.filter(
    (produit) => produit !== recherchearticleidentique
  );

  let rechercheLsArticleIdentique = panier.find(
    (produit) =>
      produit._id === deleteArticle._id && produit.color === deleteArticle.color
  );
  console.log(rechercheLsArticleIdentique);
  panier = panier.filter((produit) => produit !== rechercheLsArticleIdentique);
  console.log(panier);
  upDateLsPanier();
}

//*************************************Création/Mise à jour du panier   **************************************************//

//si le panier est vide
if (panier === null) {
  alert("le panier est vide");

  //si le panier n'est pas vide
} else {
  //Appel de l'API pour récupérer tous les attributs des canapés
  const promise = fetch("http://localhost:3000/api/products");
  promise.then((response) => {
    console.log(response);
    const canapes = response.json();
    canapes.then((data) => {
      for (canape of panier) {
        //Pour les canapes du panier, création  des différents articles suivant leur id et leur couleur
        article = document.createElement("article");
        article.classList.add("cart__item");

        article.setAttribute("data-id", canape._id);
        article.setAttribute("data-color", canape.color);

        //Boucle sur les canapés du panier pour rechercher le même id dans les canapés de l'API
        let rechercheProduitApi = data.find(
          (produit) => produit._id === canape._id
        );

        //Création de l'article combiné des attributs de l'API et du panier
        let canapeFinal = {
          _id: canape._id,
          imageUrl: rechercheProduitApi.imageUrl,
          altTxt: rechercheProduitApi.altTxt,
          name: rechercheProduitApi.name,
          color: canape.color,
          price: rechercheProduitApi.price,
          quantity: canape.quantity,
        };

        //Insertion dans le panier final des canapés complets
        panierFinal.push(canapeFinal);

        //Création de l'affichage dynamique du panier

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

        //Insertion dans le HTML
        items.appendChild(article);

        //*************************************************     Changer la quantité de l'objet canapé   ************************************//

        //Au clic sur l'input
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

        //***********************************************************************   Supprimer un article  *******************/

        //Au clic sur "Supprimer"
        deleteItem.addEventListener("click", removeItem);
        function removeItem() {
          let rowDeleteArticle = deleteItem.closest("article");

          console.log(rowDeleteArticle.dataset.id);
          console.log(rowDeleteArticle.dataset.color);

          upDateItems(
            rowDeleteArticle.dataset.id,
            rowDeleteArticle.dataset.color
          );
          rowDeleteArticle.remove();
          nbArticles();
          price();
          upDateLsPanier();
        }

        //Récupérer l'Id des articles dans un tableau
        function arrayProductId() {
          products = panier.map((item) => item._id);
        }
        arrayProductId();

        console.log(panier);

        //Affichage de la quantité des articles
        function nbArticles() {
          let totalNbCanapes = 0;
          let totalQuantity = document.querySelector("#totalQuantity");
          let quantityArray = panierFinal.map((item) => item.quantity);
          console.log(quantityArray);
          for (let i = 0; i < quantityArray.length; i++) {
            totalNbCanapes += quantityArray[i];

            totalQuantity.innerText = totalNbCanapes;
          }
        }
        nbArticles();

        //Affichage du prix total
        function price() {
          let priceArray = [];
          let total = 0;
          let totalPrice = document.querySelector("#totalPrice");

          panierFinal.forEach((canapeFinal) => {
            let canapePrice = canapeFinal.price * canapeFinal.quantity;

            priceArray.push(canapePrice);

            total += canapePrice;

            totalPrice.innerText = total.toFixed(2);
          });
        }
      }
      price();
    });
  });
}

//**************************************************   REGEX     ****************//

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
let address_v = /([0-9]*) ([a-zA-Zéèêëîïàç'\,\.\-\s]*)+/;
let city = document.querySelector("#city");
let city_m = document.querySelector("#cityErrorMsg");
let city_v = /^(([0-8][0-9])|(9[0-5]))[0-9]{3}([a-zA-Zéèëêïîàç,.-]*)/;
let email = document.querySelector("#email");
let email_m = document.querySelector("#emailErrorMsg");
let email_v = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}/;

let cart__order__form__question = document.querySelector(
  "cart__order__form__question"
);

//Validation du PRENOM

firstName.addEventListener("change", firstNameValidate);
function firstNameValidate() {
  function notValid(firstName, message) {
    firstName_m.innerText = message;
  }
  function isValid(firstName) {
    firstName_m.innerText = "";
  }
  if (firstName_v.test(firstName.value) === false) {
    notValid(firstName, "Veuillez entrer un Prénom");
    console.log("false");
  } else {
    isValid(firstName);
    console.log("true");
  }
}

//Validation du NOM

lastName.addEventListener("change", lastNameValidate);
function lastNameValidate() {
  function notValid(lastName, message) {
    lastName_m.innerText = message;
  }
  function isValid(lastName) {
    lastName_m.innerText = "";
  }

  if (lastName_v.test(lastName.value) === false) {
    notValid(lastName, "Veuillez entrer un Nom");
    console.log("false");
  } else {
    isValid(lastName);
    console.log("true");
  }
}

//Validation de l'ADRESSE

address.addEventListener("change", addressValidate);
function addressValidate() {
  function notValid(address, message) {
    address_m.innerText = message;
  }
  function isValid(address) {
    address_m.innerText = "";
  }

  if (address_v.test(address.value) === false) {
    notValid(address, "Veuillez entrer une adresse");
    console.log("false");
  } else {
    isValid(address);
    console.log("true");
  }
}

//Validation de la VILLE

city.addEventListener("change", cityValidate);
function cityValidate() {
  function notValid(city, message) {
    city_m.innerText = message;
  }
  function isValid(address) {
    city_m.innerText = "";
  }

  if (city_v.test(city.value) === false) {
    notValid(city, "Veuillez entrer le code postal et la ville");
    console.log("false");
  } else {
    isValid(city);
    console.log("true");
  }
}

//Validation de l'EMAIL

email.addEventListener("change", emailValidate);
function emailValidate() {
  function notValid(email, message) {
    email_m.innerText = message;
  }
  function isValid(email) {
    email_m.innerText = "";
  }

  if (email_v.test(email.value) === false) {
    notValid(email, "Veuillez entrer une adresse email");
    console.log("false");
  } else {
    isValid(email);
    console.log("true");
  }
}

//*********************************************************   Validation du formulaire et envoi dans le localstorage     ********************************//

//Au clic sur "Commander!"
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

  let jsonBody = {
    products,
    contact,
  };
  console.log(jsonBody);

  //******************************************************************      requete POST et retour de l'ID de commande     ******************************//

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

        location.href =
          "./confirmation.html?" + "orderId=" + retourOrder.orderId;
      } else {
        alert(`Erreur du serveur: ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  });
}

// //Récupération du panier depuis le localstorage et mise à jour du DOM
// function getLsPanier() {
//   let upDatePanier = JSON.parse(localStorage.getItem("lsPanier"));
//   console.log(upDatePanier);
// }
