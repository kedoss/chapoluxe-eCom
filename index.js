import { data } from "./data.js";
import { generateProductHTML } from "./fonctions.js";

// Affichage de la liste des produits
const productsContainer = document.querySelector(".produits");
//console.log(data);

//Loop entre différents éléments
const afficherProduit = (produits)=> {
    data.forEach((produit) => {
        const produitHTML = document.createElement("div");
        produitHTML.classList.add("carte-produit");
    
        /*const contenuHTML = `
         <div class="img">
           <img src="${produit.img}" alt=""/>
         </div>
        `;*/
    
        //produitHTML.textContent = "Voici un exemple";
        produitHTML.innerHTML = generateProductHTML(produit);
    
        productsContainer.appendChild(produitHTML);
    });
};
afficherProduit();