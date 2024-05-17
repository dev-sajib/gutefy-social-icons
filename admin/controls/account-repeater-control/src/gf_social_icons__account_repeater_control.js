function gfSocialResetAccountIdState() {
    let get_account_data = Array.from(document.querySelectorAll('.gf-social-icons-repeater-field'));
    get_account_data.forEach((element, index) => element.dataset.account_number = index);
}

let gf_social_icons_add_account_field = (id_number, account_icon, url = '') => {
    let newDivWrapper = document.createElement('div');
    newDivWrapper.classList = `gf-social-icons-repeater-field-child-wrapper`;


    let newDiv = document.createElement('div');
    let generate_uniq_class = id_number;
    newDiv.className = `gf-social-icons-repeater-field`;
    newDiv.dataset.account_number = generate_uniq_class;

    // Create the span element for the social icon data
    let span = document.createElement('span');
    span.className = `gf-social-icons--icon-data`;
    span.setAttribute('data-account_name', account_icon);
    span.innerHTML = fontIcons[account_icon].icon;
    span.addEventListener('click', () => {
        span.parentElement.parentElement.appendChild(gfSocialIconsGenerateIconSelectionPopup(account_icon));
    })

    // Create the input element
    let input = document.createElement('input');
    input.type = 'url';
    input.classList = 'gf-social-icons-url';
    input.placeholder = 'Enter Social Url';
    if (url != '') {
        input.value = url;
    }

    // Create the span element for the close button
    let closeSpan = document.createElement('span');
    closeSpan.className = 'cross-account';
    closeSpan.textContent = '❌';
    closeSpan.onclick = function () {
        console.log(newDiv);
        gf_social_icons_close_this_account(newDiv);
    };

    // Append the span, input, and close button to the new div
    newDiv.appendChild(span);
    newDiv.appendChild(input);
    newDiv.appendChild(closeSpan);
    newDivWrapper.appendChild(newDiv);
    // Append the new div to the wrapper div
    let wrapper = document.querySelector('.gf-social-icons-repeater-field-wrapper');
    if (wrapper) {
        wrapper.appendChild(newDivWrapper);
    } else {
        console.error('Wrapper div not found.');
    }
    Array.from(document.querySelectorAll('.gf-social-icons-url')).forEach(e => e.addEventListener('input', gfSocialIconsPublishButtonReactive));
}

let gf_social_icons_get_account_number = function () {
    let current_state = Array.from(document.querySelectorAll('.gf-social-icons-repeater-field')).length;
    let account_number = 0;
    return (current_state == 0) ? account_number : current_state;
}

//this function directly called by add account button on click
let gf_social_icons_add_account = (e) => {
    e.preventDefault();
    let uniq_id = gf_social_icons_get_account_number();
    gf_social_icons_add_account_field(uniq_id, 'facebook');
}
let gf_social_icons_handel_icon_selection = (element) => {
    let account_name = element.dataset.icon_name;
    element.parentElement.parentElement.parentElement.querySelector('.gf-social-icons--icon-data').dataset.account_name=account_name;
    element.parentElement.parentElement.parentElement.querySelector('.gf-social-icons--icon-data').innerHTML=fontIcons[account_name].icon;
    
    Array.from(document.querySelectorAll('.gf-social-icons-single-icon')).forEach(e=>e.classList.remove('active'));
    element.classList.add('active');
    gfSocialIconsPublishButtonReactive();
}
let gf_social_icons_close_this_account = (e) => {
    e.remove();
    gfSocialResetAccountIdState();
    gfSocialIconsPublishButtonReactive();
}

let gf_social__restore_previous_accounts = () => {
    let previous_account_data = document.querySelector('.gf-social-icons--accounts-details').value;
    if (previous_account_data != '') {
        let gf_social_account_data = JSON.parse(previous_account_data);
        const gf_social_account_data_array = Object.values(gf_social_account_data);

        gf_social_account_data_array.forEach((account, index) => {
            gf_social_icons_add_account_field(index, account.icon, account.url);
        });
    }
}

let gfSocialCollectSocialIconData = () => {
    const data = {};
    const wrappers = document.querySelectorAll('.gf-social-icons-repeater-field');
    if (wrappers) {
        wrappers.forEach(wrapper => {
            const inputField = wrapper.querySelector('.gf-social-icons-url');
            const spanIcon = wrapper.querySelector('.gf-social-icons--icon-data');
            if (inputField && spanIcon) {
                const accountNumber = wrapper.dataset.account_number;
                const iconValue = spanIcon.dataset.account_name;
                const urlValue = inputField.value.trim();
                if (accountNumber) {
                    data[accountNumber] = {
                        icon: iconValue,
                        url: urlValue
                    };
                }
            }
        });
    }
    return data;
}

let gfSocialIconsPublishButtonReactive = () => {
    const data = gfSocialCollectSocialIconData();
    const inputField = document.querySelector('.gf-social-icons--accounts-details');
    if (inputField) {
        inputField.value = JSON.stringify(data);
        var event = new Event('input', {
            bubbles: true,
            cancelable: true,
        });
        inputField.dispatchEvent(event);
    } else {
        console.error('Input field with class ".gf-social-icons--accounts-details" not found.');
    }
}

let gfSocialIconsGenerateIconSelectionPopup = (account_icon) => {
    // Create the main div element
    const div = document.createElement('div');
    div.classList.add('gf-social-icons-selection-popup');

    // Create the paragraph element
    const p = document.createElement('p');
    p.classList.add('title');
    p.textContent = 'Icon name';

    // Create the input element
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.classList.add('gf-social-icons-search-box');

    // Create the inner div element
    const innerDiv = document.createElement('div');
    innerDiv.classList.add('gf-social-icons-list');


    for (let icon in fontIcons) {
        if (fontIcons.hasOwnProperty(icon)) {
            const span = document.createElement('span');
            span.classList.add('gf-social-icons-single-icon');
            (icon === account_icon && span.classList.add('active'));
            span.setAttribute('data-icon_name', icon);
            span.innerHTML = fontIcons[icon]['icon'];
            innerDiv.appendChild(span);
            span.addEventListener('click', () => {
                gf_social_icons_handel_icon_selection(span);
            });
        }

    }

    // Create the span element


    // Append elements to their respective parents

    div.appendChild(p);
    div.appendChild(input);
    div.appendChild(innerDiv);

    // Now you can append the 'div' element wherever you want in the DOM.
    // For example, if you want to append it to the body:
    return div;
}
// Example usage:
window.addEventListener('load', function () {
    gf_social__restore_previous_accounts();
    Array.from(document.querySelectorAll('.gf-social-icons-url')).forEach(e => e.addEventListener('input', gfSocialIconsPublishButtonReactive));
});
