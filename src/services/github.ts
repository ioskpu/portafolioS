import axios from 'axios';
import { Project } from '../types/project';

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const REPO_OWNER = 'ioskpu'; // Change this to your username
const REPO_NAME = 'portafolioS'; // Change this to your repo name
const FILE_PATH = 'public/projects.json';
const FETCH_PATH = '/projects.json';

export const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await axios.get(FETCH_PATH);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const updateProjectsFile = async (projects: Project[], token: string = GITHUB_TOKEN) => {
  try {
    const api = axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    // 1. Get the current file to get its SHA
    const { data: currentFile } = await api.get(
      `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`
    );

    // 2. Update the file
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(projects, null, 2))));
    await api.put(
      `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
      {
        message: 'Update projects.json from admin dashboard',
        content,
        sha: currentFile.sha,
      }
    );

    return { success: true };
  } catch (error) {
    console.error('Error updating projects file:', error);
    throw error;
  }
};
