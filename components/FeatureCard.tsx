
import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 hover:border-cyan-400 transition-all duration-300 transform hover:-translate-y-1 group">
      <div className="mb-4 inline-block p-3 bg-slate-700 rounded-md text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-900 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-slate-100">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  );
};

export default FeatureCard;
