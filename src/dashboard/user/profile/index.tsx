import { useQuery } from "@tanstack/react-query";
import { GET_USER_KEY } from "../../../constants";
import { getOneUser } from "../../../api/user";
import { jwtDecode } from "../../../utils";
import ErrorPage from "../../../components/error";

const UserProfile = () => {
  const user = jwtDecode()?.user;
  const { isLoading, error, data } = useQuery({
    queryKey: [GET_USER_KEY],
    queryFn: () => getOneUser(user?.id),
  });

  if (error) return <ErrorPage error={error?.message} />;

  return (
    <section className="my-5 mx-5">
      <h1>Update your profile</h1>
    </section>
  );
};

export default UserProfile;
