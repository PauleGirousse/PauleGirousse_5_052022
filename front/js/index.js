console.log("bonjour");

//**************************************************     Récupération des données de l'API dans la page index.html    **********************************//

let items = document.getElementById("items"); //                                                                container de l'affichage produits dynamique

const promise01 = fetch("http://localhost:3000/api/products");
promise01.then((response) => {
  console.log(response);
  const canapes = response.json();
  canapes
    .then((data) => {
      console.log(data);

      //******************************************         Création de la boucle et de ces balises pour chaque élément         *************************//
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

        //****************************************     Modification des attributs et affichage sur la page avec l'incrémentation   *********************//
        newId = data[i]._id;
        console.log(newId);
        newImage.setAttribute("src", data[i].imageUrl); //                                                                         récupération de la photo
        newImage.setAttribute("alt", data[i].altTxt); //                                                                   récupération du texte alternatif
        newProductName.innerText = data[i].name; //                                                                          récupération du nom du produit
        // newA.setAttribute("href", "./product.html?");
        newA.setAttribute("href", "./product.html?" + "_id=" + newId);
        newProductDescription.innerText = data[i].description; //                                                 récupération de la description du produit
        console.log(newA);

        // items.appendChild(newA).appendChild(newArticle);

        // let newUrl = newA + "_id=" + newId; //ajout de la clé Id et de l'id du produit à l'ancre

        // let newUrl = new URLSearchParams(newA.search);
        // newUrl.toString("_id=", newId);
        // console.log(newUrl);
      }
    })

    .catch((erreur) => console.log(erreur));
});

// const canapes = async function () {
//   let response = await fetch("http://localhost:3000/api/products"); // appel reseau sur l'API
//   if (response.ok) {
//     // si la reponse est ok
//     let data = await response.json(); // convertion au format JSON
//     console.log(data);
//     const template = document.querySelector("#templatecanape"); // création du template d'un article
//     let items = document.querySelector("#items"); // création de la variable pour l'emplacement des données
//     for (const canape of data) {
//       // boucle sur l'incrémentation
//       const templateClone = document.importNode(template.content, true);

//       // const id = templateClone.querySelector("_id");

//       const img = templateClone.querySelector("img"); //dans la variable img, modification de l'attribut src et alt en fonction du canapé
//       img.setAttribute("src", canape.imageUrl);
//       img.setAttribute("alt", canape.altText);

//       const name = templateClone.querySelector(".productName");
//       name.innerHTML = canape.name;

//       const description = templateClone.querySelector(".productDescription");
//       description.innerHTML = canape.description;

//       items.appendChild(templateClone); // ajout de l'élement "template" dans le parent "items"
//     }
//   }
// };
// canapes();
