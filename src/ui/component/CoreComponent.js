import { LitElement } from 'lit';
import store from '../../lib/store';

class CoreComponent extends LitElement {
  constructor(attributes = []) {
    super();
    this.store = store;
    this.props = {};
    this.attrs = attributes;

    this.store.subscribe(() => {
      this.updateState();
      this.requestUpdate();
    });
  }

  connectedCallback() {
    super.connectedCallback();
    for (const attribute of this.attrs) {
      this.props[attribute] = this.getAttribute(attribute);
    }
  }

  shouldUpdate(_changedProperties) {
    for (const attribute of this.attrs) {
      if (_changedProperties.has(attribute)) {
        this.props[attribute] = this.getAttribute(attribute);
      }
    }
    return super.shouldUpdate(_changedProperties);
  }

  updateState() {}
}

export default CoreComponent;
