import Commerce from '@chec/commerce.js'

export const commerce = new Commerce(`${import.meta.env.VITE_PUBLIC_KEY}`, true)
