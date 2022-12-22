// Adjust values below per merchant
// Replace with Merchant API Key
const apiKey = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

// Recommended AI endpoint
const endpoint = "/api/v1/products/recommended";

// Similar Products AI endpoint
// const endpoint = "/api/v1/products/similar_products";

// Example custom endpoint (add the id of the data source from Rebuy admin)
// const endpoint = "/api/v1/custom/id/52524";

// Set the amount of products that you would like to be returned in the carousel
const productLimit = 8;

// End adjust values

// Template
const source = `
<!-- TITLE: ADJUST AS DESIRED -->
<div class="super-title">
    <h3>
        Recommended Products
    </h3>
</div>

<!-- CAROUSEL CONTAINER -->
<div class="slider">

    <!-- EACH CAROUSEL CARD -->
    {{#each data}}
    <div id="{{carouselSlide}}" class="slide">

        <div class="rebuy-container">
            <img class="rebuy-image" src="{{image.src}}" alt="">
            <div class="rebuy-product-actions">
                <div class="rebuy-product-title" onclick="handleProductClick({{id}})">
                    {{title}}
                </div>
                <div class="rebuy-price-container">
                    <span class="rebuy-price">
                        &#36;{{selected_variant.price}}
                    </span>
                    <span class="rebuy-price-compare">
                        {{#if compare_at_price}}
                        &#36;{{selected_variant.compare_at_price}}
                        {{/if}}
                    </span>
                </div>
                {{#if (hasVariants variants)}}
                <select data-carousel-slide="{{carouselSlide}}" class="rebuy-select"
                    onchange="handleUpdateSelectedVariant(this)">
                    {{#each variants}}
                    <option class="rebuy-product-options" value="{{id}}">{{title}}</option>
                    {{/each}}
                </select>
                {{/if}}
                <div class="rebuy-add-to-cart">
                    <button onclick="handleAddToCart(this)" {{#if (outOfStock selected_variant)}} disabled {{/if}}
                        data-product-id="{{id}}" data-variant-id="{{initialVariant variants}}"
                        class="rebuy-add-button">
                        {{#if (outOfStock selected_variant)}}
                        Out Of Stock
                        {{else}}
                        Add To Cart
                        {{/if}}
                    </button>
                </div>
            </div>
        </div>
    </div>
    {{/each}}
</div>

<button class="btn btn-next">
    <i class="fa-solid fa-chevron-right" style="color:black !important;"></i>
</button>
<button class="btn btn-prev">
    <i class="fa-solid fa-chevron-left" style="color:black !important;"></i>
</button>
`;

const template = Handlebars.compile(source);
const root = document.querySelector("#rebuy-root");
const inputProduct = root.getAttribute("data-input-product");
const customerId = root.getAttribute("data-customer");
let context;
let Rebuy;

function serialize(obj) {
  const serialized = [];

  const add = (key, value) => {
    value = typeof value === "function" ? value() : value;
    value = value === null ? "" : value === undefined ? "" : value;
    serialized[serialized.length] =
      encodeURIComponent(key) + "=" + encodeURIComponent(value);
  };

  const buildParameters = (prefix, obj) => {
    let i, len, key;

    if (prefix) {
      if (Array.isArray(obj)) {
        for (i = 0, len = obj.length; i < len; i++) {
          buildParameters(
            prefix +
              "[" +
              (typeof obj[i] === "object" && obj[i] ? i : "") +
              "]",
            obj[i]
          );
        }
      } else if (Object.prototype.toString.call(obj) === "[object Object]") {
        for (key in obj) {
          buildParameters(prefix + "[" + key + "]", obj[key]);
        }
      } else {
        add(prefix, obj);
      }
    } else if (Array.isArray(obj)) {
      for (i = 0, len = obj.length; i < len; i++) {
        add(obj[i].name, obj[i].value);
      }
    } else {
      for (key in obj) {
        buildParameters(key, obj[key]);
      }
    }

    return serialized;
  };
  return buildParameters("", obj).join("&");
}

