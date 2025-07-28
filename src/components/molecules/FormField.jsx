import React from "react";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Textarea from "@/components/atoms/Textarea";

const FormField = ({ 
  label, 
  type = "input", 
  error, 
  options = [], 
  ...props 
}) => {
  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <Select {...props}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        );
      case "textarea":
        return <Textarea {...props} />;
      default:
        return <Input type={type} error={error} {...props} />;
    }
  };

  return (
    <div className="space-y-1">
      {label && <Label>{label}</Label>}
      {renderInput()}
      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  );
};

export default FormField;