import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import TaskCard from "@/components/molecules/TaskCard";
import Button from "@/components/atoms/Button";

const KanbanBoard = ({ 
  tasks, 
  columns, 
  onTaskMove, 
  onTaskEdit, 
  searchTerm, 
  filters 
}) => {
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
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

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e, columnName) => {
    e.preventDefault();
    setDragOverColumn(columnName);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e, columnName) => {
    e.preventDefault();
    
    if (draggedTask && draggedTask.status !== columnName) {
      onTaskMove(draggedTask.Id, columnName);
      toast.success(`Task moved to ${columnName}`);
    }
    
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const getTasksForColumn = (columnName) => {
    return filteredTasks.filter(task => task.status === columnName);
  };

  const getColumnColor = (columnName) => {
    const colorMap = {
      "Todo": "border-gray-300",
      "In Progress": "border-blue-300",
      "Review": "border-warning",
      "Done": "border-success"
    };
    return colorMap[columnName] || "border-gray-300";
  };

  return (
    <div className="flex space-x-6 overflow-x-auto pb-6">
      {columns.map((column) => {
        const columnTasks = getTasksForColumn(column.name);
        const isDragOver = dragOverColumn === column.name;
        
        return (
          <div
            key={column.Id}
            className={`flex-shrink-0 w-80 bg-gray-50 rounded-lg border-2 transition-all duration-200 ${
              isDragOver ? "border-primary bg-primary/5" : getColumnColor(column.name)
            }`}
            onDragOver={(e) => handleDragOver(e, column.name)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column.name)}
          >
            <div className="p-4 border-b border-gray-200 bg-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: column.color }}
                  ></div>
                  {column.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {columnTasks.length}
                  </span>
                  <Button variant="ghost" size="small">
                    <ApperIcon name="MoreHorizontal" size={16} />
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-3 min-h-[200px]">
              <AnimatePresence>
                {columnTasks.map((task) => (
                  <TaskCard
                    key={task.Id}
                    task={task}
                    onEdit={onTaskEdit}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    isDragging={draggedTask?.Id === task.Id}
                  />
                ))}
              </AnimatePresence>

              {columnTasks.length === 0 && !draggedTask && (
                <div className="text-center py-8 text-gray-500">
                  <ApperIcon name="Plus" size={24} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No tasks in {column.name}</p>
                </div>
              )}

              {isDragOver && draggedTask && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border-2 border-dashed border-primary rounded-lg p-4 bg-primary/5"
                >
                  <div className="text-center text-primary text-sm font-medium">
                    Drop task here
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;