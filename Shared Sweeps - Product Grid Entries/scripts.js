// Configuration

const STOREFRONT_ACCESS_TOKEN =  "XXXXXXXXXXXXXXXXXXXXX" // get your storefront access token by going to Shopify Admin > Apps and Sales Channels > Develop Apps

const app_store_url = "yourstore.myshopify.com"; // your admin store URL

const collectionHandle = "all"; // your collection page handle

const perPageItemCount = 8; // number of products to show

const multiplier = 1; // current multiplier

const app_is_entries_icon = 'n';   // enable or disable the icon y=Yes n=No

const app_is_multiplier_enabled  = 'y'; // enable or disable the multiplier value from showing y=Yes n=No

const app_multiplier_background_color  = 'green'; // multiplier background color

const app_multiplier_font_color  = 'white'; // multiplier font color  

// End Configuration
 


// Do not make changes below this line

const GRAPHQL_URL = "https://"+app_store_url+"/api/2022-10/graphql.json"; 
  const productQuery = () => `query {
    collection(handle:"${collectionHandle}") {
        handle 
        title
        products(first:${perPageItemCount}) {   
        edges {
          node {
            id
            title
            handle  
            featuredImage{
              src
            }
            variants(first: 1) {
              edges {
                cursor
                node {
                  id
                  title
                  quantityAvailable
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
}`; 
  
const GRAPHQL_BODY = () => {
  return {
    async: true,
    crossDomain: true,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
      "Content-Type": "application/graphql",
    },
    body: productQuery(),
  };
};

fetch(GRAPHQL_URL, GRAPHQL_BODY())
  .then((res) => res.json())
  .then((productResponse) => { 

    var html = ''; 
     if(productResponse.data.collection != null){
        
        var products = productResponse.data.collection.products.edges
        products.forEach(function (product) { 
          console.log(product.node)
         var fullPid = product.node.id
          var pid = fullPid.replace("gid://shopify/Product/","");

          html += '<div class="product-wrapper"><a href="#" onclick="viewProduct('+pid+');" data-pid="'+pid+'" class="product-link openProduct" >';
          html += '<div class="product-image"><img src="' + product.node.featuredImage.src + '"></div>';
          html += '<p>' + product.node.title + '</p>';
          var variants = product.node.variants.edges[0].node
          var price = variants.price.amount
          html += '<span class="price-wrapper">$'+price+'</span>';
          html += '<div class="entries-container">';
          html += '<div class="total-entries">';
          if(app_is_entries_icon=='y'){
              html += '<i class="fa-solid fa-ticket"></i>';
            }
          var bonusEntries = Math.floor (price  * multiplier)
          html += '<span class="entries-number" data-bonuscount="0">'+bonusEntries+'</span>';
          html += '<span class="label-area">Entries</span></div>';
          if(app_is_multiplier_enabled=='y'){
           
              html += '<div class="multiplier" style="color:'+app_multiplier_font_color+';background-color:'+app_multiplier_background_color+'">' + multiplier+'X</div>';
             
          }
          html += '</div>';
          html += '</a></div>'; 
          
          document.getElementById("api_products").innerHTML = html;
          document.getElementById("api_products").style.display = "flex";
        });
 
     }
  });
 function viewProduct(id) {
 Tapcart.actions.openProduct({
    productId: id
  }) 
}
