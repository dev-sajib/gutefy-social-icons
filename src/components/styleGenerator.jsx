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
    const cssMarktp = (css_selector, css_attr, value) => {
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
        style_markup += Object.values(elementObj.values)
            .map((e) => cssMarktp(elementObj.css_selector, e.css_attr, e.value)) //  ,
            .join('')

        return style_markup
    }

    /**
     * Generates the CSS based on customizer settings and injects it into the preview iframe.
     */
    function generateBuilderStyleCss() {
        const style_settings_id = CUSTOMIZER__STYLE__SETTINGS_ID__ARRAY['styleSettings']
        let style_markup = ''

        let styles = Object.values(style_settings_id)
            .map((e) => generateMarkup(wp.customize(e).get(), style_markup))
            .join(' ')
        
        let iframeBody = document.querySelector('iframe')?.contentDocument.body
        console.log(iframeBody);
        if (iframeBody) {
            const mainContainer = iframeBody.querySelector('#gf_social_icons__wrapper')
            
            console.log(mainContainer)
            if (mainContainer) {
                console.log('hisad')

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
