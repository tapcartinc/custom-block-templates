const shopDomain = 'INSERT_SHOP_DOMAIN';
const publicToken = 'INSERT PUBLIC TOKEN';

// Creating the first script element
var script1 = document.createElement('script');
script1.innerHTML = `
  jdgm = window.jdgm || {};
    jdgm.SHOP_DOMAIN = ${shopDomain};
    jdgm.PLATFORM = "shopify";
    jdgm.PUBLIC_TOKEN = ${publicToken};
`;
document.head.appendChild(script1);

// Creating the second script element
var script2 = document.createElement('script');
script2.setAttribute('data-cfasync', 'false');
script2.type = 'text/javascript';
script2.async = true;
script2.src = 'https://cdn.judge.me/widget_preloader.js';
document.head.appendChild(script2);

// Creating the third script element
var script3 = document.createElement('script');
script3.setAttribute('data-cfasync', 'false');
script3.type = 'text/javascript';
script3.async = true;
script3.src = 'https://cdn1.judge.me/assets/installed.js';
document.head.appendChild(script3);


  
  // block-vendor:tapcart
  // block-type:reviews-judge.me