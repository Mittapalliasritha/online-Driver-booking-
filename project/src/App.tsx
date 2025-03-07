import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PersonalInfoForm from './components/PersonalInfoForm';
import QRCodeDisplay from './components/QRCodeDisplay';
import { PersonalInfo } from './types';

function App() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (data: PersonalInfo) => {
    setLoading(true);
    // Simulate processing time
    setTimeout(() => {
      setPersonalInfo(data);
      setLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    setPersonalInfo(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {!personalInfo ? (
            <>
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  Generate Your Personal QR Code
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Create a unique QR code containing your personal information and important documents for easy sharing.
                  Your data is processed locally and never stored on our servers.
                </p>
              </div>
              
              <PersonalInfoForm onSubmit={handleSubmit} loading={loading} />
            </>
          ) : (
            <QRCodeDisplay personalInfo={personalInfo} onReset={handleReset} />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;