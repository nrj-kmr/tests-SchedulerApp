import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      console.log(this);
      return (
        <div className='min-h-screen bg-gray-600 flex flex-col items-center justify-center'>
          <h1 className='text-2xl text-white'>Something went wrong.</h1>
          <button onClick={() => window.location.reload()} className='mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800'>Reload Page</button>
        </div>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;