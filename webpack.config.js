const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    ...defaultConfig,
    entry: {
        ...defaultConfig.entry,
        customizer: path.resolve( process.cwd(), 'src', 'customizer.js' ),
        view: path.resolve( process.cwd(), 'src', 'view.js' ),
    },
    plugins: [
        ...defaultConfig.plugins,
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(process.cwd(), 'src', 'iconStore.json'),
                    to: path.resolve(process.cwd(), 'build', 'iconStore.json'),
                },
            ],
        }),
    ],
};
