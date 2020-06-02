export default function isPureObject(input: any): boolean {
  return input ? Object.getPrototypeOf(input).isPrototypeOf(Object) : false
}
