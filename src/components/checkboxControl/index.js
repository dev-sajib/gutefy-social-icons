/* jshint esversion: 6 */
import Checkbox from './checkbox';
import { createRoot } from 'react-dom/client';

export const CheckboxControl = wp.customize.Control.extend({
  renderContent: function renderContent() {
    const container = this.container[0];
    const root = createRoot(container);
    root.render(<Checkbox control={this} />);
  },
});
