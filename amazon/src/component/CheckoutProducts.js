import React from 'react'
import { useStateValue } from '../Context/StateProvider'
import '../Styles/CheckoutProduct.css'
const CheckoutProducts = ({id,image,title,price,rating}) => {

    const[{basket},dispatch]=useStateValue();
    const removeFromBasket=()=>{
        dispatch({
            type:'REMOVE_FROM_BASKET',
            id:id,

        })
    }
    return (
        <div className="checkoutProduct">
            <img src={image} alt="/" className="checkoutProduct__image"/>

            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>
                <p className="checkoutProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct__rating">
                    {
                        Array(rating).fill().map((_,i)=>{
                            return <p key={i}>*</p>
                        })
                    }
                </div>
                <button onClick={removeFromBasket}> Remove from Basket</button>
            </div>

            
        </div>
    )
}

export default CheckoutProducts
