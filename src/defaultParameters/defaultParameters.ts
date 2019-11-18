export function multiply(a = 1, b = 1) {
  return a * b
}

export function priceAfterTaxes(price: number, tax = multiply(21, 0.01)) {
  return price + price * tax
}
