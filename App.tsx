
import React, { useState, useCallback, useEffect } from 'react';
import { generateThreats } from './services/geminiService';
import type { Threat, ScanState, ScanHistoryItem } from './types';
import { ShieldCheckIcon } from './components/icons';
import Scanner from './components/Scanner';
import Results from './components/Results';
import History from './components/History';

const App: React.FC = () => {
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [threats, setThreats] = useState<Threat[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('otxScanHistory');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (e) {
      console.error("Failed to load scan history:", e);
      localStorage.removeItem('otxScanHistory');
    }
  }, []);

  const handleStartScan = useCallback(async () => {
    setScanState('scanning');
    setError(null);
    setThreats([]);
    try {
      const result = await generateThreats();
      setThreats(result);
      setScanState('complete');

      // Add to history
      const newHistoryItem: ScanHistoryItem = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        threatCount: result.length,
        threats: result,
      };

      setHistory(prevHistory => {
        const updatedHistory = [newHistoryItem, ...prevHistory].slice(0, 10); // Keep last 10 scans
        localStorage.setItem('otxScanHistory', JSON.stringify(updatedHistory));
        return updatedHistory;
      });

    } catch (err) {
      console.error('Error generating threats:', err);
      setError('An error occurred while scanning. Please check the console for details and try again.');
      setScanState('error');
    }
  }, []);

  const handleScanAgain = () => {
    setScanState('idle');
    setThreats([]);
    setError(null);
  };
  
  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('otxScanHistory');
  };

  const renderContent = () => {
    switch (scanState) {
      case 'scanning':
        return <Scanner />;
      case 'complete':
      case 'error':
        return <Results threats={threats} error={error} onScanAgain={handleScanAgain} />;
      case 'idle':
      default:
        return (
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-100">OTX Endpoint Security™</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
              คือบริการสแกนภัยคุกคามฟรีใน OTX ช่วยให้คุณระบุมัลแวร์และภัยคุกคามอื่นๆ ได้อย่างรวดเร็วด้วยการสแกนอุปกรณ์ปลายทางของคุณเพื่อค้นหา IOC ที่บันทึกไว้ใน OTX เริ่มต้นใช้งานได้ฟรีและง่ายดาย
            </p>
            <div className="mt-10">
              <button
                onClick={handleStartScan}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-xl inline-flex items-center transition-transform transform hover:scale-105 duration-300 shadow-lg shadow-blue-500/30"
              >
                <ShieldCheckIcon className="w-7 h-7 mr-3" />
                Scan Endpoint Now
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl shadow-slate-950/50 p-6 sm:p-10">
          {renderContent()}
        </div>

        {history.length > 0 && (
          <History history={history} onClearHistory={handleClearHistory} />
        )}
        
        <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>OTX Endpoint Security Scanner | Powered by Gemini API</p>
          <p className="mt-1">This is a simulation. No actual files are scanned on your device.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
