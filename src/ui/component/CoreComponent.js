import { LitElement } from 'lit';

class CoreComponent extends LitElement {
  constructor(attributes = []) {
    super();
    this.props = {};
    this.attrs = attributes;
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
}

export default CoreComponent;
