import Options from "@/components/Options"
import BoxV from "@/components/format/BoxV"
import Form from "@/components/format/Form"
import NumberInput from "@/components/input/NumberInput"
import TextInput from "@/components/input/TextInput"
import { Source } from "@/types/Stream"
import { FunctionComponent } from "react"



interface Props {
	source: Source
	readOnly?: boolean
	allStream?: string[]
	onChange: (source: Source) => void
}

const EditSourceCmp: FunctionComponent<Props> = ({
	source,
	readOnly,
	allStream,
	onChange,
}) => {

	// HOOKS

	// HANDLER
	const handleNameChange = (name: string) => onChange?.({ ...source, name })
	const handleSequenceChange = (startSequence: string) => onChange?.({ ...source, optStartSeq: parseInt(startSequence) })
	//const handleStartTimeChange = (startTime: any) => onChange?.({ ...source, startTime: startTime })
	const handleFilterSubjectChange = (filterSubject: string) => onChange?.({ ...source, filterSubject })

	// RENDER
	if (!source) return null

	return <Form className="var-dialog">
		<BoxV>
			<div className="lbl-prop">NAME</div>
			<Options<string> height={500}
				value={source.name}
				items={allStream}
				RenderRow={({ item }) => item}
				readOnly={readOnly}
				onSelect={handleNameChange}
			/>
		</BoxV>
		<BoxV>
			<div className="lbl-prop">START SEQUENCE</div>
			<NumberInput
				value={source.optStartSeq}
				onChange={handleSequenceChange}
				// variant={variant}
				readOnly={readOnly}
			/>
		</BoxV>
		<BoxV>
			<div className="lbl-prop">FILTER SUBJECT</div>
			<TextInput
				value={source.filterSubject}
				onChange={handleFilterSubjectChange}
				// variant={variant}
				readOnly={readOnly}
			/>
		</BoxV>
	</Form>
}

export default EditSourceCmp
