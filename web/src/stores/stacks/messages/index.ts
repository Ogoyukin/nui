import docSetup, { ViewStore } from "@/stores/docs/viewBase"
import { StoreCore } from "@priolo/jon"
import { ViewState } from "../../docs/viewBase"
import { mixStores } from "@priolo/jon"
import ss from "@/plugins/SocketService"



export enum PARAMS_MESSAGES { 
	CONNECTION_ID = "cid"
}

const setup = {

	state: {
		params: {
			[PARAMS_MESSAGES.CONNECTION_ID]: <string[]>null
		}
	},

	getters: {
	},

	actions: {
		connect ( _:void, store?:MessagesStore ) {
			ss.send({
				type: "mock", 
				cmm: "connections:subscribe", 
				cnnId: store.state.params[PARAMS_MESSAGES.CONNECTION_ID],
				subjects: [],
			})
		},
		disconnect( _:void, store?:MessagesStore ) {
			ss.send({
				type: "mock", 
				cmm: "connections:subscribe", 
				cnnId: store.state.params[PARAMS_MESSAGES.CONNECTION_ID],
				subjects: [],
			})
		}
	},

	mutators: {
	},
}

export type MessagesState = typeof setup.state & ViewState
export type MessagesGetters = typeof setup.getters
export type MessagesActions = typeof setup.actions
export type MEssagesMutators = typeof setup.mutators
export interface MessagesStore extends ViewStore, StoreCore<MessagesState>, MessagesGetters, MessagesActions, MEssagesMutators {
	state: MessagesState
}
const msgSetup = mixStores(docSetup, setup)
export default msgSetup
