//Récupération de l'url
let params = new URLSearchParams(window.location.search);
//récupération de l'Id de l'article
let idParams = params.get("id");
//conversion du panier Json en javascript
let ancienPanier = JSON.parse(localStorage.getItem("lsPanier"));
let api = `http://localhost:3000/api/products/`;
let idApi = api + idParams;

let colorSelect = document.querySelector("#colors");
let quantitySelect = document.querySelector("#quantity");
let ajouteraupanier = document.querySelector("#addToCart");

//Recherche sur l'API de l'article complet grâce à son Id et affichage dynamique sur la page de l'image, du texte alternatif, du nom, du prix, de la description et des différentes options de couleurs.
const canapes = async function () {
  let response = await fetch(idApi); //appel reseau sur l'article de l'API
  if (response.ok) {
    //si la reponse est ok,convertion au format JSON
    let data = await response.json();
    let item__img = document.querySelector(".item__img");
    let img = document.createElement("img");
    item__img.appendChild(img);
    img.setAttribute("src", data.imageUrl);
    img.setAttribute("alt", data.altTxt);

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
    }
  } else {
    alert(`Erreur du serveur: ${response.status}`);
  }
};

canapes();

//Fonction de mise à jour du panier
//Ajout de l'article dans le panier, conversion du format javascript du panier en Json pour le mettre dans le localstorage, création d'une alerte pour spécifier à l'utilisateur que son article a été ajouté.
// Un autre message d'alerte lui permet de continuer ses achats en étant redirigé vers la page d'accueil sinon il est envoyé sur la page panier afin de valider sa commande.
function miseAJourDuPanier() {
  localStorage.setItem("lsPanier", JSON.stringify(ancienPanier));
  alert("Votre article a été ajouté au panier");
  if (confirm("Voulez-vous ajouter un autre article ?")) {
    location.href = "./index.html";
  } else {
    location.href = "./cart.html";
  }
}

//**************Au clic sur le bouton "Ajouter au panier"  *******************//

ajouteraupanier.addEventListener("click", ajout);
function ajout() {
  // Création de l'objet article suivant l'Id, la couleur et la quantité sinon message d'alerte
  let article = {
    _id: idParams,
    color: colorSelect.options[colors.selectedIndex].value,
    //pour additionner, conversion de string en number
    quantity: parseInt(quantitySelect.value, 10),
  };
  if (
    article.quantity === 0 ||
    article.quantity > 100 ||
    article.color === ""
  ) {
    alert("Vous devez choisir une couleur et une quantité valides");
  } else {
    //****************  Si le panier contient déja des articles   ************//

    // Recherche un produit identique dans le panier par son id et sa couleur
    if (ancienPanier) {
      let recherchearticleidentique = ancienPanier.find(
        (produit) =>
          produit._id === article._id && produit.color === article.color
      );

      // Au résultat de cette recherche, si aucun article identique n'est trouvé, ajout de l'article dans le panier et fonction miseAJourDuPanier
      if (recherchearticleidentique == undefined) {
        ancienPanier.push(article);
        miseAJourDuPanier();

        // Si il existe un article identique dans le panier, ajout de la quantité de l'article à l'article identique et fonction miseAJourDuPanier
      } else {
        recherchearticleidentique.quantity += article.quantity;
        miseAJourDuPanier();
      }
    }
    // *****          Si le panier est vide    ********************//
    // Ajout de l'article dans le panier crée et fonction miseAJourDuPanier
    else {
      ancienPanier = [];
      ancienPanier.push(article);
      miseAJourDuPanier();
    }
  }
}
