import { FunctionComponent, useState } from "react"



interface Props {
	style?: React.CSSProperties
	preRender?: React.ReactNode
	enterRender?: React.ReactNode
	children?: React.ReactNode
}

const Box: FunctionComponent<Props> = ({
	style,
	preRender,
	enterRender,
	children,
}) => {
	// STORE

	// HOOK
	const [enter, setEnter] = useState(false)

	// HANDLER
	const handleEnter = () => setEnter(true)
	const handleLeave = () => setEnter(false)

	// RENDER
	return (
		<div
			style={{ ...cssRoot, ...style }}
			onMouseEnter={enterRender ? handleEnter : null}
			onMouseLeave={enterRender ? handleLeave : null}
		>
			{preRender}
			{children}
			{enter && <div style={{ position: "absolute", top: 0, right: 0 }}>
				{enterRender}
			</div>}
		</div>
	)
}

export default Box

const cssRoot:React.CSSProperties = {
	display: "flex", 
	flex: 1,
	alignItems: "center", 
	position: "relative",
	gap: 5,
}
