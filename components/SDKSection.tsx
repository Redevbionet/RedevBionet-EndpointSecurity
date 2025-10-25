
import React from 'react';
import type { SDK } from '../constants';

interface SDKSectionProps {
  sdkInfo: {
    title: string;
    description: string;
    icon: React.ReactNode;
    languages: SDK[];
  }
}

const SDKSection: React.FC<SDKSectionProps> = ({ sdkInfo }) => {
  return (
    <section className="bg-slate-800/50 p-8 rounded-lg border border-slate-700">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mx-auto mb-4 inline-block p-3 bg-slate-700 rounded-md text-cyan-400">
            {sdkInfo.icon}
        </div>
        <h2 className="text-3xl font-bold mb-3">{sdkInfo.title}</h2>
        <p className="text-slate-400 mb-10">
          {sdkInfo.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {sdkInfo.languages.map((sdk, index) => (
          <div key={index} className="flex items-start space-x-4 p-6 bg-slate-900 rounded-lg">
            <div className="text-4xl opacity-80 mt-1">{sdk.icon}</div>
            <div>
              <h4 className="text-2xl font-semibold text-slate-100">{sdk.name}</h4>
              <p className="text-slate-400">{sdk.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SDKSection;
