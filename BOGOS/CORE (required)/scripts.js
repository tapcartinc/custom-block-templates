// Configure your Shopify domain and API Key

// You can find your store domain name in your Shopify admin under Online Store > Domains
const shopDomain = "YOUR SHOPIFY DOMAIN"; // e.g 'bogos-tapcart-integration.myshopify.com';

//Replace with API Key. Please contact support from Bogos to to receive key
const apiKey = "YOUR API KEY HERE";

// Do not make changes below this line //

const endpoint = "https://api.freegifts.io/api-partner";

const bogosApiPath = {
  bogos: "/bogos-v2",
  giftCustomize: "/gift-customize",
  productsSyncQuantity: "/products-sync-quantity",
};

localStorage.setItem("currentGiftsAdded", JSON.stringify({}));

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

const utils = {
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
  addToCart: (variants = []) => {
    const data = { lineItems: [] };
    for (const variant of variants) {
      data.lineItems.push({
        variantId: `${variant.variant_id}`,
        quantity: variant.quantity,
        attributes: [
          {
            key: "_source",
            value: "BOGOS",
          },
          {
            key: "_attribution",
            value: "BOGOS Tapcart Integration",
          },
        ],
      });

      const currentGiftsAdded = JSON.parse(
        localStorage.getItem("currentGiftsAdded")
      );
      currentGiftsAdded[variant.variant_id] =
        (currentGiftsAdded[variant.variant_id] ?? 0) + variant.quantity;
      localStorage.setItem(
        "currentGiftsAdded",
        JSON.stringify(currentGiftsAdded)
      );
    }

    Tapcart.actions.addToCart(data);
  },
  removeFromCart: (variants = [], minus = true) => {
    const data = { lineItems: [] };
    for (const variant of variants) {
      data.lineItems.push({
        variantId: `${variant.variant_id}`,
        quantity: variant.quantity,
        attributes: [
          {
            key: "_source",
            value: "BOGOS",
          },
          {
            key: "_attribution",
            value: "BOGOS Tapcart Integration",
          },
        ],
      });

      if (minus) {
        const currentGiftsAdded = JSON.parse(
          localStorage.getItem("currentGiftsAdded")
        );
        currentGiftsAdded[variant.variant_id] =
          (currentGiftsAdded[variant.variant_id] ?? variant.quantity) -
          variant.quantity;
        localStorage.setItem(
          "currentGiftsAdded",
          JSON.stringify(currentGiftsAdded)
        );
      }
    }

    Tapcart.actions.removeFromCart(data);
  },
  watchCartUpdate: () => {
    Tapcart.registerEventHandler("cart/updated", async function (event) {
      await BogosIntegration.initBogos(event.cart.items);
    });
  },
  initBogos: async (cartItems) => {
    if (cartItems.length === 0) {
      return;
    }
    const currentGiftsAdded = JSON.parse(
      localStorage.getItem("currentGiftsAdded")
    );
    const checkHackGift = cartItems.some((item) => {
      return (
        currentGiftsAdded[item.variantId] != undefined &&
        item.quantity > currentGiftsAdded[item.variantId]
      );
    });

    const checkIsGiftsOnly = cartItems.every((item) => {
      return currentGiftsAdded[item.variantId] != undefined;
    });

    if (checkHackGift) {
      cartItems.forEach((item) => {
        if (item.quantity > currentGiftsAdded[item.variantId]) {
          BogosIntegration.removeFromCart(
            [
              {
                variant_id: item.variantId,
                quantity: item.quantity - currentGiftsAdded[item.variantId],
              },
            ],
            false
          );
        }
      });
      return;
    }

    if (checkIsGiftsOnly) {
      const dataRemove = cartItems.map((item) => {
        return { variant_id: item.variantId, quantity: item.quantity };
      });
      BogosIntegration.removeFromCart(dataRemove);
      return;
    }

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
      BogosIntegration.handleLogicBogosGifts(res);
    } catch (e) {
      Tapcart.actions.showToast({
        message: JSON.stringify(e.message),
        type: "success", // "success" || "error"
      });
      return;
    }
  },
  handleLogicBogosGifts: (bogosData) => {
    const bogosGiftToAdd = bogosData?.gifts_change?.add ?? [];
    const bogosGiftToUpdate = bogosData?.gifts_change?.update ?? [];
    const todayOfferData = bogosData?.today_offers?.data ?? [];

    if (bogosGiftToUpdate.length > 0) {
      const bogosGiftFilteredToRemove =
        BogosIntegration.handleGiftToRemove(bogosGiftToUpdate);
      BogosIntegration.removeFromCart(bogosGiftFilteredToRemove);
    }

    if (bogosGiftToAdd.length > 0) {
      BogosIntegration.addToCart(bogosGiftToAdd);
    }
  },
  handleGiftToRemove: (bogosGiftToUpdate) => {
    const cartItems = Tapcart.variables.cart.items ?? [];

    return bogosGiftToUpdate
      .map((bogosGift) => {
        const cartItemFound = cartItems.find(
          (cartItem) => cartItem.variantId == bogosGift.variant_id
        );

        if (cartItemFound) {
          return {
            variant_id: cartItemFound.variantId,
            quantity: Math.abs(cartItemFound.quantity - bogosGift.quantity),
          };
        }
        return null;
      })
      .filter((item) => item !== null);
  },
};

BogosIntegration.initBogos(Tapcart.variables.cart.items);

BogosIntegration.watchCartUpdate();
