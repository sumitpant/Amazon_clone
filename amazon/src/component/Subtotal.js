import React from 'react'

import '../Styles/Subtotal.css'
import CurrencyFormat from "react-currency-format"
import { useStateValue } from '../Context/StateProvider'
import {getTotal} from '../Reducer/reducer'
import {useHistory} from 'react-router-dom'
const Subtotal = () => {
    const history=useHistory();
    const[{basket},dispatch]=useStateValue()
   
    return (
        <div className="subtotal">
            <CurrencyFormat
            renderText={(value)=>(
                <>
                <p>
                {/* hw */}
                    Subtotal ({basket.length} items):
                    <strong>{` ${value}`}</strong>
                </p>
                <small className="subtotal__gift">
                    <input type="checkbox"/>This order
                    contains a gift
                </small>
                </>)}
                decimalScale={2}
                value={getTotal(basket)}
                displayType={"text"}//hw
                thousandSeparator={true}
                prefix={"INR"}
            />
            <button onClick={()=>{
                history.push('/payment')
            }}>Proceed to Checkout</button>
            
        </div>
    )
}

export default Subtotal
