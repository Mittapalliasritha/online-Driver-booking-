import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Share2, FileText } from 'lucide-react';
import { PersonalInfo, DocumentFile } from '../types';
import DocumentViewer from './DocumentViewer';

interface QRCodeDisplayProps {
  personalInfo: PersonalInfo;
  onReset: () => void;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ personalInfo, onReset }) => {
  const [selectedDocument, setSelectedDocument] = useState<DocumentFile | null>(null);
  const qrValue = JSON.stringify(personalInfo);
  
  const downloadQRCode = () => {
    const canvas = document.getElementById('qr-code-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `${personalInfo.firstName}-${personalInfo.lastName}-qrcode.png`;
    link.href = url;
    link.click();
  };

  const shareQRCode = async () => {
    const canvas = document.getElementById('qr-code-canvas') as HTMLCanvasElement;
    if (!canvas || !navigator.share) return;
    
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      
      try {
        await navigator.share({
          title: `${personalInfo.firstName} ${personalInfo.lastName} - QR Code`,
          files: [new File([blob], `${personalInfo.firstName}-${personalInfo.lastName}-qrcode.png`, { type: 'image/png' })],
        });
      } catch (error) {
        console.error('Error sharing QR code:', error);
      }
    });
  };

  const openDocument = (document: DocumentFile) => {
    setSelectedDocument(document);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your QR Code is Ready!</h2>
        <p className="text-gray-600 mt-2">
          This QR code contains all your personal information and documents
        </p>
      </div>

      <div className="flex flex-col items-center justify-center mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <QRCodeSVG
            id="qr-code-canvas"
            value={qrValue}
            size={250}
            level="H"
            includeMargin={true}
          />
        </div>

        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">{personalInfo.firstName} {personalInfo.lastName}</h3>
          <p className="text-gray-600">{personalInfo.email}</p>
          {personalInfo.company && (
            <p className="text-gray-600">{personalInfo.company}</p>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            onClick={downloadQRCode}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Download size={18} className="mr-2" />
            Download
          </button>
          
          <button
            onClick={shareQRCode}
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <Share2 size={18} className="mr-2" />
            Share
          </button>
        </div>
      </div>

      {personalInfo.documents && personalInfo.documents.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Attached Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {personalInfo.documents.map((doc) => (
              <div 
                key={doc.id} 
                className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                onClick={() => openDocument(doc)}
              >
                <FileText size={24} className="text-blue-600 mr-3" />
                <div className="overflow-hidden">
                  <p className="font-medium text-gray-800 truncate">{doc.name}</p>
                  <p className="text-sm text-gray-500">
                    PDF • {new Date(doc.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-gray-200 pt-6">
        <button
          onClick={onReset}
          className="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Generate Another QR Code
        </button>
      </div>

      {selectedDocument && (
        <DocumentViewer 
          document={selectedDocument} 
          onClose={() => setSelectedDocument(null)} 
        />
      )}
    </div>
  );
};

export default QRCodeDisplay;