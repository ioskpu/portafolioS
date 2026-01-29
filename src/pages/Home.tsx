import React from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/sections/Hero';
import Projects from '../components/sections/Projects';
import Blockchain from '../components/sections/Blockchain';
import Contact from '../components/sections/Contact';

const Home = () => {
  return (
    <Layout>
      <Hero />
      <Projects />
      <Blockchain />
      <Contact />
    </Layout>
  );
};

export default Home;
