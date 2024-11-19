import { LogOut } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import { useUserStore } from "../stores/useUserStore";
import CoverOne from "../assets/cover-01.png";
import userSix from "../assets/user-06.png";
import MyOrdersTable from "../components/MyOrdersTable";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout, getUser, user } = useUserStore();

  useEffect(() => {
    getUser(id);
  }, [getUser, id]);

  return (
    <div className="overflow-hidden rounded-lg border border-stroke bg-white shadow-default my-5 md:mx-28 p-5 lg:mx-72">
      <div className="relative z-20 h-35 md:h-65">
        <img
          src={CoverOne}
          alt="profile cover"
          className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
        />
        <div className="absolute top-1 right-1 z-10 xsm:bottom-4 xsm:right-4 bg-red-600 rounded-lg">
          <label
            onClick={() => logout(navigate)}
            htmlFor="cover"
            className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90 xsm:px-4"
          >
            <span className="curoser-pointer">
              <LogOut size={17} />
            </span>
            <span>Logout</span>
          </label>
        </div>
      </div>
      <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
        <div className="relative z-30 mx-auto -mt-20 lg:h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
          <div className="relative drop-shadow-2">
            <img src={userSix} alt="profile" className="rounded-full" />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="mb-1.5 text-2xl font-semibold text-black">
            {user?.name}
          </h3>
          <p className="font-medium">{user?.email}</p>
          <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1">
            <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 xsm:flex-row">
              <span className="font-semibold text-black">
                {user?.orderHistory?.length}
              </span>
              <span className="text-sm">Total orders</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 xsm:flex-row">
              <span className="font-semibold text-black">9K</span>
              <span className="text-sm">Total spends</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
              <span className="font-semibold text-black">
                {user?.createdAt?.split("T")[0]}
              </span>
              <span className="text-sm">Joined</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <MyOrdersTable orders={user.orderHistory} />
      </div>
    </div>
  );
};

export default UserProfile;
