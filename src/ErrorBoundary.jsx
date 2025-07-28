import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    alert(`Произошла ошибка: ${error.message}`);
    // optionally log error to a backend
  }

  render() {
    if (this.state.hasError) {
      return <h1>Произошла непредвиденная ошибка.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
