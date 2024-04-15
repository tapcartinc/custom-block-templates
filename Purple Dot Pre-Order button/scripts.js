wrapWithErrorTracking(() => {
  let selectedVariant = Tapcart.variables.product.selectedVariant.id;
  let currency = Tapcart.variables.cart.currency;
  const onlyAllowCurrencies = [];

  const apiKey = "<YOUR_API_KEY>";

  const instockButton = document.querySelector('#in-stock-button');
  const preorderButton = document.querySelector('#preorder-button');
  const dispatchDateDiv = document.querySelector('#waitlist-dispatch-date');
  const waitlistInfoDiv = document.querySelector('#waitlist-info');
  const learnMoreLink = document.querySelector('#learn-more-link');

  learnMoreLink.addEventListener('click', () => {
    Tapcart.actions.openScreen({
      destination: {
        type: "web",
        url: `https://www.purpledotprice.com/embedded-checkout/pre-order-value-prop?hideBackToProduct=true&isAddToPreorder=false&apiKey=${apiKey}&noModal=true&salesChannel=tapcart`
      }
    });
  });

  async function getPreorderStateForVariant(selectedVariant) {
    const url = new URL("https://www.purpledotprice.com/api/v1/variants/preorder-state");
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set('variant_id', selectedVariant);

    const resp = await fetch(url.toString());

    const data = await resp.json();

    if (resp.ok) {
      return {
        state: data.data.state,
        dispatchDate: data.data.waitlist.display_dispatch_date,
      };
    }

    Tapcart.actions.showToast({
      type: "error",
      message: `State response from Purple Dot backend: Error!`,
    });

    return null;
  }

  async function updatePreorderButtonForSelectedVariant(newSelectedVariant) {
    selectedVariant = newSelectedVariant;

    const data = await getPreorderStateForVariant(selectedVariant);

    let state = data.state;

    if (onlyAllowCurrencies.length && state === 'ON_PREORDER') {
      state = data.state === !onlyAllowCurrencies.includes(currency) ? 'SOLD_OUT' : state;
    }


    const dispatchDate = data.dispatchDate;

    document.querySelector("#preorder-button").style.display =
      state === "ON_PREORDER" ? "block" : "none";

    document.querySelector("#in-stock-button").style.display =
      state === "AVAILABLE_IN_STOCK" ? "block" : "none";

    document.querySelector("#sold-out-button").style.display =
      state === "SOLD_OUT" ? "block" : "none";

    if (state === "ON_PREORDER") {
      dispatchDateDiv.innerHTML = dispatchDate;
      waitlistInfoDiv.style.display = 'block';
    } else {
      dispatchDateDiv.innerHTML = '';
      waitlistInfoDiv.style.display = 'none';
    }
  }

  updatePreorderButtonForSelectedVariant(Tapcart.variables.product.selectedVariant.id);

  Tapcart.registerEventHandler("product/updated", async (eventData) => {
    await updatePreorderButtonForSelectedVariant(eventData.product.selectedVariant.id);
  });

  preorderButton.addEventListener('click', () => {
    Tapcart.actions.openScreen({
      destination: {
        type: "web",
        url: `https://www.purpledotprice.com/embedded/placements/checkout/express?apiKey=${apiKey}&variantId=${selectedVariant}&currency=${currency}&noModal=true&salesChannel=tapcart`
      }
    });
  });

  instockButton.addEventListener('click', () => {
    Tapcart.actions.addToCart({
      lineItems: [
        {
          variantId: selectedVariant,
          quantity: 1,
        },
      ],
    });
  });
});

window.addEventListener('unhandledrejection', async (event) => {
  await captureError(event.reason);
});

async function wrapWithErrorTracking(fn) {
  try {
    fn();
  } catch (e) {
    await captureError(e);
  }
}

async function captureError(error) {
  try {
    const url = new URL(`https://www.purpledotprice.com/api/v1/error`);

    url.searchParams.set('api_key', apiKey);

    const body = {
      name: error.name,
      message: error.message,
      stack: error.stack,
      href: window.location.href,
      referrer: window.document.referrer,
      salesChannel: 'tapcart',
    };

    void fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      keepalive: true,
    });
  } catch (err) {
    console.error('Error while trying to log an error!', err);
  }
}