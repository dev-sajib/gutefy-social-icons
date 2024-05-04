window.addEventListener('load', function () {
    if (document.querySelector(`#gf_social_icons--style-select`)) {
        ((document.querySelector('#gf_social_icons--style-select').value=='style1') && (document.querySelector('.gf_social_icons--warning-sms').style.display = 'block'))
    }
})

let gf_social_icons__style_select_control = function (e) {
    ((e.value) == 'style1' && (document.querySelector('.gf_social_icons--warning-sms').style.display = 'block'))
}
