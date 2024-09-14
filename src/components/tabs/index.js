/* jshint esversion: 6 */
import { Tabs } from './tabs';
import { createRoot } from 'react-dom/client';
export const TabsControl = wp.customize.Control.extend({
  renderContent: function renderContent() {
    const container = this.container[0];
    const root = createRoot(container);
    root.render(<Tabs control={this} />);
  },
});
