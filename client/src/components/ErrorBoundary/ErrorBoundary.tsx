import * as React from 'react';

interface ErrorBoundaryState {
    error: boolean
}

interface ErrorBoundaryProps {
    children: React.ReactNode
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state = {
        error: false
    };

    componentDidCatch() {
        this.setState({
            error: true
        });
    };

    render() {
        if(this.state.error) {
            return (
                <div>
                    <h3>Something goes wrong!</h3>
                </div>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;