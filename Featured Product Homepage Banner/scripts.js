//Tapcart App Action for bringing the user to a product list page (collection page)
function viewCollection() {
  Tapcart.actions.openCollection({
    collectionId: "285882679448"
  })
}
//Tapcart App Action for bringing the user to a product page
function viewProduct() {
 Tapcart.actions.openProduct({
    productId: "7444358463640"
  }) 
}
//Tapcart App Action for adding the line items to the cart
function addToCart() {
   Tapcart.actions.addToCart({
    lineItems: [{
      quantity: 1,
      variantId: "42207005835416",
      productId: "7444358463640"
    }]
  })

  document.querySelector(".add-to-cart").innerText = "Added!"
  document.querySelector(".add-to-cart").disabled = true;
  document.querySelector(".add-to-cart").style.background = "linear-gradient(91.69deg, rgba(30, 223, 61, 0.54) 5.21%, rgba(30, 223, 61, 0.3) 103.39%)"

  setTimeout(() => {
    document.querySelector(".add-to-cart").innerText = "Add to cart"
    document.querySelector(".add-to-cart").disabled = false;
      document.querySelector(".add-to-cart").style.background = "transparent";
  },2000)
}
