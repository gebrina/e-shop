import { NavLink } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { jwtDecode } from "../../utils";

const Profile = () => {
  const loggedInUser = jwtDecode()?.user;
  return (
    <section className="profile">
      <div className="profile-icon">
        <FiUser />
      </div>
      <ul>
        <li>{loggedInUser?.username}</li>
        <li>{loggedInUser?.email}</li>
        <li>
          <NavLink to={"/user"}>Update Profile</NavLink>
        </li>
      </ul>
    </section>
  );
};

export default Profile;
