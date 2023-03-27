import { LitElement } from 'lit';
import store from '../../lib/store';

class CoreComponent extends LitElement {
  constructor(attributes = []) {
    super();
    this.store = store;
    this.props = {};
    for (const attribute of attributes) {
      this.props[attribute] = this.getAttribute(attribute);
    }
  }
}

export default CoreComponent;
