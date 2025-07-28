import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Avatar = forwardRef(({ 
  name,
  size = "medium", 
  className,
  ...props 
}, ref) => {
  const initials = name ? name.split(" ").map(n => n[0]).join("").toUpperCase() : "U";
  
  const baseStyles = "inline-flex items-center justify-center rounded-full bg-gradient-primary text-white font-medium";
  
  const sizes = {
    small: "h-6 w-6 text-xs",
    medium: "h-8 w-8 text-sm",
    large: "h-12 w-12 text-lg"
  };
  
  return (
    <div
      ref={ref}
      className={cn(baseStyles, sizes[size], className)}
      {...props}
    >
      {initials}
    </div>
  );
});

Avatar.displayName = "Avatar";

export default Avatar;