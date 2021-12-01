import {LineSegmentData, ListEvent, Type, CrossPoint} from './Plot/LineSegmentData'

import PlotState from './Plot/PlotState'


let s : LineSegmentData[]
const dot: number[] = new Array(2)  // точка пересечения

function SweepLine(state: PlotState) {
    s = state.segments
    state.cross.length = 0
    const ListA: ListEvent[] = new Array(2*s.length); //список целей по x
    const ListB: number[] = []
    
    for (let i = 0; i < s.length; i++){
        let xMin: number, xMax : number
        const x1 = s[i][0].x;
        const x2 = s[i][1].x;
        if (x1 == x2){
            const y1 = s[i][0].y;
            const y2 = s[i][1].y;
            [xMin, xMax] = y1<y2? [x1,x2]:[x2,x1];
        } else {
            [xMin, xMax] = [Math.min(x1,x2),Math.max(x1,x2)];
        }
        ListA[2*i] = {x: xMin,type: Type.Start,id: i}
        ListA[2*i+1] = {x: xMax,type: Type.Finish,id: i}
    }
    ListA.sort(function(a, b) {
        return a.x - b.x
    });

    for (let i = 0; i < ListA.length; i++){
        if (ListA[i].type == Type.Start){ //начало отрезка
            let j
            for (j=0; j < ListB.length; j++){
                if (GetY(ListB[j],ListA[i].x) > GetY(ListA[i].id,ListA[i].x))
                    break
            }
            ListB.splice(j,0,ListA[i].id)
            SearchCrossUp(j) //поиск перечечения сверху
            SearchCrossDown(j) //поиск перечечения снизу
        } else if (ListA[i].type == Type.Cross) { //пересечение
            let indDown = ListB.findIndex(element => element == ListA[i].id); //index нижнего отрезка в момент пересечения
            [ListB[indDown], ListB[indDown+1]] = [ListB[indDown+1], ListB[indDown]]
            SearchCrossUp(indDown+1)
            SearchCrossDown(indDown)   
        } else { //конец отрезка
            const delIndex = ListB.findIndex(element => element == ListA[i].id)
            ListB.splice(delIndex,1)

        }
        /*alert("ListA")
        ListA.forEach(function (s) {
            alert(s.x)
            alert(s.type)
        });
        alert("ListB")
        ListB.forEach(function (s) {
            alert(s)
        });*/
    }
    alert("Количество найденных пересечений: "+state.cross.length)

    /*ListA.forEach(function (s) {
        alert(s.x)
    });*/

    function SearchCrossUp(ind: number) {     
        if (ind+1 < ListB.length ? Cross(ListB[ind],ListB[ind+1]): false) {
            
            let t = IndexCross(dot[0])
            if (t != -1) { //если текущего пересечения ещё нет в списке ListA
                ListA.splice(t,0,{x: dot[0],type: Type.Cross,id: ListB[ind], id2: ListB[ind+1]})
                state.addCross([{x: dot[0],y: dot[1]}])
            }
        }
    }

    function SearchCrossDown(ind: number) {
        if (ind-1 >= 0 ? Cross(ListB[ind],ListB[ind-1]): false) {
            
            let t = IndexCross(dot[0])
            if (t != -1) { //если текущего пересечения ещё нет в списке ListA
                ListA.splice(t,0,{x: dot[0],type: Type.Cross,id: ListB[ind-1], id2: ListB[ind]})
                state.addCross([{x: dot[0],y: dot[1]}])  
            }   
        }
    }

    function IndexCross(x: number) {
        let ind
        for (ind=0; ind < ListA.length; ind++){
            //if (ListA[ind] == {x: dot[0],type: Type.Cross,id: ListB[ind-1], id2: ListB[ind]})
            if (ListA[ind].x == dot[0] && ListA[ind].type == Type.Cross)
                return -1
            if (ListA[ind].x >= x)
                break
        }
        return ind
    }
}





function GetY(id: number, x: number) { //возвращает координату y, зная id отрезка и x координату
    if (s[id][0].x == s[id][1].x)
        return (Math.min(s[id][0].y, s[id][1].y))
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
    dot[0] = x3 + (x4 - x3) * n // x3 + (-b(x))*n
    dot[1] = y3 + (y4 - y3) * n  // y3 +(-b(y))*n
    return (dot[0] >= Math.min(x1,x2) && dot[0] <= Math.max(x1,x2) && dot[0] >= Math.min(x3,x4) && dot[0] <= Math.max(x3,x4))? true:false
}

export default SweepLine