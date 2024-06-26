import { IconType } from 'react-icons'
import { MdOutlineHome, MdOutlineShoppingBag, MdOutlineTrendingUp } from 'react-icons/md'

export type CHOOSE_PLAN_TYPE = {
    price: {
        label: string | undefined,
        price: number | undefined,
    },
    description: string,
    options: string[],
    recomended: boolean,
    color: string
}
export type MENU_ITEMS_TYPE = {
    name: string,
    icon: IconType,
    sub?: string[],
}

export const CHOOSE_PLAN: CHOOSE_PLAN_TYPE[] = [
    {
        price: {
            label: 'Free',
            price: 0
        },
        description: 'The basic plan to start with absolutely for free',
        options: [
            'Earn reputation tokens for certification',
            'Access limited career resources',
            'Create a basic profile',
            'No upfront cost: get started for free',
        ],
        recomended: false,
        color: 'free',
    },
    {
        price: {
            label: 'Premium',
            price: 18
        },
        description: 'A more extensive plan with AI and NFT',
        options: [
            'Earn reputation tokens for certification',
            'Access AI career trainer for personalized guidance (up to 20,000 words/month)',
            'Create an NFT profile model, train it, and exchange it with others for tockens as a reward',
            'Generate a professional CV and references to impress potential employers',
            'Monthly prizes',
        ],
        recomended: false,
        color: 'premium',
    },
    {
        price: {
            label: 'Exclusive',
            price: 28
        },
        description: 'For more demanding people who are focused on success',
        options: [
            'Earn reputation tokens for certification',
            'Access AI career trainer for personalized guidance (up to 50,000 words/month)',
            'Create an NFT profile model, train it, and exchange it with others for tockens as a reward',
            'Generate a professional CV and references to impress potential employers',
            'Monthly prizes',
            'Engage with loteries and gain access to an exclusive reward club',
        ],
        recomended: true,
        color: 'exclusive',
    },
    {
        price: {
            label: 'VIP',
            price: 48,
        },
        description: 'Get access to all options and use the platform to its fullest potential',
        options: [
            'Earn reputation tokens for certification',
            'Access AI career trainer for personalized guidance (up to 50,000 words/month)',
            'Create an NFT profile model, train it, and exchange it with others for tockens as a reward',
            'Generate a professional CV and references to impress potential employers',
            'Monthly prizes',
            'Engage with loteries and gain access to an exclusive reward club',
            'Dubdomein and QR code with CV and references',
        ],
        recomended: false,
        color: 'vip',
    },
]

export const MENU_ITEMS: MENU_ITEMS_TYPE[] = [
    {
        name: 'Home',
        icon: MdOutlineHome,
    },
    {
        name: 'Ai careera trainer',
        icon: MdOutlineTrendingUp,
    },
    {
        name: 'Marketplace',
        icon: MdOutlineShoppingBag,
        sub: ['Reward club', 'Courses', 'Events', 'AI tools']
    },
]