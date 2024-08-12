// * Config
const MY_SHOPIFY_URL = 'YOUR-SHOP-ID.myshopify.com';
const STOREFRONT_TOKEN = 'YOUR-STOREFRONT-TOKEN';

const HEADER_TEXT = 'Some header text';
const COLLECTION_IDS = [];
// * Config

// !! dev
const container = document.querySelector('#container');
// If this array contains any device IDs, the block will ONLY display for THOSE devices.
// If the array is empty, it will display for ALL devices.
const DEV_DEVICE_IDS = [''];
// !! dev

const shouldHide =
    Boolean(DEV_DEVICE_IDS.length && !DEV_DEVICE_IDS.includes(Tapcart.variables.device.id)) ||
    [MY_SHOPIFY_URL, STOREFRONT_TOKEN, HEADER_TEXT].some((val) => !val) ||
    !COLLECTION_IDS.length;

const panel = document.querySelector('#panel');
const header = document.querySelector('#header');
const cards = document.querySelector('#cards');

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
const getCollections = storefront(`#graphql
    query getCollections {
    # Fetch multiple collections in a single query using query aliases
    ${COLLECTION_IDS.map((collectionId) => {
        const gid = `gid://shopify/Collection/${collectionId}`;

        return `#graphql
        _${collectionId}: collection(id: "${gid}") {
            id,
            title,
            image {
                url
            }
        }
    `;
    }).join(',\n')}
    }
`);

const renderCard = ({ imageUrl, title }) => {
    const card = document.createElement('button');
    card.classList.add('card');

    const imageWrapper = document.createElement('span');
    const image = document.createElement('img');
    image.src = imageUrl;
    imageWrapper.appendChild(image);

    const text = document.createElement('p');
    text.textContent = title;

    if (imageUrl) card.appendChild(imageWrapper);
    card.appendChild(text);

    cards.appendChild(card);
    return card;
};

async function main() {
    if (shouldHide) {
        container.style.display = 'none';
        return;
    }

    header.textContent = HEADER_TEXT;

    try {
        const collections = await getCollections();
        Object.values(collections.data).forEach(({ title, image, id }) => {
            const card = renderCard({
                imageUrl: image?.url,
                title,
            });

            const collectionId = id.split('/').pop();
            card.addEventListener('click', () => {
                Tapcart.actions.openCollection({ collectionId });
            });
        });
    } catch (error) {
        Tapcart.actions.showToast({
            message: `Failed to load collections for "${HEADER_TEXT}". Please reload.`,
            type: 'error',
        });
    }
}

main();
