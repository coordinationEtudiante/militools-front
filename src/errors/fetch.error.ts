export class fetchError extends Error {
  status: number
  cause?: Record<string, unknown>

  constructor(message: string, options: { status: number } = { status: 400 }) {
    super(message)
    this.status = options.status
    Object.setPrototypeOf(this, fetchError.prototype)
  }
}
