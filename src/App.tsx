import React from 'react'
import PlotView from './Plot/PlotView'
import PlotState from './Plot/PlotState'
import { observer } from 'mobx-react-lite'
import InputTable from './Plot/InputTable'
import SweepLine from './sweepLine'
//import { allowStateReadsStart } from 'mobx/dist/internal'

const state = new PlotState(500, 500)

function App() {  
    return <div className="App">
        <PlotView state={state} />
        <button onClick={() => state.addSegment([{ x: -2, y: 2 }, { x: 2, y: 2 }])}>Добавить</button>
        <button onClick={() => state.deleteSegment()}>Удалить</button>
        <button onClick={() => SweepLine(state)}>Начать</button>
        <InputTable state={state} />
    </div>
}

export default observer(App)
