/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/generalSettings.jsx":
/*!********************************************!*\
  !*** ./src/components/generalSettings.jsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GeneralSettings: () => (/* binding */ GeneralSettings)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _socialRepeateater__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./socialRepeateater */ "./src/components/socialRepeateater.jsx");





const {
  customize
} = wp;
const {
  api
} = wp;
class GeneralSettings extends _wordpress_element__WEBPACK_IMPORTED_MODULE_2__.Component {
  constructor() {
    super(...arguments);
    this.state = {
      accountsUrl: [['facebook', 'facebook.com']],
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
          this.setState({
            accountsUrl: GfSocialIconsSettings["generalSettings"].accountsUrl || this.state.accountsUrl,
            isAPILoaded: true
          });
        });
      }
    });
  }
  render() {
    const {
      accountsUrl,
      isAPILoaded
    } = this.state;
    if (!isAPILoaded) {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Placeholder, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, null));
    }
    console.log(this.state);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "gf-block__main"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Panel, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Control Your Accounts', 'gf-social-icons'),
      icon: "user"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_socialRepeateater__WEBPACK_IMPORTED_MODULE_4__.SocialRepeateater, {
      accountsUrl: accountsUrl
    })))));
  }
}

/***/ }),

/***/ "./src/components/iconPopup.jsx":
/*!**************************************!*\
  !*** ./src/components/iconPopup.jsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconPopup: () => (/* binding */ IconPopup)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fontAwsomeIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../fontAwsomeIcon */ "./src/fontAwsomeIcon.js");
/* harmony import */ var _assets_css_socialRepeateater_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/css/socialRepeateater.scss */ "./src/components/assets/css/socialRepeateater.scss");



function IconPopup(props) {
  const handelIconClickInPopUp = e => {
    const spanEle = e.target.closest('span');
    const iconId = spanEle.getAttribute('icon-id');
    spanEle.classList.add('active');
    props.iconDataChangeHandle(iconId, props.index);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gf-social-icons-selection-popup-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gf-social-icons-selection-popup "
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "title"
  }, "Icon name"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "gf-social-icons-cross-popup",
    onClick: props.hidePopup
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gf-social-icons-list"
  }, Object.keys(_fontAwsomeIcon__WEBPACK_IMPORTED_MODULE_1__.fontIcons).map(icon => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    "icon-id": icon,
    key: icon,
    className: "gf-social-icons-single-icon",
    onClick: handelIconClickInPopUp
  }, _fontAwsomeIcon__WEBPACK_IMPORTED_MODULE_1__.fontIcons[icon].icon)))));
}

/***/ }),

/***/ "./src/components/socialRepeateater.jsx":
/*!**********************************************!*\
  !*** ./src/components/socialRepeateater.jsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SocialRepeateater: () => (/* binding */ SocialRepeateater)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assets_css_socialRepeateater_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/css/socialRepeateater.scss */ "./src/components/assets/css/socialRepeateater.scss");
/* harmony import */ var _socialRepeatedField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./socialRepeatedField */ "./src/components/socialRepeatedField.jsx");




const {
  customize
} = wp;
function SocialRepeateater(props) {
  const [accountsUrl, seturl] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(props.accountsUrl); // [['facebook', 'facebook.com'], ['google-x', 'google.com']]
  const addInputField = e => {
    e.preventDefault();
    seturl([...accountsUrl, ['facebook', '']]);
  };
  console.log('comming form SocialRepeateater 😓');
  const inputDataChangeHandle = (value, index) => {
    const newUrl = [...accountsUrl]; //[['facebook', 'facebook.com'], ['google-x', 'google.com']]
    newUrl[index][1] = value;
    seturl(newUrl);
  };
  const iconDataChangeHandle = (iconId, index) => {
    const newIcon = [...accountsUrl]; //[['facebook', 'facebook.com'], ['google-x', 'google.com']]
    newIcon[index][0] = iconId;
    seturl(newIcon);
  };
  customize.value('gf_social_icons_general_settings[accountsUrl]')(accountsUrl);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gutefy_settings_wrapper_accounts_social_icon gf-social-icons-repeater-field-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "gf_social_icons_add_account_button",
    onClick: addInputField
  }, "Add Input Field"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gf-social-icons-repeater-field-wrapper"
  }, accountsUrl.map((input, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_socialRepeatedField__WEBPACK_IMPORTED_MODULE_2__.SocialRepeatedField, {
    input: input,
    index: index,
    inputDataChangeHandle: inputDataChangeHandle,
    iconDataChangeHandle: iconDataChangeHandle
  }))));
}

/***/ }),

/***/ "./src/components/socialRepeatedField.jsx":
/*!************************************************!*\
  !*** ./src/components/socialRepeatedField.jsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SocialRepeatedField: () => (/* binding */ SocialRepeatedField)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fontAwsomeIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../fontAwsomeIcon */ "./src/fontAwsomeIcon.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _iconPopup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./iconPopup */ "./src/components/iconPopup.jsx");





