import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

const Loading = () => {
	return (
		<div className="fixed w-full min-h-screen top-0 left-0 flex align-center justify-center bg-white/75">
			<RotatingLines
				strokeColor="grey"
				strokeWidth="5"
				animationDuration="0.75"
				width="96"
				visible={true}
			/>
		</div>
	)
}

export default Loading
