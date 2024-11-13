import React from "react";
import CoverOne from "../assets/cover-01.png";
import userSix from "../assets/user-06.png";
import MyOrdersTable from "../components/MyOrdersTable";
import { LogOut } from "lucide-react";

const UserProfile = () => {
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
              htmlFor="cover"
              className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90 xsm:px-4"
            >
              <span>
                <LogOut size={17}/>
              </span>
              <span>Logout</span>
            </label>
         </div>
      </div>
      <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
        <div className="relative z-30 mx-auto -mt-20 lg:h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
          <div className="relative drop-shadow-2">
            <img src={userSix} alt="profile" className="rounded-full" />
            {/* <label
              htmlFor="profile"
              className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-black hover:bg-opacity-90 sm:bottom-2 sm:right-2"
            >
              <div className='bg-blue-500 rounded-full p-1'>
              <CameraIcon color='#FFF' size={16}/>
              <input
                type="file"
                name="profile"
                id="profile"
                className="sr-only"
              />
              </div>
            </label> */}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="mb-1.5 text-2xl font-semibold text-black">
            Aadhil Mohamed
          </h3>
          <p className="font-medium">email: aadhil@gmail.com</p>
          <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1">
            <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 xsm:flex-row">
              <span className="font-semibold text-black">15</span>
              <span className="text-sm">Total orders</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 xsm:flex-row">
              <span className="font-semibold text-black">9K</span>
              <span className="text-sm">Total spends</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
              <span className="font-semibold text-black">2023</span>
              <span className="text-sm">Joined</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <MyOrdersTable />
      </div>
    </div>
  );
};

export default UserProfile;
