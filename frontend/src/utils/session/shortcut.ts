import { docsSo, FIXED_CARD, focusSo, utils } from "@priolo/jack"
import { DECK_INDEX, deckCardsSo, drawerCardsSo } from "../../stores/docs/cards"
import { LoadSession, SaveSession } from "./startup"




export function shortcutStart() {
	document.addEventListener('keydown', (event) => {
		if (!event.altKey) return
		if (event.code == "AltLeft" || event.code == "AltRight") return
		// if (event.ctrlKey && event.key === 's') {
		// 	event.preventDefault()
		// 	SaveSession()
		// }
 
		if (event.ctrlKey) {
			// if (event.code == "ArrowLeft") {
			// 	const group = docsSo.state.allDeck[DECK_INDEX.MAIN]
			// 	const view = group.state.all[0]
			// 	if (!!view) focusSo.focus(view)
			// 	if (drawerCardsSo.isOpen()) drawerCardsSo.toggle()

			// } else if (event.code == "ArrowRight") {
			// 	const group = docsSo.state.allDeck[DECK_INDEX.DRAWER]
			// 	const view = group.state.all[0]
			// 	if (!!view) focusSo.focus(view)
			// 	if (!drawerCardsSo.isOpen()) drawerCardsSo.toggle()
			// }
			return
		}

		switch (event.code) {

			// OPEN CARD CONNECTIONS
			case 'KeyC': {
				const view = docsSo.state.fixedViews[FIXED_CARD.CONNECTIONS]
				deckCardsSo.add({ view, anim: true }).then(() => focusSo.focus(view))
				break
			}

			// MOVE CARD IN DECK: MAIN / DRAWER
			case "KeyX": {
				const [mainDeck, drawerDeck] = docsSo.state.allDeck
				const view = focusSo.state.view
				const nextFocus = utils.getNear(view) ?? utils.getNear(view, true)
				const group = view.state.group

				if (group == mainDeck) {
					group.move({ view, groupDest: drawerDeck, index: group.state.all.length })
					if (!drawerCardsSo.isOpen()) drawerCardsSo.toggle()
				} else {
					view.state.group.move({ view, groupDest: mainDeck })
				}
				if (!!nextFocus) focusSo.focus(nextFocus);
				break
			}

			// TOGGLE DECK: MAIN / DRAWER
			case "KeyZ": {
				const currentDeck = focusSo.state.view?.state.group
				const [mainDeck, drawerDeck] = docsSo.state.allDeck
				const nextDeck = currentDeck == mainDeck ? drawerDeck : mainDeck
				const nextView = nextDeck.state.all[0]
				if (!!nextView) focusSo.focus(nextView)
				if (nextDeck == drawerDeck && !drawerCardsSo.isOpen()) drawerCardsSo.toggle()
				break
			}
		}
	})
}
