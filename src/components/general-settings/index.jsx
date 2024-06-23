/* jshint esversion: 6 */
import {GeneralSettings} from './generalSettings';
import { render } from '@wordpress/element';

export const GeneralSettingsControl = wp.customize.Control.extend({
	renderContent: function renderContent() {
		// render(<GeneralSettings control={this} />, this.container[0]);
		render(<GeneralSettings control={this} />, this.container[0]);
	},
});
