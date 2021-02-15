import react ,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import Nav from '../Component/Nav'
import SearchFilter from '../Component/SearchFilter'
import InfoCard_L from '../Component/InfoCard_L'
import "./SearchPage.css"
import { setSearchResult } from '../Actions/SearchResultAction';

function SearchPage(){
    // Global State
    const [searchResult,setSearchResult] = useState([]);
    const searchText = useSelector(state => state.searchText);
    const [cartSize,setCartSize] = useState(0);

    // Brower Storage
    useEffect(() => {        
        if(localStorage.getItem('searchStorage') === null){
            localStorage.setItem('searchStorage',JSON.stringify([]));
        }
        else{
            let searchStorage = JSON.parse(localStorage.getItem('searchStorage'));
            setSearchResult(searchStorage.hits);
        }

        if(localStorage.getItem('purchaseList') !== null){
            let purchaseList = JSON.parse(localStorage.getItem('purchaseList'));
            setCartSize(purchaseList.length);
        }
    },[])

    // Layout
    return (
        <div>
            <Nav cartSize={cartSize}/>
            <h2 className="search_result_text">Search Result: {searchText}</h2>
            <div className="search_list_container">
                <div className="search_list">
                    {searchResult.map(result =>
                        <InfoCard_L 
                            key={result.recipe.label}
                            img={result.recipe.image}
                            label={result.recipe.label}
                            dietLabels={result.recipe.dietLabels}
                            calories={result.recipe.calories}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;