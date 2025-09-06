// ErrorBoundary.jsx in main-app
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Module Federation Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-xl font-bold text-red-800 mb-2">
            🚨 Error Loading Music Library
          </h2>
          <p className="text-red-600 mb-4">
            There's an issue with the music library module. 
            This is usually due to React version mismatch or network issues.
          </p>
          <div className="bg-gray-100 p-4 rounded text-sm mb-4">
            <code>{this.state.error?.toString()}</code>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;