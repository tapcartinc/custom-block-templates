let klaviyoID = 'insert company id';

var script = document.createElement('script');
script.type = 'text/javascript';
script.async = true;
script.src = `https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${klaviyoID}`;
document.head.appendChild(script);

