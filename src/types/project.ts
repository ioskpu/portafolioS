export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  tags: string[];
  category: 'web' | 'blockchain' | 'tool';
  featured: boolean;
  createdAt: string;
}
