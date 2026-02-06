import React from 'react';
import { Link, Shield, Lock, Zap, Database, Cpu } from 'lucide-react';

const BlockchainSection: React.FC = () => {
  const blockchainProjects = [
    {
      title: "Mini-Web3-Game-Economy",
      description: "A minimal Web3 ecosystem with NFTs, rarity-weighted staking, and an ERC-20 reward token.",
      tech: ["Solidity", "Web3.js", "React", "ERC-20"],
      status: "In Development",
      link: "https://github.com/ioskpu/Mini-Web3-Game-Economy"
    },
    {
      title: "NFT Marketplace",
      description: "Mercado descentralizado para tokens no fungibles",
      tech: ["IPFS", "Ethers.js", "Next.js", "Hardhat"],
      status: "In Development",
      link: "#"
    },
    {
      title: "Smart Contract Auditor",
      description: "Herramienta de análisis de contratos inteligentes",
      tech: ["TypeScript", "Node.js", "Solidity Parser", "Redis"],
      status: "Open Source",
      link: "#"
    }
  ];

  const blockchainSkills = [
    { icon: <Shield className="w-6 h-6" />, title: "Smart Contracts", level: 90 },
    { icon: <Lock className="w-6 h-6" />, title: "Seguridad", level: 85 },
    { icon: <Zap className="w-6 h-6" />, title: "DeFi Protocols", level: 80 },
    { icon: <Database className="w-6 h-6" />, title: "Web3 Storage", level: 75 },
    { icon: <Cpu className="w-6 h-6" />, title: "Node Operation", level: 70 },
  ];

  return (
    <section id="blockchain" className="py-12 md:py-24 bg-gradient-to-b from-base-100 to-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-4">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Especialidad Blockchain
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500">
              Blockchain & Web3 Development
            </span>
          </h2>
          <p className="text-base-content/80 max-w-2xl mx-auto">
            Especializado en el desarrollo de aplicaciones descentralizadas, contratos inteligentes
            y soluciones Web3 utilizando las tecnologías más innovadoras del ecosistema.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Habilidades Blockchain */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Habilidades Técnicas</h3>
            <div className="space-y-6">
              {blockchainSkills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {skill.icon}
                      </div>
                      <span className="font-medium">{skill.title}</span>
                    </div>
                    <span className="text-sm font-semibold">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-base-300 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Proyectos Blockchain Destacados */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Proyectos Blockchain</h3>
            <div className="space-y-6">
              {blockchainProjects.map((project, index) => (
                <div 
                  key={index}
                  className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="card-body">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="card-title text-lg">{project.title}</h4>
                      <span className={`badge ${
                        project.status === 'Live' ? 'badge-success' :
                        project.status === 'In Development' ? 'badge-warning' : 'badge-info'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-base-content/70 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span key={tech} className="badge badge-outline badge-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="card-actions">
                      <a href={project.link} className="btn btn-primary btn-sm gap-2">
                        <Link className="w-4 h-4" />
                        Ver detalles
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack Blockchain */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Tecnologías Blockchain</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Ethereum', color: 'bg-gray-800 text-white' },
              { name: 'Solidity', color: 'bg-gray-700 text-white' },
              { name: 'Web3.js', color: 'bg-red-500/10 text-red-600 dark:text-red-400' },
              { name: 'Hardhat', color: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400' },
              { name: 'IPFS', color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400' },
              { name: 'Polygon', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
              { name: 'Chainlink', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
              { name: 'Stellar', color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' },
              { name: 'Alchemy', color: 'bg-green-500/10 text-green-600 dark:text-green-400' },
              { name: 'MetaMask', color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400' },
              { name: 'OpenZeppelin', color: 'bg-gray-600/10 text-gray-600 dark:text-gray-400' },
              { name: 'Truffle', color: 'bg-red-500/10 text-red-600 dark:text-red-400' },
            ].map((tech) => (
              <div
                key={tech.name}
                className={`${tech.color} rounded-xl p-4 text-center font-medium transition-transform hover:scale-105`}
              >
                {tech.name}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Blockchain */}
        <div className="card bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 border border-blue-500/20">
          <div className="card-body items-center text-center">
            <h3 className="card-title text-2xl mb-2">¿Interesado en Desarrollo Blockchain?</h3>
            <p className="text-base-content/80 mb-6 max-w-2xl">
              Ya sea que necesites un smart contract auditado, una dApp completa o asesoramiento
              sobre tecnología Web3, estoy aquí para ayudar.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#contact" className="btn btn-primary px-8 gap-2">
                <Zap className="w-4 h-4" />
                Contáctame para blockchain
              </a>
              <a 
                href="https://github.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline border-2 px-8"
              >
                Ver repositorios Web3
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlockchainSection;
