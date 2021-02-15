import react ,{useState,useEffect} from 'react'
import Nav from '../Component/Nav'
import PurchaseRow from '../Component/PurchaseRow'
import './PurchasePage.css'

function PurchasePage(){
    // Local State
    const [purchaseList,setPurchaseList] = useState([]);
    const [cartSize,setCartSize] = useState(0);
    const [amount,setAmount] = useState(0);

    // Brower Starage
    useEffect(() => {
        if(localStorage.getItem('purchaseList') === null){
            setPurchaseList([]);
        }
        else{
            let purchaseList = JSON.parse(localStorage.getItem('purchaseList'));
            setPurchaseList(purchaseList);
            setCartSize(purchaseList.length);
        }
    },[])

    useEffect(() => {
        var totalPrice = 0;
        for (var i = 0 ; i < purchaseList.length;i++){
            totalPrice = parseFloat(totalPrice)+parseFloat(purchaseList[i].price);
        }
        setAmount(totalPrice);
        setCartSize(purchaseList.length);
    },[purchaseList])

    // Event Function
    function pay(){
        localStorage.setItem('purchaseList',JSON.stringify([]));

        window.location.href='/finish';
    }
    
    // Layout
    return(
        <div>
            <Nav cartSize={cartSize} />
            <div className="purchase_food_list">
                {purchaseList.map(purchase => <PurchaseRow key={purchase.label} content={purchase} purchaseList={purchaseList} setPurchaseList={setPurchaseList}/>)}
            </div>
            <div className="amount_pay_row">
                <h2 className="amount_text">Amount: $ {amount.toFixed(1)}</h2>
                <button className="pay_button" onClick={pay}>Pay</button>
            </div>
        </div>
    );
}

export default PurchasePage;