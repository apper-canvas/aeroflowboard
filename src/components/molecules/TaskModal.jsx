import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";

const TaskModal = ({ task, isOpen, onClose, onSave, onDelete, columns }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    priority: "medium",
    assignee: "",
    dueDate: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "",
        priority: task.priority || "medium",
        assignee: task.assignee || "",
        dueDate: task.dueDate ? format(new Date(task.dueDate), "yyyy-MM-dd") : ""
      });
    } else {
      setFormData({
        title: "",
        description: "",
        status: columns[0]?.name || "Todo",
        priority: "medium",
        assignee: "",
        dueDate: ""
      });
    }
    setErrors({});
  }, [task, isOpen, columns]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!formData.assignee.trim()) {
      newErrors.assignee = "Assignee is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const taskData = {
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
      updatedAt: new Date().toISOString()
    };

    if (task) {
      onSave({ ...task, ...taskData });
    } else {
      onSave({
        ...taskData,
        Id: Date.now(),
        createdAt: new Date().toISOString()
      });
    }
  };

  const handleDelete = () => {
    if (task && window.confirm("Are you sure you want to delete this task?")) {
      onDelete(task.Id);
    }
  };

  const statusOptions = columns.map(column => ({
    value: column.name,
    label: column.name
  }));

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" }
  ];

  const assigneeOptions = [
    { value: "", label: "Select Assignee" },
    { value: "John Doe", label: "John Doe" },
    { value: "Jane Smith", label: "Jane Smith" },
    { value: "Mike Johnson", label: "Mike Johnson" },
    { value: "Sarah Wilson", label: "Sarah Wilson" }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold gradient-text">
                {task ? "Edit Task" : "Create New Task"}
              </h2>
              <Button variant="ghost" onClick={onClose} size="small">
                <ApperIcon name="X" size={18} />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField
                label="Title"
                type="input"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter task title..."
                error={errors.title}
                required
              />

              <FormField
                label="Description"
                type="textarea"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Enter task description..."
                rows={3}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="Status"
                  type="select"
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  options={statusOptions}
                />

                <FormField
                  label="Priority"
                  type="select"
                  value={formData.priority}
                  onChange={(e) => handleInputChange("priority", e.target.value)}
                  options={priorityOptions}
                />
              </div>

              <FormField
                label="Assignee"
                type="select"
                value={formData.assignee}
                onChange={(e) => handleInputChange("assignee", e.target.value)}
                options={assigneeOptions}
                error={errors.assignee}
                required
              />

              <FormField
                label="Due Date"
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange("dueDate", e.target.value)}
              />

              <div className="flex justify-between pt-4">
                <div>
                  {task && (
                    <Button type="button" variant="danger" onClick={handleDelete}>
                      <ApperIcon name="Trash2" size={16} className="mr-2" />
                      Delete
                    </Button>
                  )}
                </div>
                
                <div className="flex space-x-3">
                  <Button type="button" variant="secondary" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    {task ? "Update Task" : "Create Task"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TaskModal;