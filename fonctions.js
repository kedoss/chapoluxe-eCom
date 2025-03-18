// On crée une fonction qui va nous permettre de générer le HTML pour chaque produit
export function generateProductHTML(product) {
    return `
      <div class="img">
              <img src='${product.img}' alt="" />
              <div class="icons">
                <div class="first">
                  <i class="fa-regular fa-heart"></i>
                  <i class="fa-solid fa-cart-flatbed-suitcase"></i>
                </div>
                <div class="last">
                  <i class="fa-solid fa-star"></i>
                  <p>4.5</p>
                </div>
              </div>
            </div>
            <div class="text">
              <p class="nom">${product.categorie}</p>
              <h3>${product.nom}</h3>
            </div>
  
            <div class="footer">
              <div class="prix">
                <p class="prix-actuel">$ ${product.prix}</p>
              </div>
              <div class="color">
                <div class="item-color"></div>
                <div class="item-color"></div>
                <div class="item-color"></div>
              </div>
            </div>
        
      `;
  }