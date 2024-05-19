window.addEventListener('load', function () {
    if (document.querySelector(`#gf_social_icons--style-select`)) {
        ((document.querySelector('#gf_social_icons--style-select').value=='style2') && (document.querySelector('.gf-social-icons-settings-wrapper.style2').style.display = 'block'))
    }
})

let gf_social_icons__style_select_control = function (e) {
    ((e.value) == 'style2' && (document.querySelector('.gf-social-icons-settings-wrapper.style2').style.display = 'block') || (document.querySelector('.gf-social-icons-settings-wrapper.style2').style.display = 'none'))
}
