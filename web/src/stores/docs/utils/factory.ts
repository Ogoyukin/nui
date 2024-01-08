import cnnSetup from "@/stores/stacks/connection/list";
import messagesSetup from "@/stores/stacks/messages";
import messageSetup from "@/stores/stacks/message";
import messageSendSetup from "@/stores/stacks/send";
import servicesSetup from "@/stores/stacks/connection/detail";
import streamsSetup from "@/stores/stacks/streams";
import { DOC_TYPE } from "@/types";
import { createStore } from "@priolo/jon";
import { ViewState, ViewStore } from "../../stacks/viewBase";
import streamSetup from "@/stores/stacks/streams/detail";



/** restituisce un identificativo sringa di una VIEW STORE */
export function getID(viewState: ViewState): string {
	if (!viewState.type && viewState.uuid) return viewState.uuid
	return `${viewState.type}${viewState.uuid ? `-${viewState.uuid}` : ""}`
}

/** da un identificativo stringa restituisce una VIEW STATE parziale */
export function fromID(str: string): ViewState {
	const index = str.indexOf("-")
	if (index == -1) return { type: str as DOC_TYPE}
	const type = str.slice(0, index) as DOC_TYPE
	const uuid = str.slice(index + 1)
	return { type, uuid }
}

/** genera un uuid per un DOC */
export function createUUID(): string {
	var dt = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
		/[xy]/g,
		(c) => {
			let r = (dt + (Math.random() * 16)) % 16 | 0;
			dt = Math.floor(dt / 16);
			return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		}
	)
	return uuid;
}

/** crea lo STORE adeguato */
export function buildStore(state: Partial<ViewState>): ViewStore {
	const setup = {
		[DOC_TYPE.CONNECTIONS]: cnnSetup,
		[DOC_TYPE.CONNECTION]: servicesSetup,
		[DOC_TYPE.MESSAGES]: messagesSetup,
		[DOC_TYPE.MESSAGE]: messageSetup,
		[DOC_TYPE.MESSAGE_SEND]: messageSendSetup,
		[DOC_TYPE.STREAMS]: streamsSetup,
		[DOC_TYPE.STREAM]: streamSetup,
		[DOC_TYPE.STREAM2]: streamSetup,
	}[state.type]
	if (!setup) return
	const store: ViewStore = <ViewStore>createStore(setup)
	store.state = { ...store.state, ...state }
	// se non c'e' l'uuid lo creo IO!
	if ( store.state.uuid == null ) store.state.uuid = createUUID()
	store.onCreate()
	return store
}
