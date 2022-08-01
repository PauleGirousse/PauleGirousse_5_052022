//Récupération de l'url
let params = new URLSearchParams(window.location.search);
console.log(params);
//récupération de l'Id de l'article
let idParams = params.get("id");
console.log(idParams);
//conversion du panier Json en javascript
let ancienPanier = JSON.parse(localStorage.getItem("lsPanier"));

// localStorage.setItem("_id", idParams); //Ajouter dans le localstorage et convertir en format JSON
let api = `http://localhost:3000/api/products/`;
let idApi = api + idParams;
console.log(idApi);
let colorSelect = document.querySelector("#colors");
let quantitySelect = document.querySelector("#quantity");
let ajouteraupanier = document.querySelector("#addToCart");

//Recherche sur l'API de l'article complet grâce à son Id et affichage dynamique sur la page de l'image, du texte alternatif, du nom, du prix, de la description et des différentes options de couleurs.
const canapes = async function () {
  let response = await fetch(idApi); //appel reseau sur l'article de l'API
  if (response.ok) {
    //si la reponse est ok,convertion au format JSON
    let data = await response.json();
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

    //Affichage des différentes couleurs de l'article
    for (let color of data.colors) {
      let option = document.createElement("option");
      option.setAttribute("value", color);
      option.innerHTML = color;
      colorSelect.appendChild(option);
      console.log(color);
    }
  } else {
    console.error("erreur du serveur");
  }
};

canapes();

//Fonction de mise à jour du panier
//Ajout de l'article dans le panier, conversion du format javascript du panier en Json pour le mettre dans le localstorage, création d'une alertee pour spécifier à l'utilisateur que son article a été ajouté.
function miseAJourDuPanier() {
  localStorage.setItem("lsPanier", JSON.stringify(ancienPanier));
  console.log(ancienPanier);
  alert("Votre article a été ajouté au panier");
}

//********************************************************  Au clic sur le bouton "Ajouter au panier"  *******************************************//

ajouteraupanier.addEventListener("click", ajout);
function ajout() {
  //Création de l'objet article suivant l'Id, la couleur et la quantité sinon message d'alerte
  let article = {
    _id: idParams,
    color: colorSelect.options[colors.selectedIndex].value,
    //pour additionner, conversion de string en number
    quantity: parseInt(quantitySelect.value, 10),
  };
  if (article.quantity === 0 || article.color === "") {
    alert("Vous devez choisir une couleur et une quantité");
  } else {
    //********************************Si le panier contient déja des articles   ************//

    //recherche un produit identique dans le panier par son id et sa couleur
    if (ancienPanier) {
      let recherchearticleidentique = ancienPanier.find(
        (produit) =>
          produit._id === article._id && produit.color === article.color
      );

      //Au résultat de cette recherche, si aucun article identique n'est trouvé, ajout de l'article dans le panier et fonction miseAJourDuPanier
      if (recherchearticleidentique == undefined) {
        ancienPanier.push(article);
        miseAJourDuPanier();

        //si il existe un article identique dans le panier, ajout de la quantité de l'article à l'article identique et fonction miseAJourDuPanier
      } else {
        console.log(recherchearticleidentique.quantity);
        console.log(article.quantity);
        recherchearticleidentique.quantity += article.quantity;
        console.log(recherchearticleidentique.quantity);

        miseAJourDuPanier();
      }
    }
    // *****          Si le panier est vide    ********************//
    //Ajout de l'article dans le panier crée et fonction miseAJourDuPanier
    else {
      ancienPanier = [];
      ancienPanier.push(article);
      miseAJourDuPanier();
    }
  }
}
