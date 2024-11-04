const appKey = "shopify-store-domain" // app-key={{subdomain of your shopify store permanent_domain}}

const script = document.createElement("script"); 
script.src = "https://widgets.automizely.com/aftership-aedd-v2/tapcart/index.iife.js";
script.async = true;
document.body.appendChild(script);

const edd = document.createElement("aftership-aedd");
edd.setAttribute("app-key", appKey); 
document.body.appendChild(edd);