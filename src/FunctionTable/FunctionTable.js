import React from 'react';
import './FunctionTable.css';
import { observer } from 'mobx-react';
import FunctionTableCell from './FunctionTableCell';

let FunctionTable = observer(({ values }) => (
    <div className="function-table-container">
        <table className="function-table">
            <tbody>
                <tr>
                    <td>x</td>
                    {values.map((val, index) => (
                        <FunctionTableCell
                            key={index}
                            valuePair={val}
                            variable="x"
                        />
                    ))}
                </tr>
                <tr>
                    <td>y</td>
                    {values.map((val, index) => (
                        <FunctionTableCell
                            key={index}
                            valuePair={val}
                            variable="y"
                        />
                    ))}
                </tr>
                <tr>
                    <td>x2</td>
                    {values.map((val, index) => (
                        <FunctionTableCell
                            key={index}
                            valuePair={val}
                            variable="x1"
                        />
                    ))}
                </tr>
                <tr>
                    <td>y2</td>
                    {values.map((val, index) => (
                        <FunctionTableCell
                            key={index}
                            valuePair={val}
                            variable="y1"
                        />
                    ))}
                </tr>
            </tbody>
        </table>
    </div>
));

export default FunctionTable;
