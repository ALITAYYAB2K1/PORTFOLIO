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
const About = () => {
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
    <div className="w-full flex flex-col overflow-x-hidden">
      <div className="relative">
        <h1
          className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] 
          lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          ABOUT <span className="text-tubeLight-effect font-extrabold">ME</span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      <div className="text-center">
        <p className="uppercase text-xl text-slate-400">
          Allow me to introduce myself.
        </p>
      </div>
      <div>
        <div className="grid md:grid-cols-2 my-8 sm:my-20 gap-14">
          <div className="flex justify-center items-center">
            <img
              src={user.avatar}
              alt="avatar"
              className="bg-white p-2 sm:p-4 rotate-[25deg] h-[240px] sm:h-[340px] md:h-[350px] lg:h-[450px]"
            />
          </div>
          <div className="flex justify-center flex-col tracking-[1px] text-xl gap-5">
            <p>
              Hi, I'm Ali Tayyab, a passionate Web Developer and Freelancer with
              a strong foundation in Computer Science. I'm currently pursuing my
              degree at Bahria University, expecting to graduate in 2026. With a
              deep enthusiasm for technology, problem-solving, and clean code, I
              specialize in building scalable, efficient, and visually appealing
              web applications. I take pride in my ability to meet deadlines,
              ensuring high-quality deliverables with precision and dedication.
            </p>
            <p>
              Beyond coding, I have a keen interest in movies, series, video
              games,Cricket and Table Tennis. My ability to stay focused and
              tackle challenges head-on allows me to continuously grow and
              refine my skills..
            </p>
          </div>
        </div>
        <p className="tracking-[1px] text-xl">
          I'm always open to collaboration and new opportunities—let's build
          something great together! 🚀
        </p>
      </div>
    </div>
  );
};

export default About;
