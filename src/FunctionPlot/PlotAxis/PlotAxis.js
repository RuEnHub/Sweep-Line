import { observer } from 'mobx-react';
import React from 'react';
import { Line } from 'react-lineto';
import './PlotAxis.css'

let PlotAxis = observer(
    class PlotAxis extends React.Component {
        // plot, axisName
        render() {
            let plot = this.props.plot;
            let rect = plot.rect;
            let bounds = plot.props.bounds;
            if (!rect) {
                return null;
            }
            rect = {x: 0, y: 0}

            let x0,
                x1,
                y0,
                y1 = 0;
            if (this.props.axisName === 'x') {
                x0 = plot.xToPx(bounds.min.x);
                x1 = plot.xToPx(bounds.max.x);
                y0 = plot.yToPx(0);
                y1 = plot.yToPx(0);
            }

            if (this.props.axisName === 'y') {
                x0 = plot.xToPx(0);
                x1 = plot.xToPx(0);
                y0 = plot.yToPx(bounds.min.y);
                y1 = plot.yToPx(bounds.max.y);
            }
            return (
                <Line
                    className="plot-axis"
                    within="function-plot"
                    borderColor="gray"
                    x0={x0}
                    x1={x1}
                    y0={y0}
                    y1={y1}
                />
            );
        }
    }
);

export default PlotAxis;
