import React, { Component, ReactNode } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (

        <div className="text-center py-10">
          <DotLottieReact
      src="https://lottie.host/ec2b0ba7-8575-41d8-b702-972d3a6e5544/Dl6ViFEJSo.lottie"
      loop
      autoplay
    />
          <h1 className="text-2xl font-bold text-red-600">Something went wrong.</h1>
          <p>Please try refreshing the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}