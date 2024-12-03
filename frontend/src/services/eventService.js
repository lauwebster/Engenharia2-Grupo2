const eventService = {
  listeners: new Map(),

  emit(event) {
    const callbacks = this.listeners.get(event) || [];
    callbacks.forEach(callback => callback());
  },

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  },

  off(event, callback) {
    const callbacks = this.listeners.get(event) || [];
    const index = callbacks.indexOf(callback);
    if (index > -1) {
      callbacks.splice(index, 1);
    }
  }
};

export default eventService; 