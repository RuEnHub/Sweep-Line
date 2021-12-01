import { action } from 'mobx'
import { observer } from 'mobx-react-lite'
import {LineSegmentData, CrossPoint} from './LineSegmentData'
import PlotState from './PlotState'


type TableProps = {
    state: PlotState
}

type RowProps = { segment: LineSegmentData }
type RowCross = { cross: CrossPoint }

const SegmentRow = observer(({ segment }: RowProps) => (
    <tr>
        <td>
            <input
                type={'number'}
                value={Number(segment[0].x.toFixed(4))}
                onChange={action(e => (!isNaN(e.target.valueAsNumber) && (segment[0].x = e.target.valueAsNumber)))}
            />
        </td>
        <td>
            <input
                type={'number'}
                value={Number(segment[0].y.toFixed(4))}
                onChange={action(e => (!isNaN(e.target.valueAsNumber) && (segment[0].y = e.target.valueAsNumber)))}
            />
        </td>
        <td>
            <input
                type={'number'}
                value={Number(segment[1].x.toFixed(4))}
                onChange={action(e => (!isNaN(e.target.valueAsNumber) && (segment[1].x = e.target.valueAsNumber)))}
            />
        </td>
        <td>
            <input
                type={'number'}
                value={Number(segment[1].y.toFixed(4))}
                onChange={action(e => (!isNaN(e.target.valueAsNumber) && (segment[1].y = e.target.valueAsNumber)))}
            />
        </td>
    </tr>
))

const CrossRow = observer(({ cross }: RowCross) => (
    <tr>
        <td>
            <input
                type={'number'}
                value={Number(cross[0].x.toFixed(4))}
                onChange={action(e => (!isNaN(e.target.valueAsNumber) && (cross[0].x = e.target.valueAsNumber)))}
            />
        </td>
        <td>
            <input
                type={'number'}
                value={Number(cross[0].y.toFixed(4))}
                onChange={action(e => (!isNaN(e.target.valueAsNumber) && (cross[0].y = e.target.valueAsNumber)))}
            />
        </td>
    </tr>
))

// таблица для ввода данных
const InputTable = ({ state }: TableProps) => (
    <div>
    <table>
        <thead>
            <tr>
                <td>x0</td>
                <td>y0</td>
                <td>x1</td>
                <td>y1</td>
            </tr>
            </thead>
        <tbody>
            {state.segments.map((seg, i) => (
                <SegmentRow key={i} segment={seg} />
            ))}
        </tbody>
    </table>
    <table>
    <thead>
        <tr>
            <td>x</td>
            <td>y</td>
        </tr>
        </thead>
        <tbody>
            {state.cross.map((seg, i) => (
                <CrossRow key={i} cross={seg} />
            ))}
        </tbody>
    </table>
    </div>
    
)

export default observer(InputTable)
