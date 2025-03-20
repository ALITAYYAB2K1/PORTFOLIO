import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { clearAllUserErrors, logout } from "../store/userSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  FolderGit,
  History,
  Home,
  LayoutGrid,
  LogOut,
  MessagesSquare,
  Package,
  SquareUser,
} from "lucide-react";
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
                    onClick={() => setActive("dashboard")}
                  >
                    <Home className="h-5 w-5" />
                    <span className="sr-only">Dashboard</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className={`text-md`}>
                  Dashboard
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === "Add Project"
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                    }  transition-colors hover:text-foreground`}
                    onClick={() => setActive("Add Project")}
                  >
                    <FolderGit className="h-5 w-5" />
                    <span className="sr-only">ADD PROJECT</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className={`text-md`}>
                  ADD PROJECT
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === "Add Skills"
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                    }  transition-colors hover:text-foreground`}
                    onClick={() => setActive("Add Skills")}
                  >
                    <FolderGit className="h-5 w-5" />
                    <span className="sr-only">Add Skills</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className={`text-md`}>
                  Add Skills
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === "Add Application"
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                    }  transition-colors hover:text-foreground`}
                    onClick={() => setActive("Add Application")}
                  >
                    <LayoutGrid className="h-5 w-5" />
                    <span className="sr-only">Add Application</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className={`text-md`}>
                  Add Application
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === "Add Timeline"
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                    }  transition-colors hover:text-foreground`}
                    onClick={() => setActive("Add Timeline")}
                  >
                    <History className="h-5 w-5" />
                    <span className="sr-only">Add Timeline</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className={`text-md`}>
                  Add Timeline
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === "Messages"
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                    }  transition-colors hover:text-foreground`}
                    onClick={() => setActive("Messages")}
                  >
                    <MessagesSquare className="h-5 w-5" />
                    <span className="sr-only">Messages</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className={`text-md`}>
                  Messages
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === "Account"
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                    }  transition-colors hover:text-foreground`}
                    onClick={() => setActive("Account")}
                  >
                    <SquareUser className="h-5 w-5" />
                    <span className="sr-only">Account</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className={`text-md`}>
                  Account
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
          <nav className="flex flex-col items-center gap-4 mt-auto">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg`}
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="sr-only">Logout</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className={`text-md`}>
                  Logout
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </aside>
        <header className="sticky top-0 left-0 hidden w-14 flex-col border-r bg-background px-4 sm:static sm:h-auto sm:border-0"></header>
      </div>
    </>
  );
}

export default HomePage;
