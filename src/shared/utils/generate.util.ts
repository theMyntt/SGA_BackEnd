export function generateStringToken(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  )
}

export function generateIntegerToken(): number {
  return Math.floor(1000 + Math.random() * 9000)
}
