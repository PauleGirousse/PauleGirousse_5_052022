console.log("bonjour");

// let items = document.getElementById("items");

// const promise01 = fetch("http://localhost:3000/api/products");
// promise01.then((response) => {
//   console.log(response);
//   const canapes = response.json();
//   canapes
//     .then((data) => {
//       console.log(data);
//       for (let canape of data) {
//         console.log(canape);

//         // for (i = 0; i < data.length; i++) {
//         //   let newA = document.createElement("a");
//         //   let newArticle = document.createElement("article");
//         //   let newImage = document.createElement("img");

//         //   let newProductName = document.createElement("h3");
//         //   let newProductDescription = document.createElement("p");
//         //   // debugger;
//         //   newImage.setAttribute("src", data[i].imageUrl);
//         //   newArticle.appendChild(newImage);
//         //   // newImage.appendChild(newSrc);
//         //   // newImage.appendChild(newAlt);
//         //   newArticle.appendChild(newProductName);
//         //   newArticle.appendChild(newProductDescription);

//         //   // newSrc.innerHTML = data[i].imageUrl;
//         //   newProductName.innerText = data[i].name;
//         //   newProductDescription.innerText = data[i].description;

//         //   items.appendChild(newA).appendChild(newArticle);
//         // }
//       }
//     })

//     .catch((erreur) => console.log(erreur));
// });

const canapes = async function () {
  let response = await fetch("http://localhost:3000/api/products");
  if (response.ok) {
    let data = await response.json();
    console.log(data);
    const template = document.querySelector("#templatecanape");
    let items = document.querySelector("#items");
    for (const canape of data) {
      const templateClone = document.importNode(template.content, true);

      // const id = templateClone.querySelector("_id");

      const img = templateClone.querySelector("img");
      img.setAttribute("src", canape.imageUrl);
      img.setAttribute("alt", canape.altText);

      const name = templateClone.querySelector(".productName");
      name.innerHTML = canape.name;

      const description = templateClone.querySelector(".productDescription");
      description.innerHTML = canape.description;

      items.appendChild(templateClone);
    }
  }
};
canapes();
