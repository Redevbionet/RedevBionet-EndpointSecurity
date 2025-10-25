import React, { useState, useMemo } from 'react';
import type { Threat } from '../types';
import { ThreatSeverity } from '../types';
import { AlertTriangleIcon, CheckCircleIcon, ShieldExclamationIcon, ChevronDownIcon } from './icons';

interface ResultsProps {
  threats: Threat[];
  error: string | null;
  onScanAgain: () => void;
}

const severityConfig = {
  [ThreatSeverity.High]: {
    icon: <AlertTriangleIcon className="w-5 h-5 text-red-400" />,
    color: 'border-red-500/50 bg-red-500/10 text-red-300',
    label: 'High',
  },
  [ThreatSeverity.Medium]: {
    icon: <AlertTriangleIcon className="w-5 h-5 text-orange-400" />,
    color: 'border-orange-500/50 bg-orange-500/10 text-orange-300',
    label: 'Medium',
  },
  [ThreatSeverity.Low]: {
    icon: <AlertTriangleIcon className="w-5 h-5 text-yellow-400" />,
    color: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-300',
    label: 'Low',
  },
   [ThreatSeverity.Informational]: {
    icon: <AlertTriangleIcon className="w-5 h-5 text-blue-400" />,
    color: 'border-blue-500/50 bg-blue-500/10 text-blue-300',
    label: 'Info',
  },
};

interface ThreatItemProps {
  threat: Threat;
  isExpanded: boolean;
  onToggle: () => void;
}

const ThreatItem: React.FC<ThreatItemProps> = ({ threat, isExpanded, onToggle }) => {
  const config = severityConfig[threat.severity] || severityConfig[ThreatSeverity.Low];

  const simulatedDetails = useMemo(() => {
    const randomTimestamp = new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 72).toISOString();
    let filePath = 'N/A';
    let action = 'Manual review recommended.';

    switch (threat.type) {
      case 'Malware':
        filePath = `C:\\Users\\Admin\\AppData\\Local\\Temp\\${threat.name.split('.')[0].toLowerCase().slice(0, 8)}.exe`;
        action = 'Quarantine threat and run a full system scan.';
        break;
      case 'Suspicious Process':
        filePath = `C:\\Windows\\System32\\${threat.name.split(' ')[0].toLowerCase()}.dll`;
        action = 'Terminate process and investigate parent process.';
        break;
      case 'Phishing URL in Cache':
        filePath = 'Browser Cache History';
        action = 'Clear browser cache and warn user about phishing attempts.';
        break;
      default:
        filePath = 'System Registry';
        action = 'Investigate related registry keys for persistence mechanisms.';
    }
    return { filePath, timestamp: randomTimestamp, action };
  }, [threat.name, threat.type]);

  return (
    <div className={`border rounded-lg ${config.color} transition-all duration-300 ease-in-out ${isExpanded ? 'shadow-lg shadow-black/20 ring-1 ring-blue-500/20' : ''}`}>
      <button
        onClick={onToggle}
        aria-expanded={isExpanded}
        className="w-full text-left p-4 flex items-start space-x-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-lg"
      >
        <div className="flex-shrink-0 mt-1">{config.icon}</div>
        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center">
            <h3 className="font-bold text-slate-100">{threat.name}</h3>
            <span className={`text-sm font-semibold px-2 py-0.5 rounded-full ${config.color} mt-1 sm:mt-0`}>{config.label}</span>
          </div>
          <p className="text-sm text-slate-300 mt-1 font-mono">{threat.type}</p>
          <p className="text-slate-400 mt-2 text-sm">{threat.description}</p>
        </div>
        <div className="flex-shrink-0 mt-1">
          <ChevronDownIcon className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 sm:pl-14 sm:pr-10">
          <div className="border-t border-slate-700/50 pt-3 mt-2 text-slate-400 text-sm space-y-2">
            <h4 className="font-semibold text-slate-200 mb-2">Threat Intelligence Details</h4>
            <div>
              <span className="font-medium text-slate-300 block">File Path / Origin:</span>
              <code className="text-xs bg-slate-700/50 rounded px-1.5 py-1 block mt-1 break-all">{simulatedDetails.filePath}</code>
            </div>
            <div>
              <span className="font-medium text-slate-300 block">Detected:</span>
              <span className="block mt-1">{simulatedDetails.timestamp}</span>
            </div>
            <div>
              <span className="font-medium text-slate-300 block">Recommended Action:</span>
              <span className="block mt-1">{simulatedDetails.action}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Results: React.FC<ResultsProps> = ({ threats, error, onScanAgain }) => {
  const hasThreats = threats && threats.length > 0;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        {error ? (
          <>
            <ShieldExclamationIcon className="w-16 h-16 text-red-500 mx-auto" />
            <h2 className="mt-4 text-3xl font-bold text-red-400">Scan Failed</h2>
            <p className="mt-2 text-slate-400">{error}</p>
          </>
        ) : hasThreats ? (
          <>
            <ShieldExclamationIcon className="w-16 h-16 text-orange-500 mx-auto" />
            <h2 className="mt-4 text-3xl font-bold text-orange-400">Threats Detected!</h2>
            <p className="mt-2 text-slate-400">{threats.length} potential issue(s) require your attention.</p>
          </>
        ) : (
          <>
            <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
            <h2 className="mt-4 text-3xl font-bold text-green-400">Endpoint Secure</h2>
            <p className="mt-2 text-slate-400">No threats were found on your device.</p>
          </>
        )}
      </div>

      {(hasThreats || error) && (
        <div className="space-y-4 mb-8 max-h-96 overflow-y-auto pr-2">
            {threats.map((threat, index) => <ThreatItem key={index} threat={threat} isExpanded={expandedIndex === index} onToggle={() => handleToggle(index)} />)}
        </div>
      )}

      <div className="text-center mt-10">
        <button
          onClick={onScanAgain}
          className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-colors duration-200"
        >
          Scan Again
        </button>
      </div>
    </div>
  );
};

export default Results;