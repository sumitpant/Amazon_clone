import React from "react";
import "../Styles/Header.css";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import SearchIcon from '@material-ui/icons/Search';
import {Link} from 'react-router-dom'
import{useStateValue} from '../Context/StateProvider'
import {auth} from '../firebase/firebase'
const Header = () => {
    const[{basket,user},dispatch]=useStateValue()
    const handleAuthentication=()=>{
        if(user){
           auth.signOut()
        }
    }
    return (
        <div className="header">
            {/* addlogo */}
            <Link to="/">
            <img src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" className="header__logo" alt="logo" />
            </Link>
            <div className="header__search">
                <input className="header__searchInput" type="text" />
                <SearchIcon
                    className="header__searchIcon"
                />


            </div>
            <div className="header__nav">
            <Link to={!user&&"/login"}>
                <div className="header__option" onClick={handleAuthentication}>
               
                    <span className="header__optionLineOne">
                       Hello {user?user.email:"Guest"}
                       
                  </span>
               
                    <span className="header__optionLineTwo">
                         {user?'Sign Out':'Sign In'}
                  </span>
                
                </div>
                </Link>
                <div className="header__option">
                    <span className="header__optionLineOne">
                        Returns
                    </span>
                    <span className="header__optionLineTwo">
                        & Orders
                    </span>
                </div>
                <div className="header__option">
                    <span className="header__optionLineOne">
                        Your
                    </span>
                    <span className="header__optionLineTwo">
                        Prime
                    </span>

                </div>
                <Link to="/checkout">
                <div className="header__optionBasket">

                    <ShoppingBasketIcon />
                    <span className="header__optionLineTwo header__basketCount">
                        {/* Ooptional chaining */}
                        {basket?.length}
                    </span>

                </div>
                </Link>

            </div>
        </div>
    );
};

export default Header;
