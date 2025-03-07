import React, { useState } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { File, X, Upload, FileText } from 'lucide-react';
import { PersonalInfo, DocumentFile } from '../types';

interface DocumentUploaderProps {
  form: UseFormReturn<Omit<PersonalInfo, 'id' | 'createdAt'>>;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({ form }) => {
  const [isUploading, setIsUploading] = useState(false);
  const { control, watch } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'documents',
  });

  const documents = watch('documents') || [];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Check if file is a PDF
        if (file.type !== 'application/pdf') {
          alert('Only PDF files are supported');
          continue;
        }
        
        // Check file size (limit to 2MB)
        if (file.size > 2 * 1024 * 1024) {
          alert(`File ${file.name} is too large. Maximum size is 2MB.`);
          continue;
        }
        
        // Convert file to base64
        const base64 = await convertFileToBase64(file);
        
        // Add to form
        const newDocument: DocumentFile = {
          id: uuidv4(),
          name: file.name,
          type: file.type,
          data: base64,
          createdAt: new Date()
        };
        
        append(newDocument);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
      // Reset input value to allow uploading the same file again
      event.target.value = '';
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Document Upload</h2>
      <p className="text-gray-600 mb-4">
        Upload your Aadhaar card, SSC certificate, or other important documents (PDF format only, max 2MB each).
      </p>
      
      <div className="mb-6">
        <label 
          htmlFor="document-upload" 
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer 
            ${isUploading ? 'bg-gray-100 border-gray-400' : 'hover:bg-gray-50 border-gray-300'}`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload size={24} className="text-gray-500 mb-2" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PDF only (MAX. 2MB)</p>
          </div>
          <input 
            id="document-upload" 
            type="file" 
            className="hidden" 
            accept="application/pdf" 
            onChange={handleFileUpload}
            disabled={isUploading}
            multiple
          />
        </label>
      </div>
      
      {fields.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-md font-medium text-gray-700">Uploaded Documents</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div className="flex items-center space-x-3">
                <FileText size={20} className="text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                    {documents[index]?.name || 'Document'}
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF • {new Date(documents[index]?.createdAt || Date.now()).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentUploader;