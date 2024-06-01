/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/customizer.scss":
/*!*****************************!*\
  !*** ./src/customizer.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./src/customizer.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _customizer_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./customizer.scss */ "./src/customizer.scss");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);


const {
  api
} = wp;



const {
  customize
} = wp;
class App extends _wordpress_element__WEBPACK_IMPORTED_MODULE_3__.Component {
  constructor() {
    super(...arguments);
    this.state = {
      hoverStyleControl: '',
      IconColor: '#000',
      isAPILoaded: false
    };
  }
  componentDidMount() {
    api.loadPromise.then(() => {
      this.settings = new api.models.Settings();
      const {
        isAPILoaded
      } = this.state;
      if (isAPILoaded === false) {
        this.settings.fetch().then(response => {
          console.log('res', GfSocialIconsSettings.hoverStyleControl);
          console.log('state', response);
          this.setState({
            hoverStyleControl: GfSocialIconsSettings.hoverStyleControl,
            IconColor: GfSocialIconsSettings.IconColor,
            isAPILoaded: true
          });
        });
      }
    });
  }
  render() {
    const {
      hoverStyleControl,
      IconColor,
      isAPILoaded
    } = this.state;
    if (!isAPILoaded) {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Placeholder, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, null));
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "gf-block__main"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Panel, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Panel Body One', 'gf-social-icons'),
      icon: "admin-plugins"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Hover style for your icons', 'gf-social-icons'),
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Select Hover Style', 'gf-social-icons'),
      onChange: hoverStyleControl => {
        this.setState({
          hoverStyleControl
        });
        customize.value('gf_social_icons_style_settings[hoverStyleControl]')(hoverStyleControl);
      },
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Please Select...', 'gf-social-icons'),
        value: ''
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Style 1', 'gf-social-icons'),
        value: 'style-1'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Style 2', 'gf-social-icons'),
        value: 'style-2'
      }],
      value: hoverStyleControl
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
      onChange: IconColor => {
        this.setState({
          IconColor
        });
        customize.value('gf_social_icons_style_settings[IconColor]')(IconColor);
      },
      enableAlpha: true,
      value: IconColor
    })))));
  }
}
customize.bind('ready', function () {
  const panelKey = 'gf_social_icons__customizer-panel';
  const sectionKey = 'gf_social_icons__customizer-section';
  customize.panel.add(new customize.Panel(panelKey, {
    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Social Icons Style Settings', 'gf-social-icons'),
    priority: 1000,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Gutefy Social Icons', 'gf-social-icons')
  }));
  customize.section.add(new customize.Section(sectionKey, {
    customizeAction: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Gf Block ▸ Section', 'gf-social-icons'),
    panel: panelKey,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Style Settings', 'gf-social-icons')
  }));
  customize.control.add(new customize.Control('gf_social_icons__style-settings-control', {
    section: sectionKey,
    type: 'gf-social-icons-style-control'
  }));
  const htmlOutput = document.getElementById('gf_social_icons__style-control-wrapper');
  if (htmlOutput) {
    const root = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createRoot)(htmlOutput);
    root.render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(App, null));
  }
});
})();

/******/ })()
;
//# sourceMappingURL=customizer.js.map