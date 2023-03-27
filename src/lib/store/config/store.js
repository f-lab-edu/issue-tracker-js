import Observer from './observer';

class Store extends Observer {
  constructor(reducer, initialState = {}) {
    super();
    this.state = initialState;
    this.reducer = reducer;
  }

  getState() {
    return this.state;
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action);
    this.notify();
  }
}

export default Store;
