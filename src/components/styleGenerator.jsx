/** @format */

/**
 * The StyleGenerator function generates dynamic CSS styles for elements
 * in the customizer based on user inputs and applies them to an iframe.
 */
export function StyleGenerator() {
    /**
     * Generates the CSS based on customizer settings and injects it into the preview iframe.
     */
    function generateBuilderStyleCss() {
        const style_settings_id = CUSTOMIZER__STYLE__SETTINGS_ID__ARRAY['styleSettings']

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
                })
                // //console.log('singleStyleObj=>', singleStyleObj)
            }
        })

        //console.log('singleStyleObj=>', singleStyleObj)

        let sortedArray = {
            desktop: singleStyleObj['desktop'],
            tablet: singleStyleObj['tablet'],
            mobile: singleStyleObj['mobile'],
        }
        //console.log('sortedArray=>', sortedArray)

        let styles = Object.entries(sortedArray)
            .map(([device, value]) => {
                if (device == 'desktop' && value) {
                    return value.map(function (e) {
                        if (e.value) {
                            if (typeof e.value === 'object') {
                                return `${e.css_selector} { ${e.css_attr} : ${Object.values(e.value).join(' ')} !important }`
                            }
                            return `${e.css_selector} { ${e.css_attr} : ${e.value} !important }`
                        } else {
                            let multi = Object.values(e).map(function (singleValue) {
                                if (typeof singleValue === 'string') {
                                    return
                                }
                                if (typeof singleValue === 'object') {
                                    return ` ${singleValue.css_attr} : ${Object.values(singleValue.value).join(' ')} !important`
                                }
                            })
                            return `${e.css_selector}{ ${multi.join(' ; ')} }`
                        }
                    })
                } else if (device == 'tablet' && value) {
                    return value.map(function (e) {
                        if (e.value) {
                            if (typeof e.value === 'object') {
                                return `@media(max-width:1020px){ ${e.css_selector} { ${e.css_attr} : ${Object.values(e.value).join(' ')} !important }}`
                            }
                            return `@media(max-width:1020px){ ${e.css_selector} { ${e.css_attr} : ${e.value} !important }}`

                        } else {
                            let multi = Object.values(e).map(function (singleValue) {
                                if (typeof singleValue === 'string') {
                                    return
                                }
                                if (typeof singleValue === 'object') {
                                    return ` ${singleValue.css_attr} : ${Object.values(singleValue.value).join(' ')} !important`
                                }
                            })
                            return `@media(max-width:1020px){${e.css_selector}{ ${multi.join(' ; ')} }}`
                        }
                    })
                } else if (device == 'mobile' && value) {
                    return value.map(function (e) {
                        if (e.value) {
                            if (typeof e.value === 'object') {
                                return `@media(max-width:719px){ ${e.css_selector} { ${e.css_attr} : ${Object.values(e.value).join(' ')} !important }}`
                            }
                            return `@media(max-width:719px){ ${e.css_selector} { ${e.css_attr} : ${e.value} !important }}`

                        } else {
                            let multi = Object.values(e).map(function (singleValue) {
                                if (typeof singleValue === 'string') {
                                    return
                                }
                                if (typeof singleValue === 'object') {
                                    return ` ${singleValue.css_attr} : ${Object.values(singleValue.value).join(' ')} !important`
                                }
                            })
                            return `@media(max-width:719px){${e.css_selector}{ ${multi.join(' ; ')} }}`
                        }
                    })
                }
            })
            .join()
            .replaceAll(',', '   ')

        //console.log(styles)

        let iframeBody = document.querySelector('iframe')?.contentDocument.body
        if (iframeBody) {
            let mainContainer = iframeBody
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
