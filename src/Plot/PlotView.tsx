import { observer } from 'mobx-react-lite'
import { useEffect, useRef, useState } from 'react'
import PlotState from './PlotState'
import styles from './Plot.module.css'
import LineSegment from './LineSegment'
import PlotAxes from './PlotAxes'
import { DraggableCore, DraggableData } from 'react-draggable'

type Props = {
    state: PlotState
}

// сам график
const PlotView = ({ state }: Props) => {
    const [shouldRender, setShouldRender] = useState(false)
    useEffect(() => {
        setTimeout(() => setShouldRender(true), 100)
    })

    const dragHandler = useRef((_: unknown, data: DraggableData) =>
        state.drag(data.deltaX, data.deltaY)
    ).current

    return (
        <DraggableCore
            onDrag={dragHandler}
            cancel={'.' + styles.lineSegmentPoint}
        >
            <div className={styles.plot}>
                {shouldRender && (
                    <>
                        {state.segments.map((seg, i) => (
                            <LineSegment data={seg} state={state} key={i} />
                        ))}
                        <PlotAxes state={state} />
                    </>
                )}
            </div>
        </DraggableCore>
    )
}

export default observer(PlotView)
