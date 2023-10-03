import { ReactNode, Component } from 'react';

type Props = {
  children: ReactNode;
  fallback: React.ComponentType<{ error: Error }>;
};

type State = {
  error: Error | null;
};

export class GenericErrorBoundary extends Component<Props, State> {
  state: State = {
    error: null,
  };

  render() {
    if (this.state.error) {
      return <this.props.fallback error={this.state.error} />;
    }

    return <>{this.props.children}</>;
  }

  static getDerivedStateFromError(error: Error) {
    return { error: error };
  }
}
