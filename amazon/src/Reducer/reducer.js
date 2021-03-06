export const initialState={
    basket:[],
    user:null
};

//selector
export const getTotal=(basket)=>{
   return basket?.reduce((acc,item)=>{
             return acc+item.price
    },0)
}

const reducer=(state,action)=>{
    
    switch(action.type){
       
        case 'ADD_TO_BASKET':
            return{
                //this is done to avoid mutataion ie creation of new object at every render
                //Reducers can only make copies of the original values, and then they can mutate the copies.
                ...state,
                basket:[...state.basket,action.item],
            }
            case'REMOVE_FROM_BASKET':{
               const index=state.basket.findIndex(
                   (basketItem)=>basketItem.id===action.id
               )
               let newBasket=[...state.basket];
               if(index>=0){
                   newBasket.splice(index,1)
               }
               else{
                   console.warn(`Cant remove product (id:${action.id})as it's not in basket!`)
               }
               return {
                 ...state,
                 basket:newBasket
               }
            }
            case 'SET_USER':{
                return{
                    ...state,
                    user:action.user
                }
            }
            case 'EMPTY_BASKET':{
               return{ ...state,
                   basket:[]}
            }
            default:
                return state;
    }
    
}

export default reducer
