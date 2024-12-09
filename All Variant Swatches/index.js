// * Config
// When this is set to "true" (opposed to "false"), out of stock options won't appear with a
// line through them until the user selects an option first
const NO_LINE_THROUGH_UNTIL_FIRST_SWATCH = true;
// * Config

// !! dev
// If this array contains any device IDs, the block will ONLY display for THOSE devices.
// If the array is empty, it will display for ALL devices.
const DEV_DEVICE_IDS = [];
// !! dev

const container = document.querySelector('#container');

// Allow multiple subscribers to SDK events
// The WebBridge SDK only allows one listener per event at a time
const sdkEvents = new EventTarget();
Tapcart.registerEventHandler('product/updated', ({ product }) =>
    sdkEvents.dispatchEvent(new CustomEvent('product/updated', { detail: product }))
);

// type ProductOptionValue = {
//     value: string;
//     getRelevantVariant: (selectedOptionMap: Record<string, string>) => {
//         relevantVariant: VariantType;
//         isSelected: boolean;
//     };
// };

// type ProductOption = {
//     name: string;
//     values: ProductOptionValue[];
// };

const util = {
    getSelectedVariant: (product) =>
        product.variants.find(({ id }) => id === product?.selectedVariant.id),
    getSelectedOptionMap: (variant) =>
        variant.selectedOptions.reduce((acc, { name, value }) => {
            acc[name] = value;
            return acc;
        }, {}),
    productOptions: () =>
        Tapcart.variables.product.options.map(({ name: optionName, values: optionValues }) => ({
            name: optionName,
            values: optionValues.map((optionValue) => ({
                value: optionValue,
                // To be called each time product/updated occurs, grabbing the latest relevant variants
                // for the particular option, with respect to other selected options
                getRelevantVariant: (selectedOptionMap) => {
                    const relevantVariant =
                        // First, try to find the variant which exactly matches the option &
                        // all currently selected options
                        Tapcart.variables.product.variants.find(({ selectedOptions }) =>
                            selectedOptions.every(({ name, value }) =>
                                name === optionName
                                    ? value === optionValue
                                    : selectedOptionMap[name] === value
                            )
                        ) ||
                        // Fall back to the first in-stock variant which matches the target option
                        Tapcart.variables.product.variants
                            .filter(({ selectedOptions }) =>
                                selectedOptions.some(
                                    ({ name, value }) =>
                                        name === optionName && value === optionValue
                                )
                            )
                            .sort((a, b) => {
                                if (a.isAvailable === b.isAvailable) return 0;
                                return a.isAvailable ? -1 : 1;
                            })
                            .shift();

                    const isSelected = relevantVariant.selectedOptions.every(
                        ({ name, value }) => selectedOptionMap[name] === value
                    );

                    return {
                        relevantVariant,
                        isSelected,
                    };
                },
            })),
        })),
};

const render = {
    // Render a set of variant swatches for a given productId
    // Must be re-rendered if productId is to change
    swatches: (productId, productOption) => {
        const swatchesWrapper = document.createElement('div');
        swatchesWrapper.classList.add('swatches-wrapper');

        const titleElement = document.createElement('p');
        titleElement.classList.add('swatch-title');

        const swatchesContainer = document.createElement('form');
        swatchesContainer.classList.add('swatches-container');

        const optionValues = productOption.values.map((option) => {
            const swatchElement = document.createElement('label');
            swatchElement.classList.add('swatch');

            const swatchInputElement = document.createElement('input');
            swatchInputElement.type = 'radio';
            swatchInputElement.name = productOption.name;
            swatchInputElement.value = option.value;

            const swatchContentElement = document.createElement('div');
            swatchContentElement.classList.add('content');
            swatchContentElement.textContent = option.value;

            swatchElement.appendChild(swatchInputElement);
            swatchElement.appendChild(swatchContentElement);

            swatchElement.addEventListener('click', (e) => {
                e.preventDefault();

                const { relevantVariant } = option.getRelevantVariant(
                    util.getSelectedOptionMap(util.getSelectedVariant(Tapcart.variables.product))
                );

                Tapcart.actions.openProduct({
                    isRelatedProduct: true,
                    variantId: relevantVariant.id,
                    productId,
                });
            });

            return {
                ...option,
                element: swatchElement,
            };
        });

        optionValues.forEach(({ element }) => swatchesContainer.appendChild(element));

        swatchesWrapper.appendChild(titleElement);
        swatchesWrapper.appendChild(swatchesContainer);

        const handleProductUpdate = () => {
            // Swatches only apply to the initial product
            if (Tapcart.variables.product?.id !== productId) {
                sdkEvents.removeEventListener('product/updated', handleProductUpdate);
                return;
            }

            const selectedOptionMap = util.getSelectedOptionMap(
                util.getSelectedVariant(Tapcart.variables.product)
            );

            // Update swatch available/unavailable state based on latest relevant variants
            optionValues.forEach(({ getRelevantVariant, element }) => {
                const { relevantVariant } = getRelevantVariant(selectedOptionMap);

                element.classList[relevantVariant.isAvailable ? 'remove' : 'add']('unavailable');
            });

            // Update rendered state based on latest true state
            const selectedOption = selectedOptionMap[productOption.name];

            swatchesContainer[productOption.name].value = selectedOption;
            titleElement.textContent = `${productOption.name}: ${selectedOption}`;
        };
        handleProductUpdate();
        sdkEvents.addEventListener('product/updated', handleProductUpdate);

        container.appendChild(swatchesWrapper);
    },
};

async function main() {
    const shouldHide =
        Boolean(DEV_DEVICE_IDS.length && !DEV_DEVICE_IDS.includes(Tapcart.variables.device.id)) ||
        !Tapcart.variables.product;

    if (shouldHide) return container.classList.add('hidden');

    let init = NO_LINE_THROUGH_UNTIL_FIRST_SWATCH ? true : false;
    if (init) container.classList.add('init');

    const productId = Tapcart.variables.product.id;

    util.productOptions().forEach((option) => render.swatches(productId, option));

    const handleProductUpdate = () => {
        // Re-render swatches completely if a new product is navigated to
        if (Tapcart.variables.product?.id !== productId) {
            sdkEvents.removeEventListener('product/updated', handleProductUpdate);
            container.classList.add('hidden');
            container.innerHTML = '';

            main();
            return;
        }

        // Once initial swatch occurs, remove init state, allowing "unavailable"
        // options to begin appearing with line-through
        if (init) {
            init = false;
            container.classList.remove('init');
        }
    };
    sdkEvents.addEventListener('product/updated', handleProductUpdate);

    container.classList.remove('hidden');
}

main();
