import { useQuery } from "@tanstack/react-query";
import { GET_USER_KEY } from "../../../constants";
import { useEcomContext } from "../../../context/EcomContext";
import { getOneUser } from "../../../api/user";
import { jwtDecode } from "../../../utils";

const UserProfile = () => {
  const user = jwtDecode()?.user;
  const { isLoading, error, data } = useQuery({
    queryKey: [GET_USER_KEY],
    queryFn: () => getOneUser(user?.id),
  });

  return (
    <section className="my-5 mx-5">
      <h1>Update your profile</h1>
    </section>
  );
};

export default UserProfile;
