export function Throttle(delay: number = 300) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    let lastCall = 0;
    descriptor.value = function (...args: any[]) {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        return originalMethod.apply(this, args);
      }
    };
    return descriptor;
  };
}
