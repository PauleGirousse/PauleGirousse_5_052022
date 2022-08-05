//********     Récupération des données de l'API dans la page index.html  *******//

let items = document.getElementById("items");

const promise = fetch("http://localhost:3000/api/products");
promise.then((response) => {
  const canapes = response.json();
  canapes
    .then((data) => {
      //****   Boucle sur chaque élément de l'API et création des balises HTML de façon dynamique  ***//
      for (i = 0; i < data.length; i++) {
        const newA = document.createElement("a");
        let newArticle = document.createElement("article");
        let newImage = document.createElement("img");
        let newProductName = document.createElement("h3");
        let newProductDescription = document.createElement("p");
        let newId = document.createElement("_id");

        newArticle.appendChild(newImage);
        newArticle.appendChild(newProductName);
        newArticle.appendChild(newProductDescription);
        newA.appendChild(newArticle);
        items.appendChild(newA);

        newId = data[i]._id;

        //*******  Ajout  des attributs et affichage sur la page Index   ******//

        // Récupération de la photo
        newImage.setAttribute("src", data[i].imageUrl);
        // Récupération du texte alternatif
        newImage.setAttribute("alt", data[i].altTxt);
        // Récupération du nom du produit
        newProductName.innerText = data[i].name;
        // Ajout d'une classe au h3
        newProductName.classList.add("productName");
        // Récupération de la description du produit
        newProductDescription.innerText = data[i].description;
        // Ajout d'une classe au paragraphe
        newProductDescription.classList.add("productDescription");
        // Ajout de l'Id du produit dans l'URL lors du clic sur l'article
        newA.setAttribute("href", "./product.html?" + "id=" + newId);
      }
    })

    .catch((erreur) => alert(`Erreur du serveur: ${response.status}`));
});
