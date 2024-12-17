// Configure your Shopify domain and API Key

// You can find your store domain name in your Shopify admin under Online Store > Domains
const shopDomain = "YOUR SHOPIFY DOMAIN HERE"; // e.g 'bogos-tapcart-integration.myshopify.com';

//Replace with API Key. Please contact support from Bogos to to receive key
const apiKey = "YOUR API KEY HERE";

// Do not make changes below this line //

const endpoint = "https://api.freegifts.io/api-partner";

const bogosApiPath = {
  bogos: "/bogos-v2",
  giftCustomize: "/gift-customize",
  productsSyncQuantity: "/products-sync-quantity",
};

!(function (e) {
  "function" == typeof define && define.amd
    ? define(e)
    : "object" == typeof exports
    ? (module.exports = e())
    : e();
})(function () {
  var a = "undefined" != typeof window ? window : this,
    e = (a.Glider = function (e, t) {
      var o = this;
      if (e._glider) return e._glider;
      if (
        ((o.ele = e),
        o.ele.classList.add("glider"),
        ((o.ele._glider = o).opt = Object.assign(
          {},
          {
            slidesToScroll: 1,
            slidesToShow: 1,
            resizeLock: !0,
            duration: 0.5,
            easing: function (e, t, o, i, r) {
              return i * (t /= r) * t + o;
            },
          },
          t
        )),
        (o.animate_id = o.page = o.slide = 0),
        (o.arrows = {}),
        (o._opt = o.opt),
        o.opt.skipTrack)
      )
        o.track = o.ele.children[0];
      else
        for (
          o.track = document.createElement("div"), o.ele.appendChild(o.track);
          1 !== o.ele.children.length;

        )
          o.track.appendChild(o.ele.children[0]);
      o.track.classList.add("glider-track"),
        o.init(),
        (o.resize = o.init.bind(o, !0)),
        o.event(o.ele, "add", { scroll: o.updateControls.bind(o) }),
        o.event(a, "add", { resize: o.resize });
    }),
    t = e.prototype;
  return (
    (t.init = function (e, t) {
      var o,
        i = this,
        r = 0,
        s = 0,
        l =
          ((i.slides = i.track.children),
          [].forEach.call(i.slides, function (e, t) {
            e.classList.add("glider-slide"), e.setAttribute("data-gslide", t);
          }),
          (i.containerWidth = i.ele.clientWidth),
          i.settingsBreakpoint());
      (t = t || l),
        ("auto" !== i.opt.slidesToShow && void 0 === i.opt._autoSlide) ||
          ((o = i.containerWidth / i.opt.itemWidth),
          (i.opt._autoSlide = i.opt.slidesToShow =
            i.opt.exactWidth ? o : Math.max(1, Math.floor(o)))),
        "auto" === i.opt.slidesToScroll &&
          (i.opt.slidesToScroll = Math.floor(i.opt.slidesToShow)),
        (i.itemWidth = i.opt.exactWidth
          ? i.opt.itemWidth
          : i.containerWidth / i.opt.slidesToShow),
        [].forEach.call(i.slides, function (e) {
          (e.style.height = "auto"),
            (e.style.width = i.itemWidth + "px"),
            (r += i.itemWidth),
            (s = Math.max(e.offsetHeight, s));
        }),
        (i.track.style.width = r + "px"),
        (i.trackWidth = r),
        (i.isDrag = !1),
        (i.preventClick = !1),
        (i.move = !1),
        i.opt.resizeLock && i.scrollTo(i.slide * i.itemWidth, 0),
        (l || t) && (i.bindArrows(), i.buildDots(), i.bindDrag()),
        i.updateControls(),
        i.emit(e ? "refresh" : "loaded");
    }),
    (t.bindDrag = function () {
      function e() {
        (t.mouseDown = void 0),
          t.ele.classList.remove("drag"),
          t.isDrag && (t.preventClick = !0),
          (t.isDrag = !1);
      }
      var t = this;
      t.mouse = t.mouse || t.handleMouse.bind(t);
      function o() {
        t.move = !0;
      }
      var i = {
        mouseup: e,
        mouseleave: e,
        mousedown: function (e) {
          e.preventDefault(),
            e.stopPropagation(),
            (t.mouseDown = e.clientX),
            t.ele.classList.add("drag"),
            (t.move = !1),
            setTimeout(o, 300);
        },
        touchstart: function (e) {
          t.ele.classList.add("drag"), (t.move = !1), setTimeout(o, 300);
        },
        mousemove: t.mouse,
        click: function (e) {
          t.preventClick && t.move && (e.preventDefault(), e.stopPropagation()),
            (t.preventClick = !1),
            (t.move = !1);
        },
      };
      t.ele.classList.toggle("draggable", !0 === t.opt.draggable),
        t.event(t.ele, "remove", i),
        t.opt.draggable && t.event(t.ele, "add", i);
    }),
    (t.buildDots = function () {
      var e = this;
      if (e.opt.dots) {
        if (
          ("string" == typeof e.opt.dots
            ? (e.dots = document.querySelector(e.opt.dots))
            : (e.dots = e.opt.dots),
          e.dots)
        ) {
          (e.dots.innerHTML = ""),
            e.dots.setAttribute("role", "tablist"),
            e.dots.classList.add("glider-dots");
          for (
            var t = 0;
            t < Math.ceil(e.slides.length / e.opt.slidesToShow);
            ++t
          ) {
            var o = document.createElement("button");
            (o.dataset.index = t),
              o.setAttribute("aria-label", "Page " + (t + 1)),
              o.setAttribute("role", "tab"),
              (o.className = "glider-dot " + (t ? "" : "active")),
              e.event(o, "add", { click: e.scrollItem.bind(e, t, !0) }),
              e.dots.appendChild(o);
          }
        }
      } else e.dots && (e.dots.innerHTML = "");
    }),
    (t.bindArrows = function () {
      var o = this;
      o.opt.arrows
        ? ["prev", "next"].forEach(function (e) {
            var t = o.opt.arrows[e];
            (t = t && ("string" == typeof t ? document.querySelector(t) : t)) &&
              ((t._func = t._func || o.scrollItem.bind(o, e)),
              o.event(t, "remove", { click: t._func }),
              o.event(t, "add", { click: t._func }),
              (o.arrows[e] = t));
          })
        : Object.keys(o.arrows).forEach(function (e) {
            e = o.arrows[e];
            o.event(e, "remove", { click: e._func });
          });
    }),
    (t.updateControls = function (e) {
      var n = this,
        t =
          (e && !n.opt.scrollPropagate && e.stopPropagation(),
          n.containerWidth >= n.trackWidth),
        a =
          (n.opt.rewind ||
            (n.arrows.prev &&
              (n.arrows.prev.classList.toggle(
                "disabled",
                n.ele.scrollLeft <= 0 || t
              ),
              n.arrows.prev.setAttribute(
                "aria-disabled",
                n.arrows.prev.classList.contains("disabled")
              )),
            n.arrows.next &&
              (n.arrows.next.classList.toggle(
                "disabled",
                Math.ceil(n.ele.scrollLeft + n.containerWidth) >=
                  Math.floor(n.trackWidth) || t
              ),
              n.arrows.next.setAttribute(
                "aria-disabled",
                n.arrows.next.classList.contains("disabled")
              ))),
          (n.slide = Math.round(n.ele.scrollLeft / n.itemWidth)),
          (n.page = Math.round(n.ele.scrollLeft / n.containerWidth)),
          n.slide + Math.floor(Math.floor(n.opt.slidesToShow) / 2)),
        d = Math.floor(n.opt.slidesToShow) % 2 ? 0 : a + 1;
      1 === Math.floor(n.opt.slidesToShow) && (d = 0),
        n.ele.scrollLeft + n.containerWidth >= Math.floor(n.trackWidth) &&
          (n.page = n.dots ? n.dots.children.length - 1 : 0),
        [].forEach.call(n.slides, function (e, t) {
          var o = e.classList,
            e = o.contains("visible"),
            i = n.ele.scrollLeft,
            r = n.ele.scrollLeft + n.containerWidth,
            s = n.itemWidth * t,
            l = s + n.itemWidth,
            s =
              ([].forEach.call(o, function (e) {
                /^left|right/.test(e) && o.remove(e);
              }),
              o.toggle("active", n.slide === t),
              a === t || (d && d === t)
                ? o.add("center")
                : (o.remove("center"),
                  o.add(
                    [
                      t < a ? "left" : "right",
                      Math.abs(t - ((!(t < a) && d) || a)),
                    ].join("-")
                  )),
              Math.ceil(s) >= Math.floor(i) && Math.floor(l) <= Math.ceil(r));
          o.toggle("visible", s),
            s !== e &&
              n.emit("slide-" + (s ? "visible" : "hidden"), { slide: t });
        }),
        n.dots &&
          [].forEach.call(n.dots.children, function (e, t) {
            e.classList.toggle("active", n.page === t);
          }),
        e &&
          n.opt.scrollLock &&
          (clearTimeout(n.scrollLock),
          (n.scrollLock = setTimeout(function () {
            clearTimeout(n.scrollLock),
              0.02 < Math.abs(n.ele.scrollLeft / n.itemWidth - n.slide) &&
                (n.mouseDown ||
                  (n.trackWidth > n.containerWidth + n.ele.scrollLeft &&
                    n.scrollItem(n.getCurrentSlide())));
          }, n.opt.scrollLockDelay || 250)));
    }),
    (t.getCurrentSlide = function () {
      return this.round(this.ele.scrollLeft / this.itemWidth);
    }),
    (t.scrollItem = function (e, t, o) {
      o && o.preventDefault();
      var i,
        r = this,
        s = e,
        o = (++r.animate_id, r.slide),
        l =
          !0 === t
            ? (e = Math.round((e * r.containerWidth) / r.itemWidth)) *
              r.itemWidth
            : ("string" == typeof e &&
                ((l = "prev" === e),
                (e =
                  r.opt.slidesToScroll % 1 || r.opt.slidesToShow % 1
                    ? r.getCurrentSlide()
                    : r.slide),
                l ? (e -= r.opt.slidesToScroll) : (e += r.opt.slidesToScroll),
                r.opt.rewind &&
                  ((i = r.ele.scrollLeft),
                  (e =
                    l && !i
                      ? r.slides.length
                      : !l && i + r.containerWidth >= Math.floor(r.trackWidth)
                      ? 0
                      : e))),
              (e = Math.max(Math.min(e, r.slides.length), 0)),
              (r.slide = e),
              r.itemWidth * e);
      return (
        r.emit("scroll-item", { prevSlide: o, slide: e }),
        r.scrollTo(
          l,
          r.opt.duration * Math.abs(r.ele.scrollLeft - l),
          function () {
            r.updateControls(),
              r.emit("animated", {
                value: s,
                type: "string" == typeof s ? "arrow" : t ? "dot" : "slide",
              });
          }
        ),
        !1
      );
    }),
    (t.settingsBreakpoint = function () {
      var e = this,
        t = e._opt.responsive;
      if (t) {
        t.sort(function (e, t) {
          return t.breakpoint - e.breakpoint;
        });
        for (var o = 0; o < t.length; ++o) {
          var i = t[o];
          if (a.innerWidth >= i.breakpoint)
            return (
              e.breakpoint !== i.breakpoint &&
              ((e.opt = Object.assign({}, e._opt, i.settings)),
              (e.breakpoint = i.breakpoint),
              !0)
            );
        }
      }
      var r = 0 !== e.breakpoint;
      return (e.opt = Object.assign({}, e._opt)), (e.breakpoint = 0), r;
    }),
    (t.scrollTo = function (t, o, i) {
      var r = this,
        s = new Date().getTime(),
        l = r.animate_id,
        n = function () {
          var e = new Date().getTime() - s;
          (r.ele.scrollLeft =
            r.ele.scrollLeft +
            (t - r.ele.scrollLeft) * r.opt.easing(0, e, 0, 1, o)),
            e < o && l === r.animate_id
              ? a.requestAnimationFrame(n)
              : ((r.ele.scrollLeft = t), i && i.call(r));
        };
      a.requestAnimationFrame(n);
    }),
    (t.removeItem = function (e) {
      var t = this;
      t.slides.length &&
        (t.track.removeChild(t.slides[e]), t.refresh(!0), t.emit("remove"));
    }),
    (t.addItem = function (e) {
      this.track.appendChild(e), this.refresh(!0), this.emit("add");
    }),
    (t.handleMouse = function (e) {
      var t = this;
      t.mouseDown &&
        ((t.isDrag = !0),
        (t.ele.scrollLeft +=
          (t.mouseDown - e.clientX) * (t.opt.dragVelocity || 3.3)),
        (t.mouseDown = e.clientX));
    }),
    (t.round = function (e) {
      var t = 1 / (this.opt.slidesToScroll % 1 || 1);
      return Math.round(e * t) / t;
    }),
    (t.refresh = function (e) {
      this.init(!0, e);
    }),
    (t.setOption = function (t, e) {
      var o = this;
      o.breakpoint && !e
        ? o._opt.responsive.forEach(function (e) {
            e.breakpoint === o.breakpoint &&
              (e.settings = Object.assign({}, e.settings, t));
          })
        : (o._opt = Object.assign({}, o._opt, t)),
        (o.breakpoint = 0),
        o.settingsBreakpoint();
    }),
    (t.destroy = function () {
      function e(t) {
        t.removeAttribute("style"),
          [].forEach.call(t.classList, function (e) {
            /^glider/.test(e) && t.classList.remove(e);
          });
      }
      var t = this,
        o = t.ele.cloneNode(!0);
      t.opt.skipTrack || (o.children[0].outerHTML = o.children[0].innerHTML),
        e(o),
        [].forEach.call(o.getElementsByTagName("*"), e),
        t.ele.parentNode.replaceChild(o, t.ele),
        t.event(a, "remove", { resize: t.resize }),
        t.emit("destroy");
    }),
    (t.emit = function (e, t) {
      e = new a.CustomEvent("glider-" + e, {
        bubbles: !this.opt.eventPropagate,
        detail: t,
      });
      this.ele.dispatchEvent(e);
    }),
    (t.event = function (e, t, o) {
      var i = e[t + "EventListener"].bind(e);
      Object.keys(o).forEach(function (e) {
        i(e, o[e]);
      });
    }),
    e
  );
});

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

