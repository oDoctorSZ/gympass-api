export class MaxDistanceError extends Error {
  constructor() {
    super('The current distance exceed the maximum distance allowed')
  }
}