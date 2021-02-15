import react from 'react'
import "./SearchFilter.css"

function SearchFilter({}){


    return (
        <div>
            <p className="sort_text">Sort by:</p>
            <select>
                <option>-</option>
                <option>calories</option>
                <option>price</option>
            </select>

            <input type="checkbox"></input>
            <label>a</label>
            <input type="checkbox"></input>
            <label>b</label>
            <input type="checkbox"></input>
            <label>c</label>
        </div>
    );
}

export default SearchFilter;