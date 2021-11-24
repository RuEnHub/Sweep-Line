import React from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import { Line } from 'react-lineto';
import { map } from 'map-number';
import FunctionPoint from './FunctionPoint';
import { DraggableCore } from 'react-draggable';
import './FunctionPlot.css';
import PlotAxis from './PlotAxis/PlotAxis';
const pairwise = require('pairwise');

let FunctionPlot = observer(
    class FunctionPlot extends React.Component {
        validValues() {
            return this.props.values.filter(
                ({ x, y }) => !isNaN(+x) && !isNaN(+y)
            );
        }
        pxToY(px) {
            return Number(
                map(
                    px,
                    0,
                    this.height,
                    this.props.bounds.max.y,
                    this.props.bounds.min.y
                )
            );
        }

        pxToX(px) {
            return Number(
                map(
                    px,
                    0,
                    this.width,
                    this.props.bounds.min.x,
                    this.props.bounds.max.x
                )
            );
        }

        yToPx(y) {
            return Number(
                map(
                    y,
                    this.props.bounds.min.y,
                    this.props.bounds.max.y,
                    this.height,
                    0
                )
            );
        }

        xToPx(x) {
            return Number(
                map(
                    x,
                    this.props.bounds.min.x,
                    this.props.bounds.max.x,
                    0,
                    this.width
                )
            );
        }

        componentWillUnmount() {
            this._ismounted = false;
        }

        componentDidMount() {
            // lines are drawn relative to the page, not the parent element
            // so they need to be offset by the position of the plot's div
            // which is only possible to get after the component has been mounted
            this._ismounted = true;
            this.rect = this.divref.getBoundingClientRect();
            this.width = this.divref.clientWidth;
            this.height = this.divref.clientHeight; // todo make functions?
            this.points = this.generatePoints();
            this.forceUpdate();
        }

        handlePointMove(dragArgs, pointVals, doSecond) {
            if (!doSecond) {
                pointVals.x = Number(this.pxToX(dragArgs.lastX).toFixed(4));
                pointVals.y = Number(this.pxToY(dragArgs.lastY).toFixed(4));
            }
            else {
                pointVals.x1 = Number(this.pxToX(dragArgs.lastX).toFixed(4));
                pointVals.y1 = Number(this.pxToY(dragArgs.lastY).toFixed(4));
            }
            return true;
        }

        generatePoints() {
            let index = 0;
            return this.props.values.map(pointVals => {
                let { x, y, x1, y1 } = pointVals;
                index++;
                let valid = !isNaN(+x) && !isNaN(+y);
                let valid2 = !isNaN(+x1) && !isNaN(+y1);
                let positionStart = { x: this.xToPx(x), y: this.yToPx(y) };
                let positionFinish = { x: this.xToPx(x1), y: this.yToPx(y1) };
                return (
                    <React.Fragment key={index}>
                        <FunctionPoint
                            position={positionStart}
                            
                            onDrag={action(args => {
                                this.handlePointMove(args, pointVals);
                            })}
                            valid={valid}
                        />
                        <FunctionPoint
                            position={positionFinish}
                            onDrag={action(args => {
                                this.handlePointMove(args, pointVals, true);
                            })}
                            valid={valid2}
                        />
                    </React.Fragment>
                );
            });
        }

        generateLines() {
            let index = 0;

            return this.props.values.map((points) => {
                index++;
                return (
                    <Line
                        x0={this.xToPx(points.x)}
                        x1={this.xToPx(points.x1)}
                        y0={this.yToPx(points.y)}
                        y1={this.yToPx(points.y1)}
                        within="function-plot"
                        key={index}
                    />
                );
            });
        }

        handleDrag = action(e => {
            let dX = this.pxToX(e.lastX) - this.pxToX(e.x);
            let dY = this.pxToY(e.lastY) - this.pxToY(e.y);
            let bounds = this.props.bounds;
            bounds.min.x = +(this.props.bounds.min.x + dX).toFixed(4);
            bounds.max.x = +(this.props.bounds.max.x + dX).toFixed(4);
            bounds.min.y = +(this.props.bounds.min.y + dY).toFixed(4);
            bounds.max.y = +(this.props.bounds.max.y + dY).toFixed(4);
        });

        render() {
            return (
                <DraggableCore
                    cancel=".draggable-point"
                    onDrag={(a, b) => {
                        this.handleDrag(b);
                        return true;
                    }}
                    onStop={(a, b) => {
                        this.handleDrag(b);
                        return true;
                    }}
                >
                    <div
                        ref={divref => (this.divref = divref)}
                        className="function-plot"
                        style={this.props.style}
                    >
                        {this._ismounted && (
                            <PlotAxis axisName="x" plot={this} />
                        )}
                        {this._ismounted && (
                            <PlotAxis axisName="y" plot={this} />
                        )}
                        {this._ismounted && this.generateLines()}
                        {this._ismounted && this.generatePoints()}
                    </div>
                </DraggableCore>
            );
        }
    }
);

export default FunctionPlot;
