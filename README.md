# Gutefy Social Icons
![Gutefy Social Icons](https://img.shields.io/badge/version-1.0.1-blue.svg)
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

1. Download the plugin ZIP file from the [releases page](https://github.com/dev-sajib/gutefy-social-icons/releases).
2. Go to your WordPress dashboard.
3. Navigate to `Plugins > Add New`.
4. Click `Upload Plugin`.
5. Select the downloaded ZIP file and click `Install Now`.
6. Activate the plugin through the 'Plugins' menu in WordPress.
6. Run `npm i && npm run start`.

## Usage

After activating the plugin, navigate to the plugin settings page to customize the social icons according to your preferences. You can adjust styles, positions, and choose which social media platforms to display.

## Development

### Folder Structure

- `classes/reactControl/`: Contains PHP classes for managing social icons settings and controls.
- `node_modules/`: Directory containing all Node.js modules.
- `src/`: Source directory for React components and SCSS files.
  - `components/assets/css/`: Contains SCSS files for styling the plugin.
  - `components/general-settings/`: React components for general settings.
  - `components/style-settings/`: React components for style settings.
  - `customizer.js`: Entry point for the customizer script.
  - `view.js`: Entry point for the view script.

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

For support and further information, please visit our website or contact us at [support@gutefy.com](mailto:admin@gutefy.com).

Feel free to update the placeholder links (`https://github.com/dev-sajib/gutefy-social-icons/releases`, `https://portfolio.gutefy.com`, and `mailto:admin@gutefy.com`) with the actual URLs and email address.





