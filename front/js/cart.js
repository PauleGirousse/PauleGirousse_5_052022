let items = document.getElementById("cart__items");
let lsPanier = localStorage.getItem("lsPanier");
let panier = JSON.parse(lsPanier);
console.log(panier);
let article = {};
let panierFinal = [];
let canape = {};
let canapeFinal = {};
if (panier === null) {
  //si le panier est vide
  alert("le panier est vide");
} else {
  //si le panier n'est pas vide
  for (canape of panier) {
    //pour les canapes du panier, création  des différents articles suivant leur id et leur couleur
    article = document.createElement("article");
    article.classList.add("cart__item");
    article.innerHTML;
    article.setAttribute("data-id", canape._id);
    article.setAttribute("data-color", canape.color);
    // console.log(canape);
  }
  const promise01 = fetch("http://localhost:3000/api/products"); // appel de l'API pour récupérer tous les attributs des canapés
  promise01.then((response) => {
    console.log(response);
    const canapes = response.json();
    canapes.then((data) => {
      // console.log(data);
      for (canape of panier) {
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
        // console.log(canapeFinal);
        panierFinal.push(canapeFinal); // insertion dans le panier final des canapés combinés
        // console.log(panierFinal);

        let cart__item__img = document.createElement("div"); // Création de l'affichage dynamique du panier
        cart__item__img.classList.add("cart__item__img");
        cart__item__img.innerHTML;
        article.appendChild(cart__item__img);

        let img = document.createElement("img");
        img.setAttribute("src", canapeFinal.imageUrl);
        img.setAttribute("alt", canapeFinal.altTxt);
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
        cart__item__content__settings.innerHTML;
        cart__item__content.appendChild(cart__item__content__settings);

        let cart__item__content__settings__quantity =
          document.createElement("div");
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
        input.setAttribute("value", canapeFinal.quantity);
        input.innerHTML;
        cart__item__content__settings__quantity.appendChild(input);

        let cart__item__content__settings__delete =
          document.createElement("div");
        cart__item__content__settings__delete.classList.add(
          "cart__item__content__settings__delete"
        );
        cart__item__content__settings__delete.innerHTML;
        cart__item__content__settings.appendChild(
          cart__item__content__settings__delete
        );

        let supprimer = document.createElement("p");
        supprimer.classList.add("deleteItem");
        supprimer.innerText = "Supprimer";
        cart__item__content__settings__delete.appendChild(supprimer);

        items.appendChild(article); //insertion dans le HTML

        // input.addEventListener("change", newQuantity);
        input.addEventListener("change", newQuantity);
        function newQuantity() {
          canape.quantity = this.value;
          console.log(canape.quantity);
          console.log(canapeFinal._id);

          // panierFinal.removeItem(canape.quantity, this.value);
          // console.log(panierFinal.canapeFinal.quantity);
          // .JSON.stringify(lsPanier);
        }
        //supprime l'objet dans le tableau
        supprimer.addEventListener("click", enlever);
        function enlever() {
          let articlearetirer = canape._id;
          console.log(articlearetirer);
          panierFinal = panierFinal.filter(
            //le panier final est égal  à l'inverse du produit à retirer filtré
            (produit) => produit._id !== articlearetirer
          );
          console.log(panierFinal);

          localStorage.setItem("lsPanier", JSON.stringify(panierFinal)); //envoi du nouveau panier dans le localstorage
          // let articlearetirer_id = canapeFinal._id;
          // let articlearetirercolor = canape.color;
          // console.log(articlearetirer_id);
          // console.log(articlearetirercolor);
          // produit._id &&
          // produit.color !== articlearetirer_id &&
          // articlearetirercolor
        }
      }
    });
  });
}

// let totalArticles = document.createElement("totalQuantity");
// let totalPrix = document.createElement("totalPrice");
