export const loggingMiddleware =
  (store: any) => (next: any) => (action: any) => {
    console.log("Dispatching action:", action);
    const result = next(action);
    console.log("New state:", store.getState());
    return result;
  };
