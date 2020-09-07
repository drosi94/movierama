let instance = null;

export class EventEmitter {
  constructor() {
    this.target = new EventTarget();
    
    if (instance) {
      return instance;
    }
    instance = this;
  }
  on(eventName, listener) {
    return this.target.addEventListener(eventName, listener);
  }

  off(eventName, listener) {
    return this.target.removeEventListener(eventName, listener);
  }
  emit(eventName, detail) {
    return this.target.dispatchEvent(
      new CustomEvent(eventName, { detail, cancelable: true })
    );
  }
}
