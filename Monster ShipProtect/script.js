// The Monster ShipProtect widget behaves as following when on Shopify:
// On initial render, it is "selected", but not "added" to the cart.
// If the shipping protection is currently "added" to the cart at initial render, remove it.
// Once the "checkout" button is clicked, "add" the plan to cart (if "selected").
//
// This widget differs: There is no distinction between "selected" and "added".
// On initial render, it is auto-selected & added to the cart (if not already).
// When deselected, the plan is removed from the cart.
// Therefore, this Custom Block adds the plan to cart by default when displayed.
//
// In addition, the price will only display for customers using the base currency.

// * Config
const MY_SHOPIFY_URL = 'YOUR-SHOP-ID.myshopify.com';
// * Config

// !! dev
const container = document.querySelector('#container');
// If this array contains any device IDs, the block will ONLY display for THOSE devices.
const DEV_DEVICE_IDS = [];

container.style.display =
    DEV_DEVICE_IDS.length && DEV_DEVICE_IDS.includes(Tapcart.variables.device.id)
        ? 'block'
        : 'none';
// !! dev

const SHIPPROTECT_WIDGET_SCRIPT =
    'https://d251mvgxooh3cj.cloudfront.net/static/js/script_tags/protect_renderer.gz.js';

// Main element used as an anchor for the widget
const root = document.querySelector('#root');

// Override global variables used by the widget
window.monster_protection_selectors = ['#root'];
window.Shopify = {
    shop: MY_SHOPIFY_URL,
    currency: {
        active: Tapcart.variables.cart.currency, // USD, AUD, USD
        rate: '1.0',
    },
};

// Prevent the widget from defining this function, which may be called
// and trigger same-origin API calls invalid in the Custom Block context.
Object.defineProperty(window, 'addShipProtect', {
    get() {
        return () => {};
    },
    set() {},
});

// Inject a script into the page, and wait for it to be loaded.
const injectScript = (src) =>
    new Promise((resolve, reject) => {
        const tag = Object.assign(document.createElement('script'), {
            src,
            onload: resolve,
            onerror: reject,
        });

        root.appendChild(tag);
    });

/**
 * Prevent XHR requests on the page from occurring with "intercept". Spoof response bodies with handleResponse().
 *
 * Listen to XHR requests on the page with "sniff". Read the response of a request with readResponse().
 *
 * config:
 * {
 *   intercept: {
 *     [someIdentifier: string]: {
 *       shouldIntercept: (data: { url: string; method: string; }) => boolean;
 *       handleResponse: (requestBody: any) => string;
 *     },
 *   },
 *   sniff: {
 *     [someIdentifier: string]: {
 *       shouldSniff: (data: { url: string; method: string; }) => boolean;
 *       readResponse: (responseBody: any) => void;
 *     }
 *   },
 * }
 */
