# Sticky Social Icons
![Sticky Social Icons](https://img.shields.io/badge/version-1.2.1-blue.svg)
![PHP Version](https://img.shields.io/badge/PHP-%3E%3D%207.2-blue.svg)
![WordPress Version](https://img.shields.io/badge/WordPress-%3E%3D%206.3-blue.svg)
![License](https://img.shields.io/badge/license-GPL--2.0--or--later-blue.svg)


Effortlessly add floating social icons to your website for seamless display and interaction.

## Description

Introducing **Sticky Social Icons**, a lightweight and responsive WordPress plugin that lets you easily display social media icons on the side of your website. You can choose your favorite social media platforms, link them to your profiles, and have users connect with you through clickable icons.

The plugin integrates seamlessly with the WordPress Customizer, making it incredibly easy to configure. All settings can be managed directly from the Customizer, allowing you to see real-time changes as you adjust your icons and layouts.

**Sticky Social Icons** is fully responsive, ensuring that your icons display perfectly on both large desktops and small mobile screens. It’s lightweight, which means it won’t slow down your site or affect performance.

Preloaded with popular social icons like **Facebook**, **Twitter (now X)**, **WhatsApp**, **Instagram**, **YouTube**, **LinkedIn**, **Telegram**, **Pinterest**, **Snapchat**, **TikTok**, **Reddit**, **Skype**, and options like **phone** and **email** (e.g., **Envelope**), the plugin allows you to enhance your site’s social presence. Future updates will expand the icon list and add more exciting features like animations and tooltips.

With **Sticky Social Icons**, you get a clean, fast, and user-friendly way to connect your website to your social channels, offering a seamless experience for your visitors.

## Features

- Easy integration of floating social icons
- Seamless display and interaction
- Customizable styles and settings
- Supports various social media platforms

## Installation

1. Download the plugin ZIP file from the [releases page](https://github.com/syed-sajib/gutefy-social-icons/releases), or install **Sticky Social Icons** from the WordPress.org plugin directory.
2. Go to your WordPress dashboard.
3. Navigate to `Plugins > Add New`.
4. Click `Upload Plugin`.
5. Select the downloaded ZIP file and click `Install Now`.
6. Activate the plugin through the 'Plugins' menu in WordPress.

If you cloned this repository instead of downloading a release, run `npm install && npm run build` first — the `build/` directory is not committed (see [Development](#development)).

## Usage

After activating the plugin, navigate to the plugin settings page to customize the social icons according to your preferences. You can adjust styles, positions, and choose which social media platforms to display.

## Development

### Source and Build

Everything shipped in `build/` is compiled from `src/` with [@wordpress/scripts](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/) (webpack). Nothing in this project is minified by hand or obfuscated, and there are no compiled binaries.

```bash
npm install
npm run build     # production build into build/
npm run start     # development build + watch
```

Build configuration: `webpack.config.js` (extends the default `@wordpress/scripts` config, adds the two entry points below and copies `src/iconStore.json` into `build/`).

| Source | Output |
|---|---|
| `src/customizer.js` (+ `src/components/**/*.jsx`, `src/customizer.scss`) | `build/customizer.js`, `build/customizer.css` |
| `src/view.js`, `src/view.scss` | `build/view.js`, `build/view.css` |
| `src/iconStore.json` | `build/iconStore.json` |

### Folder Structure

- `gf-social-icons.php`: Plugin bootstrap and header.
- `includes/`: PHP classes — `Core`, `TemplateLoader`, `Sanitize`, `Validation`, `BaseCustomizer`, plus `types/`, `controls/` (Customizer control registrations) and `global/` (activation, settings, enqueues).
- `src/`: Uncompiled source — React/JSX Customizer controls, SCSS, and the frontend script.
  - `components/`: One folder per Customizer control (`borderControl`, `colorControl`, `socialRepeaterControl`, `tabs`, `toggleControl`, `unitInputControl`, `checkboxControl`, `conditionalDisplayControl`, `selectDropDownControl`, `tooltip`) plus `styleGenerator.jsx` and `subControl.jsx`.
  - `customizer.js` / `customizer.scss`: Entry point and styles for the Customizer UI.
  - `view.js` / `view.scss`: Entry point and styles for the frontend.
  - `iconStore.json`: Icon catalogue (SVG paths and metadata).
- `build/`: Generated output — **not committed**, produced by `npm run build`.
- `vendor/`: Composer autoloader.

### Build and Development Scripts

- `build`: Compiles the source files.
- `format`: Formats the code.
- `lint:css`: Lints the CSS files.
- `lint:js`: Lints the JavaScript files.
- `packages-update`: Updates the WordPress packages.
- `plugin-zip`: Zips the plugin files for distribution.
- `start`: Starts the development server.

Run the scripts using npm. For example, to build the plugin, use:

```bash
npm run build
```
## Contributing

We welcome contributions to enhance the plugin. Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-branch
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m 'Add new feature'
    ```
4. Push to the branch:
    ```bash
    git push origin feature-branch
    ```
5. Submit a pull request.

## License

This plugin is licensed under the GPL-2.0-or-later License. See the [LICENSE](LICENSE) file for more information.

## Support

For support and further information, contact us at [admin@gutefy.com](mailto:admin@gutefy.com) or open an issue on the [issue tracker](https://github.com/syed-sajib/gutefy-social-icons/issues).





