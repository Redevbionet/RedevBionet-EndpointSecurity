
import React from 'react';
import { SyncIcon, ShieldCheckIcon, PuzzlePieceIcon, CodeBracketIcon, JavaIcon, PythonIcon } from './components/Icons';

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface SDK {
    icon: React.ReactNode;
    name: string;
    description: string;
}

export const FEATURES: Feature[] = [
  {
    icon: <SyncIcon />,
    title: 'ซิงโครไนซ์ Threat Intelligence',
    description: 'OTX DirectConnect API ช่วยให้คุณสามารถซิงโครไนซ์ Threat Intelligence ที่มีอยู่ใน OTX กับเครื่องมือที่คุณใช้ตรวจสอบสภาพแวดล้อมของคุณได้อย่างง่ายดาย',
  },
  {
    icon: <ShieldCheckIcon />,
    title: 'ตรวจจับภัยคุกคามเชิงรุก',
    description: 'การใช้เอเจนต์ DirectConnect ช่วยให้คุณสามารถผสานรวมกับโครงสร้างพื้นฐานของคุณเพื่อตรวจจับภัยคุกคามที่กำหนดเป้าหมายสภาพแวดล้อมของคุณ',
  },
  {
    icon: <PuzzlePieceIcon />,
    title: 'สร้าง Integration ของคุณเอง',
    description: 'หากไม่มีเอเจนต์ที่สร้างไว้ล่วงหน้าสำหรับผลิตภัณฑ์ของคุณ ให้ใช้ DirectConnect SDK เพื่อพัฒนาระบบผสานรวมของคุณเองสำหรับชุมชน',
  },
];


export const SDKs = {
    title: "DirectConnect SDK",
    description: "หากไม่มีเอเจนต์ที่สร้างไว้ล่วงหน้าสำหรับผลิตภัณฑ์ที่คุณใช้อยู่ ให้ใช้ DirectConnect SDK เพื่อพัฒนาระบบผสานรวมของคุณเองสำหรับชุมชน",
    icon: <CodeBracketIcon />,
    languages: [
        {
            icon: <JavaIcon />,
            name: "Java",
            description: "พัฒนา Integration ที่แข็งแกร่งและขยายได้สำหรับแพลตฟอร์ม JVM"
        },
        {
            icon: <PythonIcon />,
            name: "Python",
            description: "สร้างสคริปต์และระบบอัตโนมัติที่รวดเร็วเพื่อเชื่อมต่อกับ OTX"
        }
    ]
}
