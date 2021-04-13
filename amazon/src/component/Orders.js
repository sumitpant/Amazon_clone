import React,{useState,useEffect} from 'react'
import { useStateValue } from '../Context/StateProvider'
import { db } from '../firebase/firebase'
import '../Styles/Orders.css'
import Order from './Order'

const Orders = () => {
    const[{basket,user},dispatch]=useStateValue()
    const [orders, setOrders] = useState([])
    useEffect(() => {
        if(user){
        db.collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created','desc')//orders in descending order
        .onSnapshot(snapshot=>{
            setOrders(snapshot.docs.map(doc=>({
                id:doc.id,
                doc:doc.data()
            })))
        
        })}
        else{
            setOrders([]);
        }
    }, [user])
    return (
        <div className="orders">
            <h1>Your Orders</h1>
            <div className="orders__order">
                {orders?.map(order=>{
                    return<Order order={order}/>
                })}
            </div>


            
        </div>
    )
}

export default Orders
