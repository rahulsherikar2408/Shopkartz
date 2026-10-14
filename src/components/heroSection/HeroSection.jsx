import React from 'react'

function HeroSection() {
    return (
        <div className="container mx-auto px-4 pt-4 pb-2">
            <div className="w-full overflow-hidden rounded-2xl shadow-md">
                <img 
                    src="https://static.vecteezy.com/system/resources/previews/004/299/835/original/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg" 
                    alt="Shopkartz Banner" 
                    className="w-full max-h-[420px] object-cover object-center"
                />
            </div>
        </div>
    )
}

export default HeroSection