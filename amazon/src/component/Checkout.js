import React from 'react'
import { useStateValue } from '../Context/StateProvider'
import '../Styles/Checkout.css'
import CheckoutProducts from './CheckoutProducts'
import Subtotal from './Subtotal'

const Checkout = () => {
    const [{basket},dispatch]=useStateValue();
    console.log(basket)
    return (
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout_ad" src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'
                />

                <div>
                    <h2 className="checkout__title">
                        Your shopping Basket
                </h2>
                {basket.map(item=>{
                    return <CheckoutProducts
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}

                    />
                })}
                </div>
            </div>

            <div className="checkout__right">
                {/* subtotal component */}
                <Subtotal/>
            </div>
        </div>
    )
}

export default Checkout