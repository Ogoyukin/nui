import ajax, { CallOptions } from "@/plugins/AjaxService"
import { Connection } from "@/types/Connection"


/** INDEX
 * Recupera tutte le CONNECTION
 */
function index(opt?: CallOptions): Promise<Connection[]> {
	return ajax.get(`connection`, null, opt)
}

/** UPDATE
 * Modifica/crea un CONNECTION
 */
function save(cnn: Connection, opt?: CallOptions): Promise<Connection> {
	const blockId = cnn.id ? `/${cnn.id}` : ""
	return ajax.post(`connection${blockId}`, cnn, opt)
}

/** DELETE
 * Rimuove un CONNECTION 
 */
function remove(id: string, opt?: CallOptions): Promise<void> {
	if (!id) return
	return ajax.delete(`connection/${id}`, null, opt)
}


/** PUBLISH
 * permette di pubblicare un messaggio
 */
function publish(cnnId:string, subject:string, payload:string, opt?: CallOptions) {
	const data = {
		subject,
		payload : btoa(payload)
	}
	return ajax.post(`connection/${cnnId}/publish`, data, opt)
}

const api = {
	index,
	remove,
	save,
	publish,
}
export default api