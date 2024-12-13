
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzViZWE2YWQyMjA3MTAwMTVkZTJmMmUiLCJpYXQiOjE3MzQwODQ1MDQsImV4cCI6MTczNTI5NDEwNH0.ToP2put3ebn9R2cPU1d8Ocobw_tkzy_Umf3AFjel2LM";


const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");


const productName = document.getElementById("product-name");
const productDescription = document.getElementById("product-description");
const productBrand = document.getElementById("product-brand");
const productPrice = document.getElementById("product-price");
const productImage = document.getElementById("product-image");


fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
  headers: { Authorization: `Bearer ${token}` },
})
  .then((res) => res.json())
  .then((product) => {
    
    productName.textContent = product.name;
    productDescription.textContent = product.description;
    productBrand.textContent = product.brand;
    productPrice.textContent = `€ ${product.price.toFixed(2)}`; 
    productImage.src = product.imageUrl; 
    productImage.alt = product.name; 
  })
  .catch((err) => console.error("Error fetching product details:", err)); 
