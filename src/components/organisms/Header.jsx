import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Header = ({ currentProject, onNewTask }) => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const location = useLocation();
  
  const isTimelineView = location.pathname.includes("/timeline");

  const handleViewToggle = () => {
    if (projectId) {
      if (isTimelineView) {
        navigate(`/project/${projectId}`);
      } else {
        navigate(`/project/${projectId}/timeline`);
      }
    } else {
      if (isTimelineView) {
        navigate("/");
      } else {
        navigate("/timeline");
      }
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-2xl font-bold gradient-text">
              {currentProject?.name || "FlowBoard"}
            </h1>
            {currentProject?.description && (
              <p className="text-gray-600 text-sm mt-1">
                {currentProject.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <Button
              variant={isTimelineView ? "ghost" : "primary"}
              size="small"
              onClick={handleViewToggle}
              className={`px-3 py-1.5 rounded-md transition-all ${
                !isTimelineView ? "shadow-sm" : ""
              }`}
            >
              <ApperIcon name="Columns" size={16} className="mr-2" />
              Board
            </Button>
            <Button
              variant={isTimelineView ? "primary" : "ghost"}
              size="small"
              onClick={handleViewToggle}
              className={`px-3 py-1.5 rounded-md transition-all ${
                isTimelineView ? "shadow-sm" : ""
              }`}
            >
              <ApperIcon name="Calendar" size={16} className="mr-2" />
              Timeline
            </Button>
          </div>

          <Button
            variant="accent"
            onClick={onNewTask}
            className="animate-bounce-subtle"
          >
            <ApperIcon name="Plus" size={16} className="mr-2" />
            New Task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;