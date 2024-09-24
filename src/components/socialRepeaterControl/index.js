/* jshint esversion: 6 */
import { SocialRepeateater } from './socialRepeater';
import { createRoot } from 'react-dom/client';
import './socialRepeaterStyle.scss'
export const SocialRepeateaterControl = wp.customize.Control.extend({
  renderContent: function renderContent() {
    const container = this.container[0];
    const root = createRoot(container);
    root.render(<SocialRepeateater control={this} />);
  },
});
