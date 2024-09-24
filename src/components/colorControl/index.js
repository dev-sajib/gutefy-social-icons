/* jshint esversion: 6 */
import Color from './color';
import { createRoot } from 'react-dom/client';

export const ColorControl = wp.customize.Control.extend({
  renderContent: function renderContent() {
    const container = this.container[0];
    const root = createRoot(container);
    root.render(<Color control={this} />);
  },
});
