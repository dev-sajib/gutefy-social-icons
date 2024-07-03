/* jshint esversion: 6 */
import {GeneralSettings} from './generalSettings';
import { createRoot } from '@wordpress/element';

export const GeneralSettingsControl = wp.customize.Control.extend({
  renderContent: function renderContent() {
    const container = this.container[0];
    const root = createRoot(container);
    root.render(<GeneralSettings control={this} />);
  },
});
