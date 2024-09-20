/** @format */

/**
 * The StyleGenerator function generates dynamic CSS styles for elements
 * in the customizer based on user inputs and applies them to an iframe.
 */
export function StyleGenerator() {
    /**
     * Processes the provided style element, which can be a string or an object.
     *
     * @param {string|Object} styleEle - The style element to process.
     *   - If it's a string (e.g., '#000000'), it represents a color or a single CSS value.
     *   - If it's an object (e.g., {width: '10px', color: '#000000', type: 'dashed'}), it represents multiple CSS properties.
     *
     * @returns {string} - The processed style element as a concatenated string for use in CSS.
     */
    const processStyleValue = (styleEle) => {
        if (typeof styleEle === 'string') {
            return styleEle
        }

        return Object.values(styleEle)?.join(' ')
    }

    /**
     * Generates CSS markup for a specific CSS selector based on provided style values.
     *
     * @param {string} css_selector - The CSS selector to apply the styles to (e.g., '.social-icons').
     * @param {string} css_attr - The CSS attribute (e.g., 'border', 'color', 'width').
     * @param {Object} value - The value object containing styles for desktop, tablet, and mobile views.
     *   - {desktop: '...', tablet: '...', mobile: '...'}
     *
     * @returns {string|undefined} - The generated CSS string or undefined if no markup is produced.
     */
    const cssMarktp = (css_selector, value, device_name) => {
        console.log(css_selector, value, device_name)
        let markup = ''

        if (value.desktop) {
            markup = `${markup} ${css_selector} { ${css_attr} : ${processStyleValue(value.desktop)} !important }`
        }

        if (value.tablet) {
            markup = `${markup} @media(max-width:1020px){${css_selector}{ ${css_attr} : ${processStyleValue(value.tablet)} !important}}`
        }

        if (value.mobile) {
            markup = `${markup} @media(max-width:719px){${css_selector}{ ${css_attr} : ${processStyleValue(value.mobile)} !important}}`
        }

        if (markup === '') {
            return
        } else {
            return markup
        }
    }

    /**
     * Generates CSS for a given element and appends it to the style markup string.
     *
     * @param {Object} elementObj - The object containing element details and styles.
     *   - {css_selector: '...', values: [{css_attr: '...', value: {desktop: '...', tablet: '...', mobile: '...'}}]}
     * @param {string} style_markup - The accumulated CSS markup string.
     *
     * @returns {string} - The updated style markup string with new styles added.
     */
    const generateMarkup = (elementObj, style_markup) => {
        console.log('generateMarkup=>', elementObj)
        style_markup += Object.entries(elementObj.device_wise_value)
            .map(([device_name, value]) => cssMarktp(elementObj.css_selector, value, device_name))
            .join('')

        return style_markup
    }

    /**
     * Generates the CSS based on customizer settings and injects it into the preview iframe.
     */
    async function generateBuilderStyleCss() {
        const style_settings_id = CUSTOMIZER__STYLE__SETTINGS_ID__ARRAY['styleSettings']
        let style_markup = ''
        let singleStyleObj = {}

        Object.values(style_settings_id).map((settings_id) => {
            let single_style = wp.customize(settings_id).get()
            if (single_style.device_wise_value) {
                Object.entries(single_style.device_wise_value).forEach(function ([single_device_name, single_device_values]) {
                    // Check if single_device_name already exists, if not, initialize it as an array
                    singleStyleObj[single_device_name] = singleStyleObj[single_device_name] || []

                    // Append the new style object to the existing array
                    singleStyleObj[single_device_name].push({
                        css_selector: single_style.css_selector,
                        ...single_device_values,
                    })

                    console.log('singleStyleObj=>', singleStyleObj)
                })
            }
        })

        console.log('singleStyleObj=>', singleStyleObj)
        let styles = Object.entries(singleStyleObj)
            .map(([device, value]) => {
                if (device == 'desktop') {
                    return value.map((e) => `${e.css_selector} { ${e.css_attr} : ${e.value} !important }`)
                } else if (device == 'tablet') {
                    return value.map((e) => `@media(max-width:1020px){${e.css_selector}{ ${e.css_attr} : ${e.value} !important}}`)
                } else if (device == 'mobile') {
                    return value.map((e) => `@media(max-width:719px){${e.css_selector}{ ${e.css_attr} : ${e.value} !important}}`)
                }
            })
            .join()
            .replaceAll(',', '   ')

        let iframeBody = document.querySelector('iframe')?.contentDocument.body
        if (iframeBody) {
            let mainContainer = iframeBody.querySelector('#gf_social_icons__wrapper')

            if (mainContainer) {
                // Check if a <style> element for dynamic styles already exists.
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

    // Call the function to generate and inject the CSS into the preview.
    generateBuilderStyleCss()
}
