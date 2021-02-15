import react ,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import Nav from '../Component/Nav'
import InfoRow from '../Assembly/InfoRow'
import './DetailPage.css'

function DetailPage(){
    // Local State
    const contentDefault = {
        recipe:{
            calories:0,
            cautions: ["cautions"],
            dietLabels: ["dietLabels"],
            healthLabels:["healthLabels"],
            image: "",
            ingredients: [{text:"",weight:0}],
            label: "",
            totalDaily:{
                CA: {label:"Calcium",quantity:0,unit:"%"},
                CHOCDF: {label:"Carbs",quantity:0,unit:"%"},
                CHOLE: {label:"Cholesterol",quantity:0,unit:"%"},
                FAT: {label:"Fat",quantity:0,unit:"%"},
                FE: {label:"Iron",quantity:0,unit:"%"},
                FIBTG: {label:"Fiber",quantity:0,unit:"%"},
                K: {label:"Potassium",quantity:0,unit:"%"},
                MG: {label:"Magnesium",quantity:0,unit:"%"},
                NA: {label:"Sodium",quantity:0,unit:"%"},
                NIA: {label:"Niacin (B3)",quantity:0,unit:"%"},
                P: {label:"Phosphorus",quantity:0,unit:"%"},
                PROCNT: {label:"Protein",quantity:0,unit:"%"},
                RIBF: {label:"Riboflavin (B2)",quantity:0,unit:"%"},
                THIA: {label:"Thiamin (B1)",quantity:0,unit:"%"},
                TOCPHA: {label:"Vitamin E",quantity:0,unit:"%"},
                VITA_RAE: {label:"Vitamin A",quantity:0,unit:"%"},
                VITB6A: {label:"Vitamin B6",quantity:0,unit:"%"},
                VITB12: {label:"Vitamin B12",quantity:0,unit:"%"},
                VITC: {label:"Vitamin C",quantity:0,unit:"%"},
                VITD: {label:"Vitamin D",quantity:0,unit:"%"},
                ZN: {label:"Zinc",quantity:0,unit:"%"},
            },
            totalNutrients: {
                CA: {label:"Calcium",quantity:0,unit:"g"},
                CHOCDF: {label:"Carbs",quantity:0,unit:"g"},
                CHOLE: {label:"Cholesterol",quantity:0,unit:"g"},
                FAT: {label:"Fat",quantity:0,unit:"g"},
                FE: {label:"Iron",quantity:0,unit:"g"},
                FIBTG: {label:"Fiber",quantity:0,unit:"g"},
                K: {label:"Potassium",quantity:0,unit:"g"},
                MG: {label:"Magnesium",quantity:0,unit:"g"},
                NA: {label:"Sodium",quantity:0,unit:"g"},
                NIA: {label:"Niacin (B3)",quantity:0,unit:"g"},
                P: {label:"Phosphorus",quantity:0,unit:"g"},
                PROCNT: {label:"Protein",quantity:0,unit:"g"},
                RIBF: {label:"Riboflavin (B2)",quantity:0,unit:"g"},
                THIA: {label:"Thiamin (B1)",quantity:0,unit:"g"},
                TOCPHA: {label:"Vitamin E",quantity:0,unit:"g"},
                VITA_RAE: {label:"Vitamin A",quantity:0,unit:"g"},
                VITB6A: {label:"Vitamin B6",quantity:0,unit:"g"},
                VITB12: {label:"Vitamin B12",quantity:0,unit:"g"},
                VITC: {label:"Vitamin C",quantity:0,unit:"g"},
                VITD: {label:"Vitamin D",quantity:0,unit:"g"},
                ZN: {label:"Zinc",quantity:0,unit:"g"},
            },
            totalWeight: 0
        }
    };
    const [foodContent,setFoodContent] = useState(contentDefault);
    const [searchResult,setSearchResult] = useState([]);
    const [foodTitle,setFoodTitle] = useState("");
    const [quantity,setQuantity] = useState(1);
    const [price,setPrice] = useState(0);
    const [cartSize,setCartSize] = useState(0);

    // Brower Storage
    useEffect(() => {
        // Fetch searchResult
        if(localStorage.getItem('searchStorage') === null){
            localStorage.setItem('searchStorage',JSON.stringify([]));
        }
        else{
            setSearchResult(JSON.parse(localStorage.getItem('searchStorage')).hits);
        }
        // Fetch inspectFood
        if(localStorage.getItem('inspectFood') === null){
            localStorage.setItem('inspectFood',JSON.stringify(""));
        }
        else{
            setFoodTitle(localStorage.getItem('inspectFood'));
        }
        
        if(localStorage.getItem('purchaseList') !== null){
            let purchaseList = JSON.parse(localStorage.getItem('purchaseList'));
            setCartSize(purchaseList.length);
        }
    },[])
    
    useEffect(() => {
        setupData();
    },[foodTitle])

    function setupData() {
        var targetFood = searchResult.filter(food => food.recipe.label === foodTitle)
        if (targetFood[0] !== undefined){
            setFoodContent(targetFood[0]);
            setPrice(generatePrice(targetFood[0]));
        }
    }

    function generatePrice(food){
        var price = 20+parseFloat(food.recipe.calories)/5000*250;
        return price.toFixed(1);
    }

    // Event Function
    function purchase(){

        if(localStorage.getItem('purchaseList') === null){
            localStorage.setItem('purchaseList',JSON.stringify([{
                label: foodTitle,
                image: foodContent.recipe.image,
                calories: foodContent.recipe.calories.toFixed(0),
                price: price,
                quantity: quantity
            }]));
        }
        else{
            let purchaseList = JSON.parse(localStorage.getItem('purchaseList'));
            purchaseList.push({
                label: foodTitle,
                image: foodContent.recipe.image,
                calories: foodContent.recipe.calories.toFixed(0),
                price: price,
                quantity: quantity
            });
            localStorage.setItem('purchaseList',JSON.stringify(purchaseList));
        }

        let purchaseList = JSON.parse(localStorage.getItem('purchaseList'));
        setCartSize(purchaseList.length);
    }

    // Layout
    return (
        <div>
            <Nav cartSize={cartSize}/>
            <div className="detail_tables">
                <img src={foodContent.recipe.image}/>
                <div className="title_grid">
                    <h1 className="detail_food_title">{foodContent.recipe.label}</h1>
                    <h2>{foodContent.recipe.calories.toFixed(0)} kcal</h2>
                    <p>{foodContent.recipe.totalWeight.toFixed(0)} g</p>
                    <div className="order_flex">
                        <h3 className="order_price">${price}</h3>
                        <button className="order_button" onClick={purchase}>Order</button>
                    </div>
                </div>
                <div className="macro_nutrition_flex">
                    <p className="macro_nutrition">Carbohydrate: {foodContent.recipe.totalNutrients.CHOCDF.quantity.toFixed(0)} g</p>
                    <p className="macro_nutrition">Protein: {foodContent.recipe.totalNutrients.PROCNT.quantity.toFixed(0)} g</p>
                    <p className="macro_nutrition">Fat: {foodContent.recipe.totalNutrients.FAT.quantity.toFixed(0)} g</p>
                </div>
                <div className="label_grid">
                    <p className="label_title">Diet Label:</p>
                    <div className="label_flex">
                        {foodContent.recipe.dietLabels.map(dLabel => <p className="label_content" key={dLabel}>{dLabel}</p>)}
                    </div>
                    
                    <p className="label_title">Health Label:</p>
                    <div className="label_flex">
                        {foodContent.recipe.healthLabels.map(hLabel => <p className="label_content" key={hLabel}>{hLabel}</p>)}
                    </div>
                    
                    <p className="label_title">Caution Label:</p>
                    <div className="label_flex">
                        {foodContent.recipe.cautions.map(c => <p className="label_content_caution" key={c}>{c}</p>)}
                    </div>
                </div>
                
                <hr/>
                <h2>Ingredient:</h2>
                <div className="ingredient_list_container">
                    <ul className="ingredient_list">
                        {foodContent.recipe.ingredients.map(ing => (
                            <li>{ing.text} ({ing.weight.toFixed(0)} g)</li>
                        ))}
                    </ul>
                </div>

                <hr/>
                <h2>Nutrition Fact:</h2>
                <div className="nutrient_table_container">
                    <table className="nutrient_table">
                        <thead>
                            <tr>
                                <th className="nutrient_label">Nutrient</th>
                                <th className="nutrient_data">Quantity</th>
                                <th className="nutrient_data">Daily Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{foodContent.recipe.totalNutrients.CA.label}</td>
                                <td>{foodContent.recipe.totalNutrients.CA.quantity.toFixed(0)} mg</td>
                                <td>{foodContent.recipe.totalDaily.CA.quantity.toFixed(0)} %</td>
                            </tr>
                            <tr>
                                <td>{foodContent.recipe.totalNutrients.CHOLE.label}</td>
                                <td>{foodContent.recipe.totalNutrients.CHOLE.quantity.toFixed(0)} mg</td>
                                <td>{foodContent.recipe.totalDaily.CHOLE.quantity.toFixed(0)} %</td>
                            </tr>
                            <tr>
                                <td>{foodContent.recipe.totalNutrients.FE.label}</td>
                                <td>{foodContent.recipe.totalNutrients.FE.quantity.toFixed(0)} mg</td>
                                <td>{foodContent.recipe.totalDaily.FE.quantity.toFixed(0)} %</td>
                            </tr>
                            <tr>
                                <td>{foodContent.recipe.totalNutrients.FIBTG.label}</td>
                                <td>{foodContent.recipe.totalNutrients.FIBTG.quantity.toFixed(0)} mg</td>
                                <td>{foodContent.recipe.totalDaily.FIBTG.quantity.toFixed(0)} %</td>
                            </tr>
                            <tr>
                                <td>{foodContent.recipe.totalNutrients.K.label}</td>
                                <td>{foodContent.recipe.totalNutrients.K.quantity.toFixed(0)} mg</td>
                                <td>{foodContent.recipe.totalDaily.K.quantity.toFixed(0)} %</td>
                            </tr>
                            <tr>
                                <td>{foodContent.recipe.totalNutrients.MG.label}</td>
                                <td>{foodContent.recipe.totalNutrients.MG.quantity.toFixed(0)} mg</td>
                                <td>{foodContent.recipe.totalDaily.MG.quantity.toFixed(0)} %</td>
                            </tr>
                            <tr>
                                <td>{foodContent.recipe.totalNutrients.NA.label}</td>
                                <td>{foodContent.recipe.totalNutrients.NA.quantity.toFixed(0)} mg</td>
                                <td>{foodContent.recipe.totalDaily.NA.quantity.toFixed(0)} %</td>
                            </tr>
                            <tr>
                                <td>{foodContent.recipe.totalNutrients.NIA.label}</td>
                                <td>{foodContent.recipe.totalNutrients.NIA.quantity.toFixed(0)} mg</td>
                                <td>{foodContent.recipe.totalDaily.NIA.quantity.toFixed(0)} %</td>
                            </tr>
                            <tr>
                                <td>{foodContent.recipe.totalNutrients.P.label}</td>
                                <td>{foodContent.recipe.totalNutrients.P.quantity.toFixed(0)} mg</td>
                                <td>{foodContent.recipe.totalDaily.P.quantity.toFixed(0)} %</td>
                            </tr>
                            <tr>
                                <td>{foodContent.recipe.totalNutrients.RIBF.label}</td>
                                <td>{foodContent.recipe.totalNutrients.RIBF.quantity.toFixed(0)} mg</td>
                                <td>{foodContent.recipe.totalDaily.RIBF.quantity.toFixed(0)} %</td>
                            </tr>
                            <tr>
                                <td>{foodContent.recipe.totalNutrients.THIA.label}</td>
                                <td>{foodContent.recipe.totalNutrients.THIA.quantity.toFixed(0)} mg</td>
                                <td>{foodContent.recipe.totalDaily.THIA.quantity.toFixed(0)} %</td>
                            </tr>
                            <tr>
                                <td>{foodContent.recipe.totalNutrients.TOCPHA.label}</td>
                                <td>{foodContent.recipe.totalNutrients.TOCPHA.quantity.toFixed(0)} mg</td>
                                <td>{foodContent.recipe.totalDaily.TOCPHA.quantity.toFixed(0)} %</td>
                            </tr>
                            <tr>
                                <td>{foodContent.recipe.totalNutrients.VITA_RAE.label}</td>
                                <td>{foodContent.recipe.totalNutrients.VITA_RAE.quantity.toFixed(0)} mg</td>
                                <td>{foodContent.recipe.totalDaily.VITA_RAE.quantity.toFixed(0)} %</td>
                            </tr>
                            <tr>
                                <td>{foodContent.recipe.totalNutrients.VITB6A.label}</td>
                                <td>{foodContent.recipe.totalNutrients.VITB6A.quantity.toFixed(0)} mg</td>
                                <td>{foodContent.recipe.totalDaily.VITB6A.quantity.toFixed(0)} %</td>
                            </tr>
                            <tr>
                                <td>{foodContent.recipe.totalNutrients.VITB12.label}</td>
                                <td>{foodContent.recipe.totalNutrients.VITB12.quantity.toFixed(0)} mg</td>
                                <td>{foodContent.recipe.totalDaily.VITB12.quantity.toFixed(0)} %</td>
                            </tr>
                            <tr>
                                <td>{foodContent.recipe.totalNutrients.VITC.label}</td>
                                <td>{foodContent.recipe.totalNutrients.VITC.quantity.toFixed(0)} mg</td>
                                <td>{foodContent.recipe.totalDaily.VITC.quantity.toFixed(0)} %</td>
                            </tr>
                            <tr>
                                <td>{foodContent.recipe.totalNutrients.VITD.label}</td>
                                <td>{foodContent.recipe.totalNutrients.VITD.quantity.toFixed(0)} mg</td>
                                <td>{foodContent.recipe.totalDaily.VITD.quantity.toFixed(0)} %</td>
                            </tr>
                            <tr>
                                <td>{foodContent.recipe.totalNutrients.ZN.label}</td>
                                <td>{foodContent.recipe.totalNutrients.ZN.quantity.toFixed(0)} mg</td>
                                <td>{foodContent.recipe.totalDaily.ZN.quantity.toFixed(0)} %</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            </div>
        </div>
    );
}

export default DetailPage;