import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

const UserDashboard = () => {
  const { user } = useUserContext();

  return (
    <>
      <div className="mb-6">
        <p className="text-lg mb-2">
          Hello <strong>{user.name}</strong>
        </p>
        <p className=" text-[--secondary-color] ">
          From your account dashboard you can view your{" "}
          <Link
            to="/my-account/my-items"
            className=" text-[--secondary-color] font-bold  hover:underline"
          >
            your items list
          </Link>
          , manage your{" "}
          <Link
            to="/my-account/edit-address"
            className=" text-[--secondary-color] font-bold  hover:underline"
          >
            swap requests on you items
          </Link>
          , and{" "}
          <Link
            to="/my-account/edit-account"
            className=" text-[--secondary-color]  font-bold  font-boldhover:underline"
          >
            Edit your account information
          </Link>
          .
        </p>
      </div>
    </>
  );
};

export default UserDashboard;
