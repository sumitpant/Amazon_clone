import React from 'react'
import '../Styles/Order.css'
import moment from 'moment'
import CheckoutProducts from './CheckoutProducts'
import CurrencyFormat from 'react-currency-format'
const Order = ({order}) => {
    console.log(order)
    return (
        <div className="order">
            <h2>Order</h2>
            <p>{moment.unix(order.doc.created).format("MMMM Do YYYY,h:mma")}</p>
            <p className="order__id">
                <small>{order.id}</small>

            </p>
            {order.doc.basket?.map(item=>{
               return <CheckoutProducts
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                hideButton={false}
                />
            })}
            <CurrencyFormat
            renderText={(value)=>{
                <h3 className="order__total">Order Total
                :{value}
                </h3>
            }}
            decimalScale={2}
            value={order.doc.amount/100}
            displayType={"text"}
            thousandSeperator={true}
            prefix={"INR"}
            
            />

        </div>
    )
}

export default Order
