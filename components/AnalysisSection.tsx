import React from 'react';
import { UploadIcon } from './Icons';

const AnalysisSection: React.FC = () => {
  return (
    <section className="bg-slate-800/50 p-8 rounded-lg border border-slate-700 mb-20">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-shrink-0 text-cyan-400 mx-auto md:mx-0">
          <UploadIcon />
        </div>
        <div className="flex-grow text-center md:text-left">
          <h2 className="text-3xl font-bold mb-3 text-slate-100">
            Submit Files and URLs for Analysis
          </h2>
          <p className="text-slate-400 mb-4 max-w-3xl mx-auto md:mx-0">
            Analyze suspicious files and URLs to quickly detect malware and malicious activity. When you submit a file, the system will first perform a static analysis. Next, depending on the file type, it will go to our sandbox for dynamic analysis. When you submit a URL, the system will automatically visit the URL and analyze the content. If the URL has other artifacts, such as a file in the response, the file will automatically be submitted to our system for analysis.
          </p>
          <p className="text-slate-400 max-w-3xl mx-auto md:mx-0">
            Once the analysis is complete, you will see a history of your submissions in the table below, with a link to view the results in the analysis details page.
          </p>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <input type="text" placeholder="Enter URL to analyze" className="flex-grow bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all" />
            <button className="bg-cyan-500 text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-cyan-400 transition-colors duration-300">Submit URL</button>
            <label className="bg-slate-700 text-slate-200 font-bold py-3 px-6 rounded-lg hover:bg-slate-600 transition-colors duration-300 text-center cursor-pointer">
              <span>Upload File</span>
              <input type="file" className="hidden" />
            </label>
        </div>
        <div className="bg-slate-900/50 rounded-lg border border-slate-700 p-8">
            <p className="text-slate-500 text-center">Your submission history will appear here.</p>
        </div>
      </div>
    </section>
  );
};

export default AnalysisSection;
