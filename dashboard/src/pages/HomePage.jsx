import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { clearAllUserErrors, logout } from "../store/userSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Home, Package } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../components/ui/tooltip";

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
        <aside className="fixed inset-y-0 left-0 flex w-14 flex-col items-center border-r bg-background sm:flex z-50 py-4">
          <nav className="flex flex-col items-center gap-4">
            <Link className="group flex h-9 w-9 items-center justify-center rounded-lg transition-all hover:bg-accent">
              <Package className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Dashboard</span>
            </Link>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === "dashboard"
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                    }  transition-colors hover:text-foreground`}
                  >
                    <Home className="h-5 w-5" />
                    <span className="sr-only">Dashboard</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Dashboard</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </aside>
      </div>
    </>
  );
}

export default HomePage;
