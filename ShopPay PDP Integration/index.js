// * Config
const NUMBER_OF_INSTALLMENTS = 4;
// * Config

// !! dev
// If this array contains any device IDs, the block will ONLY display for THOSE devices.
// If the array is empty, it will display for ALL devices.
const DEV_DEVICE_IDS = [];

const shouldHide = Boolean(
    (DEV_DEVICE_IDS.length && !DEV_DEVICE_IDS.includes(Tapcart.variables.device.id)) ||
        Tapcart.variables.cart.currency !== 'USD' ||
        !Tapcart.variables.product
);
// !! dev

const SHOPPAY_LOGO_URL =
    'https://i.postimg.cc/Nfj8xGwL/shop-pay-logo-color-2e7f67bcfb1d8a2a67e6e2ce5410e1933d7ae23be80cdc99514c9876d5683636-1-1.png';

const container = document.querySelector('#container');

const getSelectedVariant = () =>
    Tapcart.variables.product.variants.find(
        (variant) => variant.id === Tapcart.variables.product.selectedVariant.id
    );

const roundToNearest = (num, nearest) => {
    const factor = 1 / nearest;
    return Math.round(num * factor) / factor;
};

const formatPrice = (price) => {
    const [dollars, [tenths = '0', hundredths = '0'] = []] = price.toString().split('.');
    return `$${dollars}.${tenths + hundredths}`;
};

const renderBanner = (variant) => {
    const span = document.createElement('span');
    span.id = 'banner';
    span.textContent = `Pay in full or in ${NUMBER_OF_INSTALLMENTS} interest-free payments of ${formatPrice(
        roundToNearest(variant.price / NUMBER_OF_INSTALLMENTS, 0.01)
    )} with`;

    const image = document.createElement('img');
    image.src = SHOPPAY_LOGO_URL;

    span.append(' ');
    span.appendChild(image);

    container.appendChild(span);
};

function main() {
    if (shouldHide) return;
    container.classList.remove('hidden');

    const renderForSelectedVariant = () => {
        document.querySelector('#banner')?.remove();

        const selectedVariant = getSelectedVariant();
        if (selectedVariant) renderBanner(selectedVariant);
    };

    renderForSelectedVariant();
    Tapcart.registerEventHandler('product/updated', () => {
        renderForSelectedVariant();
    });
}

main();
