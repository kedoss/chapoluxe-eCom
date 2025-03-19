import { data } from "./data.js";
import { generateDialogHTML, generateProductHTML } from "./fonctions.js";

// Affichage de la liste des produits
const productsContainer = document.querySelector(".produits");
//console.log(data);
const dialog = document.querySelector("dialog");

//Loop entre différents éléments
const afficherProduit = (produits)=> {
    produits.forEach((produit) => {
        const produitHTML = document.createElement("div");
        produitHTML.classList.add("carte-produit");
    
        /*const contenuHTML = `
         <div class="img">
           <img src="${produit.img}" alt=""/>
         </div>
        `;*/
    
        //produitHTML.textContent = "Voici un exemple";
        produitHTML.setAttribute("data-id", produit.id);
        produitHTML.innerHTML = generateProductHTML(produit);
    
        productsContainer.appendChild(produitHTML);
    });
};
afficherProduit(data);

//Rechercher un produit
const input = document.querySelector(".recherche");
input.addEventListener("keyup", (e) => {
    console.log(e.target.value);
    const filtre = data.filter((p) => p.nom.toLocaleLowerCase().includes(e.target.value));
    //console.log(filtre);
    productsContainer.innerHTML = "";
    //condition pour rendre les produits 
    if (filtre.length > 0) {
        afficherProduit(filtre);
    } else {
        const vide = document.createElement("h3");
        vide.textContent = "Aucun produit trouvé";
        productsContainer.appendChild(vide);
    }
});

//Actions sur les produits
const cartes = document.querySelectorAll(".carte-produit");
cartes.forEach((produit) => {
    produit.addEventListener("click", () => {
        dialog.showModal();
        console.log(produit.dataset);
        const curentproduct = data.filter(p => p.id == produit.dataset.id)[0];
        const section = document.createElement("section");
        section.classList.add("dialog-menu");
        section.innerHTML = generateDialogHTML(curentproduct);
        dialog.appendChild(section);
        console.log(curentproduct);
    });
});
console.log(cartes);

//Fermer le dialog
const close = document.querySelector(".close");
close.addEventListener("click",()=>{
    dialog.close();
});