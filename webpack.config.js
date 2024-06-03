const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = {
    ...defaultConfig,
    entry: {
        ...defaultConfig.entry,
        customizer: path.resolve( process.cwd(), 'src', 'customizer.js' ),
        view: path.resolve( process.cwd(), 'src', 'view.js' ),
    }
};
