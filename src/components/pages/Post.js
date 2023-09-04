import AsideBar from "./AsideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
function Post (){

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3007/post")
        .then((resp) => resp.json())
        .then((data) => {
            // const filterCategory = data.filter ((prod) => {
            //     return prod.category === "Toys"
            // } )
            const sortedData = data.sort((a, b) => new Date (b.date) - new Date(a.date));
            setProducts(sortedData);
            setLoading(false);
        });

        
    },[]);

    const onDelete = async (_id) => {
        try {
          await axios.delete("http://localhost:3007/post/" + _id);
          setProducts(prevUsers => prevUsers.filter(product => product._id !== _id));
          toast.success("post deleted successfully");

        } catch (error) {
          console.error("Error deleting product:", error);
          toast.error("An error occurred while deleting the product");
        }
        console.log(_id)
      };

    
    const setData = (data) => {
        console.log(data)
      
    }

    return(
        <div>
            <AsideBar/>
            <div className="admin-users">Post</div>
            <div className="adm-products">
                {loading === true ? (
                    <div>Data Loading, please wait....</div>
                ) : (
                    products.map((product) => (
                        <div key={product._id} className="adm-product-card" >
                            <div className="shopComputer-product">
                               <img src={product.image} alt="image" className="product-img" />
                               <h2>{product.title ?? ''}</h2>
                               <p>{product.tag?.title ?? ''}</p>
                               <p>{product.description}</p>
                               <div key={product._id}>
                                     {/* <Link to={`/updatePost/${product._id}`}><button onClick={() => setData(product)}>Edit</button></Link> */}
                                    <button onClick={() => onDelete(product._id)}>Delete</button>
                                 
                                </div>
                               
                            </div>
                        </div>
        
                       ))
                )}
                <ToastContainer />
            </div>

        </div>
    )
}

export default Post;