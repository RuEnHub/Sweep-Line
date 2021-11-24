import React from 'react';
import Draggable from 'react-draggable';
import { observer } from 'mobx-react';
import './FunctionPoint.css';

let FunctionPoint = observer(
    class FunctionPoint extends React.Component {
        render() {
            let position = this.props.position;
            let valid = this.props.valid;
            let dragHandler = (_, args) => {
                this.props.onDrag(args);
                return true;
            };
            return (
                <Draggable
                    defaultPosition={valid ? position : null}
                    position={valid ? position : null}
                    onDrag={dragHandler}
                    onStop={dragHandler}
                >
                    <div
                        className={
                            'draggable-point' + (valid ? '' : ' invalid-point')
                        }
                    />
                </Draggable>
            );
        }
    }
);

export default FunctionPoint;
