var productId = Tapcart.variables.product.id;
console.log(productId);


// Get the elements with the specified class names
var productSummary = document.querySelector('.junip-product-summary');
var productReview = document.querySelector('.junip-product-review');

// Set the data-product-id attribute to the productId value
if (productSummary) {
    productSummary.setAttribute('data-product-id', productId);
}
if (productReview) {
    productReview.setAttribute('data-product-id', productId);
}

// block-vendor:tapcart
// block-type:reviews-junip