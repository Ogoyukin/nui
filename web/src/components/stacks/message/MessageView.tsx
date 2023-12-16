import imgMsg from "@/assets/mg-hdr.svg"
import Header from "@/components/Header"
import { MessageState, MessageStore } from "@/stores/stacks/message"
import { useStore } from "@priolo/jon"
import React, { FunctionComponent, useEffect, useMemo, useRef, useState } from "react"
import JsonCmp from "../messages/JsonCmp"
import JsonCmp2 from "../messages/JsonCmp2"
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';


interface Props {
	store?: MessageStore
	style?: React.CSSProperties,
}

const MessageView: FunctionComponent<Props> = ({
	store: msgSo,
	style,
}) => {

	// STORES
	const msgSa = useStore(msgSo)

	// HOOKs
	const ref = useRef(null)

	// ricavo l'html dal testo in base al linguaggio usato
	useEffect(() => {
		if (!ref.current) return
		//monaco.editor.setTheme('vs-dark');
		monaco.editor.colorizeElement(ref.current, {
			theme: "vs-dark",
			mimeType: "javascript",
		})
	}, [])

	// HANDLER

	// RENDER
	const text = msgSa.message?.json ?? ""
	return (
		<div style={{ ...cssContainer, ...style }}>
			<Header view={msgSo} icon={<img src={imgMsg} />} />

			<pre ref={ref} style={{ width: "100vw" }} data-lang="javascript">
				{JSON.stringify({ name: 'Mario Rossi', age: 30, city: 'Roma' }, null, 2)}
			</pre>
		</div>
	)
}

export default MessageView

const cssContainer: React.CSSProperties = {
	position: "relative",
	flex: 1,
	display: "flex",
	flexDirection: "column",
	height: "100%",
	width: "300px",
}
