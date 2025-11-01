
import React from 'react';

interface ErrorInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const ErrorInput: React.FC<ErrorInputProps> = ({ value, onChange, onSubmit, isLoading }) => {
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      onSubmit();
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 flex flex-col gap-4">
      <label htmlFor="error-input" className="text-lg font-medium text-gray-300">
        Paste your error message or code snippet below
      </label>
      <textarea
        id="error-input"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={`e.g., TypeError: Cannot read properties of undefined (reading 'map')`}
        className="w-full h-48 p-4 bg-gray-900 border border-gray-600 rounded-md resize-y text-gray-200 font-mono focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
        disabled={isLoading}
      />
      <div className="flex justify-end items-center">
        <span className="text-xs text-gray-500 mr-4">
          {value.length > 0 ? "Press Ctrl+Enter or Cmd+Enter to submit" : ""}
        </span>
        <button
          onClick={onSubmit}
          disabled={isLoading || !value.trim()}
          className="px-6 py-2 bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200 ease-in-out flex items-center justify-center shadow-md disabled:shadow-none"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            'Get Solutions'
          )}
        </button>
      </div>
    </div>
  );
};
