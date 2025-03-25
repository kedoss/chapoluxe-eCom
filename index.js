import { data } from "./data.js";
import { generateDialogHTML, generateProductHTML } from "./fonctions.js";

// Affichage de la liste des produits
const productsContainer = document.querySelector(".produits");
//console.log(data);
const dialog = document.querySelector("dialog");

let produitsCarte = [];
//initialiser le nombre de produit
const nombreProduit = document.querySelector(".carte .nombre");
nombreProduit.textContent = produitsCarte.length;

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

const testerSiProduitExiste = (arr,produit)=>{
    const el = arr.find(p=> p.id === produit.id)
    return el ? true : false;
};

//Actions sur les produits
const cartes = document.querySelectorAll(".carte-produit");
cartes.forEach((produit) => {
    produit.addEventListener("click", () => {
        const contenuDialog = document.querySelector(".dialog-menu");
        //Effacer le contenu passé
        contenuDialog && contenuDialog.remove();

        dialog.showModal();
        console.log(produit.dataset);
        const curentproduct = data.filter(p => p.id == produit.dataset.id)[0];
        const section = document.createElement("section");
        section.classList.add("dialog-menu");
        section.innerHTML = generateDialogHTML(curentproduct);
        dialog.appendChild(section);
        //console.log(curentproduct);

        //changer de couleur
        const couleurs = document.querySelectorAll(".color.change");
        //console.log(couleurs);
        couleurs.forEach((couleur,key) =>{
            couleur.addEventListener("click",()=>{
                const backgroundImg = document.querySelector(".gauche");

                //Switch
                switch (key) {
                    case 0:
                        backgroundImg.style.background = "#ff6b58";
                        break;
                
                    default:
                        backgroundImg.style.background = "#5f69d5";
                        break;
                }
            });
        });

        
        console.log(testerSiProduitExiste(produitsCarte, curentproduct));

        //Ajouter produit dans le panier
        const ajouter = document.querySelector(".ajouter");
        const qte = document.querySelector(".qte")
        qte.textContent = 0;
        ajouter.addEventListener("click",()=>{
            if (testerSiProduitExiste(produitsCarte, curentproduct)) {
                const btnText =
                `
                <div class="icon"><i class="fa-solid fa-plus"></i>
                </div>
                <p>Ajouter au panier</p>`;
                ajouter.innerHTML = btnText;
                ajouter.classList.remove("ajoute");
                produitsCarte = produitsCarte.filter((p) => p.id !== curentproduct.id);
                nombreProduit.textContent = produitsCarte.length;
            }
            
            else {
                produitsCarte.push(curentproduct);
                ajouter.textContent = "Effacer du panier";
                ajouter.classList.add("ajoute");
                nombreProduit.textContent = produitsCarte.length;
                qte.textContent = 1;
            }
            
        });

        //Tester si une fois le produit existe et afficher directement le message effacer
        if (testerSiProduitExiste(produitsCarte,curentproduct)) {
            ajouter.textContent = "Effacer du panier";
            ajouter.classList.add("ajoute");
        }

        //Quantité
        const reduireBtn = document.querySelector(".counter .fa-minus");
        const incrementeBtn = document.querySelector(".counter .fa-plus");

        let qteProduit = testerSiProduitExiste (produitsCarte, curentproduct) ? 1:0;
        incrementeBtn.addEventListener("click",()=>{
            qteProduit = qteProduit +1;
            qte.textContent = qteProduit;
        
        });

        //reduire
        reduireBtn.addEventListener("click",()=>{
            qteProduit = qteProduit -1;
            qte.textContent = qteProduit;
            console.log("test");
        });
    });
});
console.log(cartes);

//Fermer le dialog
const close = document.querySelector(".close");
close.addEventListener("click",()=>{
    dialog.close();
});