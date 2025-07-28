import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import ProjectSwitcher from "@/components/molecules/ProjectSwitcher";
import { projectService } from "@/services/api/projectService";

const Sidebar = ({ isOpen, onClose }) => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const { projectId } = useParams();

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      if (projectId) {
        const project = projects.find(p => p.Id.toString() === projectId);
        setCurrentProject(project || projects[0]);
      } else {
        setCurrentProject(projects[0]);
      }
    }
  }, [projects, projectId]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getAll();
      setProjects(data);
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setLoading(false);
    }
  };

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className="hidden lg:flex lg:flex-col lg:w-80 lg:bg-white lg:border-r lg:border-gray-200">
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center flex-shrink-0 px-6 py-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <ApperIcon name="Trello" className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">FlowBoard</h1>
              <p className="text-xs text-gray-500">Project Management</p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-4 py-6 space-y-6">
            <div>
              <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Current Project
              </h3>
              <ProjectSwitcher 
                projects={projects} 
                currentProject={currentProject}
              />
            </div>

            <div>
              <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Navigation
              </h3>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start px-3 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <ApperIcon name="LayoutDashboard" size={16} className="mr-3" />
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-3 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <ApperIcon name="Users" size={16} className="mr-3" />
                  Team
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-3 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <ApperIcon name="BarChart3" size={16} className="mr-3" />
                  Reports
                </Button>
              </div>
            </div>

            <div>
              <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                All Projects
              </h3>
              <div className="space-y-1">
                {loading ? (
                  <div className="animate-pulse space-y-2">
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                ) : (
                  projects.map((project) => (
                    <div
                      key={project.Id}
                      className={`px-3 py-2 rounded-md text-sm ${
                        currentProject?.Id === project.Id
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gradient-primary"></div>
                        <span className="truncate">{project.name}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </nav>

          <div className="flex-shrink-0 p-4 border-t border-gray-200">
            <Button
              variant="ghost"
              className="w-full justify-start px-3 py-2 text-gray-700 hover:bg-gray-100"
            >
              <ApperIcon name="Settings" size={16} className="mr-3" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start px-3 py-2 text-gray-700 hover:bg-gray-100"
            >
              <ApperIcon name="HelpCircle" size={16} className="mr-3" />
              Help & Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile Sidebar
  const MobileSidebar = () => (
    <>
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <ApperIcon name="Trello" className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">FlowBoard</h1>
              <p className="text-xs text-gray-500">Project Management</p>
            </div>
          </div>
          <Button variant="ghost" onClick={onClose} size="small">
            <ApperIcon name="X" size={18} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 py-6 space-y-6">
            <div>
              <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Current Project
              </h3>
              <ProjectSwitcher 
                projects={projects} 
                currentProject={currentProject}
              />
            </div>

            <div>
              <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Navigation
              </h3>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start px-3 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={onClose}
                >
                  <ApperIcon name="LayoutDashboard" size={16} className="mr-3" />
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-3 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={onClose}
                >
                  <ApperIcon name="Users" size={16} className="mr-3" />
                  Team
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-3 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={onClose}
                >
                  <ApperIcon name="BarChart3" size={16} className="mr-3" />
                  Reports
                </Button>
              </div>
            </div>

            <div>
              <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                All Projects
              </h3>
              <div className="space-y-1">
                {loading ? (
                  <div className="animate-pulse space-y-2">
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                ) : (
                  projects.map((project) => (
                    <div
                      key={project.Id}
                      className={`px-3 py-2 rounded-md text-sm ${
                        currentProject?.Id === project.Id
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gradient-primary"></div>
                        <span className="truncate">{project.name}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;