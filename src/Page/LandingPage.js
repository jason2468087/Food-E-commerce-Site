import react ,{useState,useEffect} from 'react'
import Nav from '../Component/Nav'
import InfoRow from '../Assembly/InfoRow'
import intro_image from '../img/Intro_Image.jpg'
import intro_icon from '../img/Website_Icon.png'
import './LandingPage.css'

function LandingPage(){

    // Local State
    const beefFoodData = [
        {label: "Roast Sirloin Of Beef",image:"https://www.edamam.com/web-img/d37/d376c145f2a59befa7738a2c35caab31.jpg"},
        {label: "Beef Tea",image:"https://www.edamam.com/web-img/ad3/ad35ae4c847dcd39bad104838007f84a.jpg"},
        {label: "Beef Brisket",image:"https://www.edamam.com/web-img/deb/debce0693c8d8a6988af80e1f94e4c4c.jpg"},
        {label: "Barbecued Beef Brisket",image:"https://www.edamam.com/web-img/b64/b64005809d54d818e6ded326347b07c8.jpg"},
        {label: "Beef Tacos",image:"https://www.edamam.com/web-img/219/219b9268b0f84eecf0cab133498b7ef3.jpg"},
        {label: "Beef and Noodles recipes",image:"https://www.edamam.com/web-img/cd3/cd3674a92bbb3797632a65e2df7bd7f7"}
    ];
    const chickenFoodData = [
        {label: "Chicken Vesuvio",image:"https://www.edamam.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg"},
        {label: "Chicken Paprikash",image:"https://www.edamam.com/web-img/e12/e12b8c5581226d7639168f41d126f2ff.jpg"},
        {label: "Baked Chicken",image:"https://www.edamam.com/web-img/01c/01cacb70890274fb7b7cebb975a93231.jpg"},
        {label: "Catalan Chicken",image:"https://www.edamam.com/web-img/4d9/4d9084cbc170789caa9e997108b595de.jpg"},
        {label: "Persian Chicken",image:"https://www.edamam.com/web-img/8f8/8f810dfe198fa3e520d291f3fcf62bbf.jpg"},
        {label: "Chicken Stew",image:"https://www.edamam.com/web-img/74b/74bfb16655500083c4af92bcf45889f7.jpg"}
    ];
    const lambFoodData = [
        {label: "Lamb Sausages",image:"https://www.edamam.com/web-img/691/69110270a357de1738dd00ceec241492.jpg"},
        {label: "Roast Rack of Lamb",image:"https://www.edamam.com/web-img/9c4/9c44fff63e124f938e8fee5206e70064.jpg"},
        {label: "Quick Lamb Biryani",image:"https://www.edamam.com/web-img/0b8/0b89d34ade58e86f1be851737aabcc91.jpg"},
        {label: "Rosemary Crusted Lamb Chops recipes",image:"https://www.edamam.com/web-img/f3a/f3aa27943410a85ae0cc824077604492"},
        {label: "Roasted Rack of Lamb recipes",image:"https://www.edamam.com/web-img/84e/84e2d62a44f79a4b7a6c683e5b74ca51"},
        {label: "Mulled lamb",image:"https://www.edamam.com/web-img/900/9005eb35279bf444d3ca3834d6c78636.jpg"}
    ];
    const [beefFoodArr,setBeefFoodArr] = useState(beefFoodData);
    const [chickenFoodArr,setChickenFoodArr] = useState(chickenFoodData);
    const [lambFoodArr,setLambFoodArr] = useState(lambFoodData);
    const [cartSize,setCartSize] = useState(0);

    // Browser Storage
    useEffect(() => {
        if(localStorage.getItem('purchaseList') !== null){
            let purchaseList = JSON.parse(localStorage.getItem('purchaseList'));
            setCartSize(purchaseList.length);
        }
    },[])

    
    return (
        <div>
            <Nav cartSize={cartSize}/>
            <div className="intro_container">
                <div className="intro_title_container">
                    <h1 className="intro_title_1">Balance-Diet</h1>
                    <h1 className="intro_title_2">Ordering Platform</h1>
                    <h2 className="intro_title_3">Your Choice For Healthy Life</h2>
                </div>
                <img className="intro_logo" src={intro_icon}/>
                <img className="intro_image" src={intro_image}/>
            </div>
            
            <div className="section_container">
                <h2 className="section_title">Beef</h2>
                <InfoRow content={beefFoodArr}/>
                <h2 className="section_title">Chicken</h2>
                <InfoRow content={chickenFoodArr}/>
                <h2 className="section_title">Lamb</h2>
                <InfoRow content={lambFoodArr}/>
            </div>

            
        </div>
    );
}

export default LandingPage;
/*<h2>Pork</h2>
            <InfoRow/>
            <h2>Lamb</h2>
            <InfoRow/>
            <h2>Fish</h2>
            <InfoRow/>*/