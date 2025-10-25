
import React from 'react';
import type { ScanHistoryItem } from '../types';
import { HistoryIcon, TrashIcon, CheckCircleIcon, ShieldExclamationIcon } from './icons';

interface HistoryProps {
  history: ScanHistoryItem[];
  onClearHistory: () => void;
}

const History: React.FC<HistoryProps> = ({ history, onClearHistory }) => {
  return (
    <div className="mt-8 bg-slate-800/30 border border-slate-700 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-200 flex items-center">
          <HistoryIcon className="w-6 h-6 mr-3" />
          Scan History
        </h2>
        <button 
          onClick={onClearHistory}
          className="text-slate-400 hover:text-red-400 transition-colors duration-200 p-2 rounded-md flex items-center text-sm"
          aria-label="Clear scan history"
        >
          <TrashIcon className="w-4 h-4 mr-1.5" />
          Clear
        </button>
      </div>
      <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
        {history.map(item => (
          <li 
            key={item.id} 
            className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg border border-slate-600/50"
          >
            <div className="flex items-center">
              {item.threatCount > 0 ? (
                <ShieldExclamationIcon className="w-6 h-6 text-orange-400 mr-4 flex-shrink-0" />
              ) : (
                <CheckCircleIcon className="w-6 h-6 text-green-400 mr-4 flex-shrink-0" />
              )}
              <div>
                <p className="font-semibold text-slate-300">{item.date}</p>
                <p className={`text-sm ${item.threatCount > 0 ? 'text-orange-400' : 'text-green-400'}`}>
                  {item.threatCount} threat{item.threatCount !== 1 ? 's' : ''} found
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
