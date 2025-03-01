"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonIcon } from "@ionic/react";
import { closeOutline, reorderThreeOutline } from "ionicons/icons";
import {
  faBurger,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "@/context/AuthContext";

const Navbar = () => {
  const { user, dispatch } = useAuthContext();
  const [toggleDropDown, setToggleDropDown] = useState<boolean>(false);

  const signOutUser = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <nav className="bg-primary_color flex flex-col font-rubik w-full fixed top-0 z-50">
      <div className="body-container flex flex-row w-screen justify-between p-5 sm:px-20">
        {/* Logo */}
        <Link
          href={"/"}
          className="text-3xl sm:text-4xl text-secondary_color font-bold flex gap-1 items-center"
        >
          <FontAwesomeIcon
            icon={faBurger}
            className="text-secondary_color size-7 sm:size-8"
          />
          <h1>BiteBazaar</h1>
        </Link>

        {/* Main Navigation */}
        <div className="flex gap-1 items-center">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-4 items-center text-xl">
            <Link
              href={"/menu"}
              className="text-secondary_color font-medium transition ease-in-out duration-200 hover:underline"
            >
              MENU
            </Link>
            <Link
              href={"/about"}
              className="text-secondary_color font-medium transition ease-in-out duration-200 hover:underline"
            >
              ABOUT US
            </Link>
            <Link
              href={"/contact"}
              className="text-secondary_color font-medium transition ease-in-out duration-200 hover:underline"
            >
              CONTACT
            </Link>
            <Link
              href={"/find-us"}
              className="text-secondary_color font-medium transition ease-in-out duration-200 hover:underline"
            >
              FIND US
            </Link>
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
                <Link
                  href={"/menu"}
                  className="hover:underline transition ease-in-out duration-300"
                  onClick={() => setToggleDropDown(false)}
                >
                  MENU
                </Link>
                <Link
                  href={"/about"}
                  className="hover:underline transition ease-in-out duration-300"
                  onClick={() => setToggleDropDown(false)}
                >
                  ABOUT US
                </Link>
                <Link
                  href={"/contact"}
                  className="hover:underline transition ease-in-out duration-300"
                  onClick={() => setToggleDropDown(false)}
                >
                  CONTACT
                </Link>
                <Link
                  href={"/find-us"}
                  className="hover:underline transition ease-in-out duration-300"
                  onClick={() => setToggleDropDown(false)}
                >
                  FIND US
                </Link>
                {!user ? (
                  <div className="flex flex-col gap-4 text-primary_color">
                    <Link
                      href={"/login"}
                      className="flex w-full sm:hidden items-center justify-center gap-1 font-[550] rounded-lg p-2 bg-secondary_color hover:opacity-90"
                      onClick={() => setToggleDropDown(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href={"/register"}
                      className="flex w-full sm:hidden items-center justify-center gap-1 font-[550] rounded-lg p-2 bg-secondary_color hover:opacity-90"
                      onClick={() => setToggleDropDown(false)}
                    >
                      Register
                    </Link>
                  </div>
                ) : (
                  <button
                    className="flex w-full sm:hidden items-center justify-center gap-1 font-[550] rounded-lg p-2 text-primary_color bg-secondary_color hover:opacity-90"
                    onClick={() => {
                      setToggleDropDown(false);
                      signOutUser();
                    }}
                  >
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
          <button
            onClick={() => signOutUser()}
            className={`hidden lg:flex items-center gap-1 font-bold rounded-lg py-1 px-3 text-primary_color bg-secondary_color hover:opacity-90 duration-200 ease-in-out`}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            Logout
          </button>
        ) : (
          <div className="items-center gap-4 hidden lg:flex text-primary_color">
            <Link
              href={"/login"}
              className={`flex items-center gap-2 font-[550] rounded-lg p-2 bg-secondary_color hover:opacity-90 duration-200 ease-in-out`}
            >
              Login
            </Link>
            <Link
              href={"/register"}
              className={`flex items-center gap-2 font-[550] rounded-lg p-2 bg-secondary_color hover:opacity-90 transition-opacity duration-200 ease-in-out`}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
