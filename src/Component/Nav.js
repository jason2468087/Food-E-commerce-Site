import react ,{useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {setSearchTitle} from "../Actions/SearchTitleAction";
import {setSearchResult} from '../Actions/SearchResultAction';
import website_icon from '../img/Website_Icon.png';
import cart_icon from '../img/Shopping_Cart_Icon.png';
import search_icon from '../img/Search_Icon.png';
import "./Nav.css";

function Nav({cartSize}){
    // Local variable
    const APP_ID = "f1acf1ea";
    const APP_KEY = "eb7bbe801fc128ffe4a7424e7cfbbd8d";
    
    // Local State
    const [recipes,setRecipes] = useState([]);
    const [searchText,setSearchText] = useState('');
  
    // Global State
    const searchResult = useSelector(state => state.searchResult);
    const dispatch = useDispatch();

    // Event Function
    function updateText(e){
        setSearchText(e.target.value);
    }

    const search = async (e) => {
        if (searchText === ''){
            return;
        }

        const exampleReq = `https://api.edamam.com/search?q=${searchText}&app_id=${APP_ID}&app_key=${APP_KEY}`;
        const response = await fetch(exampleReq);
        const data = await response.json();

        console.log(data);

        localStorage.setItem('searchStorage',JSON.stringify(data));

        dispatch(setSearchResult(data.hits));
        dispatch(setSearchTitle(searchText));

        window.location.href='/search';
    }

    function enterHandler(e){
        if(e.key === 'Enter'){
            search(e);
          }
    }

    // Layout
    return (
        <nav className="navigation_bar">
            <a href="/" className="homepage_link"><img className="website_icon" src={website_icon}/></a>
            <input onChange={updateText} value={searchText} onKeyPress={enterHandler} className="search_input"/>
            <img className="search_button" onClick={search} src={search_icon}/>
            <a href="/purchase" className="purchase_link">
                {cartSize>0? 
                    <p className="cart_size">{cartSize}</p>:null
                }
                <img className="cart_icon" src={cart_icon}/>
            </a>
        </nav>
    );
}

export default Nav;