function SocialRepeatedField(props) {
  const [showPopup, setShowPopup] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const hidePopup = () => {
    setShowPopup(!showPopup);
  };
  const removeInputField = e => {
    const accountData = e.target.closest(".gf-social-icons-repeater-field").querySelector(".components-input-control__input").value;
    // const DataRestore =  
    //FIXME - complete it 
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gf-social-icons-repeater-field-child-wrapper gf-social-icons-is-idle"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gf-social-icons-repeater-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "gf-social-icons--icon-data",
    onClick: () => {
      setShowPopup(!showPopup);
    }
  }, _fontAwsomeIcon__WEBPACK_IMPORTED_MODULE_1__.fontIcons[`${props.input[0]}`].icon), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalInputControl, {
    className: "gf-social-icons-url",
    placeholder: "https://facebook.com",
    type: "url",
    value: props.input[1],
    onChange: e => {
      props.inputDataChangeHandle(e, props.index);
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "gf-social-icons-cross-account",
    onClick: removeInputField
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
  })))), showPopup && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_iconPopup__WEBPACK_IMPORTED_MODULE_3__.IconPopup, {
    index: props.index,
    iconDataChangeHandle: props.iconDataChangeHandle,
    hidePopup: hidePopup
  }));
}

/***/ }),

/***/ "./src/components/styleSettings.jsx":
/*!******************************************!*\
  !*** ./src/components/styleSettings.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StyleSettings: () => (/* binding */ StyleSettings)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);




const {
  customize
} = wp;
const {
  api
} = wp;
class StyleSettings extends _wordpress_element__WEBPACK_IMPORTED_MODULE_2__.Component {
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
          this.setState({
            hoverStyleControl: GfSocialIconsSettings["styleSettings"].hoverStyleControl,
            IconColor: GfSocialIconsSettings["styleSettings"].IconColor,
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
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Placeholder, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, null));
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "gf-block__main"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Panel, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Panel Body One', 'gf-social-icons'),
      icon: "admin-plugins"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Hover style for your icons', 'gf-social-icons'),
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select Hover Style', 'gf-social-icons'),
      onChange: hoverStyleControl => {
        this.setState({
          hoverStyleControl
        });
        customize.value('gf_social_icons_style_settings[hoverStyleControl]')(hoverStyleControl);
      },
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Please Select...', 'gf-social-icons'),
        value: ''
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Style 1', 'gf-social-icons'),
        value: 'style-1'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Style 2', 'gf-social-icons'),
        value: 'style-2'
      }],
      value: hoverStyleControl
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorPalette, {
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

/***/ }),

/***/ "./src/fontAwsomeIcon.js":
/*!*******************************!*\
  !*** ./src/fontAwsomeIcon.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fontIcons: () => (/* binding */ fontIcons)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const fontIcons = {
  facebook: {
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"
    })),
    defaultColor: 'red'
  },
  whatsapp: {
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 448 512"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
    })),
    defaultColor: 'red'
  },
  facebook2: {
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"
    })),
    defaultColor: 'red'
  },
  facebook3: {
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"
    })),
    defaultColor: 'red'
  },
  facebook4: {
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"
    })),
    defaultColor: 'red'
  }
};

/***/ }),

/***/ "./src/components/assets/css/socialRepeateater.scss":
/*!**********************************************************!*\
  !*** ./src/components/assets/css/socialRepeateater.scss ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

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
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_styleSettings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/styleSettings */ "./src/components/styleSettings.jsx");
/* harmony import */ var _components_generalSettings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/generalSettings */ "./src/components/generalSettings.jsx");

// import 






// global varialbe 
const {
  customize
} = wp;
const addSectionAndControl = (title, panelKey = 'gf_social_icons__customizer-panel', sectionKey, customize, controllerType) => {
  customize.section.add(new customize.Section(sectionKey, {
    customizeAction: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(`Gutefy Social Icons ▸ ${title}`, 'gf-social-icons'),
    panel: panelKey,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(title, 'gf-social-icons')
  }));
  customize.control.add(new customize.Control(`gf_social_icons__${title.toLowerCase().replace(/\s+/g, '-')}-control`, {
    section: sectionKey,
    type: controllerType
  }));
};
customize.bind('ready', function () {
  const panelKey = 'gf_social_icons__customizer-panel';
  customize.panel.add(new customize.Panel(panelKey, {
    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Social Icons Style Settings', 'gf-social-icons'),
    priority: 1000,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Gutefy Social Icons', 'gf-social-icons')
  }));

  //General Settings Sections
  addSectionAndControl('General Settings', panelKey, 'gf_social_icons__general-section', customize, 'gf-social-icons-general-control');

  //Section Style Settings
  addSectionAndControl('Style Settings', panelKey, 'gf_social_icons__style-section', customize, 'gf-social-icons-style-control');

  //Render Style Settings 
  const GeneralSettingsDom = document.getElementById('gf_social_icons__general-control-wrapper');
  if (GeneralSettingsDom) {
    const GeneralSettingsDomRoot = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createRoot)(GeneralSettingsDom);
    GeneralSettingsDomRoot.render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_generalSettings__WEBPACK_IMPORTED_MODULE_5__.GeneralSettings, null));
  }

  //Render Style Settings 
  const styleSettingsDom = document.getElementById('gf_social_icons__style-control-wrapper');
  if (styleSettingsDom) {
    const root = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createRoot)(styleSettingsDom);
    root.render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_styleSettings__WEBPACK_IMPORTED_MODULE_4__.StyleSettings, null));
  }
});
})();

/******/ })()
;
//# sourceMappingURL=customizer.js.map