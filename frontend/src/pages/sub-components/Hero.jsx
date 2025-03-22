import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typewriter } from "react-simple-typewriter"; // Fixed capitalization
import { Link } from "react-router-dom";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Youtube,
  ExternalLink,
} from "lucide-react";
import { Button } from "../../components/ui/button";
function Hero() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/user/portfolio",
          {
            withCredentials: true,
          }
        );
        setUser(data.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    getMyProfile();
  }, []); // Add empty dependency array to avoid infinite loop

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-green-400 rounded-full h-2 w-2"></span>
        <p>Online</p>
      </div>
      <h1 className="overflow-x-hidden text-[1.3rem] sm:text-[1.7rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] mb-4">
        Hey, I'm {user.fullname || "Developer"}.
      </h1>
      <h1
        className="text-tubeLight-effect overflow-x-hidden text-[1.3rem] sm:text-[1.7rem] md:text-[2.2rem] lg:text-[2.8rem] 
      tracking-[15px]"
      >
        <Typewriter
          words={[
            "FRONTEND DEVELOPER",
            "BACKEND DEVELOPER",
            "FULLSTACK DEVELOPER",
            "GAMER",
            "YOUTUBER",
          ]}
          loop={true}
          cursor={true}
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h1>
      <div
        className="w-fit px-5 py-2 bg-slate-50 rounded-[20px] flex gap-5 
      items-center mt-4 md:mt-8 lg:mt-10"
      >
        <Link to={"/"} target="_blank">
          <Youtube className="text-red-500 w-7 h-7" />
        </Link>
        <Link to={user.instagramURL} target="_blank">
          <Instagram className="text-[#E1306C] w-7 h-7" />
        </Link>
        <Link to={user.facebookURL} target="_blank">
          <Facebook className="text-[#1877F2] w-7 h-7" />
        </Link>
        <Link to={user.linkedinURL} target="_blank">
          <Linkedin className="text-[#0A66C2] w-7 h-7" />
        </Link>
      </div>
      <div className="mt-4 md:mt-8 lg:mt-10  flex gap-3">
        <Link to={user.githubURL} target="_blank">
          <Button className="rounded-[30px] flex items-center gap-2 flex-row">
            <span>
              <Github />
            </span>
            <span>Github</span>
          </Button>
        </Link>
        <Link to={user.resume} target="_blank">
          <Button className="rounded-[30px] flex items-center gap-2 flex-row">
            <span>
              <ExternalLink />
            </span>
            <span>Resume </span>
          </Button>
        </Link>
      </div>
      <p className="mt-8 text-xl tracking-[2px]">{user.aboutMe}</p>
      <hr className="my-8 md::my-10 " />
    </div>
  );
}

export default Hero;
