var scripts = [
    "https://cdn.judge.me/widget_preloader.js",
    "https://cdn.judge.me/assets/installed.js",
  ];
  // append scripts to head
  for (var i = 0; i < scripts.length; i++) {
    var script = document.createElement("script");
    script.setAttribute("src", scripts[i]);
    document.getElementsByTagName("head")[0].appendChild(script);
    jdgm = window.jdgm || {};
    jdgm.SHOP_DOMAIN = "";
    jdgm.PLATFORM = "shopify";
    jdgm.PUBLIC_TOKEN = "";
  }
  