import React, { useEffect } from "react";
import { Button } from "../components/ui/button";
import { useDispatch } from "react-redux";
import { clearAllUserErrors, logout } from "../store/userSlice";
import { toast } from "react-toastify";

function HomePage() {
  const dispatch = useDispatch();
  const { error, message } = useDispatch((state) => state.user);
  const handleLogout = () => {
    dispatch(logout());
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(clearAllUserErrors());
    }
  }, [error, message, dispatch]);
  return (
    <>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
}

export default HomePage;
