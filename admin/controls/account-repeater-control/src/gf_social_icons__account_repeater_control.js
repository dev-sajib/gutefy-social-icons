function gfSocialResetAccountIdState() {
    let get_account_data = Array.from(document.querySelectorAll('.gf-social-icons-repeater-field'));
    get_account_data.forEach((element, index) => element.dataset.account_number = index);
}

let gf_social_icons_add_account_field = (id_number, account_icon, url = '') => {
    console.log('new account add hoise')
    let newDivWrapper = document.createElement('div');
    newDivWrapper.classList = `gf-social-icons-repeater-field-child-wrapper gf-social-icons-is-idle`;

    let newDivDragItem = document.createElement('div');
    newDivDragItem.className= 'gf-social-icons-account-list-drag-handle gf-social-icons-account-list-draging-handle';

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
    input.placeholder = 'https://facebook.com';
    if (url != '') {
        input.value = url;
    }

    // Create the span element for the close button
    let closeSpan = document.createElement('span');
    closeSpan.className = 'gf-social-icons-cross-account';
    closeSpan.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>';
    closeSpan.onclick = function () {
        gf_social_icons_close_this_account(newDivWrapper);
    };

    // Append the span, input, and close button to the new div
    newDiv.appendChild(newDivDragItem);
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
    Array.from(document.querySelectorAll('.gf-social-icons-url')).forEach(e => e.addEventListener('input', (event) => {
        console.log('four');
        var input = event.target.value.trim();
        var parentElement = event.target.parentElement.parentElement;
        var errorMessage = parentElement.querySelector(".error-message");

        // Create the error message element if it doesn't exist
        if (!errorMessage) {
            errorMessage = document.createElement("span");
            errorMessage.className = "error-message";
        }

        // Regex patterns for URL, phone number, and email validation
        var urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        var phonePattern = /^\+?([0-9]{1,4})?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!urlPattern.test(input) && !phonePattern.test(input) && !emailPattern.test(input)) {
            errorMessage.textContent = "Please enter a valid URL, phone number, or email.";
            if (!parentElement.contains(errorMessage)) {
                parentElement.appendChild(errorMessage);
            }
            console.log('wrong input');
        } else {
            if (errorMessage.parentElement) {
                errorMessage.parentElement.removeChild(errorMessage);
            }
            gf_social_icons_publish_button_reactive();
        }
    }));
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
    element.parentElement.parentElement.parentElement.parentElement.querySelector('.gf-social-icons--icon-data').dataset.account_name = account_name;
    element.parentElement.parentElement.parentElement.parentElement.querySelector('.gf-social-icons--icon-data').innerHTML = fontIcons[account_name].icon;

    Array.from(document.querySelectorAll('.gf-social-icons-single-icon')).forEach(e => e.classList.remove('active'));
    element.classList.add('active');
    gf_social_icons_publish_button_reactive();
}
let gf_social_icons_close_this_account = (e) => {
    e.remove();
    gfSocialResetAccountIdState();
    gf_social_icons_publish_button_reactive();
}

let gf_social__restore_previous_accounts = () => {
    if(! document.querySelector('.gf-social-icons--accounts-details')){
        return;
    }
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

let gf_social_icons_publish_button_reactive = () => {
    gfSocialResetAccountIdState();
    
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

let gfSocialIconsHandlePopupSearch = (element) => {
    console.log(element);
    console.log(element.value);
}
let gfSocialIconsGenerateIconSelectionPopup = (account_icon) => {
    // Create the main div element
    const div_wrapper = document.createElement('div');
    div_wrapper.classList.add('gf-social-icons-selection-popup-wrapper');
    const div = document.createElement('div');
    div.classList.add('gf-social-icons-selection-popup');

    // Create the paragraph element
    const p = document.createElement('p');
    p.classList.add('title');
    p.textContent = 'Icon name';

    // Create the span element for the close button
    const closeSpan = document.createElement('span');
    closeSpan.className = 'gf-social-icons-cross-popup';
    closeSpan.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>';

    // Create the input element
    // const input = document.createElement('input');
    // input.setAttribute('type', 'text');
    // input.classList.add('gf-social-icons-search-box');

    // input.addEventListener('input', (element) => {
    //     gfSocialIconsHandlePopupSearch(element);
    // })

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

    // Append elements to their respective parents

    div.appendChild(p);
    div.appendChild(closeSpan);
    // div.appendChild(input);
    div.appendChild(innerDiv);
    div_wrapper.appendChild(div);
    closeSpan.onclick = function () {

        div_wrapper.classList.add('fadeOut');
        // Add a delay to ensure the fade-out animation finishes before hiding the popup
        setTimeout(() => {
            div_wrapper.style.display = 'none';
            // Remove the fadeOut class to reset the animation for future use
            div_wrapper.classList.remove('fadeOut');
        }, 50); // Adjust the t
    };
    div_wrapper.addEventListener('click', function (event) {
        if (event.target === this) {
            // If the overlay is clicked (not the popup itself), hide the popup with fade-out animation
            this.classList.add('fadeOut');
            // Add a delay to ensure the fade-out animation finishes before hiding the popup
            setTimeout(() => {
                this.style.display = 'none';
                // Remove the fadeOut class to reset the animation for future use
                this.classList.remove('fadeOut');
            }, 50); // Adjust the timeout to match the duration of the fade-out animation
        }
    });


    // Now you can append the 'div' element wherever you want in the DOM.
    // For example, if you want to append it to the body:
    return div_wrapper;
}
// Example usage:
window.addEventListener('load', function () {
    gf_social__restore_previous_accounts();
    Array.from(document.querySelectorAll('.gf-social-icons-url')).forEach(e => e.addEventListener('input', (event) => {
        gf_social_icons_publish_button_reactive();
    }));
    gf_social_icons__handle_drag_sorting()
});
