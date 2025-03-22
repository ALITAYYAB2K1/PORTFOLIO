import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "../../components/ui/card";

function Skills() {
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    const getSkills = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/skill/getall",
          {
            withCredentials: true,
          }
        );
        setSkills(data.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    getSkills();
  }, []);
  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12">
      <h1
        className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit"
      >
        SKILLS
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {skills &&
          skills.map((element) => {
            return (
              <Card
                className="h-fit p-7 flex flex-col justify-center items-center gap-3"
                key={element._id}
              >
                <img
                  src={element.svg}
                  alt="skill"
                  className="h-12 sm:h-24 w-auto"
                />
                <p className="text-muted-foreground text-center">
                  {element.title}
                </p>
              </Card>
            );
          })}
      </div>
    </div>
  );
}

export default Skills;
