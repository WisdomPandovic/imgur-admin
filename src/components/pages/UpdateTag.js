import axios from "axios";
import { useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useNavigate} from 'react-router-dom';

function UpdateTag(){
    const navigate = useNavigate();
    const { _id } = useParams();
    const [tag, setTag] = useState([]); 

    useEffect(() => {
        fetch("http://localhost:3007/tag/" + _id)
        .then((resp) => resp.json())
        .then((data) => {
            setTag(data);
        });

        
    },[]);

    const updateTag = (e) => {
        e.preventDefault();
        axios.put("http://localhost:3007/tag/" + _id, tag)
        .then(res => {
            alert("Data update successfull !!!");
            navigate("/tag");
        })
    }

    return(
        <div>
            <form className="form-content" onSubmit={updateTag}>
                <div className="form-control">
                    <label htmlFor="first_name">Username</label>
                    <input type="text" value={tag.title} onChange={(e) => setTag({...tag, title: e.target.value})}/>
                  
                </div>
                <div className="form-btn">
                    <button type="submit" >Update</button>
                </div>
            </form>


        </div>
    )
}

export default UpdateTag;