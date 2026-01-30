// Este servicio manejará la actualización del archivo JSON en GitHub
// Necesitarás un token de acceso personal de GitHub con permisos de repositorio

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const REPO_OWNER = 'ioskpu';
const REPO_NAME = 'portafolioS';
const FILE_PATH = 'public/projects.json';

export const updateProjectsFile = async (projects: any[], commitMessage: string) => {
  if (!GITHUB_TOKEN) {
    console.error('GitHub token no configurado');
    return { success: false, error: 'Token no configurado' };
  }

  try {
    // 1. Obtener el SHA del archivo actual
    const getResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
      {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );

    const fileData = await getResponse.json();
    
    // 2. Actualizar el archivo
    const updateResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
          message: commitMessage,
          content: btoa(unescape(encodeURIComponent(JSON.stringify(projects, null, 2)))),
          sha: fileData.sha,
          branch: 'main'
        })
      }
    );

    if (updateResponse.ok) {
      return { success: true };
    } else {
      const error = await updateResponse.json();
      return { success: false, error: error.message };
    }
  } catch (error: any) {
    console.error('Error updating GitHub file:', error);
    return { success: false, error: error.message };
  }
};

export const syncWithGitHub = async (projects: any[]) => {
  return await updateProjectsFile(
    projects,
    `Actualización de proyectos - ${new Date().toISOString()}`
  );
};
