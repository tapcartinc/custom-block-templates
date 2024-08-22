// * Config
const OPTION_NAME = 'Color';
// * Config

// !! dev
// If this array contains any device IDs, the block will ONLY display for THOSE devices.
// If the array is empty, it will display for ALL devices.
const DEV_DEVICE_IDS = [];

const shouldHide = Boolean(
    (DEV_DEVICE_IDS.length && !DEV_DEVICE_IDS.includes(Tapcart.variables.device.id)) ||
        !Tapcart.variables.product ||
        // Only render if the active product has the target option
        !Tapcart.variables.product.options?.some(({ name }) => name === OPTION_NAME)
);
// !! dev

const container = document.querySelector('#container');
const options = document.querySelector('#options');

// Grab the currently selected variant
const getSelectedVariant = () =>
    Tapcart.variables.product.variants.find(
        ({ id }) => id === Tapcart.variables.product.selectedVariant.id
    );

// Grab the relevant selected option from a given variant (e.g. grab the selected Color from a variant)
// According to OPTION_NAME
const getVariantOption = (variant) => {
    const { value: optionValue } =
        variant.selectedOptions?.find(({ name }) => name === OPTION_NAME) ?? {};

    return optionValue;
};

const aggregateOptions = (product) => {
    return Object.values(
        product.variants.reduce((acc, variant) => {
            const optionValue = getVariantOption(variant);

            // Reduce options, excluding duplicates
            if (
                optionValue &&
                (!(optionValue in acc) ||
                    (!acc[optionValue].variant.isAvailable && variant.isAvailable))
            ) {
                acc[optionValue] = {
                    option: optionValue,
                    variant,
                };
            }

            return acc;
        }, {})
    );
};

const renderOption = (name, variant) => {
    const selectedOption = getVariantOption(getSelectedVariant());

    const label = document.createElement('label');

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = OPTION_NAME;
    input.value = name;
    input.checked = selectedOption === name;

    const display = document.createElement('div');

    const image = document.createElement('img');
    image.src = variant.image;

    display.appendChild(image);

    label.appendChild(input);
    label.appendChild(display);

    options.appendChild(label);

    label.addEventListener('click', (e) => {
        e.preventDefault();

        Tapcart.actions.openProduct({
            productId: Tapcart.variables.product.id,
            variantId: variant.id,
            isRelatedProduct: true,
        });
    });
};

const renderHeader = (selectedOption) => {
    const header = document.querySelector('#container > span') || document.createElement('span');
    header.innerHTML = `<b>${OPTION_NAME}</b>: ${selectedOption}`;

    container.prepend(header);
};

async function main() {
    if (shouldHide) return;

    aggregateOptions(Tapcart.variables.product).forEach(({ option, variant }) =>
        renderOption(option, variant)
    );

    const selectedOption = getVariantOption(getSelectedVariant());
    renderHeader(selectedOption);

    Tapcart.registerEventHandler('product/updated', () => {
        const selectedOption = getVariantOption(getSelectedVariant());

        options[OPTION_NAME].value = selectedOption;
        renderHeader(selectedOption);
    });

    container.classList.remove('hidden');
}

main();
