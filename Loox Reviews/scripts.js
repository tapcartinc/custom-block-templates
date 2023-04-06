// Change 'your-shopify-store-handle' value to your Shopify store handle - example: emmys-tapcart-boutique

const shopifyStoreHandle = 'your-shopify-store-handle';

var script = document.createElement('script');
script.async = true;
script.src = `//loox.io/widget/loox.js?shop=${shopifyStoreHandle}.myshopify.com`;
document.head.appendChild(script);