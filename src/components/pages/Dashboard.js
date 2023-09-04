import AsideBar from "../pages/AsideBar";
import { useEffect, useState } from "react";
import {FaUsers} from "react-icons/fa";
import {FaComment} from 'react-icons/fa';

function Dashboard (){

    const [AdminUsers, setAdminUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [comment, setComment] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3007/users")
        .then((resp) => resp.json())
        .then((data) => {
            setAdminUsers(data);
        });

        
    },[]);

    useEffect(() => {
        fetch("http://localhost:3007/post")
        .then((resp) => resp.json())
        .then((data) => {
            setProducts(data);
        });

        
    },[]);

    useEffect(() => {
        fetch("http://localhost:3007/comments")
        .then((resp) => resp.json())
        .then((data) => {
            setComment(data);
        });

        
    },[]);

    

    const [postsData, setPostsData] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch("http://localhost:3007/post")
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            const filterTag = data.filter ((post) => {
                return post.tag.title === "Music";
            } )
            setPostsData(filterTag);
            // setPostsData(data);
            console.log(filterTag)
            setLoading(false)
        });
        //  console.log(productsData.length)
        
    },[]);
    

    return(
        <div>
            <AsideBar/>
            <div className="team-member">Team Member Dashboard</div>
            <div className="products">
                <div className="product-card green ">
                    {/* <div><FaComment /></div> */}
                   <p>Total Post ({products.length})</p>
                </div>

                <div className="product-card purple">
                    {/* <div><FaUsers/></div> */}
                    <p>Total Users ({AdminUsers.length})</p>
                </div>

                <div className="product-card blue">
                    {/* <div><FaComment /></div> */}
                    <p>Total Comments ({comment.length})</p>
                    {/* <p>Total Comments ({postsData.reduce((total, post) => total + post.comments.length, 0)})</p> */}
                </div>
            </div>

            <div className="product-list">
                <table>
                    <th>Post Image</th>
                    <th>Title</th>
                    <th>Tag</th>
                    <th>Description</th>
                </table>
                {loading === true ? (
                    <div>Loading please wait...</div>
                ) : (

                    postsData.slice(0,3).map((post) => (
                        // postsData.map((post) =>(
                <table >
                    <tr key={post._id}>
                        

                        <td><img src={post.image} alt="image" /></td>
                        <td>{post.title  ?? ''}</td>
                        <td>{post.tag?.title ?? ''}</td>
                        <td>{post.description}</td>
                        
                    </tr>
                </table>
                    ))

                )}

            </div>
            
        </div>
    )
}

export default Dashboard;