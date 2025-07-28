import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "No items found", 
  description = "Get started by creating your first item.", 
  actionLabel = "Create New",
  onAction,
  icon = "Plus"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center p-12 text-center"
    >
      <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mb-6 opacity-20">
        <ApperIcon name={icon} size={40} className="text-white" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md">
        {description}
      </p>
      
      {onAction && (
        <Button 
          onClick={onAction} 
          variant="accent"
          className="animate-bounce-subtle"
        >
          <ApperIcon name={icon} size={16} className="mr-2" />
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};

export default Empty;