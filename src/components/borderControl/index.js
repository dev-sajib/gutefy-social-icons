/* jshint esversion: 6 */
import Border from './border';
import { createRoot } from 'react-dom/client';

export const BorderControl = wp.customize.Control.extend({
  renderContent: function renderContent() {
    const container = this.container[0];
    const root = createRoot(container);
    root.render(<Border control={this} />);
  },
});
