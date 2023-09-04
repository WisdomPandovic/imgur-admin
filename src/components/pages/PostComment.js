import { useContext, useEffect, useState } from 'react';
import AsideBar from "../pages/AsideBar";

function PostComment(){
    const [postComments, setpostComment] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3007/post")
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data); 
                setpostComment(data);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <AsideBar/>
            {loading ? (
                <div className="admin-users">Loading please wait...</div>
            ) : (
                <table className="admin-users user-post-username">
                    <thead>
                        <tr>
                            <th className='td-wd'>#</th>
                            <th>Post Title</th>
                            <th>Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {postComments.map((post, index) => (
                            <tr key={post._id}>
                                <td className="comment-list">{index + 1}</td>
                                <td className="comment-list">{post.title}</td>
                                <td>
                                    <ul className="comment-list">
                                        {post.comments.map((comment, commentIndex) => (
                                            <li key={comment._id}>{commentIndex + 1}. {comment.text}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );

}
export default PostComment;