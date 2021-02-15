import react from 'react'
import InfoCard_S from '../Component/InfoCard_S'
import "./InfoRow.css"

function InfoRow({content}){

    console.log(content);

    return (
        <div className="row">
            <div className="info_list">
                {content.map(foodContent => (
                    <InfoCard_S food={foodContent}/>
                ))}
            </div>
        </div>
    );
}

export default InfoRow;