import './App.css';
import FunctionTable from './FunctionTable/FunctionTable';
import FunctionPlot from './FunctionPlot/FunctionPlot';
import React from 'react';
import { observable, action, autorun } from 'mobx';
import { observer } from 'mobx-react';

let functionValues = observable([
    { x: 0, y: 0, x1: 1, y1: 1 },
    { x: 5, y: 5, x1: 6, y1: 6 },
]);

let plotBounds = observable({
    min: { x: -30, y: -10 },
    max: { x: 30, y: 10 },
});

let App = observer(() => {
    const plotRef = React.useRef();
    return (
        <>
            <button onClick={addValue}>Добавить</button>
            <button onClick={removeValue}>Удалить</button>
            <div>
                <FunctionTable values={functionValues} />
            </div>

            <FunctionPlot
                values={functionValues}
                style={{ width: '1400px', height: '600px' }}
                bounds={plotBounds}
                ref={plotRef}
            />
        </>
    );
    
});

let addValue = action(() => {
    functionValues.push({
        x: +((Math.random() - 0.5) * 55).toFixed(4),
        y: +((Math.random() - 0.5) * 15).toFixed(4),
        x1: +((Math.random() - 0.5) * 55).toFixed(4),
        y1: +((Math.random() - 0.5) * 15).toFixed(4),
    }); 
});
let removeValue = action(() => {
    functionValues.pop();
});

export default App;
