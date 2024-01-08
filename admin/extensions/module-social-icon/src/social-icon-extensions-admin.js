function enablecustomfontclass(event, checkbox) {
        const socialName = event.target.dataset.socialIcon;
        const customIconControl = document.querySelector(`.custom-icon-control.${socialName}`);

        if (checkbox.checked) {
                customIconControl.style.display = 'block';
        } else {
                customIconControl.style.display = 'none';
        }
}
