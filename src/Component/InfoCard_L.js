import react from 'react'
import "./InfoCard_L.css"
import {useSelector,useDispatch} from 'react-redux';
import {setInspectingFood} from '../Actions/InspectingFoodAction';

function InfoCard_L({img,label,dietLabels,calories}){

    // Global State
    const dispatch = useDispatch();

    // Event Function
    function inspectFood(e){
        localStorage.setItem('inspectFood',label);
        window.location.href='/detail';
    }

    // Utility Function
    function generatePrice(){
        var price = 20+parseFloat(calories)/5000*250;

        return price.toFixed(1);
    }

    // Layout
    return (
        <div className="info_card_large">
            <img className="food_img" src={img} onClick={inspectFood}/>
            <h4 className="food_title" onClick={inspectFood}>{label}</h4>
            <p className="diet_label">{dietLabels}</p>
            <h5 className="food_energy">{parseFloat(calories).toFixed(0)} Cal</h5>
            <h3 className="food_price">${generatePrice()}</h3>
        </div>
    );
}

export default InfoCard_L;