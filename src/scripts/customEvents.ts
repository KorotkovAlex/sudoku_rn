let events: any = {};
const EventEmitter = {
  dispatch: (event: string, data?: any) => {
    if (!events[event]) return;
    events[event].forEach((callback: any) => callback(data));
  },
  subscribe: (event: string, callback: any) => {
    if (!events[event]) events[event] = [];
    events[event].push(callback);
  },
  unsubscribe: (event: any) => {
    delete events[event];
  }
};

export default EventEmitter;
