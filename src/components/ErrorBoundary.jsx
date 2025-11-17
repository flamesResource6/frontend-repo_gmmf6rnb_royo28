import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // Optional: log to monitoring
    // console.error('3D Error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center text-white/70 p-6 text-center">
          <div>
            <p>Die 3D-Ansicht konnte nicht geladen werden.</p>
            <p className="text-white/50 text-sm mt-2">Bitte wechsle zur leichten Ansicht oder lade die Seite neu.</p>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
