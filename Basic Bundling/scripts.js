//Tapcart App Action for adding the line items to the cart with a line item attribute included to invoke a Shopify script to get a discount
function addToCart() {
  Tapcart.actions.addToCart({
    lineItems: [
      {
        quantity: 1,
        variantId: "42207005835416",
        productId: "7444358463640",
        attributes: [
          {
            key: "tapcart-discount",
            value: "20",
          },
        ],
      },
      {
        quantity: 1,
        variantId: "42207005835416",
        productId: "7444358463640",
        attributes: [
          {
            key: "tapcart-discount",
            value: "20",
          },
        ],
      },
    ],
  });

  document.querySelector(".add-to-cart").innerText = "Added!";
  document.querySelector(".add-to-cart").disabled = true;

  setTimeout(() => {
    document.querySelector(".add-to-cart").innerText = "Add to cart";
    document.querySelector(".add-to-cart").disabled = false;
  }, 2000);
}

// block-vendor:tapcart
// block-type:product-bundle