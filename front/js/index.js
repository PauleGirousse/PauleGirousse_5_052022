//**************************************************     Récupération des données de l'API dans la page index.html    **********************************//

let items = document.getElementById("items"); //                                                                container de l'affichage produits dynamique

const promise = fetch("http://localhost:3000/api/products");
promise.then((response) => {
  console.log(response);
  const canapes = response.json();
  canapes
    .then((data) => {
      console.log(data);

      //**********************        Boucle sur chaque élément de l'API et création des balises HTML de façon dynamique        *************************//
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

        //****************************************     Ajout  des attributs et affichage sur la page Index*******************************************//
        newId = data[i]._id;
        // console.log(newId);
        // récupération de la photo
        newImage.setAttribute("src", data[i].imageUrl);
        //récupération du texte alternatif
        newImage.setAttribute("alt", data[i].altTxt);
        // Récupération du nom du produit
        newProductName.innerText = data[i].name;
        // Récupération de la description du produit
        newProductDescription.innerText = data[i].description;
        //Ajout de l'Id du produit dans l'URL lors du clic sur l'article
        newA.setAttribute("href", "./product.html?" + "id=" + newId);
        console.log(newA);
      }
    })

    .catch((erreur) => console.log(erreur));
});
