import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { saveAs } from 'file-saver';
import { ChevronLeft, ChevronRight, Download, X } from 'lucide-react';
import { DocumentFile } from '../types';

// Set up the worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface DocumentViewerProps {
  document: DocumentFile;
  onClose: () => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ document, onClose }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => {
      const newPageNumber = prevPageNumber + offset;
      return Math.min(Math.max(1, newPageNumber), numPages || 1);
    });
  };

  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(1);

  const downloadDocument = () => {
    // Convert base64 to blob
    const byteString = atob(document.data.split(',')[1]);
    const mimeString = document.data.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    
    const blob = new Blob([ab], { type: mimeString });
    saveAs(blob, document.name);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800 truncate max-w-md">
            {document.name}
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={downloadDocument}
              className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100"
              title="Download document"
            >
              <Download size={20} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-gray-100"
              title="Close viewer"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="flex-grow overflow-auto p-4 flex items-center justify-center bg-gray-100">
          {loading && (
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading document...</p>
            </div>
          )}
          
          <Document
            file={document.data}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading document...</p>
              </div>
            }
            error={
              <div className="text-center text-red-600">
                <p className="font-semibold">Failed to load PDF document</p>
                <p className="text-sm mt-2">The document may be corrupted or in an unsupported format.</p>
              </div>
            }
          >
            <Page 
              pageNumber={pageNumber} 
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="shadow-md"
              scale={1.2}
            />
          </Document>
        </div>
        
        {numPages && numPages > 1 && (
          <div className="p-4 border-t flex items-center justify-between">
            <button
              onClick={previousPage}
              disabled={pageNumber <= 1}
              className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            
            <p className="text-gray-700">
              Page {pageNumber} of {numPages}
            </p>
            
            <button
              onClick={nextPage}
              disabled={pageNumber >= numPages}
              className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentViewer;