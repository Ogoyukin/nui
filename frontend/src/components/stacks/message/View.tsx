import CopyButton from "@/components/buttons/CopyButton"
import FrameworkCard from "@/components/cards/FrameworkCard"
import MyEditor from "@/components/editor"
import FormatAction from "@/components/editor/FormatAction"
import Form from "@/components/format/Form"
import { MessageState, MessageStore } from "@/stores/stacks/message"
import { dateShow } from "@/utils/time"
import { useStore } from "@priolo/jon"
import { FunctionComponent } from "react"
import FormatDialog from "../../editor/FormatDialog"
import cls from "./View.module.css"


interface Props {
	store?: MessageStore
}

/** dettaglio di un messaggio */
const MessageView: FunctionComponent<Props> = ({
	store: msgSo,
}) => {

	// STORE
	const msgSa = useStore(msgSo) as MessageState

	// HOOKs

	// HANDLER

	// RENDER
	const timestamp = dateShow(msgSa.message.receivedAt)

	return <FrameworkCard
		store={msgSo}
		actionsRender={<>
			<FormatAction store={msgSo} />
		</>}
	>
		<Form className={cls.form}>
			<div className="hover-container">
				<CopyButton absolute value={msgSa.message.subject} />
				<span className="lbl-prop">SUBJECT: </span>
				<span className="lbl-input-readonly">
					{msgSa.message.subject}
				</span>
			</div>

			<MyEditor autoFormat readOnly
				ref={ref => msgSa.editorRef = ref}
				format={msgSa.format}
				value={msgSo.getEditorText()}
			/>

			<div className={cls.timestamp}>{timestamp}</div>
		</Form>

		<FormatDialog store={msgSo} />

	</FrameworkCard>
}

export default MessageView
