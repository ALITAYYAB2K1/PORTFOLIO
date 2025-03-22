import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ProjectView = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProject = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/v1/project/get/${id}`,
          { withCredentials: true }
        );

        if (response.data && response.data.data) {
          setProject(response.data.data);
        } else {
          setError("Project data not found");
          toast.error("Failed to load project details");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        setError(error.response?.data?.message || "Failed to load project");
        toast.error(error.response?.data?.message || "Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    getProject();
  }, [id]);

  const handleReturnToPortfolio = () => {
    navigate("/");
  };

  // Format description as bullet points if it contains periods
  const getDescriptionItems = (description) => {
    if (!description) return [];
    return description.split(". ").filter((item) => item.trim() !== "");
  };

  // Format stack as tags
  const getStackItems = (stack) => {
    if (!stack) return [];
    return stack.split(/[,\s]+/).filter((item) => item.trim() !== "");
  };

  const getBadgeColor = (deployed) => {
    switch (deployed) {
      case "Yes":
        return "bg-green-100 text-green-800";
      case "Upcoming":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-400"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
        <div className="text-xl text-red-500">
          Failed to load project details
        </div>
        <Button onClick={handleReturnToPortfolio}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Return to Portfolio
        </Button>
      </div>
    );
  }

  const descriptionItems = getDescriptionItems(project.description);
  const stackItems = getStackItems(project.stack);

  return (
    <div className="max-w-[1000px] mx-auto px-5 py-8">
      {/* Header with back button */}
      <div className="flex justify-between items-center mb-8">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={handleReturnToPortfolio}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Button>

        <Badge className={getBadgeColor(project.deployed)}>
          {project.deployed === "Yes"
            ? "Live Project"
            : project.deployed === "Upcoming"
            ? "Coming Soon"
            : "Not Deployed"}
        </Badge>
      </div>

      {/* Project title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6">{project.title}</h1>

      {/* Project image - Now with full width */}
      <div className="mb-8 rounded-lg overflow-hidden shadow-lg w-full">
        <img
          src={project.image || "/avatarHolder.jpg"}
          alt={project.title}
          className="w-full h-auto max-h-[400px] object-contain"
        />
      </div>

      {/* Project details in grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">About this project</h2>

          {descriptionItems.length > 0 ? (
            <ul className="list-disc pl-5 space-y-2">
              {descriptionItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>{project.description}</p>
          )}

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {stackItems.map((tech, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Project Details</h3>
            <div className="rounded-lg p-4 space-y-4 border border-gray-700">
              <div>
                <h4 className="text-sm font-medium">STATUS</h4>
                <p>{project.deployed}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium">TECH STACK</h4>
                <p>{project.stack}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Project Links</h3>

            {project.gitRepoUrl && (
              <a
                href={project.gitRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Github size={20} />
                <span className="underline">View Source Code</span>
                <ExternalLink size={14} />
              </a>
            )}

            {project.deployed === "Yes" && project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ExternalLink size={20} />
                <span className="underline">View Live Project</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>

          <div className="pt-6 mt-6 border-t border-gray-700">
            <Button className="w-full" onClick={handleReturnToPortfolio}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Projects
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
