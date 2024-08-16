// * Config
const CONFIGURATION = {
    header: "See what's hot",
    collections: [
        {
            title: 'Latest Equipment Stock',
            collectionId: 123456789,
            image: 'https://cultmtl.com/wp-content/uploads/2023/05/EFBF4B5C-2829-4B45-9326-5EA930E3A2E4.jpeg',
        },
        {
            title: 'Unisex Running Tops',
            collectionId: 78901234,
            image: 'https://www.austinfitmagazine.com/wp-content/uploads/2023/05/Sustainable-Athleisure-1-scaled.jpg',
        },
        {
            title: 'Yoga Gear',
            collectionId: 65428355677,
            image: 'https://i.insider.com/620a868cfc23d1001804c8cb?width=800&format=jpeg&auto=webp',
        },
        {
            title: 'Baseball Shoes',
            collectionId: 5439875643,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo3sGErClpfKwi7J0Z56ZxTlbf6YthpyRXZqN0U7t_KGdhLsSj-sSzFztdP_cvrkzWFRM&usqp=CAU',
        },
    ],
};
// * Config

// !! dev
// If this array contains any device IDs, the block will ONLY display for THOSE devices.
// If the array is empty, it will display for ALL devices.
const DEV_DEVICE_IDS = [];

const shouldHide = Boolean(
    (DEV_DEVICE_IDS.length && !DEV_DEVICE_IDS.includes(Tapcart.variables.device.id)) ||
        !CONFIGURATION.collections?.length
);
// !! dev

const container = document.querySelector('#container');

const scroller = document.querySelector('#scroller');

const renderHeader = (header) => {
    const elem = document.createElement('h3');
    elem.textContent = header;

    container.prepend(elem);
};

const renderItem = (item) => {
    const slide = document.createElement('button');
    slide.classList.add('item');

    const image = document.createElement('img');
    image.src = item.image;
    image.alt = item.title;

    const title = document.createElement('span');
    title.textContent = item.title;

    slide.addEventListener('click', () => {
        Tapcart.actions.openCollection({
            collectionId: item.collectionId.toString(),
        });
    });

    slide.appendChild(image);
    slide.appendChild(title);

    scroller.appendChild(slide);
};

async function main() {
    if (shouldHide) return;
    container.classList.remove('hidden');

    renderHeader(CONFIGURATION.header.toUpperCase());
    CONFIGURATION.collections.forEach(renderItem);

    // Once the user interacts with the previews,
    ['touchmove', 'scroll'].forEach((eventType) => {
        scroller.addEventListener(
            eventType,
            () => {
                scroller.classList.remove('preview');
            },
            { once: true }
        );
    });
}

main();
