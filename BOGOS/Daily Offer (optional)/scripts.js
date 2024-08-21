// Configure your Shopify domain and API Key

// You can find your store domain name in your Shopify admin under Online Store > Domains
const shopDomain = "YOUR SHOPIFY DOMAIN HERE"; // e.g 'bogos-tapcart-integration.myshopify.com';

//Replace with API Key. Please contact support from Bogos to to receive key
const apiKey ="YOUR API KEY HERE";

// Do not make changes below this line //

const endpoint = "https://test1-freegifts.freegifts.io/node/api-partner";

const bogosApiPath = {
  bogos: "/bogos-v2",
  giftCustomize: "/gift-customize",
  productsSyncQuantity: "/products-sync-quantity",
};

const Api = {
  makeCallBogos: async (method, path, data) => {
    const token = await Api.createJwt();
    const url = `${endpoint}${path}`;
    const requestUrl = new URL(url);
    const requestHeader = {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
      verify: shopDomain,
    };

    const requestObject = {
      method,
      headers: requestHeader,
    };

    const dto = { ...data, shop: shopDomain, other: { isMobileApp: true } };

    if (method == "GET") {
      requestUrl.search = this.serialize(dto);
    } else if (method == "POST") {
      requestObject.body = JSON.stringify(dto);
    }
    try {
      const request = await fetch(requestUrl, requestObject);
      return await request.json();
    } catch (err) {
      return;
    }
  },

  serialize: (obj) => {
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
  },
  base64UrlEncode: (str) => {
    return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  },
  createSignature: async (encodedHeader, encodedPayload, secret) => {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const algorithm = { name: "HMAC", hash: "SHA-256" };
    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      algorithm,
      false,
      ["sign"]
    );
    const data = encoder.encode(`${encodedHeader}.${encodedPayload}`);
    const signature = await crypto.subtle.sign("HMAC", key, data);
    return btoa(String.fromCharCode(...new Uint8Array(signature)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  },
  createJwt: async () => {
    const header = {
      alg: "HS256",
      typ: "JWT",
    };
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      integration: shopDomain,
      iat: now,
      exp: now + 120,
    };
    const encodedHeader = Api.base64UrlEncode(JSON.stringify(header));
    const encodedPayload = Api.base64UrlEncode(JSON.stringify(payload));
    const signature = await Api.createSignature(
      encodedHeader,
      encodedPayload,
      apiKey
    );
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  },
};

const TODAY_OFFER_SECTION = `<div id="sca-today-offer-wrap">
    <div class="sca-fg-header">
        <div class="sca-fg-header-title">
            <span class="sca-fg-today-offer-title">{{ sca_fg_today_offer_title }}</span>
            <span class="sca-fg-close-today-offer" aria-label="close" data-close>
            </span>
        </div>
        <span class="sca-fg-today-offer-subtitle">{{ sca_fg_today_offer_subtitle }}</span>
    </div>

    <div class="sca-fg-body">
        <div class="sca-fg-offers"></div>
    </div>

    <div class="sca-fg-footer">
        {{ sca_fg_today_offer_footer }}
    </div>
</div>`;

const TODAY_OFFER_ITEM_SECTION = `<div class="sca-fg-offer" data-fg-offer-id="{{ sca_fg_offer_id }}">
    <div class="sca-offer-info">
        <img class="sca-img-offer" width="50" height="50" loading="lazy" src="{{ sca_fg_offer_img }}" alt="">
        <b class="sca-offer-title" data-sca-fg-today-offer-title-tooltip="{{ sca_fg_offer_title_tooltip }}" style="cursor: default">{{ sca_fg_offer_title }}</b>
    </div>
    <span>
        <svg class="sca-fg-icon-success sca-fg-icon-success-anim" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle class="sca-fg-icon-success-circle" cx="26" cy="26" r="25" fill="none"></circle>
            <path class="sca-fg-icon-success-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"></path>
        </svg>
    </span>
</div>`;

const utils = {
  handleStringRegex: (str, isURL = false) => {
    return `${str}`.replaceAll(/\$/g, isURL ? "$$$$" : "&#36;");
  },
  empty: (data) => {
    if (data === 0) {
      return true;
    }
    if (typeof data == "number" || typeof data == "boolean") {
      return false;
    }
    if (typeof data == "undefined" || data === null) {
      return true;
    }
    if (typeof data.length != "undefined") {
      return data.length === 0;
    }
    let count = 0;
    for (let i in data) {
      if (data.hasOwnProperty(i)) {
        count++;
      }
    }
    return count === 0;
  },
};

