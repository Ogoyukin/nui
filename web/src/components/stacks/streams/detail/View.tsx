import FrameworkCard from "@/components/FrameworkCard"
import { StreamStore } from "@/stores/stacks/streams/detail"
import { useStore } from "@priolo/jon"
import { FunctionComponent, useEffect } from "react"
import ActionsCmp from "./ActionsCmp"
import ConfigForm from "./ConfigForm"
import MainForm from "./MainForm"
import RowButton from "@/components/buttons/RowButton"
import MessagesIcon from "@/icons/MessagesIcon"



interface Props {
	store?: StreamStore
}

const StreamDetailView: FunctionComponent<Props> = ({
	store: streamSo,
}) => {

	// STORE
	const streamSa = useStore(streamSo)

	// HOOKs
	useEffect(() => {
		streamSo.updateAllStreams()
	}, [])

	// HANDLER
	const handleConsumersClick = () => streamSo.openConsumers()

	// RENDER
	const readOnly = streamSa.readOnly
	const variant = streamSa.colorVar
	const isConsumerSelect = !!streamSa.linked

	return <FrameworkCard
		variantBg={variant}
		store={streamSo}
		actionsRender={<ActionsCmp store={streamSo} />}
	>
		{readOnly ? (<>
			<div style={{ marginBottom: 20 }}>
				<RowButton
					icon={<MessagesIcon />}
					label="CONSUMER"
					variant={variant}
					select={isConsumerSelect}
					onClick={handleConsumersClick}
				/>
			</div>
			<MainForm store={streamSo} />
		</>) : (
			<ConfigForm store={streamSo} />
		)}
	</FrameworkCard>
}

export default StreamDetailView
