import React,{createContext,useContext,useReducer} from "react"

//Prepares the data Layout create contexxt
export const StateContext=createContext();
//Wrap Our app and provide the data Layer provide context to children
export const StateProvider=({reducer,initialState,children})=>{
             
   return( <StateContext.Provider value={useReducer(reducer,initialState)}>
      
      
        {children}
        
    </StateContext.Provider>);
}

//pull the information from data layer// accepts context
export const useStateValue=()=>useContext(StateContext);