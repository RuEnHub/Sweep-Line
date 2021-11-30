import { observer } from 'mobx-react-lite'
import PlotState from './PlotState'
import { Line } from 'react-lineto'
import styles from './Plot.module.css'
type Props = {
    state: PlotState
}

// линии на x=0 и y=0
const PlotAxes = ({ state }: Props) => {
    const horizontal = {
        x0: state.xToPx(state.bounds.minX),
        x1: state.xToPx(state.bounds.maxX),
        y0: state.yToPx(0),
        y1: state.yToPx(0),
    }
    const vertical = {
        x0: state.xToPx(0),
        x1: state.xToPx(0),
        y0: state.yToPx(state.bounds.minY),
        y1: state.yToPx(state.bounds.maxY),
    }

    return (
        <>
            <Line
                x0={horizontal.x0}
                x1={horizontal.x1}
                y0={horizontal.y0}
                y1={horizontal.y1}
                borderColor="gray"
                zIndex={-1}
                within={styles.plot}
            />
            <Line
                x0={vertical.x0}
                x1={vertical.x1}
                y0={vertical.y0}
                y1={vertical.y1}
                borderColor="gray"
                zIndex={-1}
                within={styles.plot}
            />
        </>
    )
}

export default observer(PlotAxes)
