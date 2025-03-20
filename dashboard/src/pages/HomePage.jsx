import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { clearAllUserErrors, logout } from "../store/userSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const [active, setActive] = useState("");
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { error, message } = useDispatch((state) => state.user);
  const handleLogout = () => {
    dispatch(logout(navigateTo));
    toast.success("Logged out successfully");
    navigateTo("/login");
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/login");
    }
    if (message) {
      toast.success(message);
      dispatch(clearAllUserErrors());
    }
  }, [error, message, dispatch]);
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <aside className="fixed inset-y-0 left-0 hidden w-14 flex-col border-r bg-background sm:flex z-50">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5"></nav>
          <Link className="group flex h-p w-p shrink-0 items-center justify-center gap-2 rounded-full">
            <Package className="h-4 w-4 transition-all group-hover:scale-110" />
            <span></span>
          </Link>
        </aside>
      </div>
    </>
  );
}

export default HomePage;
