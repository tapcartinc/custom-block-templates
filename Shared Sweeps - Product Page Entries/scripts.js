 const STOREFRONT_ACCESS_TOKEN =  "XXXXXXXXXXXXXXXXXXXXX" // get your storefront access token by going to Shopify Admin > Apps and Sales Channels > Develop Apps

const app_store_url = "yourstore.myshopify.com"; // your admin store URL

const multiplier = 1; // current multiplier

const app_is_multiplier_enabled  = 'y'; // # enable or disable the multiplier value from showing y=Yes n=No

const app_is_entries_icon = 'n';   // enable or disable the icon y=Yes n=No

const app_multiplier_background_color  = 'green'; // # multiplier background color 

const app_multiplier_font_color  = 'white'; // # multiplier font color 


// Do not make changes below this line
const app_product_id  = document.getElementById("tapcartCentryCcard").getAttribute('data-productid'); 

const GRAPHQL_URL = "https://"+app_store_url+"/api/2022-10/graphql.json"; 
  const productQuery = () => `query {
    
        product(id:"gid://shopify/Product/${app_product_id}") {    
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
       console.log(productResponse);
     if(productResponse.data.product != null){
        var product = productResponse.data.product
          
         
          var variants = product.variants.edges[0].node
          var price = variants.price.amount
          var bonusEntries = Math.floor (price  * multiplier);

          html += '<div class="entries-container">';
          html += '<div class="total-entries">';
          if(app_is_entries_icon=='y'){
              html += '<i class="fa-solid fa-ticket"></i>';
            }
          html += '<span class="entries-number tapcart-bonus-count">'+bonusEntries+'</span>';
          html += '<span class="label-area">Entries</span>';
          html += '</div>';
          if(app_is_multiplier_enabled=='y'){
            html += '<div class="multiplier-number tapcart-multiplier-x" style="color:'+app_multiplier_font_color+';background-color:'+app_multiplier_background_color+'">' + multiplier+'X</div>';
          }
          html += '</div> '; 
          
          document.getElementById("tapcartCentryCcard").innerHTML = html; 
 
     }
  });
  

