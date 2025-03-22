import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Github, ExternalLink } from "lucide-react";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyProjects = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/project/getall",
          { withCredentials: true }
        );
        if (data && data.data) {
          setProjects(data.data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    getMyProjects();
  }, []);

  return (
    <div>
      <div className="relative mb-12">
        <h1
          className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] 
          mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          MY{" "}
          <span className="text-tubeLight-effect font-extrabold">PROJECTS</span>
        </h1>
        <h1
          className="flex sm:hidden gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] 
          tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          MY <span className="text-tubeLight-effect font-extrabold">WORK</span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading projects...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(viewAll ? projects : projects.slice(0, 9)).map((project) => (
              <Card
                key={project._id}
                className="overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <Link to={`/project/${project._id}`}>
                  <div className="overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-auto aspect-video object-cover transition-transform hover:scale-105"
                    />
                  </div>
                </Link>

                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg truncate">
                      {project.title}
                    </h3>
                    <Badge
                      variant={
                        project.deployed === "Yes"
                          ? "success"
                          : project.deployed === "Upcoming"
                          ? "warning"
                          : "destructive"
                      }
                      className={`${
                        project.deployed === "Yes"
                          ? "bg-green-100 text-green-800"
                          : project.deployed === "Upcoming"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {project.deployed}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {project.stack}
                  </p>

                  <div className="mt-4 flex gap-3">
                    {project.gitRepoUrl && (
                      <a
                        href={project.gitRepoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          className="rounded-[30px] flex items-center gap-2 flex-row"
                          variant="outline"
                          size="sm"
                        >
                          <span>
                            <Github className="h-4 w-4" />
                          </span>
                          <span>Github</span>
                        </Button>
                      </a>
                    )}

                    {project.deployed === "Yes" && project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          className="rounded-[30px] flex items-center gap-2 flex-row"
                          size="sm"
                        >
                          <span>
                            <ExternalLink className="h-4 w-4" />
                          </span>
                          <span>Visit</span>
                        </Button>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {projects && projects.length > 9 && (
            <div className="w-full text-center my-9">
              <Button className="w-52" onClick={() => setViewAll(!viewAll)}>
                {viewAll ? "Show Less" : "Show More"}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Portfolio;
