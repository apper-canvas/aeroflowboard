import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";

const SearchBar = ({ onSearch, onFilter, filters = {} }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState(filters);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...activeFilters, [filterType]: value };
    setActiveFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setActiveFilters({});
    onSearch("");
    onFilter({});
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg card-shadow">
      <div className="relative flex-1">
        <ApperIcon 
          name="Search" 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          size={16} 
        />
        <Input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-10"
        />
      </div>
      
      <Select
        value={activeFilters.assignee || ""}
        onChange={(e) => handleFilterChange("assignee", e.target.value)}
        className="w-40"
      >
        <option value="">All Assignees</option>
        <option value="John Doe">John Doe</option>
        <option value="Jane Smith">Jane Smith</option>
        <option value="Mike Johnson">Mike Johnson</option>
        <option value="Sarah Wilson">Sarah Wilson</option>
      </Select>
      
      <Select
        value={activeFilters.priority || ""}
        onChange={(e) => handleFilterChange("priority", e.target.value)}
        className="w-32"
      >
        <option value="">All Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>
      
      {(searchTerm || Object.keys(activeFilters).some(key => activeFilters[key])) && (
        <Button variant="ghost" onClick={clearFilters} size="small">
          <ApperIcon name="X" size={16} />
        </Button>
      )}
    </div>
  );
};

export default SearchBar;