import { action, computed, makeObservable, observable } from 'mobx'
import { map } from '../utils/mapNumber'
import {LineSegmentData, CrossPoint} from './LineSegmentData'

type Bounds = {
    minX: number
    minY: number
    maxX: number
    maxY: number
}

export default class PlotState {
    @observable offsetX = 0 // смещение по X и Y (для перетаскивания графика)
    @observable offsetY = 0
    @observable scale = 0.1 // масшиаб

    // cписок отрезков
    @observable segments: LineSegmentData[] = [
        [
            { x: 0, y: 0 },
            { x: 2, y: 2 },
        ],
    ]

    @observable cross: CrossPoint[] = []

    constructor(readonly width: number, readonly height: number) {
        makeObservable(this)
    }

    // границы отображения графика на экране
    @computed get bounds(): Bounds {
        return {
            minX: this.offsetX - (this.width / 2) * this.scale,
            minY: this.offsetY - (this.height / 2) * this.scale,
            maxX: this.offsetX + (this.width / 2) * this.scale,
            maxY: this.offsetY + (this.height / 2) * this.scale,
        }
    }

    // удалить последний отрезок
    @action deleteSegment() {
        this.segments.pop()
    }

    // добавить отрезок
    @action addSegment(point: LineSegmentData) {
        this.segments.push(point)
    }

    // перетаскивание графика мышкой
    @action drag(dX: number, dY: number) {
        this.offsetX -= dX * this.scale;
        this.offsetY += dY * this.scale;
    }

    @action addCross(point: CrossPoint) {
        this.cross.push(point)
    }

    pxToY(px: number) {
        return map(px, 0, this.height, this.bounds.maxY, this.bounds.minY)
    }

    pxToX(px: number) {
        return map(px, 0, this.width, this.bounds.minX, this.bounds.maxX)
    }

    yToPx(y: number) {
        return map(y, this.bounds.minY, this.bounds.maxY, this.height, 0)
    }

    xToPx(x: number) {
        return map(x, this.bounds.minX, this.bounds.maxX, 0, this.width)
    }
}
