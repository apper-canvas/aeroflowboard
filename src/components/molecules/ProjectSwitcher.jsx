import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const ProjectSwitcher = ({ projects, currentProject }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { projectId } = useParams();

  const handleProjectSelect = (project) => {
    navigate(`/project/${project.Id}`);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between text-left px-3 py-2 text-gray-700 hover:bg-gray-100"
      >
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-gradient-primary"></div>
          <span className="font-medium truncate">
            {currentProject?.name || "Select Project"}
          </span>
        </div>
        <ApperIcon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-gray-400" 
        />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {projects.map((project) => (
            <button
              key={project.Id}
              onClick={() => handleProjectSelect(project)}
              className={`w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors ${
                projectId === project.Id.toString() ? "bg-primary/5 text-primary" : "text-gray-700"
              }`}
            >
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-gradient-primary"></div>
                <div>
                  <div className="font-medium">{project.name}</div>
                  <div className="text-xs text-gray-500 truncate">
                    {project.description}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectSwitcher;