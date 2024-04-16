import IconButton from "@/components/buttons/IconButton"
import CompressAllIcon from "@/icons/CompressAllIcon"
import CompressHIcon from "@/icons/CompressHIcon"
import ExpandHIcon from "@/icons/ExpandHIcon"
import { drawerCardsSo } from "@/stores/docs/cards"
import { forEachViews } from "@/stores/docs/utils/manage"
import { VIEW_SIZE } from "@/stores/stacks/utils"
import { delay } from "@/utils/time"
import { FunctionComponent, useRef, useState } from "react"
import CardsGroup from "./CardsGroups"
import cls from "./DrawerGroup.module.css"



const DrawerGroup: FunctionComponent = () => {

	// STORES

	// HOOKS
	const [width, setWidth] = useState(0)
	const [animation, setAnimation] = useState(false)
	const isDown = useRef(false)
	const startX = useRef(0)
	const startWidth = useRef(0)
	const lastWidth = useRef(500)

	// HANDLERS
	const handleDown = (e: React.MouseEvent) => {
		isDown.current = true
		startX.current = e.clientX;
		startWidth.current = width;
		const mouseMove = (ev: MouseEvent) => {
			if (!isDown.current) return
			const currentX = ev.clientX;
			const diffX = startX.current - currentX;
			lastWidth.current = startWidth.current + diffX
			setWidth(lastWidth.current)
		}
		const mouseUp = (ev: MouseEvent) => {
			isDown.current = false
			document.removeEventListener('mousemove', mouseMove);
			document.removeEventListener('mouseup', mouseUp);
		}
		document.addEventListener('mousemove', mouseMove);
		document.addEventListener('mouseup', mouseUp);
	}
	const hanldeToggle = async (e: React.MouseEvent) => {
		const w = lastWidth.current < 20 ? 500 : lastWidth.current
		setWidth(width > 0 ? 0 : w)
		setAnimation(true)
		await delay(400)
		setAnimation(false)
	}
	const handleCompressAll = (e: React.MouseEvent) => {
		forEachViews(drawerCardsSo.state.all, view => view.setSize(VIEW_SIZE.COMPACT))
	}

	// RENDER
	return (
		<div className={cls.root} >

			<div className={cls.handle}
				draggable={false}
				onMouseDown={handleDown}
			>
				<IconButton className={cls.btt}
					onClick={hanldeToggle}
				>
					{width > 0 ? <ExpandHIcon /> : <CompressHIcon />}
				</IconButton>
				<IconButton className={cls.btt}
					onClick={handleCompressAll}
				>
					<CompressAllIcon />
				</IconButton>
				<div className="bars-alert-bg-1" draggable={false} style={{ flex: 1 }} />
				<div className={cls.handle_label} draggable={false}>DRAWER</div>
				<div className="bars-alert-bg-1" draggable={false} style={{ flex: 1 }} />
			</div>

			<div
				className={cls.handle_container}
				style={cssFixed(width, animation)}
			>
				<CardsGroup cardsStore={drawerCardsSo} />
			</div>

			{/* <DropArea index={-1} /> */}
		</div>

	)
}

export default DrawerGroup

const cssFixed = (width: number, animation: boolean): React.CSSProperties => ({
	width,
	transition: animation ? "width 300ms" : null,
})