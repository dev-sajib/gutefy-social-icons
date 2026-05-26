/* jshint esversion: 6 */
import ConditionalDisplay from './conditionalDisplay';
import { createRoot } from 'react-dom/client';

export const ConditionalDisplayControl = wp.customize.Control.extend({
  renderContent: function renderContent() {
    const container = this.container[0];
    const root = createRoot(container);
    root.render(<ConditionalDisplay control={this} />);
  },
});
