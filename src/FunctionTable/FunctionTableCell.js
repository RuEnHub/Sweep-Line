import React from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import './FunctionTableCell.css';

let FunctionTableCell = observer(
    class FunctionTableCell extends React.Component {
        constructor(props) {
            super(props);
            this.isFocused = false;
            [this.valuePair, this.variable] = [props.valuePair, props.variable];
            this.value = this.valuePair[this.variable];
            this.input = React.createRef();
        }

        // update the value if the span contains a valid number
        // todo: handle newlines also
        handleInput = action(args => {
            this.valuePair[this.variable] = args.target.value;
        });

        getShownValue() {
            let val = this.valuePair[this.variable];
            return val;
        }

        render() {
            return (
                <td>
                    <div>
                        <span>{this.getShownValue()}h</span>
                        <input
                            ref={this.input}
                            className={
                                isNaN(this.valuePair[this.variable])
                                    ? 'invalid-input'
                                    : null
                            }
                            onChange={this.handleInput}
                            value={this.getShownValue()}
                        />
                    </div>
                </td>
            );
        }
    }
);
export default FunctionTableCell;
