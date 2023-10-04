var node = Tapcart.variables.product.selectedVariant.id;

Tapcart.registerEventHandler("product/updated", (data) => {
 node = data.product.selectedVariant.id;
 checkStock();
});


function checkStock(){
    const query = `
      query getProductVariantsFromNode($id: ID!) {
        node(id: $id) {
          id
          ... on ProductVariant {
            id
            currentlyNotInStock
          }
        }
      }
    `;
    
    console.log(node);
    var nodeId = 'gid://shopify/ProductVariant/' + node;
    console.log(nodeId);
    
    
    fetch('https://{{Store Name Goes Here}}.myshopify.com/api/2023-01/graphql.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': '{{Your Token Goes Here}}',
        },
        body: JSON.stringify({
          query,
          variables: { id: nodeId },
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log(JSON.stringify(data));
        var preOrderStatus = data.data.node.currentlyNotInStock;
        console.log(preOrderStatus);
    
        if(preOrderStatus == true) {
          document.querySelector(".preorder").innerText = "Preorder: Expected Delivery 3-4 Weeks";
          document.querySelector(".button").innerText = "Preorder";
        }else if(preOrderStatus == false) {
          document.querySelector(".preorder").innerText = "";
          document.querySelector(".button").innerText = "Add To Cart";
        }     
      })
      .catch(error => console.error(error));
}
checkStock();

  
function addToCart(){
    console.log("sanity check"); 
      Tapcart.actions.addToCart({
          lineItems: [{
            quantity: 1,
            variantId: node
        }],
    })
};

// block-vendor:tapcart
// block-type:preorder