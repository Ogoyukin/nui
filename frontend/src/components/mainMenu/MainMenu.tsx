import docSo from "@/stores/docs"
import { DOC_TYPE } from "@/stores/docs/types"
import { dbLoad, dbSave } from "@/stores/docs/utils/db"
import { buildStore } from "@/stores/docs/utils/factory"
import { COLOR_VAR } from "@/stores/layout"
import { useStore } from "@priolo/jon"
import React, { FunctionComponent } from "react"
import IconRow from "../rows/IconRow"
import StoreIcon from "./StoreIcon"
import CircularIndicatorCmp from "../CircularIndicatorCmp"
import TimerCmp, { TIMER_STATE } from "../TimerCmp"



interface Props {
	style?: React.CSSProperties
}

const MainMenu: FunctionComponent<Props> = ({
	style,
}) => {

	// STORE
	const docSa = useStore(docSo)

	// HOOKS

	// HANDLERS
	const handleConnectionsClick = () => {
		// se c'e' gia' una singletone-card allora setto solo il fuoco
		if (!!docSo.find({ type: DOC_TYPE.CONNECTIONS })) return
		const view = buildStore({ type: DOC_TYPE.CONNECTIONS })
		docSo.add({ view, anim: true })
	}
	const handleLogsClick = () => {
		let view = docSo.find({ type: DOC_TYPE.LOGS })
		if (!!view) {
			docSo.remove({ view, anim: true })
		} else {
			view = buildStore({ type: DOC_TYPE.LOGS })
			docSo.add({ view, anim: true })
		}
	}
	const handleSave = async () => {
		const states = docSo.state.all.map(store => store.getSerialization())
		await dbSave(states)
	}
	const handleLoad = async () => {
		const states = await dbLoad()
		const stores = states.map(state => {
			const store = buildStore({ type: state.type })
			store.setSerialization(state)
			return store
		})
		docSo.setAll(stores)
	}
	const handleTimeout = () => console.log("timeout")

	// RENDER
	const stores = docSa.menu

	return <div style={{ ...cssContainer, ...style }}>
		<IconRow onClick={handleConnectionsClick}
			title="CONNECTIONS"
			variant={COLOR_VAR.GREEN}
			selected
		/>
		{/* <button onClick={handleLoad}>LOAD</button>
		<button onClick={handleSave}>SAVE</button> */}
		{stores.map((store) => (
			<StoreIcon key={store.state.uuid} store={store} />
		))}
		<div style={{ flex: 1 }} />
		<IconRow onClick={handleLogsClick}
			title="LOGS"
			variant={COLOR_VAR.CYAN}
			selected
		/>
	</div>
}

export default MainMenu

const cssContainer: React.CSSProperties = {
	display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
	backgroundColor: "#494949",
	padding: "10px",
}