export function LogMethodCall() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log(`Method ${propertyKey} called with arguments:`, args);
      const result = originalMethod.apply(this, args);
      console.log(`Method ${propertyKey} returned:`, result);
      return result;
    };
    return descriptor;
  };
}
