
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ErrorInput } from './components/ErrorInput';
import { SolutionOutput } from './components/SolutionOutput';
import { getSolutionsForError } from './services/geminiService';

const App: React.FC = () => {
  const [errorCode, setErrorCode] = useState<string>('');
  const [solutions, setSolutions] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    if (!errorCode.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setSolutions('');

    try {
      const result = await getSolutionsForError(errorCode);
      setSolutions(result);
    } catch (err) {
      setError('Failed to get solutions. Please check your connection or API key and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [errorCode, isLoading]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-4xl flex flex-col gap-8">
          <ErrorInput
            value={errorCode}
            onChange={(e) => setErrorCode(e.target.value)}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          <SolutionOutput
            solutions={solutions}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>Powered by Gemini API</p>
      </footer>
    </div>
  );
};

export default App;
