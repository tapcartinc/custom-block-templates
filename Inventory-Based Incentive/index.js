// * Config
const MY_SHOPIFY_URL = 'YOUR-SHOP-ID.myshopify.com';
const STOREFRONT_TOKEN = 'YOUR-STOREFRONT-TOKEN';

// type Threshold = {
//     inventoryAmount: number;
//     message: string;
//     color?: string;
// };
const THRESHOLDS = [
    {
        // If the quantity available of the current variant is lower
        // than this amount, display the message.
        inventoryAmount: 50,
        message: 'Very Low Inventory! Order Soon.',
        color: '#FF4439',
    },
    {
        inventoryAmount: 100,
        message: 'Low Inventory! Order Soon.',
    },
];
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

const getProductVariantQuantities = storefront(`#graphql
    query getProductVariantQuantities($productId: ID!) {
        product(id: $productId) {
            variants(first: 250) {
                edges {
                    node {
                        id
                        quantityAvailable
                    }
                }
            }
        }
    }
`);

// Generate a map of VariantID -> QuantityAvailable
const mapVariantQuantities = async (productId) => {
    const { data } = await getProductVariantQuantities({
        productId: `gid://shopify/Product/${productId}`,
    });

    return data.product.variants.edges.reduce((acc, { node }) => {
        const variantId = node.id.split('/').pop();
        acc[variantId] = node.quantityAvailable;
        return acc;
    }, {});
};

const stockThresholds = {
    sort: (thresholds) =>
        [...thresholds].sort((a, b) => (a.inventoryAmount > b.inventoryAmount ? 1 : -1)),
    aggregate: (thresholds) => (latestAmount) =>
        thresholds.find(({ inventoryAmount }) => latestAmount < inventoryAmount) || null,
};

const render = {
    message: (text, color = 'auto') => {
        container.textContent = text;
        container.style.color = color;
    },
};

const container = document.querySelector('#container');

async function main() {
    if (shouldHide) return;

    const variantQuantityMap = await mapVariantQuantities(Tapcart.variables.product.id);

    const getIncentiveThreshold = stockThresholds.aggregate(stockThresholds.sort(THRESHOLDS));

    const handleProductUpdate = () => {
        const selectedVariantId = Tapcart.variables.product?.selectedVariant.id;
        // Hide if no selected variant
        if (!selectedVariantId) return container.classList.add('hidden');

        const variantQuantityAvailable = variantQuantityMap[selectedVariantId];
        // Hide if quantity is null (no perms), 0, or undefined for some reason
        if (!variantQuantityAvailable) return container.classList.add('hidden');

        const threshold = getIncentiveThreshold(variantQuantityAvailable);
        // Hide if no matching threshold
        if (!threshold) return container.classList.add('hidden');

        render.message(threshold.message, threshold.color);
        container.classList.remove('hidden');
    };

    handleProductUpdate();

    let stopListenerFlag = false;
    const currentProductId = Tapcart.variables.product.id;
    Tapcart.registerEventHandler('product/updated', () => {
        if (stopListenerFlag) return;

        if (Tapcart.variables.product?.id !== currentProductId) {
            stopListenerFlag = true;
            main();
            return;
        }
    });
}

main();
