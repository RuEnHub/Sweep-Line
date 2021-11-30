import React from 'react'
import PlotView from './Plot/PlotView'
import PlotState from './Plot/PlotState'
import { observer } from 'mobx-react-lite'
import InputTable from './Plot/InputTable'
import {ListEvent} from './Plot/LineSegmentData'
import { allowStateReadsStart } from 'mobx/dist/internal'

const state = new PlotState(500, 500)
const s = state.segments
let dot: number[] = new Array(2)  // точка пересечения
function App() {  
    return <div className="App">
        <PlotView state={state} />
        <button onClick={() => state.addSegment([{ x: -2, y: 2 }, { x: 2, y: 2 }])}>Добавить</button>
        <button onClick={() => state.deleteSegment()}>Удалить</button>
        <button onClick={() => SweemLine()}>Начать</button>
        <span id="resultText"></span>
        <InputTable state={state} />
    </div>
}   

function SweemLine() {
    let ListA: ListEvent[] = []; //список целей по x
    //document.getElementById("resultText")!.innerText = '\ttext'; //alert
    
    for (let i = 0; i < s.length; i++){
        let xMin: number, xMax: number
        const x1 = s[i][0].x;
        const x2 = s[i][1].x;
        /*if (x1 == x2){
            const y1 = s[i][0].y;
            const y2 = s[i][1].y;
            [xMin, xMax] = y1<y2? [x1,x2]:[x2,x1];
        } else*/
        [xMin, xMax] = [Math.min(x1,x2),Math.max(x1,x2)];
        ListA.push({x: xMin,type: true,id: i})
        ListA.push({x: xMax,type: false,id: i})
    }
    ListA.sort(function(a, b) {
        return a.x - b.x
    });
    alert(Cross(0,1))

    /*for (let i = 0; i < ListA.length; i++){
        if (ListA[i].type){
            alert("Это начало отрезка")
        } else {
            alert("Это конец отрезка")
        }
    }*/

    ListA.forEach(function (s) {
        console.log(s.x)
        console.log(s.type)
        console.log(s.id)
    });
}


function GetY(id: number, x: number) { //возвращает координату y, зная id отрезка и x координату
    return s[id][0].y + (s[id][1].y - s[id][0].y) * (x - s[id][0].x) / (s[id][1].x - s[id][0].x)
}


function Cross(id1: number, id2: number): boolean {
    const [x1,y1,x2,y2] = [s[id1][0].x,s[id1][0].y,s[id1][1].x,s[id1][1].y]
    const [x3,y3,x4,y4] = [s[id2][0].x,s[id2][0].y,s[id2][1].x,s[id2][1].y]
    let n: number;
    if (y2 - y1 != 0) {  // a(y)
        const q = (x2 - x1) / (y1 - y2)   
        const sn = (x3 - x4) + (y3 - y4) * q; if (!sn) return false  // c(x) + c(y)*q
        const fn = (x3 - x1) + (y3 - y1) * q   // b(x) + b(y)*q
        n = fn / sn
    }
    else {
        if (!(y3 - y4)) return false  // b(y)
        n = (y3 - y1) / (y3 - y4)   // c(y)/b(y)
    }
    dot[0] = x3 + (x4 - x3) * n  // x3 + (-b(x))*n
    dot[1] = y3 + (y4 - y3) * n  // y3 +(-b(y))*n
    return (dot[0] >= Math.min(x1,x2) && dot[0] <= Math.max(x1,x2) && dot[0] >= Math.min(x3,x4) && dot[0] <= Math.max(x3,x4))? true:false
}

export default observer(App)
