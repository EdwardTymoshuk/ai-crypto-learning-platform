import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: 'USD' | 'EUR' | 'PLN' | 'UAH',
    notation?: Intl.NumberFormatOptions['notation'],
    removeTrailingZeros?: boolean,
  } = {}
) {
  const { currency = 'USD', notation = 'compact', removeTrailingZeros = false } = options

  const numericPrice = typeof price === 'string' ? parseFloat(price) : price
  let formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice)

  if (removeTrailingZeros) {
    formattedPrice = formattedPrice.replace(/\.0+$/, '')
  }

  return formattedPrice
}

