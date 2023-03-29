class Observer {
  constructor() {
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.unsubscribe(listener);
  }

  unsubscribe(listener) {
    this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((listener) => listener());
  }
}

export default Observer;
