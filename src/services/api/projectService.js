import projectsData from "@/services/mockData/projects.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const projectService = {
  async getAll() {
    await delay(300);
    return [...projectsData];
  },

  async getById(id) {
    await delay(200);
    const project = projectsData.find(p => p.Id === parseInt(id));
    if (!project) {
      throw new Error("Project not found");
    }
    return { ...project };
  },

  async create(projectData) {
    await delay(400);
    const newProject = {
      ...projectData,
      Id: Math.max(...projectsData.map(p => p.Id)) + 1,
      createdAt: new Date().toISOString()
    };
    projectsData.push(newProject);
    return { ...newProject };
  },

  async update(id, projectData) {
    await delay(350);
    const index = projectsData.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Project not found");
    }
    
    const updatedProject = {
      ...projectsData[index],
      ...projectData,
      Id: parseInt(id),
      updatedAt: new Date().toISOString()
    };
    
    projectsData[index] = updatedProject;
    return { ...updatedProject };
  },

  async delete(id) {
    await delay(250);
    const index = projectsData.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Project not found");
    }
    
    projectsData.splice(index, 1);
    return true;
  }
};