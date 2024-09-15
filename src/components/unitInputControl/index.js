/* jshint esversion: 6 */
import { UnitInput } from './unitInput';
import { createRoot } from 'react-dom/client';
export const UnitInputControl = wp.customize.Control.extend({
  renderContent: function renderContent() {
    const container = this.container[0];
    const root = createRoot(container);
    root.render(<UnitInput control={this} />);
  },
});
