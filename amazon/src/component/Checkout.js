import React from 'react'
import { useStateValue } from '../Context/StateProvider'
import '../Styles/Checkout.css'
import CheckoutProducts from './CheckoutProducts'
import Subtotal from './Subtotal'
import FlipMove from 'react-flip-move';

const Checkout = () => {
    const [{basket,user},dispatch]=useStateValue();
    console.log(basket)
    return (
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout_ad" src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'
                />

                <div>
                    <h3>Hello {user?.email}</h3>
                    <h2 className="checkout__title">
                        Your shopping Basket
                </h2>
                {/* <FlipMove> */}
                {basket.map((item,key)=>{
                    return <CheckoutProducts
                    key={key}
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    hideButton={true}

                    />
                })}
                {/* </FlipMove> */}
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
