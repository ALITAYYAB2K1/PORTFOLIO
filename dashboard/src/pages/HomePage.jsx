import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { clearAllUserErrors, logout, getUser } from "../store/userSlice";
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
  PanelLeft,
  PencilRuler,
  SquareUser,
  User,
} from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../components/ui/tooltip";

import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";

function HomePage() {
  const [active, setActive] = useState("");
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const { isAuthenticated, user, error, message, loading } = useSelector(
    (state) => state.user
  );

  // Debug user data
  useEffect(() => {
    console.log("Redux state:", { isAuthenticated, user, loading });
  }, [isAuthenticated, user, loading]);

  // Load user data if needed
  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(getUser());
    }
  }, [isAuthenticated, user, dispatch]);

  // Handle errors and messages
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
  }, [error, message, isAuthenticated, dispatch, navigateTo]);

  const handleLogout = () => {
    dispatch(logout(navigateTo));
  };

  // Prepare display data with fallbacks
  const displayName = user?.fullname || "User";
  const hasAvatar = user && user.avatar;
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
                    <PencilRuler className="h-5 w-5" />
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
        <header
          className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4
          sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 max-[900px]:h-[100px]"
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  className={`group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full
                     bg-primary text-lg font-semibold text-primary-foreground md:text-base`}
                >
                  <Package className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Dashboard"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground "
                  }`}
                  onClick={() => setActive("Dashboard")}
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Add Project"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground "
                  }`}
                  onClick={() => setActive("Add Project")}
                >
                  <FolderGit className="h-5 w-5" />
                  Add Project
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Add Skills"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground "
                  }`}
                  onClick={() => setActive("Add Skills")}
                >
                  <PencilRuler className="h-5 w-5" />
                  Skills
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Add Application"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground "
                  }`}
                  onClick={() => setActive("Add Application")}
                >
                  <LayoutGrid className="h-5 w-5" />
                  Add Application
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Add Timeline"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground "
                  }`}
                  onClick={() => setActive("Add Timeline")}
                >
                  <History className="h-5 w-5" />
                  Add Timeline
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Messages"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground "
                  }`}
                  onClick={() => setActive("Messages")}
                >
                  <MessagesSquare className="h-5 w-5" />
                  Messages
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Account"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground "
                  }`}
                  onClick={() => setActive("Account")}
                >
                  <SquareUser className="h-5 w-5" />
                  Account
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5  text-muted-foreground hover:text-foreground `}
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-4 md:grow-0 sm:ml-16 sm:mt-5">
            {loading ? (
              // Loading state
              <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse max-[900px]:hidden"></div>
            ) : hasAvatar ? (
              // User avatar
              <img
                src={user.avatar}
                alt="avatar"
                className="w-20 h-20 rounded-full max-[900px]:hidden object-cover"
              />
            ) : (
              // Default avatar
              <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center max-[900px]:hidden">
                <User className="h-10 w-10 text-gray-500" />
              </div>
            )}
            <h1 className="text-4xl max-[900px]:text-2xl">
              Welcome, {displayName}
            </h1>
          </div>
        </header>
      </div>
    </>
  );
}

export default HomePage;
