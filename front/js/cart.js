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

  //*********************************************     Création de l'objet article   **********************************************//
  let article = {
    _id: id,
    color: color,
    quantity: quantity,
  };

  //****************************************************     recherche un produit identique dans le panier par son id et sa couleur   ***********//
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

  //**********************************************  recherche un produit identique dans le panier par son id et sa couleur ***********************//

  let recherchearticleidentique = panierFinal.find(
    (produit) =>
      produit._id === deleteArticle._id && produit.color === deleteArticle.color
  );

  //******************************************************    le panier final est égal  à tout sauf l'article à retirer**************//
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
  updateLsPanier();
  location.reload();
}
//******************************************************    récupère le panier depuis le localstorage et met à jour le dom  *************//
function getLsPanier() {
  let updatepanier = JSON.parse(localStorage.getItem("lsPanier"));
}

//***********************************************************    envoi du panier dans le localstorage *******************************//
function updateLsPanier() {
  let updateLsPanier = localStorage.setItem("lsPanier", JSON.stringify(panier));
}

if (panier === null) {
  //***************************************   si le panier est vide
  alert("le panier est vide");
} else {
  //**************************************    si le panier n'est pas vide
  const promise01 = fetch("http://localhost:3000/api/products"); // appel de l'API pour récupérer tous les attributs des canapés
  promise01.then((response) => {
    console.log(response);
    const canapes = response.json();
    canapes.then((data) => {
      for (canape of panier) {
        //**************************************    pour les canapes du panier, création  des différents articles suivant leur id et leur couleur
        article = document.createElement("article");
        article.classList.add("cart__item");

        article.setAttribute("data-id", canape._id);
        article.setAttribute("data-color", canape.color);

        // ******************************************   boucle sur les canapés du panier pour rechercher le même id dans les canapés de l'API
        let rechercheProduitApi = data.find(
          (produit) => produit._id === canape._id
        );

        //***************************************     création de l'article combiné des attributs de l'API et du panier  ********************//
        let canapeFinal = {
          _id: canape._id,
          imageUrl: rechercheProduitApi.imageUrl,
          altTxt: rechercheProduitApi.altTxt,
          name: rechercheProduitApi.name,
          color: canape.color,
          price: rechercheProduitApi.price,
          quantity: canape.quantity,
        };
        //**************************************************    insertion dans le panier final des canapés complets *********************//
        panierFinal.push(canapeFinal);

        //*************************************************      Création de l'affichage dynamique du panier    *************************//
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

        //*******************************************************   insertion dans le HTML  ********************************************//
        items.appendChild(article);

        //***********************************************   Changer la quantité de l'objet canapé   ************************************//

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

        //*******************************************************     Récupérer l'Id des articles dans un tableau   **********************//

        function creationtableauproductId() {
          products = panier.map((item) => item._id);
        }
        creationtableauproductId();

        console.log(panier);

        //********************************************************    Affichage de la quantité des articles   ***************************//
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

        //******************************************************   Affichage du prix total   *****************************************//

        function price() {
          let canapePrice = 0;
          let priceArray = [];
          let total = 0;
          let totalPrice = document.querySelector("#totalPrice");

          panierFinal.forEach((canapeFinal) => {
            canapePrice = canapeFinal.price * canapeFinal.quantity;

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
//***************************************************************    REGEX     **************************************//
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
let city_v = /^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$/;
let email = document.querySelector("#email");
let email_m = document.querySelector("#emailErrorMsg");
let email_v = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}/;

let cart__order__form__question = document.querySelector(
  "cart__order__form__question"
);

//******************************************************************   Validation du PRENOM   *************************************//

firstName.addEventListener("change", firstNameValidate);
function firstNameValidate() {
  function notValid(firstName, message) {
    firstName_m.innerText = message;
  }
  function isValid(firstName) {
    firstName_m.innerText = "";
  }
  // if ((firstName.value = "")) {
  //   firstName.placeholder = "Jean";
  if (firstName_v.test(firstName.value) === false) {
    notValid(firstName, "Veuillez entrer un Prénom");
    console.log("false");
  } else {
    isValid(firstName);
    console.log("true");
  }
}

//********************************************************   Validation du NOM    **************************************************//
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
//***************************************************Validation de l'ADRESSE ****************************************//
address.addEventListener("change", adressValidate);
function adressValidate() {
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
//***************************************************Validation de la VILLE *******************************************//
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
//*********************************************Validation de l'EMAIL*********************************************//
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

//*********************************************************Validation du formulaire et envoi dans le localstorage********************************//
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

  if (
    firstName_v.test(firstName) &&
    lastName_v.test(lastName) &&
    address_v.test(address) &&
    city_v.test(city_v) &&
    email_v.test(email_v)
  ) {
    lsContact = localStorage.setItem("lsContact", JSON.stringify(contact));
    contact = JSON.parse(localStorage.getItem("lsContact"));
  }
  let jsonBody = {
    products,
    contact,
  };
  console.log(jsonBody);

  // if (firstName_v.test(firstName.value) === false) {
  //   firstName_m.innerText = error;
  //   console.log(firstName_m);
  // } else if (lastName_v.test(lastName.value) === false) {
  //   lastName_m.innerText = error;
  //   console.log(lastName_m);
  // } else if (address_v.test(address.value) === false) {
  //   address_m.innerText = error;
  //   console.log(address_m);
  // } else if (city_v.test(city.value) === false) {
  //   city_m.innerText = error;
  //   console.log(city_m);
  // } else if (email_v.test(email.value) === false) {
  //   email_m.innerText = error;
  //   console.log(email_m);
  // } else if (firstName && lastName && address && city && email !== false) {
  //   lsContact = localStorage.setItem("lsContact", JSON.stringify(contact));
  //   contact = JSON.parse(localStorage.getItem("lsContact"));
  //   let jsonBody = {
  //     products,
  //     contact,
  //   };
  //   console.log(jsonBody);
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
  //************************************************    envoi du tableau des ID dans le localstorage *******************************//
  function upDateProduct_ID() {
    products = localStorage.setItem("lsProduct_Id", JSON.stringify(products));
  }
  upDateProduct_ID();
}
