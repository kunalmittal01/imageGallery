import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from 'axios';
const Details = ()=>{
    const params = useParams();
    const [details, setDetails] = useState(null);
    console.log(params);
    
    const getDetails = async()=>{
        const resp = await axios.get(`https://api.unsplash.com/photos/${params.id}?per_page=20&client_id=mKF2f2UHbRFgwLp9jIJ6knMi2a3RKMsVVnWHYOqFves`)
        // const resp = await fetch(`https://api.unsplash.com/photos/${params.id}?per_page=20&client_id=mKF2f2UHbRFgwLp9jIJ6knMi2a3RKMsVVnWHYOqFves`);
        setDetails(resp.data);
        console.log(resp.data);
        
    }
    useEffect(()=>{
        getDetails();   
        },[params]);

    return (
        <>
            {
            details && (
                <div style={{backgroundColor: details.color}} className="details">
                    <img src={details.urls.small} alt={details.alt_description}/>
                    <div className="wrap">
                        <p id="name">{details.user.name}</p>
                        <p id="bio">{details.user.bio}</p>
                        <div className="dimensions">
                            <p>Width: {details.width}</p>
                            <p>Height: {details.height}</p>
                            <p>Downloads: {details.downloads}</p>
                        </div>
                        <div className="updates">
                            <p className="cr">Created at:{details.created_at}</p>
                            <p className="cr">Updated at: {details.updated_at}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
 
}

export default Details;