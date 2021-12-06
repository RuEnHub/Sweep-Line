import React from 'react'
import PlotView from './Plot/PlotView'
import PlotState from './Plot/PlotState'
import { observer } from 'mobx-react-lite'
import InputTable from './Plot/InputTable'
import SweepLine from './sweepLine'
import {LineSegmentData} from './Plot/LineSegmentData'
import { stringify } from 'querystring'
//import { allowStateReadsStart } from 'mobx/dist/internal'

const state = new PlotState(500, 500)

function App() {  
    return <div className="App">
        <PlotView state={state} />
        <button onClick={() => state.addSegment([{ x: -2, y: 2 }, { x: 2, y: 2 }])}>Добавить</button>
        <button onClick={() => state.deleteSegment()}>Удалить</button>
        <button onClick={() => DownloadTXT()}>Скачать</button>
        <button onClick={() => SweepLine(state)}>Начать</button>
        <InputTable state={state} />
    </div>
}

function DownloadTXT() {
    let x1 : string, y1 : string, x2 : string, y2 : string
    let s: LineSegmentData[] = state.segments

    let st: string = s.length.toString() + '\n';
    for (let i = 0; i < s.length; i++) {
        x1 = s[i][0].x.toFixed(4).toString()
        y1 = s[i][0].y.toFixed(4).toString()
        x2 = s[i][1].x.toFixed(4).toString()
        y2 = s[i][1].y.toFixed(4).toString()
        const tmp : string = x1 + " " + y1 + " " + x2 + " " + y2 + " " + "\n";
        st += tmp
    }
    
    const element = document.createElement('a')
    const file = new Blob([st],{endings: 'native'})
    element.href = URL.createObjectURL(file)
    element.download = "TASK.txt"
    document.body.appendChild(element)
    element.click()
    
}

export default observer(App)
