const uuid = "{{Storefront UUID}}";
const storeID = "{{Storefront Store ID}}";
const maxSuggestions = "5";

// Set your custom font
const customFontName = "<FONT_NAME HERE>";
const customFontUrl = "<FONT_URL HERE>";

// Careful editing below this line!!!

setCustomFont(customFontUrl, customFontName);

var fastSDKScript = document.createElement("script");
fastSDKScript.src = "https://assets.fastsimon.com/sdk/latest/fast_simon_sdk.js";
fastSDKScript.async = true;
document.head.appendChild(fastSDKScript);

function getOptimizedImageURL(url, size, isInIframe) {
  if (!size || isInIframe || url.includes("missing.gif")) {
    return url;
  }
  const newSize = size;
  const srcSize = url.substring(url.lastIndexOf("_") + 1, url.lastIndexOf("."));

  if (["small", "medium", "large"].includes(srcSize)) {
    return url.replace("_" + srcSize + ".", "_" + newSize + "x.");
  }
  return (
    url.substr(0, url.lastIndexOf("_") + 1) +
    srcSize +
    "_" +
    newSize +
    "x" +
    url.substr(url.lastIndexOf("."))
  );
}

async function fetchProducts() {
  return new Promise((resolve, reject) => {
    window.FastSimonSDK.productRecommendation({
      productID: Tapcart.variables.product.id,
      withAttributes: true,
      specs: [
        {
          sources: [
            "similar_products",
            "similar_products_by_attributes",
            "similar_products_lookalike",
            "related_top_products",
          ],
          maxSuggestions: maxSuggestions,
          widgetID: "my-widget",
        },
      ],
      callback: (response) => {
        const payload = response.payload;

        if (payload.length > 0) {
          const widgetPayload = payload[0].payload;
          if (widgetPayload) {
            const recommendationItems = widgetPayload.map((item) => ({
              id: +item.id,
              variantId: item.vra[0][0],
              title: item.l,
              price: "$" + item.p,
              regularPrice: "$" + item.p_c,
              imageUrl: item.t,
              imageUrl2: item.t2,
              href: item.u,
            }));

            // Render the recommendations
            renderRecommendationWidget(recommendationItems);

            // Wait for all images to load
            const imageLoadPromises = Array.from(
              document.querySelectorAll(".recommendation-item img")
            ).map((img) => {
              return new Promise((imgResolve) => {
                if (img.complete) {
                  imgResolve();
                } else {
                  img.addEventListener("load", imgResolve);
                  img.addEventListener("error", imgResolve); // Resolve on error to avoid blocking
                }
              });
            });

            // Resolve the main promise once all images are loaded
            Promise.all(imageLoadPromises).then(resolve);
          }
        } else {
          resolve(); // Resolve if no recommendations
        }
      },
    });
  });
}

function renderRecommendationWidget(recommendationItems) {
  const widgetContainer = document.querySelector(".recommendations");
  const carouselContainer = widgetContainer.querySelector(
    ".carousel-container"
  );

  // Create a heading for the widget
  const widgetHeading = document.getElementById("fs-title");

  // Create a list to hold the recommendation items
  const recommendationList = document.createElement("div");
  recommendationList.className = "recommendation-list";

  // Iterate through the recommendation items and create list items
  recommendationItems.forEach((item) => {
    const listItem = document.createElement("div");
    listItem.className = "recommendation-item";

    // Create an image element for the product image
    const image = document.createElement("img");
    image.src = getOptimizedImageURL(item.imageUrl, 250, false);
    image.alt = item.title;

    // Create a price and title container
    const priceTitleContainer = document.createElement("div");
    priceTitleContainer.className = "recommendation-price-title__container";

    // Create a link to the product page
    const productLink = document.createElement("p");
    productLink.className = "recommendation-title";
    productLink.href = item.href;
    productLink.textContent = item.title;
    productLink.style.color =
      Tapcart.variables.theme?.tokens.colors.textColors.productTitle || "grey";

    // Create a paragraph for the product price
    const priceParagraph = document.createElement("p");
    priceParagraph.className = "recommendation-price";

    let formattedPrice = reformatPrice(item.price);
    priceParagraph.textContent = formattedPrice;
    priceParagraph.style.color =
      Tapcart.variables.theme?.tokens.colors.textColors.priceText || "black";

    // Add a click event listener to the image
    listItem.addEventListener("click", () => {
      clickProduct(item.id.toString(), item.variantId);
    });

    // Append elements to the list item
    priceTitleContainer.appendChild(productLink);
    priceTitleContainer.appendChild(priceParagraph);
    listItem.appendChild(image);
    listItem.appendChild(priceTitleContainer);

    // Append the list item to the recommendation list
    recommendationList.appendChild(listItem);
  });

  // Append the heading and recommendation list to the container
  carouselContainer.appendChild(recommendationList);

  if (recommendationItems && recommendationItems.length > 0) {
    widgetContainer.style.display = "unset";
  }
}

