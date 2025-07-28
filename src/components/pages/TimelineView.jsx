import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import TimelineView from "@/components/organisms/TimelineView";
import SearchBar from "@/components/molecules/SearchBar";
import TaskModal from "@/components/molecules/TaskModal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { taskService } from "@/services/api/taskService";
import { projectService } from "@/services/api/projectService";

const TimelineViewPage = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  useEffect(() => {
    loadData();
  }, [projectId]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [projectData, taskData] = await Promise.all([
        projectService.getAll(),
        taskService.getAll()
      ]);

      if (projectId) {
        const project = projectData.find(p => p.Id.toString() === projectId);
        if (project) {
          setCurrentProject(project);
          setColumns(project.columns);
          setTasks(taskData.filter(t => t.projectId === projectId));
        } else {
          setError("Project not found");
        }
      } else {
        // Default to first project
        const defaultProject = projectData[0];
        if (defaultProject) {
          setCurrentProject(defaultProject);
          setColumns(defaultProject.columns);
          setTasks(taskData.filter(t => t.projectId === defaultProject.Id.toString()));
        } else {
          setError("No projects found");
        }
      }
    } catch (err) {
      setError("Failed to load data. Please try again.");
      console.error("Failed to load data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewTask = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleTaskEdit = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleTaskSave = async (taskData) => {
    try {
      if (selectedTask) {
        // Update existing task
        const updatedTask = await taskService.update(selectedTask.Id, taskData);
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task.Id === selectedTask.Id ? updatedTask : task
          )
        );
        toast.success("Task updated successfully!");
      } else {
        // Create new task
        const newTask = await taskService.create({
          ...taskData,
          projectId: currentProject?.Id.toString() || "1"
        });
        setTasks(prevTasks => [...prevTasks, newTask]);
        toast.success("Task created successfully!");
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to save task. Please try again.");
      console.error("Failed to save task:", err);
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await taskService.delete(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.Id !== taskId));
      setIsModalOpen(false);
      toast.success("Task deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete task. Please try again.");
      console.error("Failed to delete task:", err);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col">
        <div className="p-6">
          <div className="h-16 bg-gray-200 rounded animate-pulse mb-6"></div>
          <div className="h-12 bg-gray-200 rounded mb-6"></div>
          <Loading type="timeline" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <Error message={error} onRetry={loadData} />
        </div>
      </div>
    );
  }

  const tasksWithDates = tasks.filter(task => task.dueDate);

  return (
    <div className="flex-1 flex flex-col">
      <Header currentProject={currentProject} onNewTask={handleNewTask} />
      
      <div className="flex-1 p-6 space-y-6">
        <SearchBar
          onSearch={handleSearch}
          onFilter={handleFilter}
          filters={filters}
        />

        {tasksWithDates.length === 0 && !searchTerm && Object.keys(filters).length === 0 ? (
          <Empty
            title="No scheduled tasks"
            description="Tasks with due dates will appear on the timeline. Create tasks with due dates to see them here."
            actionLabel="Create Scheduled Task"
            onAction={handleNewTask}
            icon="Calendar"
          />
        ) : (
          <TimelineView
            tasks={tasks}
            onTaskEdit={handleTaskEdit}
            searchTerm={searchTerm}
            filters={filters}
          />
        )}
      </div>

      <TaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleTaskSave}
        onDelete={handleTaskDelete}
        columns={columns}
      />
    </div>
  );
};

export default TimelineViewPage;