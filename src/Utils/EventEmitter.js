let instances = [];

export class EventEmitter {
  constructor(eventName) {
    this._target = new EventTarget();
    this._eventName = eventName;
    const instanceByEventName = instances.find(
      (instance) => eventName === instance.eventName
    );
    if (instanceByEventName) {
      return instanceByEventName.instance;
    }
    instances.push({
      eventName,
      instance: this,
    });
  }
  on(listener) {
    return this._target.addEventListener(this._eventName, listener);
  }

  off(listener) {
    return this._target.removeEventListener(this._eventName, listener);
  }
  emit(detail) {
    return this._target.dispatchEvent(
      new CustomEvent(this._eventName, { detail, cancelable: true })
    );
  }
}
