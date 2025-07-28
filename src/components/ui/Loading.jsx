import React from "react";
import { motion } from "framer-motion";

const Loading = ({ type = "default" }) => {
  if (type === "tasks") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-4 card-shadow animate-pulse">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-5 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="h-3 bg-gray-200 rounded w-12"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "timeline") {
    return (
      <div className="bg-white rounded-lg card-shadow">
        <div className="p-6 border-b border-gray-200 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="h-6 bg-gray-200 rounded w-48"></div>
            <div className="flex space-x-2">
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
              <div className="h-8 w-16 bg-gray-200 rounded"></div>
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-7 border-b border-gray-200">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="p-4 text-center border-r border-gray-200 last:border-r-0 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-8 mx-auto mb-2"></div>
              <div className="h-5 bg-gray-200 rounded w-6 mx-auto"></div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 min-h-[400px]">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="p-3 border-r border-gray-200 last:border-r-0 space-y-2">
              {[...Array(Math.floor(Math.random() * 3) + 1)].map((_, j) => (
                <div key={j} className="bg-gray-100 rounded-lg p-3 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-12"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-gradient-primary rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Loading;