function reformatPrice(price) {
  // Step 1: Extract the numeric part and currency symbol
  const match = price.match(/^([\d.,]+)([^\d]+)?$|^([^\d]+)?([\d.,]+)$/);
  if (!match) {
    throw new Error("Invalid price format");
  }

  let numericPart = match[1] || match[4]; // Numeric portion (either at start or end)
  let symbol = match[2] || match[3] || ""; // Currency symbol (either at end or start)

  // Step 2: Normalize the numeric part
  numericPart = numericPart.replace(/,/g, "").trim(); // Remove commas
  let numericValue = parseFloat(numericPart);

  if (isNaN(numericValue)) {
    throw new Error("Invalid numeric value");
  }

  // Step 3: Format the number to 2 decimal points
  let formattedNumericValue = numericValue.toFixed(2);

  // Step 4: Reconstruct the price string
  const formattedPrice = symbol.startsWith(" ") // Adjust for symbol position
    ? `${formattedNumericValue}${symbol.trim()}`
    : `${symbol}${formattedNumericValue}`;

  return formattedPrice;
}

function clickProduct(id, variantId) {
  window.FastSimonSDK.event({
    eventName: window.FastSimonEventName.RecommendationProductClicked,
    data: {
      productID: id,
    },
  });
  if (variantId) {
    Tapcart.actions.openProduct({
      productId: id.toString(),
      variantId: variantId.toString(),
    });
  } else {
    Tapcart.actions.openProduct({
      productId: id,
    });
  }
}

