// * Config
const ZENDESK_HANDLE = 'YOUR-ZENDESK-HOST.zendesk.com';
const TITLE = 'FAQs & Support';
// * Config

// !! dev
// If this array contains any device IDs, the block will ONLY display for THOSE devices.
// If the array is empty, it will display for ALL devices.
const DEV_DEVICE_IDS = [];

const shouldHide = Boolean(
    DEV_DEVICE_IDS.length && !DEV_DEVICE_IDS.includes(Tapcart.variables.device.id)
);
// !! dev

const body = document.body;
const container = document.querySelector('#container');

// Aggressively poll the document for an element
const waitForElement = (selector) =>
    new Promise((resolve) => {
        const interval = setInterval(() => {
            const elem = document.querySelector(selector);

            if (elem) {
                resolve(elem);
                clearInterval(interval);
            }
        }, 100);
    });

const injectScript = (src) =>
    new Promise((resolve, reject) => {
        const script = Object.assign(document.createElement('script'), {
            src,
            id: 'ze-snippet',
            onload: resolve,
            onerror: reject,
        });

        container.appendChild(script);
    });

// Listen for changes to the widget's open state, allowing
// for the re-sizing of the body.
const widgetOpenState = async () => {
    const buttonFrame = await waitForElement('#launcher');
    const isOpen = () => buttonFrame.style.display === 'none';
    const target = new EventTarget();

    const observer = new MutationObserver(() => {
        target.dispatchEvent(
            new CustomEvent('toggle', {
                detail: isOpen(),
            })
        );
    });

    observer.observe(buttonFrame, { attributeFilter: ['style'] });

    return {
        isOpen,
        events: target,
    };
};

const handleOpen = () => {
    body.classList.add('open');
};

const handleClose = () => {
    body.classList.remove('open');
};

async function main() {
    body.classList.add('hidden');
    if (shouldHide) return;

    Object.defineProperty(document, 'body', {
        get() {
            return container;
        },
    });

    container.textContent = TITLE.trim();

    await injectScript(
        `https://static.zdassets.com/ekr/snippet.js?key=web_widget/${ZENDESK_HANDLE}`
    );

    const widget = await widgetOpenState();

    if (widget.isOpen()) handleOpen();
    else handleClose();

    widget.events.addEventListener('toggle', ({ detail: open }) => {
        if (open) handleOpen();
        else handleClose();
    });

    container.classList.remove('hidden');
    body.classList.remove('hidden');
}

main();