const BOGOS_GIFTS_SLIDE_TEMPLATE = `<div class="slide-container">
                                  <div class="fg-section-title">
                                      {{ fg_slider_title }}
                                  </div>
                                  <div class="glider-contain">
                                      <div class="glider bogos-gift-items" id="fg-gift-items"></div>
                                      <div>
                                          <button type="button" aria-label="Previous" class="glider-prev nav left-nav btn-nav-slide">❮</button>
                                      </div>
                                      <div>
                                          <button type="button" aria-label="Next" class="glider-next nav right-nav btn-nav-slide">❯</button>
                                      </div>
                                  </div>
                                  <div role="tablist" class="dots"></div>
  
                                  {{ sca_fg_disable_slider_section }}
                              </div>`;

const BOGOS_GIFT_ITEM_TEMPLATE = `<div class="d-flex product-item">
                                  <div class="product-content">
                                      <div class="top-content">
                                          <a class="gift-original-url" href="/products/{{ fg_product_handle }}" target="_blank">
                                              <img loading="lazy" class="product-item-thumbnail" src="{{ fg_product_img }}" alt="{{ fg_product_img_alt }}">
                                              <p class="product-title">{{ fg_product_title }}</p>
                                              <p class="product-title variant-title {{ fg_gifts_check_show_by_variants }}">
                                                  <span class="selected-variant {{ fg_check_selected_variant }}">
                                                      {{ fg_variant_title }}
                                                  </span>
                                              </p>
                                          </a>
                                      </div>
                                      <div class="d-flex bottom-content">
                                          <div class="d-flex price-section">
                                              <span class="original-price">
                                                  <del>{{ fg_original_price }}</del>
                                              </span>
                                              <span class="gift-price">{{ fg_gift_price }}</span>
                                          </div>
  
                                          <div class="dropdown {{ fg_gifts_check_show_by_products }}">
                                              <div class="select">
                                                  <span class="selected-variant {{ fg_check_selected_variant }}">
                                                      {{ fg_variant_title }}
                                                  </span>
                                                  <i class="fa fa-chevron-left"></i>
                                              </div>
                                              <ul class="dropdown-menu">
                                                  {{ sca_fg_variant_select_section }}
                                              </ul>
                                          </div>
  
                                          <button class="btn-add-to-cart" data-offer="{{ fg_product_belongs_to_offer }}" data-variant="{{ fg_variant_id }}">
                                              {{ fg_add_to_cart }}
                                          </button>
                                      </div>
                                  </div>
                              </div>`;