async function init() {
  createSkeletonLoadingState(5);
  window.FastSimonSDK.initialization({
    storeID: storeID,
    uuid: uuid,
    type: "SPA",
    onReady: async () => {
      try {
        await fetchProducts(); // Wait until fetchProducts completes
        removeSkeletonLoadingState(); // Run after fetchProducts completes
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
  });
}

function createSkeletonLoadingState(numOfSkeletons) {
  const productCarousel = document.querySelector(".carousel-container");
  if (!productCarousel) {
    console.error("Product carousel element not found");
    return;
  }

  // Create and append CSS styles dynamically
  const style = document.createElement("style");
  style.textContent = `
     .skeleton-container {
       display: flex;
     }
 
     .sizer {
       height: 17rem;
       width: 12rem;
       margin-right: 10px;
     }
 
     .skeleton {
       background: radial-gradient(circle, #ffffff 0%, #f1f1f1 100%);
       background-size: 200% auto;
       animation: gradient 2s linear infinite;
     }
 
     @keyframes gradient {
       0% {
         background-position: 0 0;
       }
       100% {
         background-position: -200% 0;
       }
     }
   `;
  document.head.appendChild(style);

  // Create skeleton elements
  const skeletonContainer = document.createElement("div");
  skeletonContainer.classList.add("skeleton-container");

  const sizer = document.createElement("div");
  sizer.classList.add("skeleton", "sizer");

  for (let i = 0; i < numOfSkeletons; i++) {
    const clone = sizer.cloneNode(true);
    skeletonContainer.appendChild(clone);
  }

  productCarousel.appendChild(skeletonContainer);
}

function removeSkeletonLoadingState() {
  const skeletonContainer = document.querySelector(".skeleton-container");
  skeletonContainer.style.display = "none";
}

function setCustomFont(url, fontFamily) {

  if (!url || !fontFamily || url === "<FONT_URL HERE>") {
    console.error("Font URL not provided");
    return;
  }

  let fileFormat;
  if (isGoogleFont(url)) {
    fontFamily = extractFontNameFromUrl(url);
    loadGoogleFont(url, fontFamily);
  } else if (isShopifyCDNfont(url)) {
    let rawFileFormat = extractShopifyCDNfontName(url);
    if (rawFileFormat.fileFormat === "ttf") {
      fileFormat = "truetype";
    }

    if (rawFileFormat.fileFormat === "woff") {
      fileFormat = "woff";
    }

    if (rawFileFormat.fileFormat === "woff2") {
      fileFormat = "woff2";
    }

    if (rawFileFormat.fileFormat === "otf") {
      fileFormat = "opentype";
    }

    loadShopifyCDNFont(url, fontFamily, fileFormat);
  } else {
    loadCustomFont(url, fontFamily);
  }

  // Utility functions for loading custom fonts

  function isGoogleFont(url) {
    return url.startsWith("https://fonts.googleapis.com");
  }

  function isShopifyCDNfont(url) {
    return url.startsWith("https://cdn.shopify.com");
  }

  function loadShopifyCDNFont(url, fontFamily, fileFormat) {

    const styleElement = createStyleElement(`
          @font-face {
              font-family: '${fontFamily}';
              src: url('${url}') format('${fileFormat}');
          }
         * {
             font-family: '${fontFamily}' !important;
          }`);
    document.head.appendChild(styleElement);
  }

  function loadGoogleFont(url, fontFamily) {
    const linkElement = createLinkElement(url);
    document.head.appendChild(linkElement);
    applyGlobalFontStyle(fontFamily);
  }

  function loadCustomFont(url, fontFamily) {
    const styleElement = createStyleElement(`
        @font-face {
          font-family: '${fontFamily}';
          src: url('${url}');
        }
        * {
          font-family: '${fontFamily}' !important;
        }
      `);
    document.head.appendChild(styleElement);
  }

  function createLinkElement(url) {
    const link = document.createElement("link");
    link.href = url;
    link.rel = "stylesheet";
    return link;
  }

  function createStyleElement(cssContent) {
    const style = document.createElement("style");
    style.innerHTML = cssContent;
    return style;
  }

  function applyGlobalFontStyle(fontFamily) {
    const styleElement = createStyleElement(`
        * {
          font-family: '${fontFamily}', sans-serif !important;
        }
      `);
    document.head.appendChild(styleElement);
  }

  function extractFontNameFromUrl(url) {
    if (isGoogleFont(url)) {
      return extractGoogleFontName(url);
    }

    if (isShopifyCDNfont(url)) {
      return extractShopifyCDNfontName(url);
    }
  }

  function extractShopifyCDNfontName(url) {
    const urlPath = new URL(url).pathname;
    const fileName = urlPath.split("/").pop();
    const fontFamily = fileName.split("_")[0].replace(/-/g, " ");
    const fileFormat = fileName.split(".").pop().split("?")[0];
    return { fontFamily, fileFormat };
  }

  function extractGoogleFontName(url) {
    const fontParam = new URL(url).searchParams.get("family");
    if (!fontParam) {
      return null;
    }

    // Font name could have hyphens, so split by ':' or '+' and return the font name part
    return fontParam.split(":")[0].replace(/\+/g, " ");
  }
}

fastSDKScript.onload = async function () {
  console.log("SDK script loaded...");
  await init(); // Call your init() only once the script has finished loading.
};
