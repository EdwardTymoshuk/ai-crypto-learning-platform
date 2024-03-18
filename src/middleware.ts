export { default } from 'next-auth/middleware'

export const config = { matcher: ["/plans", '/payment', '/create-nft-profile'] }