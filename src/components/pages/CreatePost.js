import AsideBar from "./AsideBar"
import { useState, useEffect, useContext } from "react";
import { ImgurContext } from '../Context/ImgurContext';
import { useNavigate } from 'react-router-dom';
// import axios from "axios";

function CreatePost() {
    const [options, setOptions] =useState();
    const [values, setValues] =useState([]);
    const [title, setTitle] =useState("");
    const [tag, setTag] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const {userID,setUserID} = useContext(ImgurContext)
    const navigate = useNavigate()

    const check =async() => {
        // e.preventdefault();
        
     let formdata = new FormData()
     formdata.append('title', title);
     formdata.append('tag', tag);
     formdata.append('description', description);
     formdata.append('image', image);
     formdata.append('user', userID.data.id);
     console.log("form data",formdata.get('image'));
     
   
    //  return false;
     let response = await fetch("http://localhost:3007/post",{
      method:"Post",
      body:formdata,
      // headers:{
      //   'Content-Type':"multipart/form-data",
      // }
     });
     if(response.status === 200){
      alert("Post created");
      navigate("/post");
     }
     console.log('response',response.data);

   
     
    }

    
    useEffect(() => {
      if(localStorage){
        let rawData = localStorage.getItem("Imgur_USER")
        let localData = JSON.parse(rawData)
        setUserID(localData)
      }
      console.log('I restarted');
      fetch("http://localhost:3007/tag",)
      .then((data) => data.json())
      .then((val) => {
        setValues(val);
      });

    },[]);
    // console.log(values, "values")
    
    // console.log(userID.data.id);
    return (
    <div>
      <AsideBar/>
      <form onSubmit={(e)=>{e.preventDefault();}} className="form-content"  >
      
          <div className="form-control"  value={userID}>
            <label htmlFor="">Title</label>
            <input type="text" id="name" name="title" onChange={(e)=>setTitle(e.target.value)} />
          </div>

          <div className="form-control">
            <label htmlFor="">Tag</label>
            {/* <input type="text" id="category" name="tag" onChange={(e)=>setTag(e.target.value)} /> */}
            <select name="tag" onChange={(e)=>setTag(e.target.value)}>
              {
                values.map((opts,i) => <option key={i} value={opts._id}>{opts.title}</option>)
              }
            </select>
          </div>
          
          <div className="form-control">
            <label htmlFor="">Description</label>
            <input type="text" id="description" name="description"  onChange={(e)=>setDescription(e.target.value)}/>
          </div>

          <div className="form-control">
            <label htmlFor="">Image</label>
            <input type="file" id="image" name="image" onChange={(e)=>setImage(e.target.files[0])} />
          </div>
       
          <div className="form-btn">
            <button onClick={check}>Submit</button>
          </div>
      </form>
    </div>
  );
}
export default CreatePost;
