// * Config
const TITLE = 'Product Details';
const CONTENT = Tapcart.variables.product?.description;
// * Config

// !! dev
// If this array contains any device IDs, the block will ONLY display for THOSE devices.
// If the array is empty, it will display for ALL devices.
const DEV_DEVICE_IDS = [];

const shouldHide = Boolean(
    (DEV_DEVICE_IDS.length && !DEV_DEVICE_IDS.includes(Tapcart.variables.device.id)) ||
        !TITLE ||
        !CONTENT
);
// !! dev

const container = document.querySelector('#container');
const summary = document.querySelector('#summary');

const headerContent = document.querySelector('#header > span');
const rawContent = document.querySelector('#content > #raw');

async function main() {
    if (shouldHide) return;

    headerContent.textContent = TITLE.toUpperCase();
    rawContent.innerHTML = CONTENT;

    summary.addEventListener('click', () => summary.classList.toggle('expanded'));

    container.classList.remove('hidden');
}

main();
