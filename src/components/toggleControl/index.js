/* jshint esversion: 6 */
import Toggle from './toggle';
import { createRoot } from 'react-dom/client';

export const ToggleControl = wp.customize.Control.extend({
  renderContent: function renderContent() {
    const container = this.container[0];
    const root = createRoot(container);
    root.render(<Toggle control={this} />);
  },
});