const requestInterceptor = (config) => {
    window.XMLHttpRequest = class InterceptedXMLHttpRequest extends window.XMLHttpRequest {
        #interceptionId = null;
        #readyState = this.UNSENT;
        #responseText = '';
        #sniffId = null;

        constructor() {
            super();
        }

        get responseType() {
            return this.#interceptionId ? 'json' : super.responseType;
        }

        get statusText() {
            return this.#interceptionId ? 'OK' : super.statusText;
        }

        get status() {
            return this.#interceptionId ? 200 : super.status;
        }

        get readyState() {
            return this.#interceptionId ? this.#readyState : super.readyState;
        }

        get response() {
            return this.#interceptionId ? this.#responseText : super.response;
        }

        get responseText() {
            return this.#interceptionId ? this.#responseText : super.responseText;
        }

        open(method, url, async, username, password) {
            this.#sniffId =
                Object.keys(config.sniff).find((key) => {
                    return config.sniff[key].shouldSniff({ url, method });
                }) ?? null;

            if (this.#sniffId) {
                ['load', 'readystatechange', 'error'].forEach((eventName) => {
                    super.addEventListener(eventName, () => {
                        if (super.readyState !== super.DONE) return;
                        config.sniff[this.#sniffId].readResponse(super.responseText);
                    });
                });
            }

            this.#interceptionId =
                Object.keys(config.intercept).find((key) => {
                    return config.intercept[key].shouldIntercept({ url, method });
                }) ?? null;

            if (this.#interceptionId) {
                this.#readyState = this.OPENED;
                this.dispatchEvent(new Event('readystatechange'));
                return;
            }

            return super.open(method, url, async, username, password);
        }

        getAllResponseHeaders() {
            if (this.#interceptionId) {
                return ['Content-Type: application/json'].join('\r\n');
            }

            return super.getAllResponseHeaders();
        }

        setRequestHeader(name, value) {
            if (this.#interceptionId) return;

            return super.setRequestHeader(name, value);
        }

        send(body) {
            if (this.#interceptionId) {
                this.#responseText =
                    config.intercept[this.#interceptionId].handleResponse(body) ?? '';
                const byteLength = new TextEncoder().encode(this.#responseText).length;

                // Fire fake events at the beginning of the next event loop
                // Allow time for listeners to register
                setTimeout(() => {
                    this.#readyState = this.DONE;
                    this.dispatchEvent(new Event('readystatechange'));

                    ['load', 'loadend'].forEach((type) => {
                        this.dispatchEvent(
                            new ProgressEvent(type, {
                                lengthComputable: true,
                                loaded: byteLength,
                                total: byteLength,
                            })
                        );
                    });
                }, 0);
                return;
            }

            return super.send(body);
        }
    };
};

// The customer may be using a checkbox or a toggle switch.
// Which element renders depends on configurations in Shopify.
const clickSwitch = () => {
    document.querySelector('div.react-switch-bg')?.click();
    document.querySelector('div[class^="monsterCheckbox"]')?.click();
};

const cart = {
    // Returns the line item corresponding to the variantId.
    // If it doesn't exist, will be undefined.
    findLineItem: (variantId) =>
        Tapcart.variables.cart?.items?.find((item) => {
            return item.variantId === variantId.toString();
        }),
    // Adds a single quantity of a variantId to the cart.
    addVariant: (variantId) =>
        Tapcart.actions.addToCart({
            lineItems: [
                {
                    quantity: 1,
                    variantId: variantId.toString(),
                },
            ],
        }),
    // Remove a line item found with findLineItem().
    removeItem: (lineItem) =>
        Tapcart.actions.removeFromCart({
            lineItems: [lineItem],
        }),
};

async function main() {
    // Before injecting the script, begin listening for requests on the page, made by the widget
    requestInterceptor({
        intercept: {
            fetchCart: {
                // The widget, originally meant to run on Shopify, calls /cart.js (same origin)
                // If the cart has any ShipProtect items, it clears them out with a call to /cart/change.js
                // After /cart/change.js is called, the window is reloaded with location.reload()
                // That's a problem - reloads the entire Custom Block, causing an infinite loop.
                //
                // Intercepting /cart/change.js is possible, however it's impossible to change the
                // behavior of location.reload() through overrides (reassignment, redefining properties, etc.)
                // window.location is readonly
                shouldIntercept: ({ url, method }) => method === 'GET' && url.endsWith('/cart.js'),
                // We avoid the /cart/change.js call (and /cart/add.js calls) by tricking the widget into
                // believing the item is never added to the cart.
                // Hence empty array
                handleResponse: () => JSON.stringify({ items: [] }),
            },
        },
        sniff: {
            // The widget fetches a Monster API endpoint (not publicly documented) for info about the Shopify store
            fetchMonsterProtectionInfo: {
                shouldSniff: ({ url, method }) =>
                    method === 'GET' && url.includes('public/protect?shop='),
                // The response includes the widget's text & price info in the base currency
                readResponse: (response) => {
                    const { data } = JSON.parse(response);
                    console.log(data);

                    // We are unable to display accurate price amounts for currencies
                    // other than the Shopify account's primary one.
                    if (Tapcart.variables.cart.currency !== data.currency) {
                        // "Hide" the price from customers using other currencies.
                        window.monster_protection_money_format = ' ';
                    }
                },
            },
        },
    });

    // If the user manually removes the ShipProtect variant from cart & the switch is "selected", auto-deselect it
    Tapcart.registerEventHandler('cart/updated', (data) => {
        const shipProtectVariant = window.monster_protection_variant;
        const variantLineItem = cart.findLineItem(shipProtectVariant);

        const selected = window.monster_protection_selected;

        if (!variantLineItem && selected) {
            console.log('Removing ShipProtect from cart.');
            // Sets window.monster_protection_selected = false
            // Triggers a call to the notifyMonsterUpsells() listener, however it does nothing to the
            // cart because the switch is deselected, and the item is already not in the cart.
            clickSwitch();
        }
    });

    await injectScript(SHIPPROTECT_WIDGET_SCRIPT);

    // Listen for calls to the switch
    window.notifyMonsterUpsells = () => {
        const shipProtectVariant = window.monster_protection_variant;

        const variantLineItem = cart.findLineItem(shipProtectVariant);
        const inCart = Boolean(variantLineItem);

        const shouldAddToCart = window.monster_protection_selected;
        const shouldRemoveFromCart = !shouldAddToCart;

        // Only add to cart if not already present
        if (!inCart && shouldAddToCart) {
            console.log('Adding ShipProtect to cart.');
            return cart.addVariant(shipProtectVariant);
        }

        if (inCart && shouldRemoveFromCart) {
            console.log('Removing ShipProtect from cart.');
            return cart.removeItem(variantLineItem);
        }
    };
}

main();
