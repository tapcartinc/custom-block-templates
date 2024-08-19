// !! dev
// If this array contains any device IDs, the block will ONLY display for THOSE devices.
// If the array is empty, it will display for ALL devices.
const DEV_DEVICE_IDS = [];

const shouldHide = Boolean(
    (DEV_DEVICE_IDS.length && !DEV_DEVICE_IDS.includes(Tapcart.variables.device.id)) ||
        !Tapcart.variables.product.selectedVariant.id
);
// !! dev

const container = document.querySelector('#container');

const calculatePercentage = (a, b) => (a / b) * 100;

const renderPercentage = (selectedVariant) => {
    const regularPrice = selectedVariant?.compareAtPrice;
    const salePrice = selectedVariant?.price;
    const notOnSale = !regularPrice || salePrice >= regularPrice;

    if (notOnSale) return container.classList.add('hidden');
    container.classList.remove('hidden');

    const percent = Math.round(calculatePercentage(regularPrice - salePrice, regularPrice));
    container.textContent = `(Save ${percent}%)`;
};

const getSelectedVariant = () =>
    Tapcart.variables.product.variants.find(
        ({ id }) => id === Tapcart.variables.product.selectedVariant.id
    );

function main() {
    if (shouldHide) return;

    const variant = getSelectedVariant();
    renderPercentage(variant);

    // Render the sale savings amount any time a new variant is selected
    Tapcart.registerEventHandler('product/updated', () => {
        const variant = getSelectedVariant();
        renderPercentage(variant);
    });
}

main();
