"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonIcon } from "@ionic/react";
import { closeOutline, reorderThreeOutline } from "ionicons/icons";
import { faUser, faBurger, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "@/context/AuthContext";

const Navbar = () => {
  const {user, dispatch} = useAuthContext();
  const [toggleDropDown, setToggleDropDown] = useState<boolean>(false);

  const signOutUser =() => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <nav className="bg-primary_color flex flex-col font-rubik w-full fixed top-0 z-50">
      <div className="body-container flex flex-row w-screen justify-between p-5 sm:px-20">
        {/* Logo */}
        <Link href={"/"} className="text-3xl sm:text-4xl text-secondary_color font-bold flex gap-1 items-center">
          <FontAwesomeIcon icon={faBurger} className="text-secondary_color size-7 sm:size-8" />
          <h1>BiteBazaar</h1>
        </Link>

        {/* Main Navigation */}
        <div className="flex gap-1 items-center">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-4 items-center text-xl">
            <Link href={"/menu"} className="text-secondary_color font-medium transition ease-in-out duration-200 hover:underline">MENU</Link>
            <Link href={"/about"} className="text-secondary_color font-medium transition ease-in-out duration-200 hover:underline">ABOUT US</Link>
            <Link href={"/contact"} className="text-secondary_color font-medium transition ease-in-out duration-200 hover:underline">CONTACT</Link>
            <Link href={"/find-us"} className="text-secondary_color font-medium transition ease-in-out duration-200 hover:underline">FIND US</Link>
          </div>

          {/* Mobile Navigation */}
          <div className="flex relative lg:hidden font-semibold">
            <IonIcon
              icon={toggleDropDown ? closeOutline : reorderThreeOutline}
              className="size-10 sm:size-12 text-secondary_color cursor-pointer transition ease-in-out duration-300"
              onClick={() => setToggleDropDown(!toggleDropDown)}
            />
            {toggleDropDown && (
              <div className="dropdown flex flex-col gap-2 mt-4">
                <Link href={"/menu"} className="hover:underline transition ease-in-out duration-300" onClick={() => setToggleDropDown(false)}>MENU</Link>
                <Link href={"/about"} className="hover:underline transition ease-in-out duration-300" onClick={() => setToggleDropDown(false)}>ABOUT US</Link>
                <Link href={"/contact"} className="hover:underline transition ease-in-out duration-300" onClick={() => setToggleDropDown(false)}>CONTACT</Link>
                <Link href={"/find-us"} className="hover:underline transition ease-in-out duration-300" onClick={() => setToggleDropDown(false)}>FIND US</Link>
                {!user ? (
                  <Link href={"/login"} className="flex w-fit sm:hidden items-center gap-1 font-bold rounded-lg p-3 px-5 bg-secondary_color text-black hover:opacity-90" onClick={()=>setToggleDropDown(false)}>
                    <FontAwesomeIcon icon={faUser} />
                    Login
                  </Link>
                ):(
                  <button className="flex sm:hidden w-fit items-center gap-1 font-bold rounded-lg p-3 px-5 bg-secondary_color text-black hover:opacity-90" onClick={()=>{setToggleDropDown(false); signOutUser()}}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Login Button */}
        {user ? (
          <button onClick={() => signOutUser()} className={`hidden lg:flex items-center gap-1 font-bold rounded-lg py-1 px-3 bg-secondary_color hover:opacity-90`}>
            <FontAwesomeIcon icon={faRightFromBracket} />
            Logout
          </button>
        ) : (
          <Link href={"/login"} className={`hidden lg:flex items-center gap-1 font-bold rounded-lg py-1 px-3 bg-secondary_color hover:opacity-90`}>
            <FontAwesomeIcon icon={faUser} />
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
