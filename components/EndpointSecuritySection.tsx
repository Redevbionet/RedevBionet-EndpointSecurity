
import React from 'react';
import { EndpointIcon } from './Icons';

const EndpointSecuritySection: React.FC = () => {
  return (
    <section className="bg-slate-800/50 p-8 rounded-lg border border-slate-700 mb-20">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-shrink-0 text-cyan-400 mx-auto md:mx-0">
          <EndpointIcon />
        </div>
        <div className="flex-grow text-center md:text-left">
          <h2 className="text-3xl font-bold mb-3 text-slate-100">
            OTX Endpoint Security™
          </h2>
          <p className="text-slate-400 mb-6 max-w-2xl mx-auto md:mx-0">
            คือบริการสแกนภัยคุกคามฟรีใน OTX ช่วยให้คุณระบุมัลแวร์และภัยคุกคามอื่นๆ ได้อย่างรวดเร็วด้วยการสแกนอุปกรณ์ปลายทางของคุณเพื่อค้นหา IOC ที่บันทึกไว้ใน OTX เริ่มต้นใช้งานได้ฟรีและง่ายดาย
          </p>
          <a href="#" className="inline-block bg-cyan-500 text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40">
            เริ่มต้นใช้งานฟรี
          </a>
        </div>
      </div>
    </section>
  );
};

export default EndpointSecuritySection;
