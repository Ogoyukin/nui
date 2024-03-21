import FrameworkCard from "@/components/cards/FrameworkCard"
import BoxV from "@/components/format/BoxV"
import LinkButton from "@/components/buttons/LinkButton"
import RowButton from "@/components/rows/RowButton"
import KvEntriesIcon from "@/icons/cards/KvEntriesIcon"
import docSo from "@/stores/docs"
import { BucketStore } from "@/stores/stacks/buckets/detail"
import { DOC_TYPE, EDIT_STATE } from "@/types"
import { useStore } from "@priolo/jon"
import { FunctionComponent, useEffect } from "react"
import ActionsCmp from "./Actions"
import CreateForm from "./CreateForm"
import ShowForm from "./ShowForm"



interface Props {
	store?: BucketStore
}

const BucketDetailView: FunctionComponent<Props> = ({
	store: bucketSo,
}) => {

	// STORE
	const bucketSa = useStore(bucketSo)
	useStore(docSo)

	// HOOKs
	useEffect(() => {
		bucketSo.fetch()
	}, [])

	// HANDLER
	const handleKVEntriesClick = () => bucketSo.openKVEntries()

	// RENDER
	const inRead = bucketSa.editState == EDIT_STATE.READ
	const isKVEntriesSelect = bucketSa.linked?.state.type == DOC_TYPE.KVENTRIES

	return <FrameworkCard variantBg
		store={bucketSo}
		actionsRender={<ActionsCmp store={bucketSo} />}
		iconizedRender={
			<BoxV style={{ marginTop: 10 }}>
				<LinkButton
					icon={<KvEntriesIcon />}
					tooltip="KVENTRIES"
					selected={isKVEntriesSelect}
					onClick={handleKVEntriesClick}
				/>
			</BoxV>
		}
	>
		{inRead ? (<>
			<RowButton
				icon={<KvEntriesIcon />}
				label="KVENTRIES"
				selected={isKVEntriesSelect}
				onClick={handleKVEntriesClick}
			/>
			<ShowForm store={bucketSo} />
		</>) : (
			<CreateForm store={bucketSo} />
		)}
	</FrameworkCard>
}

export default BucketDetailView
