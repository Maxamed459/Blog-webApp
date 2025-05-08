import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { React, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setloading(true);

    try {
      const { data } = await axios.post("/api/register-user", formData);
      toast.success("Successfully registered.");
      setloading(false);
      navigate("/login");
    } catch (error) {
      setloading(false);
      toast.error(error.response.data);
      console.log("Error at ", error);
    }
  };

  return (
    <div className="w-full ">
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="text-2xl font-bold">Register with your info</h1>
          </CardTitle>
          <CardDescription>
            fill these inputs to your data to register
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">email</Label>
                <Input
                  id="email"
                  placeholder="Enetr your email"
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Button>{loading ? "Registering..." : "Register"}</Button>
              </div>

              <CardFooter>
                <p>
                  Or{" "}
                  <Link
                    to="/login"
                    className="font-bold text-slate-900 underline"
                  >
                    signIn
                  </Link>{" "}
                  if you already have an account
                </p>
              </CardFooter>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
