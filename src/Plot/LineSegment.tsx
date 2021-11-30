import { action } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useRef } from 'react'
import Draggable, { DraggableData } from 'react-draggable'
import { Line } from 'react-lineto'
import {LineSegmentData} from './LineSegmentData'
import styles from './Plot.module.css'
import PlotState from './PlotState'

type Props = {
    data: LineSegmentData
    state: PlotState
}

// отрисовка отрезка
const LineSegment = ({ data, state }: Props) => {
    const x0 = state.xToPx(data[0].x)
    const y0 = state.yToPx(data[0].y)
    const x1 = state.xToPx(data[1].x)
    const y1 = state.yToPx(data[1].y)

    const dragHandler = useRef(
        action((index: 0 | 1, newX: number, newY: number) => {
            data[index].x = state.pxToX(newX)
            data[index].y = state.pxToY(newY)
        })
    ).current

    const dragHandler0 = useRef((_: unknown, data: DraggableData) =>
        dragHandler(0, data.lastX, data.lastY)
    ).current
    const dragHandler1 = useRef((_: unknown, data: DraggableData) =>
        dragHandler(1, data.lastX, data.lastY)
    ).current

    // первые два draggable - перетаскиваемые точки
    // line - линия между ними
    return (
        <>
            <Draggable
                defaultPosition={{ x: x0, y: y0 }}
                position={{ x: x0, y: y0 }}
                onDrag={dragHandler0}
                onStop={dragHandler0}
            >
                <div className={styles.lineSegmentPoint} />
            </Draggable>
            <Draggable
                defaultPosition={{ x: x1, y: y1 }}
                position={{ x: x1, y: y1 }}
                onDrag={dragHandler1}
                onStop={dragHandler1}
            >
                <div className={styles.lineSegmentPoint} />
            </Draggable>
            <Line x0={x0} y0={y0} x1={x1} y1={y1} within={styles.plot} />
        </>
    )
}

export default observer(LineSegment)
