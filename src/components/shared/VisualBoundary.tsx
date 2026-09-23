import { Component, type PropsWithChildren } from 'react';

// Optional graphics must never take down the page on devices without WebGL.
export class VisualBoundary extends Component<PropsWithChildren, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
