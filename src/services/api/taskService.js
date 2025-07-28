import tasksData from "@/services/mockData/tasks.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const taskService = {
  async getAll() {
    await delay(300);
    return [...tasksData];
  },

  async getById(id) {
    await delay(200);
    const task = tasksData.find(t => t.Id === parseInt(id));
    if (!task) {
      throw new Error("Task not found");
    }
    return { ...task };
  },

  async getByProject(projectId) {
    await delay(250);
    return tasksData.filter(t => t.projectId === projectId.toString()).map(t => ({ ...t }));
  },

  async create(taskData) {
    await delay(400);
    const newTask = {
      ...taskData,
      Id: Math.max(...tasksData.map(t => t.Id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    tasksData.push(newTask);
    return { ...newTask };
  },

  async update(id, taskData) {
    await delay(350);
    const index = tasksData.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Task not found");
    }
    
    const updatedTask = {
      ...tasksData[index],
      ...taskData,
      Id: parseInt(id),
      updatedAt: new Date().toISOString()
    };
    
    tasksData[index] = updatedTask;
    return { ...updatedTask };
  },

  async delete(id) {
    await delay(250);
    const index = tasksData.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Task not found");
    }
    
    tasksData.splice(index, 1);
    return true;
  }
};