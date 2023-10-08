import { NavLink } from "react-router-dom";
import { FiEdit2, FiMail, FiUser } from "react-icons/fi";
import { jwtDecode } from "../../utils";
import "./Profile.scss";

const Profile = () => {
  const loggedInUser = jwtDecode()?.user;
  return (
    <section className="profile">
      <div className="profile-icon">
        <FiUser />
      </div>
      <ul>
        <li>
          <FiUser /> <span>{loggedInUser?.username}</span>
        </li>
        <li>
          <FiMail /> <span>{loggedInUser?.email}</span>
        </li>
        <li>
          <FiEdit2 />
          <NavLink to={"/dashboard/user/profile"}> Update Profile</NavLink>
        </li>
      </ul>
    </section>
  );
};

export default Profile;
