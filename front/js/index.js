console.log("bonjour");

//récupération des données de l'API dans la page index.html

let items = document.getElementById("items"); //container de l'affichage produits dynamique

// on fait un appel reseau vers la liste des canapés
// fetch("http://localhost:3000/api/products")
//   .then(function (response) {
//     //on transforme les données recues en json
//     return response.json();
//   })
//   .then(function (json) {
//     //on stocke les données json dans une variable
//     const canapes = json;
//     console.log(json);

//     //on boucle sur les canapés
//     for (const canape of canapes) {
//       //on recupere l'element dom par son id
//       const element = document.querySelector("#test");
//       //on remplace l'attribut href de cet element par celui qui vient du serveur
//       element.setAttribute(
//         "href",
//         "http://localhost:3000/api/products/" + canape._id
//       );
//     }
//   });
// });

const promise01 = fetch("http://localhost:3000/api/products");
promise01.then((response) => {
  console.log(response);
  const canapes = response.json();
  canapes
    .then((data) => {
      console.log(data);

      // for (let canape of data) {
      //   console.log(canape);
      // création de la boucle et de ces balises pour chaque élément
      for (i = 0; i < data.length; i++) {
        let newA = document.createElement("a");
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
        // debugger;

        //Modification des attributs et affichage sur la page avec l'incrémentation
        newId = data[i]._id;
        console.log(newId);
        newImage.setAttribute("src", data[i].imageUrl); //récupération de la photo
        newImage.setAttribute("alt", data[i].altTxt); //récupération du texte alternatif
        newProductName.innerText = data[i].name; //récupération du nom du produit
        newProductDescription.innerText = data[i].description; //récupération de la description du prduit
        newA.setAttribute("href", "./product.html?");

        // items.appendChild(newA).appendChild(newArticle);

        let newUrl = newA + "id=" + newId; //ajout de la clé Id et de l'id du produit à l'ancre
        console.log(newUrl);

        newA.setAttribute("href", newUrl); //modification de l'ancre dans la page
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
