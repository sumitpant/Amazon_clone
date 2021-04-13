import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState,useEffect } from 'react'
import CurrencyFormat from 'react-currency-format'
import { Link } from 'react-router-dom'
import { useStateValue } from '../Context/StateProvider'
import '../Styles/Payment.css'
import CheckoutProduct from './CheckoutProducts'
import {getTotal} from '../Reducer/reducer'
import axios from '../axios/axios'
import {useHistory} from 'react-router-dom'
import { db } from '../firebase/firebase'
const Payment = () => {
    const history=useHistory();
    const [{ basket, user }, dispatch] = useStateValue();
    
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setclientSecret] = useState(true)
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setProcessing(true);


        const payload =await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{

            db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id).set({
                basket:basket,
                amount:paymentIntent.amount,
                created:paymentIntent.created
            })
            //payment Intent = payment confirmation
            setSucceeded(true);
            setError(null);
            setProcessing(false);
            
            dispatch({
                type:'EMPTY_BASKET'
            })
            

            history.replace('/orders')
        })


    }
    const handleChange = (e) => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");

    }

    useEffect(() => {
    
        //generate special secret that allows charge customer
        //and whenever basket changes new secret is generated
        let isMounted=true;
        
        const getClientSecret=async()=>{
         
             const response=await axios({
                 method:'post',
                 url:`/payments/create?total=${getTotal(basket)*100}`
             });
             
             if(isMounted) setclientSecret(response.data.clientSecret)
            
        }
        if(isMounted) getClientSecret();
        return()=> isMounted=false
        
    }, [basket])


    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout(<Link to="/checkout">{basket?.length} items</Link>)
                </h1>
                <div className="payment__section">
                    <div className="payment_title">you
                          <h3>Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>Address123</p>
                        <p>MOre Address</p>
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment_title">
                        <h3>Review items and delivery</h3>

                    </div>

                    <div className="payment__items">

                        {basket.map(item => {
                            return <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        })}

                    </div>
                </div>
                <div className="payment__section">
                   
                    <div className="payment__title">
                    <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* Stripe method */}

                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => {
                                        <>
                                            <h3>Order Total:{value}</h3>
                                        </>
                                    }}
                                    decimalScale={2}
                                    value={getTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}

                                />
                                

                                <button disabled={processing||disabled||succeeded}>
                                    <span>{processing?<p>Processing</p>:"Buy Now"}</span>
                                </button>
                            </div>

                         
                                {error&&<div>{error}</div>}
                           

                        </form>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Payment
