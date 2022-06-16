//Récupération de l'url
let params = new URLSearchParams(window.location.search);
console.log(params);
let idParams = params.get("_id"); //récupération de l'Id de l'article
console.log(idParams);
let api = `http://localhost:3000/api/products/`;
let idApi = api + "_id=" + idParams;
console.log(idApi);

const canapes = async function () {
  let response = await fetch("http://localhost:3000/api/products/"); // appel reseau sur l'API
  if (response.ok) {
    // si la reponse est ok
    let data = await response.json(); // convertion au format JSON
    console.log(data);
    const productById = data.find((element) => element._id === idParams); //trouve l'article dans le tableau en fonction de son Id

    console.log(productById);
    let item = document.querySelector(".item");
    const template = document.querySelector("#template_article"); // création du template d'un article

    let img = document.createElement("img");
    item__img.appendChild(img);
    img.setAttribute("src", productById.imageUrl);
    img.setAttribute("alt", productById.altText);
    let item__img = templateClone.querySelector(".item__img");

    let name = templateClone.querySelector("#title");
    name.innerHTML = productById.name;

    let price = templateClone.querySelector("#price");
    price.innerHTML = productById.price;

    let description = templateClone.querySelector("#description");
    description.innerHTML = productById.description;

    let colorsvalue = templateClone.querySelector("option");
    option.setAttribute("value", productById[colors.array]);

    const templateClone = document.importNode(template.content, true);
    // const id = templateClone.querySelector("_id");

    item.appendChild(templateClone); //ajout du template dans le parent "item" du HTML
  }
};
canapes();