const BOGOS_GIFT_SELECT_SECTION = `<li class="variant-item" data-img="{{ fg_variant_img }}" id="{{ fg_variant_id }}" data-original-id="{{ fg_original_variant_id }}" data-price="{{ fg_variant_price }}" data-original-price="{{ fg_original_variant_price }}">
                                        {{ fg_variant_title }}
                                    </li>`;
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
  checkIsDefaultTitle: (title) => {
    return title === "Default Title";
  },
  renderOriginalProductTitle: (cloneProductTitle) => {
    return (
      cloneProductTitle
        .replace("»", "")
        .replace("🎁", "")
        .replace(/\(\d*% off\)/, "")
        .replace("(Discount)", "") ?? ""
    );
  },
  handleResizeGiftImage: (url, param, small) => {
    try {
      const giftImgCustomSize = small ? "&width=90&height=90" : param;

      let objUrl = new URL(url);
      const searchParam = new URLSearchParams(giftImgCustomSize);
      searchParam.forEach((value, key) => objUrl.searchParams.set(key, value));

      return objUrl.toString();
    } catch (e) {
      return url;
    }
  },
  initFormatMoney: () => {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: Tapcart.variables.cart.currency ?? "USD",
        minimumFractionDigits: 2,
      });
    } catch (e) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: Tapcart.variables.cart.currency ?? "USD",
      });
    }
  },
  renderOriginalPrice: (variant) => {
    return utils.initFormatMoney().format(variant?.original_price ?? 0);
  },
  renderGiftPrice: (variant) => {
    return utils.initFormatMoney().format(variant?.price ?? 0);
  },
  renderVariantSelectOptions: (variants, giftImg) => {
    const templateSection = BOGOS_GIFT_SELECT_SECTION;

    return variants
      .map((variant) =>
        templateSection
          .replaceAll(
            /{{\s*fg_variant_img\s*}}/gm,
            utils.handleStringRegex(
              utils.handleResizeGiftImage(variant.thumbnail ?? giftImg),
              true
            )
          )
          .replaceAll(
            /{{\s*fg_variant_id\s*}}/gm,
            utils.handleStringRegex(variant.id)
          )
          .replaceAll(
            /{{\s*fg_variant_price\s*}}/gm,
            utils.handleStringRegex(utils.renderGiftPrice(variant))
          )
          .replaceAll(
            /{{\s*fg_original_variant_price\s*}}/gm,
            utils.handleStringRegex(utils.renderOriginalPrice(variant))
          )
          .replaceAll(
            /{{\s*fg_variant_title\s*}}/gm,
            utils.handleStringRegex(variant.title)
          )
      )
      .join(" \n");
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
  removeFromCart: (variants = []) => {
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
      return;
    }
  },
  renderQuerySelectorAll: () => {
    let allButtonAddToCart = document.querySelectorAll(
      "#fg-gift-items .btn-add-to-cart"
    );
    let length = allButtonAddToCart.length;
    for (let i = 0; i < length; i++) {
      if (utils.empty(allButtonAddToCart[i].getAttribute("data-variant"))) {
        allButtonAddToCart[i].disabled = true;
        allButtonAddToCart[i].style.backgroundColor = "#82868b";
      }
    }

    document
      .querySelectorAll("#fg-gift-items .dropdown")
      .forEach((dropdownItem) =>
        dropdownItem.addEventListener("click", function () {
          this.setAttribute("tabindex", 1);
          this.focus();
          this.classList.toggle("active");
          this.querySelector(".dropdown-menu").classList.toggle("d-block");
        })
      );

    document
      .querySelectorAll("#fg-gift-items .dropdown")
      .forEach((dropdownItem) =>
        document.addEventListener("click", function (event) {
          const isClickInsideElement = dropdownItem.contains(event.target);
          if (!isClickInsideElement) {
            dropdownItem.classList.remove("active");
            dropdownItem
              .querySelector(".dropdown-menu")
              .classList.remove("d-block");
          }
          document
            .querySelectorAll(".btn-add-to-cart.sca-fg-out-stock")
            .forEach((addToCartBtn) => {
              addToCartBtn.disabled = true;
              addToCartBtn.style.backgroundColor = "#82868b";
            });
        })
      );

    document
      .querySelectorAll("#fg-gift-items .dropdown > .dropdown-menu > li")
      .forEach((liItem) => {
        liItem.addEventListener("click", function () {
          const selectedVariantID = this.getAttribute("id");
          const imgSelected = this.getAttribute("data-img");
          const price = this.getAttribute("data-price");
          const originalPrice = this.getAttribute("data-original-price");
          const originalVariantId = this.getAttribute("data-original-id");

          const blockImg =
            this.parentElement.parentElement.parentElement.parentElement;
          blockImg
            .querySelector(".product-item-thumbnail")
            .setAttribute("src", imgSelected);
          const hrefVariant = new URL(
            blockImg.querySelector(".gift-original-url").href
          );
          hrefVariant.searchParams.set("variant", originalVariantId);
          blockImg.querySelector(".gift-original-url").href =
            hrefVariant.toString();
          const blockBottom = this.parentElement.parentElement.parentElement;
          blockBottom.querySelector(".original-price del").textContent =
            originalPrice;
          blockBottom.querySelector(".gift-price").textContent = price;
          const btnAdd = blockBottom?.querySelector(".btn-add-to-cart");

          btnAdd.setAttribute("data-variant", selectedVariantID);
          btnAdd.disabled = false;
          btnAdd.style = "";
          let selectedText =
            this.parentElement.parentElement.querySelector(".selected-variant");
          selectedText.classList.add("active");
          selectedText.innerHTML = this.innerText;
        });
      });

    document
      .querySelectorAll("#fg-gift-items .btn-add-to-cart")
      .forEach((addCartBtn) =>
        addCartBtn.addEventListener("click", async function () {
          let variantID = this.getAttribute("data-variant") - 0;
          try {
            this.disabled = true;
            this.classList.add("bogos-gift-adding");
            this.innerHTML = "";
            BogosIntegration.addToCart([
              { variant_id: variantID, quantity: 1 },
            ]);
            this.classList.remove("bogos-gift-adding");
            this.classList.add("bogos-gift-added");
            this.disabled = false;
          } catch (err) {
            console.error("BOGOS track: error event click add-to-cart ", err);
          }
        })
      );
  },
  handleLogicBogosGifts: (bogosData) => {
    const bogosGiftSlider = bogosData?.popup ?? {};
    const bogosGiftSliderCustomize = bogosGiftSlider.customize;
    const sectionGift = document.querySelector(
      "#freegifts-main-page-container"
    );

    if (bogosGiftSlider.data.length > 0 && sectionGift) {
      sectionGift.classList?.toggle("freegifts-main-container", true);
      sectionGift.innerHTML = BOGOS_GIFTS_SLIDE_TEMPLATE.replaceAll(
        /{{\s*fg_slider_title\s*}}/gm,
        utils.handleStringRegex(
          bogosGiftSliderCustomize?.general?.gift_popup_title ??
            "Select your free gift!"
        )
      ).replaceAll(
        /{{\s*sca_fg_disable_slider_section\s*}}/gm,
        utils.handleStringRegex(
          BogosIntegration.BRAND_MARK_TEMPLATE(
            bogosGiftSliderCustomize?.others.hidden_brand_mark
          )
        )
      );

      BogosIntegration.renderBogosGiftSliderView(bogosGiftSlider);

      BogosIntegration.renderQuerySelectorAll();
    } else {
      sectionGift.innerHTML = `<div class="bogos-gift-slider-blank">Gift item has been successfully added to your cart</div>`;
    }
  },
  renderBogosGiftSliderView: (bogosGiftSlider) => {
    const arrGiftsData = bogosGiftSlider.data ?? [];
    let arrGiftShow = arrGiftsData;

    if (
      bogosGiftSlider.customize?.general?.show_gift_for_customer ===
      "by_variants"
    ) {
      arrGiftShow = [];
      for (const product of arrGiftsData) {
        const variants = product.variants;
        if (variants && variants.length) {
          variants.forEach((variant) =>
            arrGiftShow.push({
              ...product,
              thumbnail: variant.thumbnail,
              variants: [variant],
            })
          );
        }
      }
    }

    document.querySelectorAll(".bogos-gift-items").forEach((giftElement) => {
      giftElement.innerHTML = arrGiftShow
        .map((gift) => {
          const firstVariant = gift?.variants[0] ?? {
            title: null,
            id: null,
          };
          const { handle } = gift;
          const hasDefaultTitle = utils.checkIsDefaultTitle(firstVariant.title);
          const countVariants = gift.variants?.length;
          const productTitle = utils.handleStringRegex(
            utils.renderOriginalProductTitle(gift.title)
          );
          const showByVariants =
            bogosGiftSlider.customize?.general?.show_gift_for_customer ===
            "by_variants";

          const templateGiftItemSection = BOGOS_GIFT_ITEM_TEMPLATE;

          return templateGiftItemSection
            .replaceAll(
              /{{\s*fg_product_handle\s*}}/gm,
              utils.handleStringRegex(handle, true)
            )
            .replaceAll(
              /{{\s*fg_product_img\s*}}/gm,
              utils.handleStringRegex(
                utils.handleResizeGiftImage(
                  gift.thumbnail,
                  bogosGiftSlider.customize?.others?.gift_img_size ??
                    "&width=480&height=480"
                ),
                true
              )
            )
            .replaceAll(/{{\s*fg_product_img_alt\s*}}/gm, productTitle)
            .replaceAll(/{{\s*fg_product_title\s*}}/gm, productTitle)
            .replaceAll(
              /{{\s*fg_gifts_check_show_by_variants\s*}}/gm,
              utils.handleStringRegex(
                showByVariants &&
                  bogosGiftSlider.customize?.general?.show_variant_title
                  ? ""
                  : "sca-d-none"
              )
            )
            .replaceAll(
              /{{\s*fg_gifts_check_show_by_products\s*}}/gm,
              !showByVariants ? "" : "sca-d-none"
            )
            .replaceAll(
              /{{\s*fg_check_selected_variant\s*}}/gm,
              countVariants === 1
                ? `active ${hasDefaultTitle ? "sca-d-none" : ""}`
                : ""
            )
            .replaceAll(
              /{{\s*fg_variant_title\s*}}/gm,
              utils.handleStringRegex(
                countVariants !== 1
                  ? bogosGiftSlider.customize?.general?.select_gift_btn ??
                      "Select variant"
                  : firstVariant.title
              )
            )
            .replaceAll(
              /{{\s*fg_original_price\s*}}/gm,
              utils.handleStringRegex(utils.renderOriginalPrice(firstVariant))
            )
            .replaceAll(
              /{{\s*fg_gift_price\s*}}/gm,
              utils.handleStringRegex(utils.renderGiftPrice(firstVariant))
            )
            .replaceAll(
              /{{\s*sca_fg_variant_select_section\s*}}/gm,
              utils.handleStringRegex(
                utils.renderVariantSelectOptions(gift.variants, gift.thumbnail)
              )
            )
            .replaceAll(
              /{{\s*fg_product_belongs_to_offer\s*}}/gm,
              gift.belongs_to_offer
            )
            .replaceAll(
              /{{\s*fg_variant_id\s*}}/gm,
              utils.handleStringRegex(
                countVariants === 1 ? firstVariant.id : ""
              )
            )
            .replaceAll(
              /{{\s*fg_add_to_cart\s*}}/gm,
              utils.handleStringRegex(
                bogosGiftSlider.customize?.general?.add_to_cart_btn_title ??
                  "Add to cart"
              )
            );
        })
        .join(" \n");

      const parent = giftElement.parentElement.parentElement;
      new window.Glider(giftElement, {
        slidesToShow: 2,
        slidesToScroll: 1,
        draggable: false,
        dots: null,
        // bogosGiftSlider.customize?.general?.show_pagination
        //   ? parent?.querySelector('.dots')
        //   : null,
        arrows: {
          prev: parent?.querySelector(".glider-prev"),
          next: parent?.querySelector(".glider-next"),
        },
      });
    });

    // customize
    const customizeColor = bogosGiftSlider.customize?.color;
    document.querySelector(
      ".freegifts-main-container .fg-section-title"
    ).style.color = customizeColor?.gift_slider_title_color;

    const productsTitle = document.querySelectorAll(
      ".freegifts-main-container .product-title"
    );
    productsTitle.forEach((productTitle) => {
      productTitle.style.color = customizeColor?.product_title_color;
    });

    const productsOriginalPrice = document.querySelectorAll(
      ".freegifts-main-container .original-price"
    );
    productsOriginalPrice.forEach((productOriginalPrice) => {
      productOriginalPrice.style.color = customizeColor?.original_price_color;
    });

    const productsGiftPrice = document.querySelectorAll(
      ".freegifts-main-container .gift-price"
    );
    productsGiftPrice.forEach((productGiftPrice) => {
      productGiftPrice.style.color = customizeColor?.discounted_price_color;
    });

    const buttonsAddToCart = document.querySelectorAll(
      ".freegifts-main-container .btn-add-to-cart"
    );
    buttonsAddToCart.forEach((buttonAddToCart) => {
      buttonAddToCart.style.color = customizeColor?.add_to_cart_color;
      buttonAddToCart.style.backgroundColor =
        customizeColor?.add_to_cart_btn_color;
    });
  },
  getBogosGiftsInCart: () => {
    const giftItemsInCart = [];
    if (Tapcart.variables.cart?.items?.length > 0) {
      for (const item of Tapcart.variables.cart.items) {
        if (item?.attributes) {
          let isGiftItem = false;
          if (
            item.attributes.hasOwnProperty("_attribution") &&
            item.attributes._attribution === "BOGOS Tapcart Integration"
          ) {
            isGiftItem = true;
          }
          if (isGiftItem) {
            giftItemsInCart.push({
              productId: item.productId,
              variantId: Number(item.variantId),
              quantity: item.quantity,
            });
          }
        }
      }
    }

    return giftItemsInCart;
  },
};

if (localStorage.getItem("currentGiftsAdded") === null) {
  localStorage.setItem("currentGiftsAdded", JSON.stringify({}));
}

BogosIntegration.initBogos(Tapcart.variables.cart.items);

BogosIntegration.watchCartUpdate();
