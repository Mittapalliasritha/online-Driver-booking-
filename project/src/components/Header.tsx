import React from 'react';
import { QrCode } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <QrCode size={32} className="text-white" />
            <h1 className="text-2xl font-bold">PersonalQR</h1>
          </div>
          <div className="text-sm md:text-base">
            <span className="hidden md:inline">Professional QR Code Generator</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;