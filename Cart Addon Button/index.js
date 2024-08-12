// * Config
const ICON_URL = 'https://cdn-icons-png.flaticon.com/512/2759/2759804.png';
const BUTTON_TEXT = 'Add Gift Wrapping';

// The variant ID to observe (which item will be added to the cart)
const VARIANT_ID = 1234567890;
// * Config

// !! dev
const container = document.querySelector('#container');
// If this array contains any device IDs, the block will ONLY display for THOSE devices.
// If the array is empty, it will display for ALL devices.
const DEV_DEVICE_IDS = [];
// !! dev

const shouldHide =
    Boolean(DEV_DEVICE_IDS.length && !DEV_DEVICE_IDS.includes(Tapcart.variables.device.id)) ||
    [ICON_URL, BUTTON_TEXT, VARIANT_ID].some((arg) => !arg);

const root = document.querySelector('#root');

const renderButton = ({ iconUrl, buttonText }) => {
    const button = document.createElement('button');

    const icon = document.createElement('img');
    icon.src = iconUrl;

    const text = document.createElement('span');
    text.textContent = buttonText;

    button.appendChild(icon);
    button.appendChild(text);

    root.appendChild(button);
    return button;
};

const cart = {
    has: (variantId) =>
        Tapcart.variables.cart.items.some((item) => {
            return item.variantId === variantId.toString();
        }),
    addLineItem: (variantId) =>
        Tapcart.actions.addToCart({
            lineItems: [{ quantity: 1, variantId: variantId.toString() }],
        }),
};

function main() {
    if (shouldHide) return;

    // If the cart doesn't currently have a gift box, show the button
    if (!cart.has(VARIANT_ID)) root.classList.add('expanded');

    const button = renderButton({
        iconUrl: ICON_URL,
        buttonText: BUTTON_TEXT,
    });

    // Attempt to add the item to cart
    button.addEventListener('click', () => cart.addLineItem(VARIANT_ID));

    // Once successfully updated, hide/show the widget
    Tapcart.registerEventHandler('cart/updated', () =>
        root.classList[cart.has(VARIANT_ID) ? 'remove' : 'add']('expanded')
    );
}

main();
