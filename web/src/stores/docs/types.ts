
export enum DOC_TYPE {
	EMPTY = "emp",
	CONNECTIONS = "cns",
	CONNECTION = "srv",
	MESSAGES = "msgs",
	MESSAGE = "msgdtl",
	MESSAGE_SEND = "msgsnd",
	STREAMS = "strs",
	STREAM = "str",
	STREAM2 = "str2",
}

export enum POSITION_TYPE {
	LINKED = "lnk",
	DETACHED = "dtc"
}

export enum DOC_ANIM {
	SHOW="show",
	EXIT="exit",
	DRAGGING="dragging",
	EXITING="exiting",
	SHOWING="showing",
}

export const ANIM_TIME = 200
export const ANIM_TIME_CSS = 200