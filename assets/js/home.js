const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzViZWE2YWQyMjA3MTAwMTVkZTJmMmUiLCJpYXQiOjE3MzQwODQ1MDQsImV4cCI6MTczNTI5NDEwNH0.ToP2put3ebn9R2cPU1d8Ocobw_tkzy_Umf3AFjel2LM";

  const productList = document.getElementById("product-list");

  function loadProducts() {
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Errore ${res.status}: ${res.statusText}`);
        return res.json();
      })
      .then((products) => {
        displayProducts(products);
      })
      .catch((err) => {
        console.error("Errore durante il caricamento dei prodotti:", err);
        productList.innerHTML = `<div class="alert alert-danger">Impossibile caricare i prodotti. Riprova più tardi.</div>`;
      });
  }
  
  function displayProducts(products) {
    productList.innerHTML = "";
  
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "col-lg-3 col-md-4 col-sm-6 d-flex";
  
      productCard.innerHTML = `
        <div class="card h-100 card-custom"> 
          <img src="${product.imageUrl}" class="card-img-top product-img" alt="${product.name}">
          <div class="card-body p-2"> 
            <h5 class="card-title text-truncate">${product.name}</h5>
            <p class="card-text text-truncate">${product.description}</p> 
            <p class="card-text mt-auto"><strong>€${product.price}</strong></p>
            <div class="d-flex justify-content-between mt-2"> 
              <a href="form.html?id=${product._id}" class="btn btn-warning btn-sm">Modifica</a>
              <a href="details.html?id=${product._id}" class="btn btn-primary btn-sm">Scopri</a>
              <button class="btn btn-danger btn-sm" onclick="deleteProduct('${product._id}')">Elimina</button>
            </div>
          </div>
        </div>
      `;
  
      productList.appendChild(productCard);
    });
  }
  
  function editProduct(productId) {
    window.location.href = `form.html?id=${productId}`;
  }
  
  function deleteProduct(productId) {
    if (confirm("Sei sicuro di voler eliminare questo prodotto?")) {
      fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error(`Errore ${res.status}: ${res.statusText}`);
          alert("Prodotto eliminato con successo!");
          loadProducts(); 
        })
        .catch((err) => {
          console.error("Errore durante l'eliminazione del prodotto:", err);
          alert("Si è verificato un errore durante l'eliminazione del prodotto.");
        });
    }
  }
  
  document.addEventListener("DOMContentLoaded", loadProducts);