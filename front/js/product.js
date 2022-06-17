//Récupération de l'url
let params = new URLSearchParams(window.location.search);
console.log(params);
let idParams = params.get("_id"); //récupération de l'Id de l'article
console.log(idParams);
let api = `http://localhost:3000/api/products/`;
let idApi = api + idParams;
console.log(idApi);

const canapes = async function () {
  let response = await fetch(idApi); // appel reseau sur l'article de l'API
  if (response.ok) {
    // si la reponse est ok
    let data = await response.json(); // convertion au format JSON
    console.log(data);
    // const productById = data.find((element) => element._id === idParams); //trouve l'article dans le tableau en fonction de son Id

    // console.log(productById);
    // let item = document.querySelector(".item");
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

    let selectcolors = document.querySelector("select");

    for (let color of data.colors) {
      console.log(color);
      let option = document.createElement("option");
      option.setAttribute("value", color);
      option.innerHTML = color;
      selectcolors.appendChild(option);

      // Récupération de l'Id, la quantité et la couleur de l'article
      // let quantite = document.querySelector("#quantity");
      // quantite = data.quantity;
      // let panier = document.querySelector("addToCart");
      // console.log(quantite);
    }

    // const id = document.querySelector("_id");

    // item.appendChild(); //ajout  dans le parent "item" du HTML
  }
};
canapes();

// addEventListener;
// panier.push(idParams, color);
// console.log(panier);
