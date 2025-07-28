import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Avatar from "@/components/atoms/Avatar";

const TaskCard = ({ task, onEdit, onDragStart, onDragEnd, isDragging }) => {
  const handleCardClick = (e) => {
    e.preventDefault();
    onEdit(task);
  };

  const handleDragStart = (e) => {
    onDragStart(task);
  };

  const handleDragEnd = (e) => {
    onDragEnd();
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

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={`bg-white rounded-lg p-4 card-shadow cursor-pointer transition-all duration-200 hover:shadow-lg ${
        isDragging ? "drag-shadow opacity-50" : ""
      }`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleCardClick}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-gray-900 text-sm leading-5 flex-1">
            {task.title}
          </h3>
          <Badge variant={getPriorityColor(task.priority)} className="ml-2 flex-shrink-0">
            {task.priority}
          </Badge>
        </div>

        {task.description && (
          <p className="text-gray-600 text-sm line-clamp-2">
            {task.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar name={task.assignee} size="small" />
            <span className="text-xs text-gray-500">{task.assignee}</span>
          </div>

          {task.dueDate && (
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <ApperIcon name="Calendar" size={12} />
              <span>{format(new Date(task.dueDate), "MMM dd")}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;