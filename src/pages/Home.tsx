import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/sections/Hero';
import ProjectsSection from '../components/sections/ProjectsSection';
import BlockchainSection from '../components/sections/BlockchainSection';
import ContactSection from '../components/sections/ContactSection';
import { useAppDispatch } from '../store/hooks';
import { fetchProjects } from '../store/slices/projectsSlice';

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <Layout>
      <Hero />
      <ProjectsSection />
      <BlockchainSection />
      <ContactSection />
    </Layout>
  );
};

export default Home;
