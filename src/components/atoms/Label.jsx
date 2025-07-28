import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Label = forwardRef(({ 
  className, 
  children,
  ...props 
}, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium text-gray-700 mb-1 block",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
});

Label.displayName = "Label";

export default Label;