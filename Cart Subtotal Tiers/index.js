// * Config
// type Threshold = {
//     amount: number;
//     title: string;
//     addToCart?: {
//         productId: string;
//         variantId: string;
//     };
// };
const THRESHOLDS = [
    {
        amount: 120,
        title: 'FREE Standard Shipping',
    },
    {
        amount: 175,
        title: 'FREE Expedited Shipping',
    },
    {
        amount: 250,
        title: 'FREE Super Duper Cool Shipping',
    },
    {
        amount: 750,
        title: 'FREE Trip To LA',
    },
    {
        amount: 950,
        title: 'FREE Laser Beam',
    },
    {
        amount: 1500,
        title: 'FREE Bigger Laser Beam',
    },
];
// * Config

// !! dev
// If this array contains any device IDs, the block will ONLY display for THOSE devices.
// If the array is empty, it will display for ALL devices.
const DEV_DEVICE_IDS = [];

const shouldHide = Boolean(
    DEV_DEVICE_IDS.length && !DEV_DEVICE_IDS.includes(Tapcart.variables.device.id)
);
// !! dev

const container = document.querySelector('#container');
const progress = document.querySelector('#progress');

const round = (num) => {
    const result = Math.round(num / 0.01) * 0.01;
    return parseFloat(result.toFixed(10));
};

// Cart utilities
const cart = {
    hasItem: (productId, variantId) =>
        Tapcart.variables.cart.items.find((item) => {
            return item.productId === productId && item.variantId === variantId;
        }),
};

// Utilities for managing thresholds
const tiers = {
    sort: (thresholds) => [...thresholds].sort((a, b) => (a.amount > b.amount ? 1 : -1)),
    aggregate: (thresholds) => async (currentAmount) =>
        thresholds.reduce(
            (acc, threshold) => {
                const crossed = currentAmount >= threshold.amount;
                if (crossed) acc.crossedCount++;

                acc.thresholds.push({
                    ...threshold,
                    crossed,
                });

                return acc;
            },
            { thresholds: [], crossedCount: 0 }
        ),
    runActions: (aggregated) => {
        // Aggregate lists of line items that need to be added/removed
        const { toAdd, toRemove } = aggregated.reduce(
            (acc, { addToCart, crossed }) => {
                if (!addToCart) return acc;

                const cartHasActionItem = cart.hasItem(addToCart.productId, addToCart.variantId);
                // Should add the item to cart if the threshold IS crossed, but
                // the item ISN'T in the cart
                const shouldAddToCart = crossed && !cartHasActionItem;

                // Inverse - should REMOVE the item from the cart if the threshold
                // isn't reached, but the item IS in the cart
                const shouldRemoveFromCart = !crossed && cartHasActionItem;

                if (shouldAddToCart) acc.toAdd.push({ quantity: 1, ...addToCart });
                if (shouldRemoveFromCart) acc.toRemove.push(cartHasActionItem);

                return acc;
            },
            { toAdd: [], toRemove: [] }
        );

        Tapcart.actions.removeFromCart({ lineItems: toRemove });
        Tapcart.actions.addToCart({ lineItems: toAdd });
    },
};

const render = {
    tierList: (titleContent) => {
        const tierListContainer = document.createElement('div');
        tierListContainer.id = 'tier-list';

        const tierListTitle = document.createElement('p');
        tierListTitle.textContent = titleContent;

        const tierList = document.createElement('ul');

        tierListContainer.appendChild(tierListTitle);
        tierListContainer.appendChild(tierList);

        return {
            append: () => container.prepend(tierListContainer),
            clear: () => void (tierList.innerHTML = ''),
            hide: () => tierListContainer.classList.add('hidden'),
            show: () => tierListContainer.classList.remove('hidden'),
            addItem: (threshold) => {
                const item = document.createElement('li');
                item.textContent = `${threshold.title} ($${threshold.amount})`;
                tierList.appendChild(item);
            },
        };
    },
    title: () => {
        const title = document.createElement('h4');

        return {
            append: () => progress.appendChild(title),
            setContent: (content) => (title.textContent = content),
        };
    },
    progressBar: (maxAmount) => {
        const progressBar = document.createElement('progress');

        progressBar.max = maxAmount;
        progressBar.value = 0;

        return {
            append: () => progress.appendChild(progressBar),
            setValue: (latestValue) => {
                // ? Limit value between 0 && maxAmount
                const updatedValue = Math.min(Math.max(0, latestValue), maxAmount);
                progressBar.value = updatedValue;
            },
        };
    },
};

async function main() {
    if (shouldHide) return;

    const thresholds = tiers.sort(THRESHOLDS);
    const maxAmount = thresholds.reduce((max, { amount }) => Math.max(max, amount), 0);

    const aggregatedTiers = tiers.aggregate(thresholds);

    const tierList = render.tierList('Congrats! You qualify for:');
    const title = render.title();
    const progressBar = render.progressBar(maxAmount);

    const handleCartUpdate = async (cartAmount) => {
        const { thresholds: aggregated, crossedCount } = await aggregatedTiers(cartAmount);

        const nextThreshold = aggregated.find(({ crossed }) => !crossed) ?? null;
        const allThresholdsCrossed = !nextThreshold;

        progressBar.setValue(cartAmount);

        // For each tier reached, add an item to the tier list
        tierList.clear();
        aggregated.forEach((threshold) => {
            if (threshold.crossed) tierList.addItem(threshold);
        });

        // If all thresholds crossed, display the final threshold.
        title.setContent(
            allThresholdsCrossed
                ? thresholds.length > 1
                    ? 'You qualify for all tiers!'
                    : // If just one tier, name the tier in the title, as the list above is hidden.
                      `Congrats! You qualify for ${aggregated[aggregated.length - 1].title}!`
                : `Add $${round(nextThreshold.amount - cartAmount)} more for ${
                      nextThreshold.title
                  }!`
        );

        // Hide the reached tier list if there's only one tier, or no tiers have been reached
        if (thresholds.length <= 1 || !crossedCount) tierList.hide();
        else tierList.show();

        // Run add to cart actions if necessary
        tiers.runActions(aggregated);
    };

    handleCartUpdate(Tapcart.variables.cart?.subtotal ?? 0);
    Tapcart.registerEventHandler('cart/updated', () => {
        handleCartUpdate(Tapcart.variables.cart?.subtotal ?? 0);
    });

    tierList.append();
    title.append();
    progressBar.append();

    // Finally, show the block.
    container.classList.remove('hidden');
}

main();
