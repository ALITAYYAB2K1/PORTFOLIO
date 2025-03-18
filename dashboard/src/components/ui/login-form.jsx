import { useSelector } from "react-redux";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { Input } from "./input";
import { Label } from "./label";
import { clearAllUserErrors, login } from "../../store/userSlice";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import SpecialLoadingButton from "../../pages/sub-components/SpecialLoadingButton";

export function LoginForm({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, isAuthenticated, error, message } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [error, isAuthenticated, loading, dispatch, navigateTo]);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your dashboard of Portfolio
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to={"/password/forgot"}
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {loading ? (
                <SpecialLoadingButton content={"logging in"} />
              ) : (
                <Button type="submit" className="w-full" onClick={handleLogin}>
                  Login
                </Button>
              )}

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
