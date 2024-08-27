// * Config
const AUTO_SCROLLING_ENABLED = true;
const AUTO_SCROLL_INTERVAL_SECONDS = 5;

/**
 * Configuration for carousel slides
 *
 * Array<{
 *     title: string; // Ex. "My Collection"
 *     details: string; // Ex. "Elegant designs & quality craftsmanship"
 *     imageUrl: string; // Ex. "https://cdn.mydomain.com/files/image.webp"
 *     buttons: Array<{
 *         text: string; // The text to apply to the button
 *         collectionId: string; // Ex. "4908092734734"
 *     } | {
 *         text: string; // Ex. "Read the blog"
 *         url: string; // Ex. "https://blog.mydomain.com/article/f92340gfg4"
 *     }>
 * }>
 */
const CAROUSEL = [
    {
        title: 'Top suits this month',
        details: 'Professional suits, casual suits, and more',
        imageUrl:
            'https://w0.peakpx.com/wallpaper/958/331/HD-wallpaper-men-in-suits-suit-clothes-black-tie-clothing-graphy-men-white-style.jpg',
        buttons: [
            {
                text: 'See Top 10',
                collectionId: '123456789',
            },
            {
                text: 'Read the Blog',
                url: 'https://www.blog.yourdomain.com/article/90876',
            },
        ],
    },
    {
        title: 'Built different',
        details: "With a variety of styles & colors, we've got you covered more than the rest",
        imageUrl:
            'https://www.gentlemansguru.com/wp-content/uploads/2022/07/Mens-Suits-Color-and-What-They-Mean-Banner-from-Gentlemansguru.com_.jpg',
        buttons: [
            {
                text: 'Shop Colorful Suits',
                collectionId: '223456789',
            },
            {
                text: 'Shop Progressive Suits',
                collectionId: '323456789',
            },
        ],
    },
];
// * Config

// !! dev
// If this array contains any device IDs, the block will ONLY display for THOSE devices.
// If the array is empty, it will display for ALL devices.
const DEV_DEVICE_IDS = [''];

const shouldHide = Boolean(
    DEV_DEVICE_IDS.length && !DEV_DEVICE_IDS.includes(Tapcart.variables.device.id)
);
// !! dev

const container = document.querySelector('#container');
const dots = document.querySelector('#dots');

const renderSlide = (slide) => {
    const item = document.createElement('div');
    item.classList.add('item');

    const image = document.createElement('img');
    image.src = slide.imageUrl;

    const content = document.createElement('span');

    const title = document.createElement('h2');
    title.textContent = slide.title.toUpperCase();

    const subtitle = document.createElement('p');
    subtitle.textContent = slide.details;

    const buttons = document.createElement('div');
    buttons.classList.add('button-container');

    slide.buttons.forEach((data) => {
        const isCollectionLink = !!data.collectionId;

        const button = document.createElement(isCollectionLink ? 'button' : 'a');
        button.classList.add('button');
        button.textContent = data.text;

        if (isCollectionLink) {
            button.addEventListener('click', () => {
                Tapcart.actions.openCollection({ collectionId: data.collectionId });
            });
        } else button.setAttribute('href', data.url);

        buttons.appendChild(button);
    });

    content.appendChild(title);
    content.appendChild(subtitle);
    content.appendChild(buttons);

    item.appendChild(image);
    item.appendChild(content);

    container.appendChild(item);
    return item;
};

const DOT_NAME = 'dot';

const renderDot = (position) => {
    const control = document.createElement('label');
    control.for = `option-${position}`;

    const optionInput = document.createElement('input');
    optionInput.name = DOT_NAME;
    optionInput.type = 'radio';
    optionInput.id = control.for;
    optionInput.value = position;
    optionInput.checked = position === 0;

    const optionDot = document.createElement('span');

    control.appendChild(optionInput);
    control.appendChild(optionDot);

    dots.appendChild(control);
};

async function main() {
    if (shouldHide) {
        container.style.display = 'none';
        return;
    }

    CAROUSEL.forEach((slide, position) => {
        renderSlide(slide);
        renderDot(position);
    });

    if (AUTO_SCROLLING_ENABLED && CAROUSEL.length > 1) {
        let interval;
        const startInterval = () => {
            clearInterval(interval);
            interval = setInterval(() => {
                container.scrollTo({
                    left:
                        container.scrollLeft === container.offsetWidth * (CAROUSEL.length - 1)
                            ? 0
                            : container.scrollLeft -
                              (container.scrollLeft % container.offsetWidth) +
                              container.offsetWidth,
                    behavior: 'smooth',
                });
            }, AUTO_SCROLL_INTERVAL_SECONDS * 1_000);
        };

        startInterval();
        // If the user interacts with the carousel (swiping), delay
        // the auto-scroll
        container.addEventListener('touchmove', startInterval);
    }

    // Update dot value when scrolling occurs
    container.addEventListener('scroll', (e) => {
        const newPosition = Math.abs(container.scrollLeft / container.offsetWidth);
        dots[DOT_NAME].value = newPosition;
    });

    // Listen for dot clicks & scroll to the corresponding carousel
    const radioNodes =
        dots[DOT_NAME] instanceof RadioNodeList ? [...dots[DOT_NAME]] : [dots[DOT_NAME]];

    radioNodes.forEach((elem) => {
        elem.addEventListener('click', (e) => {
            const newPosition = +e.target.value;
            container.scrollTo({
                left: container.offsetWidth * newPosition,
                behavior: 'smooth',
            });
        });
    });
}

main();
