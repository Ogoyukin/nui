import { DOC_TYPE, Entity, POSITION_TYPE } from "@/types/Doc"
import { PARAM_KEY, docsFromString, stringFromDocs } from ".."


describe("docsFromString", () => {
	it("ricavo dei Doc da una stringa", () => {
		const doc1 = `${DOC_TYPE.CONNECTIONS}-uuid123.value1_str1.${PARAM_KEY.POSITION}_${POSITION_TYPE.DETACHED}`
		const doc2 = `${DOC_TYPE.EMPTY}.${PARAM_KEY.POSITION}_${POSITION_TYPE.LINKED}`
		const doc3 = `${DOC_TYPE.EMPTY}`
		const docs = `${doc1}~${doc2}~${doc3}`
		const result = docsFromString(docs)
		const expected = [
  			{ uuid: "uuid123", type: "cns", position: "dtc" },
  			{ uuid: undefined, type: "emp", position: "lnk" },
  			{ uuid: undefined, type: "emp", },
		]
		expect(result).toStrictEqual(expected)
	})
	it("caso null", () => {
		const result = docsFromString(null)
		expect(result).toHaveLength(0)
	})
})

describe("stringFromDocs", () => {
	it("ricavo dei Doc da una stringa", () => {
		const docs:Entity[] = [
			{ type: DOC_TYPE.EMPTY },
			{ type: DOC_TYPE.CONNECTIONS, uuid: "c1", position: POSITION_TYPE.DETACHED },
			{ type: DOC_TYPE.CONNECTIONS, uuid: "c2", position: POSITION_TYPE.LINKED },
			{ type: DOC_TYPE.CONNECTIONS, uuid: "c3", position: POSITION_TYPE.DETACHED },
		]
		const expected = 'emp~cns-c1.dtc~cns-c2.lnk~cns-c3.dtc'
		const result = stringFromDocs(docs)
		expect(result).toBe(expected)
	})
})

