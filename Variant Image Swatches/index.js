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

const mapSelectedOptions = (variant) =>
    variant.selectedOptions.reduce((acc, { name, value }) => {
        acc[name] = value;
        return acc;
    }, {});

const aggregateOptions = (product) => {
    const selectedOptionsMap = mapSelectedOptions(getSelectedVariant());

    return Object.values(
        product.variants.reduce((acc, variant) => {
            const optionValue = getVariantOption(variant);

            const matchesParentOptions = variant.selectedOptions.every(
                ({ name, value }) => name === OPTION_NAME || value === selectedOptionsMap[name]
            );

            // Reduce options, excluding duplicates
            if (
                optionValue &&
                matchesParentOptions &&
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
    if (!variant.isAvailable) label.classList.add('unavailable');

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

    aggregateOptions(Tapcart.variables.product)
        .sort((a, b) => (b.variant.isAvailable && !a.variant.isAvailable ? -1 : 0))
        .forEach(({ option, variant }) => renderOption(option, variant));

    const selectedOption = getVariantOption(getSelectedVariant());
    renderHeader(selectedOption);

    let stopListenerFlag = false;
    const selectedOptionsMap = mapSelectedOptions(getSelectedVariant());
    let activeProduct = Tapcart.variables.product.id;

    Tapcart.registerEventHandler('product/updated', () => {
        if (stopListenerFlag) return;

        const latestProduct = Tapcart.variables.product.id;
        const selectedVariant = getSelectedVariant();

        const matchesParentOptions = selectedVariant.selectedOptions.every(
            ({ name, value }) => name === OPTION_NAME || value === selectedOptionsMap[name]
        );

        // If the product switches, the variants swatch needs to switch to reflect
        // the latest product's variants. Re-render completely.
        if (latestProduct !== activeProduct || !matchesParentOptions) {
            stopListenerFlag = true;
            options.innerHTML = '';
            main();
            return;
        }

        const selectedOption = getVariantOption(selectedVariant);

        options[OPTION_NAME].value = selectedOption;
        renderHeader(selectedOption);
    });

    container.classList.remove('hidden');
}

main();
