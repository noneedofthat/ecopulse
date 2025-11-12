import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4">
          <div className="max-w-md w-full text-center">
            <span className="material-icons text-6xl text-red-500 mb-4">error_outline</span>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We're sorry for the inconvenience. Please try reloading the page.
            </p>
            {this.state.error && (
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-6 font-mono">
                {this.state.error.toString()}
              </p>
            )}
            <button
              onClick={this.handleReload}
              className="px-6 py-3 bg-eco-primary hover:bg-eco-secondary text-white rounded-md transition-colors font-medium"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
