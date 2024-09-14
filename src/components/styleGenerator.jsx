/** @format */

export function StyleGenerator() {
    //selector, cssAttr, value, device
    const generateMarkup = (elementObj, style_markup) => {
        const cssMarktp = (css_selector, css_attr, value) => {
            // console.log('value=', value)

            let markup = ''
            if (value.desktop) {
                markup = `${markup} ${css_selector} { ${css_attr} : ${value.desktop} !important }`
            }
            if (value.tablet) {
                markup = `${markup} @media(max-width:1020px){${css_selector}{ ${css_attr} : ${value.tablet} !important}}`
            }
            if (value.mobile) {
                markup = `${markup} @media(max-width:714px){${css_selector}{ ${css_attr} : ${value.mobile} !important}}`
            }
            if (markup === '') {
                return
            } else {
                // console.log('markup=',markup);
                return markup
            }
        }

        style_markup += Object.values(elementObj.values)
            .map((e) => cssMarktp(elementObj.css_selector, e.css_attr, e.value))
            .join('')

        // console.log('style_markup', style_markup)

        return style_markup
    }
    function generateBuilderStyleCss() {
        const style_settings_id = CUSTOMIZER__STYLE__SETTINGS_ID__ARRAY['styleSettings']
        let style_markup = ''

        let styles = Object.values(style_settings_id)
            .map((e) => generateMarkup(wp.customize(e).get(), style_markup))
            .join(' ')

        let iframeBody = document.querySelector('iframe')?.contentDocument.body
        if (iframeBody) {
            const mainContainer = iframeBody.querySelector('#gf_social_icons__wrapper')
            if (mainContainer) {
                let styleElement = iframeBody.querySelector('#gf-social-icons-dynamic-builder-css')
                if (!styleElement) {
                    styleElement = document.createElement('style')
                    styleElement.id = 'gf-social-icons-dynamic-builder-css'
                    mainContainer.appendChild(styleElement)
                }
                styleElement.innerHTML = styles
            }
        }
    }
    generateBuilderStyleCss()
}
