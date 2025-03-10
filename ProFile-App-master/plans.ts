export const plans = [
    {
        link: process.env.NODE_ENV ==='development' ? 'https://buy.stripe.com/test_3cs00pe1V7VggU08ww' : '',
        priceId: process.env.NODE_ENV === 'development' ? 'price_1Qsjl0LXxdScVjo5jXOvh09j' : '',
        price: 3000,
        duration: '/Mois'
    },
    {
        link: process.env.NODE_ENV ==='development' ? 'https://buy.stripe.com/test_4gw5kJ5vp7VgbzG001' : '',
        priceId: process.env.NODE_ENV === 'development' ? 'price_1QsjxYLXxdScVjo5O66jgBMn' : '',
        price: 5000,
        duration: '/Mois'
    }
]