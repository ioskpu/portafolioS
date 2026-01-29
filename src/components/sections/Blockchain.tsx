import React from 'react';
import { Terminal, Cpu, Database, ShieldCheck } from 'lucide-react';

const Blockchain = () => {
  return (
    <section id="blockchain" className="py-20 bg-blockchain-dark text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
              <Cpu className="text-blockchain-purple" /> Web3 & Blockchain
            </h2>
            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              Desarrollo de contratos inteligentes, integración de dApps
              arquitectura de blockchain y protocolos de transacciones seguras, 
              me especializo en tecnologías como Solidity, Ethereum, 
              TON blockchain y más.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blockchain-purple/50 transition-colors">
                <div className="p-3 rounded-lg bg-blockchain-purple/10 text-blockchain-purple">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Smart Contracts</h4>
                  <p className="text-sm text-white/60">Solidity, Hardhat, OpenZeppelin.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blockchain-purple/50 transition-colors">
                <div className="p-3 rounded-lg bg-blockchain-purple/10 text-blockchain-purple">
                  <Database size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">dApp Integration</h4>
                  <p className="text-sm text-white/60">Ethers.js, Wagmi, WalletConnect.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Terminal Style */}
          <div className="bg-[#1e1e1e] rounded-xl shadow-2xl overflow-hidden font-mono text-sm text-green-400 p-1 border border-white/10">
            <div className="bg-[#323232] px-4 py-2 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>
              <div className="flex-1 text-center text-xs text-gray-400">blockchain-info.sh</div>
            </div>
            <div className="p-6 space-y-2">
              <div className="flex gap-2">
                <span className="text-blue-400">➜</span>
                <span className="text-purple-400">~</span>
                <span>get-blockchain-status</span>
              </div>
              <div className="pl-6 text-gray-400">
                <p>[+] Connection established to Ethereum Mainnet</p>
                <p>[+] Current Block: 18,452,901</p>
                <p>[+] Gas Price: 25 Gwei</p>
                <p>[+] Status: <span className="text-green-500">Synchronized</span></p>
              </div>
              <div className="flex gap-2 pt-4">
                <span className="text-blue-400">➜</span>
                <span className="text-purple-400">~</span>
                <span className="animate-pulse">_</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blockchain;
