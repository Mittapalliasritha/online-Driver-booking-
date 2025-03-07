import React from 'react';
import { Shield, Lock, FileText } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">PersonalQR</h3>
            <p className="text-gray-400 text-sm">
              Generate professional QR codes containing your personal information and important documents for easy sharing.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Privacy & Security</h3>
            <div className="flex items-start space-x-2 mb-3">
              <Lock size={18} className="text-blue-400 mt-0.5" />
              <p className="text-gray-400 text-sm">
                Your data is never stored on our servers
              </p>
            </div>
            <div className="flex items-start space-x-2 mb-3">
              <Shield size={18} className="text-blue-400 mt-0.5" />
              <p className="text-gray-400 text-sm">
                QR codes are generated locally in your browser
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <FileText size={18} className="text-blue-400 mt-0.5" />
              <p className="text-gray-400 text-sm">
                PDF documents are securely embedded in your QR code
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 text-sm">
              For support or inquiries, please contact us at:
              <br />
              <a href="mailto:support@personalqr.com" className="text-blue-400 hover:underline">
                support@personalqr.com
              </a>
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} PersonalQR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;