import React from 'react';
import FeatureCard from './components/FeatureCard';
import SDKSection from './components/SDKSection';
import EndpointSecuritySection from './components/EndpointSecuritySection';
import AnalysisSection from './components/AnalysisSection';
import { FEATURES, SDKs } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-cyan-300 selection:text-slate-900">
      <main className="container mx-auto px-6 py-12 md:py-20">
        <header className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-teal-500 text-transparent bg-clip-text">
              OTX DirectConnect API
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400">
            ซิงโครไนซ์ Threat Intelligence กับเครื่องมือของคุณได้อย่างง่ายดายและมีประสิทธิภาพ
          </p>
        </header>

        <EndpointSecuritySection />

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </section>

        <AnalysisSection />

        <SDKSection sdkInfo={SDKs} />
      </main>

      <footer className="text-center py-8 border-t border-slate-800">
        <p className="text-slate-500">
          Powered by Community-Driven Threat Intelligence
        </p>
      </footer>
    </div>
  );
};

export default App;