const config = {
  key: null,
  domain: "https://rebuyengine.com",
  cdnDomain: "https://cdn.rebuyengine.com",
  eventDomain: "https://rebuyengine.com",
};

const makeCall = async (method, path, data, origin) => {
  const url = `${origin}${path}`;
  const requestUrl = new URL(url);

  const requestData = {
    key: config.key,
  };

  if (typeof data == "object" && data != null) {
    Object.assign(requestData, data);
  }

  const requestObject = {
    method,
  };

  if (method == "GET") {
    requestUrl.search = serialize(requestData);
  } else if (method == "POST") {
    requestObject.headers = {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };
    requestObject.body = new URLSearchParams(requestData);
  }

  const request = await fetch(requestUrl, requestObject);
  return await request.json();
};

// Api class
class Api {
  constructor(options) {
    if (typeof options == "string") {
      config.key = options;
    } else if (typeof options == "object" && options != null) {
      Object.assign(config, options);
    }
  }

  async callEvent(method, path, data) {
    return await makeCall(method, path, data, config.eventDomain);
  }

  async callCdn(method, path, data) {
    return await makeCall(method, path, data, config.cdnDomain);
  }

  async callApi(method, path, data) {
    return await makeCall(method, path, data, config.domain);
  }
}

const getProducts = async (productId = "", customer = "") => {
  const response = await Rebuy.callApi("GET", endpoint, {
    shopify_product_ids: productId,
    shopify_customer_id: customer,
    limit: productLimit,
  });

  if (response.data) {
    return response;
  }
};

function registerHelpers() {
  Handlebars.registerHelper("hasVariants", function (value) {
    return value.length > 1;
  });

  Handlebars.registerHelper("initialVariant", function (variants) {
    return variants[0].id;
  });

  Handlebars.registerHelper("outOfStock", function (variant) {
    const hasStock = variant.inventory_quantity > 0;
    return !hasStock;
  });
}

function formatData(info) {
  info.data.forEach((product, i, arr) => {
    if (i === 0) {
      product.previous = `#carousel__slide${arr.length}`;
      product.next = `#carousel__slide${i + 2}`;
    } else if (i === arr.length - 1) {
      product.next = `#carousel__slide${1}`;
      product.previous = `#carousel__slide${i}`;
    } else {
      product.next = `#carousel__slide${i + 2}`;
      product.previous = `#carousel__slide${i}`;
    }
    product.price = product.variants[0].price;
    product.compare_at_price = product.variants[0].compare_at_price;
    product.carouselSlide = `carousel__slide${i + 1}`;

    product.selected_variant = product.variants[0];
  });
  registerHelpers();
}

function handleProductClick(id) {
  const selectedProduct = context.data.find((product) => product.id === id);
  const variantId = selectedProduct.selected_variant.id;

  Tapcart.actiant.openProduct({ id, variantId });
}

function handleUpdateSelectedVariant(variant) {
  const { selectedVariant, productIndex } = getSelectedVariant(variant.value);

  const attr = variant.getAttribute("data-carousel-slide");

  updateVariantImage(productIndex, selectedVariant, attr);
  updateVariantPrice(selectedVariant, attr);
  updateAddButton(selectedVariant, variant.value, attr);
}

function getSelectedVariant(id) {
  let selectedVariant = {};
  let productIndex = 0;
  for (let i = 0; i < context.data.length; i++) {
    selectedVariant = context.data[i].variants.find((variant) => {
      if (parseInt(id) === variant.id) {
        return true;
      }
    });
    if (selectedVariant) {
      productIndex = i;

      break;
    }
  }
  context.data[productIndex].selected_variant = selectedVariant;
  return { selectedVariant, productIndex };
}

function selectedVariantHasInvintory(variant) {
  return variant.inventory_quantity > 0;
}

