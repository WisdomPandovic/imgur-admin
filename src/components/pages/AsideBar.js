import {Link} from 'react-router-dom';
import {FaUserCheck} from "react-icons/fa";
import {FaUsers} from "react-icons/fa";
import {RxDashboard} from "react-icons/rx";
import {GiTeamUpgrade} from "react-icons/gi";
import {GiOpenedFoodCan} from "react-icons/gi";
import {FcSearch} from "react-icons/fc";
import {DiPhonegap} from "react-icons/di";
import { ImgurContext } from '../Context/ImgurContext';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AsideBar(){
    const {isLoggedIn, setIsLoggedIn} = useContext(ImgurContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        try {
          const rawData = localStorage.getItem('Imgur_USER');
      
          if (rawData) {
            const localData = JSON.parse(rawData);
            localStorage.removeItem('Imgur_USER');
            navigate("/");
          }
      
          setIsLoggedIn(false);
        } catch (error) {
          console.error('Error while handling logout:', error);
        }
      };
    return(
        <div>
            <aside className="aside-bar">
                <div className="dashboard">
                    <div className="aside-links">
                        <Link to="/dashboard" class="aside-bar-link"><RxDashboard/> Dashboard</Link>
                    </div><hr/>
                    <div >
                        <Link to="/post" class="aside-bar-link"><DiPhonegap/> View Post</Link>  
                    </div><hr/>
                    <div >
                        <Link to="/users" class="aside-bar-link"><FaUsers/> Users</Link>
                    </div><hr/>
                    <div >
                        <Link to="/createPost" class="aside-bar-link"><GiOpenedFoodCan/> Create Post </Link>
                    </div><hr/>
                    <div >
                        <Link to="/createUsers" class="aside-bar-link"><GiTeamUpgrade/> Create Users</Link>
                    </div><hr/>
                    <div >
                        <Link to="/tag" class="aside-bar-link"><GiTeamUpgrade/> Create Tag</Link>
                    </div><hr/>
                    <div >
                        <Link to="/usersWithPosts" class="aside-bar-link"><GiTeamUpgrade/> Users Posts</Link>
                    </div><hr/>
                    <div >
                        <Link to="/postComment" class="aside-bar-link"><GiTeamUpgrade/> Post Comment</Link>
                    </div><hr/>
                    <div >
                        <Link to="/postLikes" class="aside-bar-link"><GiTeamUpgrade/> Post Likes</Link>
                    </div><hr/>
                    {/* <div >
                        <button onClick={handleLogout}><GiTeamUpgrade/> Log out</button>
                    </div> */}
                </div>
           </aside>

           <nav>
                <div className='flex'>
                    <div className='flex-btn'>
                        {/* <input type='text' placeholder='search'/> */}
                        {/* <button>
                        <Link to="/signup" class="aside-bar-link"><GiTeamUpgrade/> Signup</Link></button>
                        <button>
                        <Link to="/signin" class="aside-bar-link"><GiTeamUpgrade/> Signin</Link></button> */}
                        {/* <h2 className='navBar-signin'><Link to="/signin" className='newpost'>Sign In</Link></h2>
                        <div><button><Link to="/signup" className='newpost'>Sign Up</Link></button></div> */}
                    </div>
                    {/* <div><FaUserCheck/></div> */}
                    <div className='log-out'>
                        <button onClick={handleLogout}>Log out</button>
                    </div>
                </div>
           </nav>

        </div>
    )
}

export default AsideBar;