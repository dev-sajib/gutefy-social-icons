/* jshint esversion: 6 */
import { SelectDropDown } from './selectDropDown';
import { createRoot } from 'react-dom/client';
export const SelectDropDownControl = wp.customize.Control.extend({
  renderContent: function renderContent() {
    const container = this.container[0];
    const root = createRoot(container);
    root.render(<SelectDropDown control={this} />);
  },
});