function updateVariantImage(productIndex, selectedVariant, attr) {
  const productImage = document.querySelector(`#${attr} .rebuy-image`);
  const selectedProduct = context.data[productIndex];
  let image = "";
  if (selectedVariant.image_id) {
    image = selectedProduct.images.find(
      (img) => img.id == selectedVariant.image_id
    );
  } else if (selectedProduct.images.length === 1) {
    image = selectedProduct.image;
  } else if (selectedVariant.option1) {
    const option1 = selectedVariant.option1;
    const variantWithImageId = selectedProduct.variants.find(
      (variant) => variant.option1 === option1 && variant.image_id
    );
    image = selectedProduct.images.find(
      (img) => img.id == variantWithImageId.image_id
    );
  }

  if (image && image.src) {
    productImage.setAttribute("src", image.src);
  } else {
    productImage.setAttribute("src", selectedProduct.image.src);
  }
}

function updateVariantPrice(selectedVariant, attr) {
  const price = document.querySelector(`#${attr} .rebuy-price`);
  const compareAtPrice = document.querySelector(
    `#${attr} .rebuy-price-compare`
  );

  price.textContent = `$${selectedVariant.price}`;
  if (selectedVariant.compare_at_price) {
    compareAtPrice.textContent = `$${selectedVariant.compare_at_price}`;
  } else {
    compareAtPrice.textContent = "";
  }
}

function updateAddButton(variant, value, attr) {
  const hasInvintory = selectedVariantHasInvintory(variant);
  const button = document.querySelector(`#${attr} .rebuy-add-button`);

  button.setAttribute("data-variant-id", value);

  if (hasInvintory) {
    button.removeAttribute("disabled");
    if (button.textContent.trim() === "Out Of Stock") {
      button.textContent = "Add To Cart";
    }
  } else {
    button.setAttribute("disabled", "true");
    if (button.textContent.trim() === "Add To Cart") {
      button.textContent = "Out Of Stock";
    }
  }
}

function handleAddToCart(button) {
  const productId = button.getAttribute("data-product-id");
  const variantId = button.getAttribute("data-variant-id");

  const data = {
    lineItems: [
      {
        variantId,
        quantity: 1,
        attributes: [
          {
            key: "_source",
            value: "Rebuy",
          },
          {
            key: "_attribution",
            value: "Rebuy Tapcart Product",
          },
        ],
      },
    ],
  };

  Tapcart.actions.addToCart(data);
}

function setContainerHeight() {
  let maxHeight = 0;
  const slides = document.querySelectorAll(".slide");
  slides.forEach((slide) => {
    if (slide.clientHeight > maxHeight) {
      maxHeight = slide.clientHeight;
    }
  });

  if (maxHeight > 200) {
    const slider = document.querySelector(".slider");
    slider.style.height = maxHeight + "px";
  }
}

function initTemplate() {
  // Add context to the root div
  if (context?.data?.length > 0) {
    const html = template(context);
    root.innerHTML = html;
  }
}

const initSlider = () => {
  // Select all slides
  const slides = document.querySelectorAll(".slide");

  // loop through slides and set each slides translateX property to index * 100%
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${indx * 100}%)`;
  });

  // select next slide button
  const nextSlide = document.querySelector(".btn-next");

  // current slide counter
  let curSlide = 0;
  // maximum number of slides
  let elementmaxSlide = slides.length - 1;
  let maxSlide = context.data.length - 1;

  // add event listener and navigation functionality
  nextSlide.addEventListener("click", function () {
    // check if current slide is the last and reset current slide
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    //   move slide by -100%
    slides.forEach((slide, indx) => {
      slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
    });
  });

  // select prev slide button
  const prevSlide = document.querySelector(".btn-prev");

  // add event listener and navigation functionality
  prevSlide.addEventListener("click", function () {
    // check if current slide is the first and reset current slide to last
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }

    //   move slide by 100%
    slides.forEach((slide, indx) => {
      slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
    });
  });
};

// Initalize Rebuy without the before Render function
async function initRebuy() {
  Rebuy = new Api(apiKey);
  context = await getProducts(inputProduct, customerId);

  if (context?.data?.length > 0) {
    formatData(context);
    initTemplate();
    initSlider();
    setTimeout(() => {
      setContainerHeight();
    }, 500);
  } else {
    const body = document.querySelector("body");
    body.style.display = "none";
  }
}

initRebuy();
