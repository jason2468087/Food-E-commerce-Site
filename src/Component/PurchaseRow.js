import react ,{useState,useEffect} from 'react'
import delete_icon from '../img/Delete_Button.png'
import './PurchaseRow.css'

function PurchaseRow({content,purchaseList,setPurchaseList}){

    //
    function deleteHandler(){
        if(localStorage.getItem('purchaseList') === null){
            return;
        }

        let purchaseList = JSON.parse(localStorage.getItem('purchaseList'));
        const newList = purchaseList.filter(food => food.label !== content.label);
        setPurchaseList(newList);
        localStorage.setItem('purchaseList',JSON.stringify(newList));
    }

    return (
        <div className="purchase_row_grid">
            <img className="purchase_food_icon" src={content.image}/>
            <h2 className="purchase_food_title">{content.label}</h2>
            <h2 className="purchase_food_price">$ {content.price}</h2>
            <div className="delete_button_container">
                <img onClick={deleteHandler} className="delete_button" src={delete_icon}/>
            </div>
            <p className="purchase_food_calories">{content.calories} kJ</p>
        </div>
    );
}

export default PurchaseRow;