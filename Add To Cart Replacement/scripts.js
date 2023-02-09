//Tapcart App Action for adding the line items to the cart
function addToCart() {
    const selectedVariantId = Tapcart.variables.product.selectedVariant.id;
    console.log(selectedVariantId);
  
    // Below is a hardcoded example of a variable called productInventory
    // This example provide and IF/Else condition
    // You could replace this example with live inventory via an API request
    
    // Below is an example that is above the set threshold
    const productInventory = 60;
  
    // Below is an example that goes below the set threshold
    // const productInventory = 40; 
    
    if(productInventory > 50) {  
      Tapcart.actions.addToCart({
          lineItems: [{
            quantity: 1,
            variantId: selectedVariantId
        }],
      })
      document.querySelector(".add-to-cart").innerText = "Added!";
      document.querySelector(".add-to-cart").disabled = true;
      Tapcart.actions.showToast({
        message: 'Product Successfully Added',
        type: "success", // "success" || "error"
      });
    }else{
      document.querySelector(".add-to-cart").innerText = "Error!";
      document.querySelector(".add-to-cart").disabled = true;
      Tapcart.actions.showToast({
        message: 'Sorry, there was an error',
        type: "error", // "success" || "error"
      });
    }
    setTimeout(() => {
      document.querySelector(".add-to-cart").innerText = "Add to cart";
      document.querySelector(".add-to-cart").disabled = false;
    }, 2000);
  }