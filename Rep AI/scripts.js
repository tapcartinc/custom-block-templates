// Rep params to set per merchant
var partnerKey = "{{Account Key}}"; // Value provided by Rep
var environment = "prod"; // Value provided by Rep

// Create a script element

var script = document.createElement("script");
var vfP = document.getElementById("vfHolder") || document.head;
var vfS = document.createElement("script");
var container = document.querySelector(".container");
var prodId;
if (
  Tapcart.variables &&
  Tapcart.variables.product &&
  Tapcart.variables.product.id
) {
  prodId = Tapcart.variables.product.id;
}

script.type = "text/javascript";
script.textContent = `var __assign=this&&this.__assign||function(){return(__assign=Object.assign||function(n){for(var i,o=1,d=arguments.length;o<d;o++)for(var l in i=arguments[o])Object.prototype.hasOwnProperty.call(i,l)&&(n[l]=i[l]);return n}).apply(this,arguments)};!function(){var n,i,o,d;if(!(null===(n=null===window||void 0===window?void 0:window.rep)||void 0===n?void 0:n.on)){var l=__assign({},null!==(o=null===(i=null===window||void 0===window?void 0:window.rep)||void 0===i?void 0:i.events)&&void 0!==o?o:{}),r=__assign({},null!==(d=null===window||void 0===window?void 0:window.rep)&&void 0!==d?d:{});r.events=l,r.on=function(n,i){switch(n){case"load":(null==l?void 0:l[n])?Array.isArray(null==l?void 0:l[n])&&l[n].push(i):l[n]=[i]}},window.rep=r}}();`;

// Append the script to the head of the document
document.head.appendChild(script);

vfS.setAttribute("src", "https://d1o5e9vlirdalo.cloudfront.net/vfLoader.js");
vfS.setAttribute("id", "vfLoader");
vfS.setAttribute("data-pk", encodeURIComponent(partnerKey));
vfS.setAttribute("data-e", encodeURIComponent(environment));
vfS.type = "text/javascript";
vfP.appendChild(vfS);
if (rep && rep.sendProductViewedEvent && prodId) {
  rep.sendProductViewedEvent(`${prodId}`);
}
rep.on("load", function () {
  if (typeof rep !== "undefined") {
    //Rep is available
    if (prodId) {
      rep.sendProductViewedEvent(`${prodId}`);
    }
    //Configuration of a chat
    rep.config({
      Tapcart: Tapcart,
      buttonStyle: "CHAT_ICON",
      widgetPosition: {
        p: "CUSTOM",
        cp: {
          x: "25px",
          y: "25px",
          h: "RIGHT",
          v: "BOTTOM",
        },
      },
    });

    //Listener Rep is open
    rep.on("open", () => {
      container.style.height = "600px";
    });

    //Listener Rep closed
    rep.on("close", () => {
      container.style.height = "70px";
    });

    // Rep open by default
    var timout = setTimeout(() => {
      rep.open();
      clearTimeout(timout);
    }, 700);

    // Rep track product view
  } else {
    console.log("Rep not available");
  }
});

// block-vendor:rep.ai
// block-type:chatbot