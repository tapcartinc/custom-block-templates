// * Config
const MY_SHOPIFY_URL = 'YOUR-SHOP-ID.myshopify.com';
const STOREFRONT_TOKEN = 'YOUR-STOREFRONT-TOKEN';

// The title to display above the swatches. E.g. "Color"
const OPTION_TITLE = 'Color';

const util = {
    // Your own custom logic for retrieving the handle to the collection grouping the
    // products (e.g. one collection of the same shoe product, but different colors)
    // Products can also be grouped by tag
    getGroupTag: (product) => product.tags.find((tag) => tag.startsWith('style:')),
    // Your own custom logic for grabbing a given product's corresponding option (e.g. Black)
    getSelectedOptionName: (product) => {
        const selectedVariant = product.variants.find(
            ({ id }) => id === product.selectedVariant.id
        );

        return selectedVariant?.selectedOptions?.find(({ name }) => name.toLowerCase() === 'color')
            ?.value;
    },
};
// * Config

// !! dev
// If this array contains any device IDs, the block will ONLY display for THOSE devices.
// If the array is empty, it will display for ALL devices.
const DEV_DEVICE_IDS = [];

const shouldHide = Boolean(
    (DEV_DEVICE_IDS.length && !DEV_DEVICE_IDS.includes(Tapcart.variables.device.id)) ||
        !Tapcart.variables.product
);
// !! dev

const container = document.querySelector('#container');
const options = document.querySelector('#options');

const storefrontApi =
    (myShopifyUrl, token) =>
    (query) =>
    async (variables = {}) => {
        const url = `https://${myShopifyUrl}/api/2024-07/graphql.json`;

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': token,
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        });

        return res.json();
    };

const storefront = storefrontApi(MY_SHOPIFY_URL, STOREFRONT_TOKEN);

const getGroupProducts = storefront(`#graphql
    query getGroupProducts($query: String!) {
      products(first: 250, query: $query) {
          edges {
              node {
                  availableForSale
                  id
                  featuredImage {
                      url
                  }
                  variants(first: 250) {
                      edges {
                          node {
                              id
                              availableForSale
                              selectedOptions {
                                  name
                                  value
                              }
                          }
                      }
                  }
              }
          }
      }
  }
`);

const renderHeader = (optionName) => {
    const header = document.querySelector('#container > span') || document.createElement('span');
    header.innerHTML = `<b>${OPTION_TITLE}</b>: ${optionName}`;

    container.prepend(header);
};

const renderOption = ({ imageUrl, productId, variantId, available }) => {
    const label = document.createElement('label');
    if (!available) label.classList.add('unavailable');

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = OPTION_TITLE;
    input.value = productId;
    input.checked = productId === Tapcart.variables.product.id;

    const span = document.createElement('div');

    const image = document.createElement('img');
    image.src = imageUrl;

    span.appendChild(image);

    label.appendChild(input);
    label.appendChild(span);

    options.appendChild(label);

    label.addEventListener('click', (e) => {
        e.preventDefault();

        Tapcart.actions.openProduct({
            variantId,
            productId,
            isRelatedProduct: true,
        });
    });
};

const getSelectedVariant = () =>
    Tapcart.variables.product.variants.find(
        ({ id }) => id === Tapcart.variables.product.selectedVariant.id
    );

const getSelectedOptionMap = (variant) =>
    variant.selectedOptions.reduce((acc, { name, value }) => {
        acc[name] = value;
        return acc;
    }, {});

async function main() {
    if (shouldHide) return;

    // Grab the collection that holds all products in the group
    const groupTag = util.getGroupTag(Tapcart.variables.product);
    if (!groupTag) return;

    const { data } = await getGroupProducts({ query: `tag:${groupTag}` });

    const handleProductUpdate = () => {
        const selectedVariant = getSelectedVariant();
        const selectedOptionMap = getSelectedOptionMap(selectedVariant);

        data.products.edges.map(({ node: { featuredImage, id, variants, availableForSale } }) => {
            // Find the relevant variant so if selected, can be navigated to smoothly
            // without resetting variant.
            const { node: relevantVariant } =
                variants?.edges?.find(({ node }) =>
                    node.selectedOptions.every(
                        ({ name, value }) =>
                            name.toLowerCase() === 'color' || value === selectedOptionMap[name]
                    )
                ) ?? {};

            renderOption({
                imageUrl: featuredImage.url,
                productId: id.split('/').pop(),
                variantId: relevantVariant?.id?.split('/')?.pop(),
                available: relevantVariant?.availableForSale || availableForSale,
            });
        });

        const selectedOptionName = util.getSelectedOptionName(Tapcart.variables.product);
        renderHeader(selectedOptionName);
    };

    handleProductUpdate();

    let selectedVariant = getSelectedVariant();

    Tapcart.registerEventHandler('product/updated', () => {
        const selectedOptionName = util.getSelectedOptionName(Tapcart.variables.product);
        renderHeader(selectedOptionName);

        const latestVariant = getSelectedVariant();
        if (latestVariant?.id !== selectedVariant?.id) {
            options.innerHTML = '';
            handleProductUpdate();
        }
        selectedVariant = latestVariant;

        options[OPTION_TITLE].value = Tapcart.variables.product.id;
    });

    container.classList.remove('hidden');
}

main();
