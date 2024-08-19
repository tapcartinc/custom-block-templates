// * Config
const MY_SHOPIFY_URL = 'YOUR-SHOP-ID.myshopify.com';
const STOREFRONT_TOKEN = 'YOUR-STOREFRONT-TOKEN';

// The title to display above the swatches. E.g. "Color"
const OPTION_TITLE = 'Color';

const util = {
    // Your own custom logic for retrieving the handle to the collection grouping the
    // products (e.g. one collection of the same shoe product, but different colors)
    getCollectionHandle: (product) => product.metafields?.color_info?.colors_collection_handle,
    // Your own custom logic for grabbing a given product's corresponding option (e.g. Black)
    getSelectedOptionName: (product) => product.metafields?.color_info?.product_color,
};
// * Config

// !! dev
// If this array contains any device IDs, the block will ONLY display for THOSE devices.
// If the array is empty, it will display for ALL devices.
const DEV_DEVICE_IDS = [];
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

const getCollectionProducts = storefront(`#graphql
    query getCollection($handle: String!) {
        collection(handle: $handle) {
            products(first: 250) {
                edges {
                    node {
                        id
                        featuredImage {
                            url
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

const renderOption = ({ imageUrl, productId }) => {
    const label = document.createElement('label');

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
            productId,
            isRelatedProduct: true,
        });
    });
};

async function main() {
    const shouldHide = Boolean(
        (DEV_DEVICE_IDS.length && !DEV_DEVICE_IDS.includes(Tapcart.variables.device.id)) ||
            !Tapcart.variables.product
    );

    if (shouldHide) return;

    // Grab the collection that holds all products in the group
    const collectionHandle = util.getCollectionHandle(Tapcart.variables.product);
    if (!collectionHandle) return;

    const { data } = await getCollectionProducts({ handle: collectionHandle });
    console.log(data);
    data.collection.products.edges.map(({ node: { featuredImage, id } }) =>
        renderOption({
            imageUrl: featuredImage.url,
            productId: id.split('/').pop(),
        })
    );

    const selectedOptionName = util.getSelectedOptionName(Tapcart.variables.product);
    renderHeader(selectedOptionName);

    Tapcart.registerEventHandler('product/updated', () => {
        const selectedOptionName = util.getSelectedOptionName(Tapcart.variables.product);
        renderHeader(selectedOptionName);

        options[OPTION_TITLE].value = Tapcart.variables.product.id;
    });

    container.classList.remove('hidden');
}

main();
