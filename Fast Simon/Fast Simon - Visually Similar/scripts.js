const uuid = "{{Storefront UUID}}";
const storeID = "{{Storefront Store ID}}";
const maxSuggestions = "5";

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
    priceParagraph.textContent = item.price;
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

fastSDKScript.onload = async function () {
  await init(); // Call your init() only once the script has finished loading.
};


