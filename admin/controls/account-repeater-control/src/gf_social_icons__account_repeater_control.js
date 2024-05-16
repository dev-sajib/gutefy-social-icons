
let gf_social_icons_add_account_field = (id_number, accout_icon, url = '') => {
    let newDiv = document.createElement('div');
    let generate_uniq_class = id_number;
    newDiv.className = `gf-social-icons-repeater-field gf-social-${generate_uniq_class}`;
    newDiv.dataset.account_number=generate_uniq_class;

    // Create the span element for the social icon data
    let span = document.createElement('span');
    span.className = `gf-social-icons--icon-data`;
    span.setAttribute('data-account_name', accout_icon);

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
    // Append the new div to the wrapper div
    let wrapper = document.querySelector('.gf-social-icons-repeater-field-wrapper');
    if (wrapper) {
        wrapper.appendChild(newDiv);
        Array.from(document.querySelectorAll('.gf-social-icons-url')).forEach(e => e.addEventListener('input', gfSocialCollectSocialIconData));

    } else {
        console.error('Wrapper div not found.');
    }
}
let gf_social_icons_get_account_number = function() {
    let current_state = Array.from(document.querySelectorAll('.gf-social-icons-repeater-field ')).length;
    let account_number = 0;
    return (current_state == 0) ? account_number : current_state + 1;
}
let gf_social_icons_add_account = (e) => {
    e.preventDefault();
    let uniq_id = gf_social_icons_get_account_number();
    gf_social_icons_add_account_field(uniq_id, 'facebook');

}

let gf_social_icons_close_this_account = (e) => {
    e.remove();
}

let gf_social__restore_previous_accounts = () => {
    let gf_social_account_data = JSON.parse(document.querySelector('.gf-social-icons--accounts-details').value);
    const gf_social_account_data_array = Object.values(gf_social_account_data);

    gf_social_account_data_array.forEach((account, index) => {
        gf_social_icons_add_account_field(index, account.icon, account.url);
    });
}

function gfSocialCollectSocialIconData() {
    const data = {};
    // Select all the wrapper elements
    const wrappers = document.querySelectorAll('.gf-social-icons-repeater-field');

    wrappers.forEach(wrapper => {
        // Find the input field and span within the current wrapper
        const inputField = wrapper.querySelector('.gf-social-icons-url');
        const spanIcon = wrapper.querySelector('.gf-social-icons--icon-data');
        if (inputField && spanIcon) {
            // Get the dataset value and other necessary values
            const accountNumber = wrapper.dataset.account_number;
            const iconValue = spanIcon.dataset.account_name;
            const urlValue = inputField.value.trim();
            if (accountNumber) {
                // Add the collected data to the result object
                data[accountNumber] = {
                    icon: iconValue,
                    url: urlValue
                };
            }
        }
    });
    console.log(data);
    return data;
}

// Example usage:

window.addEventListener('load', function () {
    gf_social__restore_previous_accounts();
    Array.from(document.querySelectorAll('.gf-social-icons-url')).forEach(e => e.addEventListener('input', gfSocialCollectSocialIconData));
    
})

