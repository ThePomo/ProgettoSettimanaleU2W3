
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzViZWE2YWQyMjA3MTAwMTVkZTJmMmUiLCJpYXQiOjE3MzQwODQ1MDQsImV4cCI6MTczNTI5NDEwNH0.ToP2put3ebn9R2cPU1d8Ocobw_tkzy_Umf3AFjel2LM";
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

const formTitle = document.getElementById("form-title");
const productForm = document.getElementById("product-form");
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const brandInput = document.getElementById("brand");
const imageUrlInput = document.getElementById("imageUrl");
const priceInput = document.getElementById("price");
const saveButton = document.getElementById("save-btn");

if (productId) {
  formTitle.textContent = "Modifica Prodotto";

  fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      if (!res.ok) throw new Error(`Errore ${res.status}: ${res.statusText}`);
      return res.json();
    })
    .then((product) => {
      nameInput.value = product.name;
      descriptionInput.value = product.description;
      brandInput.value = product.brand;
      imageUrlInput.value = product.imageUrl;
      priceInput.value = product.price;
    })
    .catch((err) => console.error("Errore nel caricamento del prodotto:", err));
}
saveButton.addEventListener("click", saveProduct);

function saveProduct() {
  const product = {
    name: nameInput.value.trim(),
    description: descriptionInput.value.trim(),
    brand: brandInput.value.trim(),
    imageUrl: imageUrlInput.value.trim(),
    price: parseFloat(priceInput.value),
  };

  console.log("Oggetto prodotto creato:", product);

  if (isNaN(product.price) || product.price <= 0) {
    alert("Inserisci un prezzo valido");
    return;
  }

  const method = productId ? "PUT" : "POST";
  const endpoint = productId
    ? `https://striveschool-api.herokuapp.com/api/product/${productId}`
    : "https://striveschool-api.herokuapp.com/api/product/";

  fetch(endpoint, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  })
    .then((res) => {
      if (!res.ok) throw new Error(`Errore ${res.status}: ${res.statusText}`);
      return res.json();
    })
    .then((data) => {
      window.location.href = "homepage.html";
    })
    .catch((err) => {
      console.error("Errore durante il salvataggio:", err);
      alert("Errore durante il salvataggio del prodotto");
    });
}
