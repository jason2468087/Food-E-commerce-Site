import react from 'react'
import "./InfoCard_S.css"

function InfoCard_S({food}){

    console.log(food);
    return (
        <div className="info_card">
            <img className="food_img" src={food.image}/>
            <h4 className="food_title">{food.label}</h4>
        </div>
    );
}

export default InfoCard_S;