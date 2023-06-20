import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
	children?: ReactNode
}

interface State {
	hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
	}
	constructor(props: Props) {
		super(props)

		// Define a state variable to track whether is an error or not
		this.state = { hasError: false }
	}
	static getDerivedStateFromError(error: Error): State {
		// Update state so the next render will show the fallback UI

		return { hasError: true }
	}
	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// You can use your own error logging service here
		console.log({ error, errorInfo })
	}
	render() {
		// Check if the error is thrown
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<div className="flex w-100 min-h-screen align-center justify-center flex-col text-center">
					<h2>Oops, there is an error!</h2>
					<button
						type="button"
						onClick={() => this.setState({ hasError: false })}
					>
						Try again?
					</button>
				</div>
			)
		}

		// Return children components in case of no error

		return this.props.children
	}
}

export default ErrorBoundary