const BogosIntegration = {
  BRAND_MARK_TEMPLATE: (hiddenBrandMark, className = null) => {
    let style = "";
    if (utils.empty(className)) {
      style = `display: block!important;
                          background: #D9D9D9;
                          text-align: center;
                          font-size: 11px;
                          font-family: inherit;
                          padding: 2px;
                          color: #5E5873;
                          box-sizing: border-box;
                          margin: 0 -10px;
                          border-bottom-left-radius: 5px;
                          border-bottom-right-radius: 5px;`;
    }

    return hiddenBrandMark
      ? ""
      : `<div class="brand-mark ${className}" style="${style}">
                <span> Powered by
                    <a target="_blank" style="color: #5E5873;"
                        href="https://bogos.io/?utm_source=app&utm_medium=brandmark&utm_campaign=home">
                        BOGOS.io
                    </a>
                </span>
            </div>
            `;
  },

  watchCartUpdate: () => {
    Tapcart.registerEventHandler("cart/updated", async function (event) {
      await BogosIntegration.initBogos(event.cart.items);
    });
  },

  initBogos: async (cartItems) => {
    const dataCartToRequestBogos = {
      cartItems: cartItems.map((item) => {
        return {
          variant_id: item.variantId,
          product_id: item.productId,
          quantity: item.quantity,
          selling_plan_allocation: {
            selling_plan: {
              id: item.sellingPlanId,
            },
          },
        };
      }),
    };
    const res = await Api.makeCallBogos(
      "POST",
      bogosApiPath.bogos,
      dataCartToRequestBogos
    );

    try {
      BogosIntegration.handleLogicBogosTodayOffers(res);
    } catch (e) {
      return;
    }
  },

  handleLogicBogosTodayOffers: (bogosData) => {
    const todayOffer = bogosData.today_offers ?? {};
    const todayOfferData = todayOffer.data ?? [];
    const hiddenBrandMark =
      bogosData?.popup?.customize?.others?.hidden_brand_mark ?? false;
    const todayOfferSection = document.querySelector(
      "#sca-fg-today-offer-iframe"
    );
    if (todayOfferData.length > 0 && todayOfferSection) {
      BogosIntegration.renderTodayOffer(
        todayOffer,
        todayOfferSection,
        hiddenBrandMark
      );
    } else {
      todayOfferSection.innerHTML = "";
    }
  },

  renderTodayOffer: (todayOffer, todayOfferSection, hiddenBrandMark) => {
    const todayOfferCustomize = todayOffer.customize ?? {};
    const todayOfferData = todayOffer.data ?? [];

    const todayOfferTemplate = TODAY_OFFER_SECTION;
    const todayOfferItemTemplate = TODAY_OFFER_ITEM_SECTION;

    todayOfferSection.innerHTML = todayOfferTemplate
      .replaceAll(
        /{{\s*sca_fg_today_offer_title\s*}}/gm,
        utils.handleStringRegex(
          todayOfferCustomize.widget_title ?? "TODAY OFFER"
        )
      )
      .replaceAll(
        /{{\s*sca_fg_today_offer_subtitle\s*}}/gm,
        utils.handleStringRegex(
          todayOfferCustomize.widget_subtitle ??
            "Claim these exclusive offers today"
        )
      )
      .replaceAll(
        /{{\s*sca_fg_today_offer_footer\s*}}/gm,
        utils.handleStringRegex(
          BogosIntegration.BRAND_MARK_TEMPLATE(
            hiddenBrandMark,
            "today-offer-brand-mark"
          )
        )
      );

    document.querySelector(
      "#sca-fg-today-offer-iframe .sca-fg-body .sca-fg-offers"
    ).innerHTML = todayOfferData
      .map((offer) => {
        const { id, title, gifts } = offer;
        return todayOfferItemTemplate
          .replaceAll(
            /{{\s*sca_fg_offer_id\s*}}/gm,
            utils.handleStringRegex(id)
          )
          .replaceAll(
            /{{\s*sca_fg_offer_title\s*}}/gm,
            utils.handleStringRegex(title)
          )
          .replaceAll(
            /{{\s*sca_fg_offer_title_tooltip\s*}}/gm,
            utils.handleStringRegex(title)
          )
          .replaceAll(
            /{{\s*sca_fg_offer_img\s*}}/gm,
            utils.handleStringRegex(gifts[0].thumbnail, true)
          );
      })
      .join("\n");

    const listOffers = document.querySelectorAll(
      "#sca-fg-today-offer-iframe .sca-fg-body .sca-fg-offers .sca-fg-offer"
    );
    const todayOfferCheckedIds = todayOfferData
      .filter((offer) => offer.success)
      .map((item) => item.id);

    listOffers.forEach((offerElement) => {
      if (
        todayOfferCheckedIds.includes(
          offerElement.getAttribute("data-fg-offer-id")
        )
      ) {
        offerElement.classList.add("sca-offer-archived");
      } else {
        offerElement.classList.remove("sca-offer-archived");
      }
    });

    const createTooltip = (title, x, y) => {
      const tooltip = document.createElement("p");
      tooltip.className = "sca-fg-tooltip";
      tooltip.textContent = title;
      document.body.appendChild(tooltip);
      tooltip.style.top = y + "px";
      tooltip.style.left = x + "px";
      tooltip.style.display = "block";
    };

    const removeTooltip = () => {
      const tooltip = document.querySelector(".sca-fg-tooltip");
      if (tooltip) {
        tooltip.parentNode.removeChild(tooltip);
      }
    };

    const moveTooltip = (e) => {
      const tooltip = document.querySelector(".sca-fg-tooltip");
      if (tooltip) {
        tooltip.style.top = e.pageY + "px";
        tooltip.style.left = e.pageX + 5 + "px";
      }
    };

    const masterTooltips = document.querySelectorAll(".sca-offer-title");

    masterTooltips.forEach(function (element) {
      element.addEventListener("mouseenter", function (e) {
        const title = element.getAttribute(
          "data-sca-fg-today-offer-title-tooltip"
        );
        createTooltip(title, e.pageX + 5, e.pageY + 5);
      });
      element.addEventListener("mouseleave", function () {
        removeTooltip();
      });
      element.addEventListener("mousemove", moveTooltip);
    });

    //customize
    const customizeColor = todayOfferCustomize.widget_color;
    document.querySelector(
      "#sca-fg-today-offer-iframe .sca-fg-header"
    ).style.backgroundColor = customizeColor?.header_background_color;
    document.querySelector(
      "#sca-fg-today-offer-iframe .sca-fg-today-offer-title"
    ).style.color = customizeColor?.widget_title_color;
    document.querySelector(
      "#sca-fg-today-offer-iframe .sca-fg-today-offer-subtitle"
    ).style.color = customizeColor?.widget_subtitle_color;
    document.querySelector(
      "#sca-fg-today-offer-iframe .sca-fg-body"
    ).style.backgroundColor = customizeColor?.body_background_color;

    const todayOfferItemsTitle = document.querySelectorAll(
      "#sca-fg-today-offer-iframe .sca-offer-title"
    );
    todayOfferItemsTitle.forEach((todayOfferItemTitle) => {
      todayOfferItemTitle.style.color = customizeColor?.offer_title_color;
    });

    const todayOfferItemsDefault = document.querySelectorAll(
      "#sca-fg-today-offer-iframe .sca-fg-offer"
    );
    todayOfferItemsDefault.forEach((todayOfferItemDefault) => {
      todayOfferItemDefault.style.borderColor =
        customizeColor?.offer_default_color;
      todayOfferItemDefault.style.backgroundColor = `${customizeColor?.offer_default_color}40`;
    });

    const todayOfferItemsSuccess = document.querySelectorAll(
      "#sca-fg-today-offer-iframe .sca-fg-offer.sca-offer-archived"
    );
    todayOfferItemsSuccess.forEach((todayOfferItemSuccess) => {
      todayOfferItemSuccess.style.borderColor =
        customizeColor?.offer_success_color;
      todayOfferItemSuccess.style.backgroundColor = `${customizeColor?.offer_success_color}10`;
    });
  },
};

BogosIntegration.initBogos(Tapcart.variables.cart.items);

BogosIntegration.watchCartUpdate();
