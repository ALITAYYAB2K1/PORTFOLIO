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

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle, // Added this import for accessibility
  SheetHeader, // Added this import for better structure
} from "../components/ui/sheet";

function HomePage() {
  const [active, setActive] = useState("Dashboard");
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [isPageLoading, setIsPageLoading] = useState(true);

  const { isAuthenticated, user, error, message, loading } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    const logData = {
      isAuthenticated,
      userExists: !!user,
      userData: user,
      isLoading: loading || isPageLoading,
    };

    console.log("HomePage state:", logData);

    if (isAuthenticated && !user) {
      console.log("Fetching user data because authenticated but no user data");
      dispatch(getUser());
    }
  }, [isAuthenticated, user, loading, isPageLoading, dispatch]);

  // Debug user data
  useEffect(() => {
    console.log("Redux state:", { isAuthenticated, user, loading });
  }, [isAuthenticated, user, loading]);

  // Handle initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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

  // Check if we're still loading
  const showLoading = isPageLoading || loading;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* Desktop Sidebar - Hidden on mobile */}
      <aside className="fixed inset-y-0 left-0 hidden md:flex w-14 flex-col items-center border-r bg-background z-50 py-4">
        <nav className="flex flex-col items-center gap-4">
          <Link
            to="/"
            className="group flex h-9 w-9 items-center justify-center rounded-lg transition-all hover:bg-accent"
          >
            <Package className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Dashboard</span>
          </Link>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "Dashboard"
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  }  transition-colors hover:text-foreground`}
                  onClick={() => setActive("Dashboard")}
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
                  to="/add-project"
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
                  to="/add-skills"
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
                  to="/add-application"
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
                  to="/add-timeline"
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
                  to="/messages"
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
                  to="/account"
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
                <Button
                  variant="ghost"
                  size="icon"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg`}
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Logout</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className={`text-md`}>
                Logout
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>

      {/* Mobile-friendly Header */}
      <header
        className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4
          md:ml-14 md:static md:h-auto md:border-0 md:bg-transparent md:px-6"
      >
        {/* Mobile Menu Button - Only visible on mobile */}
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="md:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>

          {/* Fixed mobile sidebar with solid background */}
          <SheetContent
            side="left"
            className="w-[80%] max-w-[280px] bg-background border-r"
            overlayClassName="bg-black/50"
            // Force opaque background with !important to override any transparency
            style={{
              backgroundColor: "var(--background)",
              opacity: "1 !important",
              boxShadow: "4px 0 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <SheetHeader className="mb-6">
              <SheetTitle className="text-xl">Portfolio Dashboard</SheetTitle>
            </SheetHeader>

            <div className="py-1">
              <div className="flex items-center mb-6 space-x-3">
                <div className="bg-primary h-10 w-10 rounded-full flex items-center justify-center">
                  <Package className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="text-lg font-medium">
                  {!showLoading && displayName ? displayName : "User"}
                </div>
              </div>

              <nav className="grid gap-2 text-sm font-medium">
                <Link
                  to="/"
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 ${
                    active === "Dashboard"
                      ? "bg-accent text-accent-foreground font-semibold"
                      : "hover:bg-accent/50"
                  }`}
                  onClick={() => setActive("Dashboard")}
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  to="/add-project"
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 ${
                    active === "Add Project"
                      ? "bg-accent text-accent-foreground font-semibold"
                      : "hover:bg-accent/50"
                  }`}
                  onClick={() => setActive("Add Project")}
                >
                  <FolderGit className="h-5 w-5" />
                  Add Project
                </Link>
                <Link
                  to="/add-skills"
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 ${
                    active === "Add Skills"
                      ? "bg-accent text-accent-foreground font-semibold"
                      : "hover:bg-accent/50"
                  }`}
                  onClick={() => setActive("Add Skills")}
                >
                  <PencilRuler className="h-5 w-5" />
                  Skills
                </Link>
                <Link
                  to="/add-application"
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 ${
                    active === "Add Application"
                      ? "bg-accent text-accent-foreground font-semibold"
                      : "hover:bg-accent/50"
                  }`}
                  onClick={() => setActive("Add Application")}
                >
                  <LayoutGrid className="h-5 w-5" />
                  Add Application
                </Link>
                <Link
                  to="/add-timeline"
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 ${
                    active === "Add Timeline"
                      ? "bg-accent text-accent-foreground font-semibold"
                      : "hover:bg-accent/50"
                  }`}
                  onClick={() => setActive("Add Timeline")}
                >
                  <History className="h-5 w-5" />
                  Add Timeline
                </Link>
                <Link
                  to="/messages"
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 ${
                    active === "Messages"
                      ? "bg-accent text-accent-foreground font-semibold"
                      : "hover:bg-accent/50"
                  }`}
                  onClick={() => setActive("Messages")}
                >
                  <MessagesSquare className="h-5 w-5" />
                  Messages
                </Link>
                <Link
                  to="/account"
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 ${
                    active === "Account"
                      ? "bg-accent text-accent-foreground font-semibold"
                      : "hover:bg-accent/50"
                  }`}
                  onClick={() => setActive("Account")}
                >
                  <SquareUser className="h-5 w-5" />
                  Account
                </Link>
                <div className="border-t my-2"></div>
                <Button
                  variant="ghost"
                  className="flex items-center justify-start gap-3 rounded-md px-3 py-2.5 text-destructive hover:bg-destructive/10 w-full"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </Button>
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        {/* User Info - Responsive for mobile */}
        <div className="flex items-center gap-3 flex-1 md:ml-6">
          <div className="flex-shrink-0">
            {showLoading ? (
              <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-gray-200 animate-pulse"></div>
            ) : hasAvatar ? (
              <img
                src={user.avatar}
                alt="avatar"
                className="w-10 h-10 md:w-16 md:h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-gray-300 flex items-center justify-center">
                <User className="h-5 w-5 md:h-8 md:w-8 text-gray-500" />
              </div>
            )}
          </div>
          <h1 className="text-xl md:text-3xl font-semibold truncate">
            Welcome, {showLoading ? "User" : displayName}
          </h1>
        </div>
      </header>
      {() => {
        switch (active) {
          case "Dashboard":
            return <Dashboard />;
            break;
          case "Add Project":
            return <AddProject />;
            break;
          case "Add Skills":
            return <AddSkills />;
            break;
          case "Add Application":
            return <AddApplication />;
            break;
          case "Add Timeline":
            return <AddTimeline />;
            break;
          case "Messages":
            return <Messages />;
            break;
          case "Account":
            return <Account />;
            break;
          default:
            return <Dashboard />;
            break;
        }
      }}

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-6 md:ml-14">
        {/* Dashboard content */}
        <div className="bg-card rounded-lg shadow p-4 mb-6">
          <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
          <p className="text-muted-foreground">
            Your Portfolio Management Dashboard
          </p>
        </div>

        {/* Example content cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-card rounded-lg shadow p-4">
            <h3 className="font-medium mb-2">Projects</h3>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="bg-card rounded-lg shadow p-4">
            <h3 className="font-medium mb-2">Skills</h3>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="bg-card rounded-lg shadow p-4">
            <h3 className="font-medium mb-2">Messages</h3>
            <p className="text-2xl font-bold">0</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
