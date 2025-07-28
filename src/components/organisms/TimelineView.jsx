import React, { useState, useEffect } from "react";
import { format, startOfWeek, addDays, isToday, isSameDay } from "date-fns";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";

const TimelineView = ({ 
  tasks, 
  onTaskEdit, 
  searchTerm, 
  filters 
}) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    let filtered = tasks;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignee.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply other filters
    if (filters.assignee) {
      filtered = filtered.filter(task => task.assignee === filters.assignee);
    }

    if (filters.priority) {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }

    setFilteredTasks(filtered);
  }, [tasks, searchTerm, filters]);

  const weekStart = startOfWeek(currentWeek);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const navigateWeek = (direction) => {
    const newWeek = addDays(currentWeek, direction * 7);
    setCurrentWeek(newWeek);
  };

  const getTasksForDate = (date) => {
    return filteredTasks.filter(task => {
      if (!task.dueDate) return false;
      return isSameDay(new Date(task.dueDate), date);
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "high";
      case "medium":
        return "medium";
      case "low":
        return "low";
      default:
        return "default";
    }
  };

  const getStatusColor = (status) => {
    const colorMap = {
      "Todo": "bg-gray-100 text-gray-700",
      "In Progress": "bg-blue-100 text-blue-700",
      "Review": "bg-warning/20 text-warning",
      "Done": "bg-success/20 text-success"
    };
    return colorMap[status] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="bg-white rounded-lg card-shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-gray-900">Timeline View</h2>
            <div className="text-sm text-gray-500">
              {format(weekStart, "MMM dd")} - {format(addDays(weekStart, 6), "MMM dd, yyyy")}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={() => navigateWeek(-1)}
              size="small"
            >
              <ApperIcon name="ChevronLeft" size={16} />
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => setCurrentWeek(new Date())}
              size="small"
              className="px-3"
            >
              Today
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => navigateWeek(1)}
              size="small"
            >
              <ApperIcon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 border-b border-gray-200">
        {weekDays.map((day) => (
          <div
            key={day.toISOString()}
            className={`p-4 text-center border-r border-gray-200 last:border-r-0 ${
              isToday(day) ? "bg-primary/5" : ""
            }`}
          >
            <div className="text-sm font-medium text-gray-500">
              {format(day, "EEE")}
            </div>
            <div
              className={`text-lg font-semibold mt-1 ${
                isToday(day) ? "text-primary" : "text-gray-900"
              }`}
            >
              {format(day, "dd")}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 min-h-[400px]">
        {weekDays.map((day) => {
          const dayTasks = getTasksForDate(day);
          
          return (
            <div
              key={day.toISOString()}
              className={`p-3 border-r border-gray-200 last:border-r-0 space-y-2 ${
                isToday(day) ? "bg-primary/2" : ""
              }`}
            >
              {dayTasks.map((task) => (
                <motion.div
                  key={task.Id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg p-3 card-shadow cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onTaskEdit(task)}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {task.title}
                      </h4>
                      <Badge
                        variant={getPriorityColor(task.priority)}
                        className="ml-1 flex-shrink-0"
                      >
                        {task.priority}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Avatar name={task.assignee} size="small" />
                        <span className="text-xs text-gray-500 truncate">
                          {task.assignee}
                        </span>
                      </div>

                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(task.status)}`}
                      >
                        {task.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {dayTasks.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <ApperIcon name="Calendar" size={20} className="mx-auto opacity-30" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <ApperIcon name="Calendar" size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-500">Try adjusting your search or filters to see tasks.</p>
        </div>
      )}
    </div>
  );
};

export default TimelineView;