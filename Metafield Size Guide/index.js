// * Config
const CONFIG = {
    // { namespace: string; name: string; }
    title: {
        // // Example:
        // namespace: 'product_size_guide',
        // name: 'title',
    },
    // A map options & metafield properties to retrieve their content
    // { [optionName: string]: { namespace: string; name: string; } }
    options: {
        // // Example:
        // CM: {
        //     namespace: 'product_size_guide',
        //     name: 'product_size_guide_cm',
        // },
        // IN: {
        //     namespace: 'product_size_guide',
        //     name: 'product_size_guide_in',
        // },
    },
};
// * Config

// !! dev
const container = document.querySelector('#container');
// If this array contains any device IDs, the block will ONLY display for THOSE devices.
// If the array is empty, it will display for ALL devices.
const DEV_DEVICE_IDS = [];
// !! dev

const shouldHide =
    Boolean(DEV_DEVICE_IDS.length && !DEV_DEVICE_IDS.includes(Tapcart.variables.device.id)) ||
    !Tapcart.variables.product ||
    !Object.keys(CONFIG.options).length;

const OPTION_NAME = 'size-unit-option';

const header = document.querySelector('#header');
const content = document.querySelector('#content');
const optionsForm = document.querySelector('#options');

const render = {
    // title: string
    title: (title) => {
        if (!title) return;

        const titleElement = document.createElement('h4');
        titleElement.textContent = title;

        header.prepend(titleElement);
    },
    // options: string[]
    options: (options) => {
        options.forEach((option) => {
            const optionControl = document.createElement('label');
            optionControl.for = `option-${option}`;

            const optionInput = document.createElement('input');
            optionInput.name = OPTION_NAME;
            optionInput.type = 'radio';
            optionInput.id = optionControl.for;
            optionInput.value = option;

            const optionText = document.createElement('span');
            optionText.textContent = option;

            optionControl.prepend(optionText);
            optionControl.prepend(optionInput);

            optionsForm.appendChild(optionControl);
        });
    },
    // html: string - raw HTML
    content: (html) => {
        content.innerHTML = html;
    },
};

function main() {
    if (shouldHide) {
        container.style.display = 'none';
        return;
    }

    const { metafields } = Tapcart.variables.product;

    render.title(metafields[CONFIG?.title?.namespace]?.[CONFIG?.title?.name]);
    render.options(Object.keys(CONFIG.options));

    let selectedOption = null;

    [...optionsForm[OPTION_NAME]].forEach((elem) => {
        elem.addEventListener('click', (e) => {
            const optionName = optionsForm[OPTION_NAME].value;

            // Handle deselection
            if (selectedOption === optionName) {
                content.classList.add('collapsed');

                e.target.checked = false;
                selectedOption = null;
                return;
            }

            const option = CONFIG.options[optionName];
            render.content(metafields[option.namespace][option.name]);

            selectedOption = optionName;

            content.classList.remove('collapsed');
        });
    });
}

main();
