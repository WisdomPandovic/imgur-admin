import AsideBar from "../pages/AsideBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Tag() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    title: "",
  });

    const submitForm = (e) => {
    e.preventDefault();
    const userData = {
      title: user.title,
      post: [],
    };

    console.log(user);
    console.log(userData);

    axios
      .post("http://localhost:3007/tag", userData)
      .then((resp) => resp.json())
      .then((data) => {
        setUser(data);
      });

      if(setUser){
        alert("Tag Created")
        setUser( {
            title: "",
        
        });
       }
  };

  useEffect(() => {
    fetch("http://localhost:3007/tag")
      .then((resp) => resp.json())
      .then((data) => {
        setTags(data);
        setLoading(false);
      });
  }, []);

  // const onDelete = (_id) => {
  //   axios.delete("http://localhost:300/tag/" + _id);
  // };

  const onDelete = async (_id) => {
    try {
      await axios.delete("http://localhost:3007/tag/" + _id); 
      setTags(prevUsers => prevUsers.filter(tag => tag._id !== _id));
      alert("Tag deleted successfully");
      // toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting tag:", error);
      // toast.error("An error occurred while deleting the user");
    }
    console.log(_id)
  };

  const setData = (data) => {
    console.log(data);
  };

  return (
    <div>
      <AsideBar />
      <form className="form-content-tag" onSubmit={submitForm}>
        <div className="form-control">
          <label htmlFor="first_name">Tag</label>
          <input
            type="text"
            value={user.title}
            onChange={(e) => setUser({ ...user, title: e.target.value })}
          />
        </div>
        <div className="form-btn-tag">
          <button>Submit</button>
        </div>
      </form>

      <div className="admin-users">Tags</div>
      <div className="tag-list">
        {loading === true ? (
          <div>Loading please wait...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Tag ID</th>
                <th>Tag Title</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {tags.map((tag, index) => (
                <tr key={tag._id}>
                  <td className="td-wd">{index + 1}</td>
                  <td>{tag._id}</td>
                  <td>{tag.title}</td>
                  <td key={tag._id} className="flexv">
                    <div className="tag-edit">
                      <Link to={`/updateTag/${tag._id}`}>
                        <button onClick={() => setData()}>Edit</button>
                      </Link>
                    </div>
                    <button onClick={() => onDelete(tag._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Tag;

