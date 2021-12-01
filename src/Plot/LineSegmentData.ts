type Point = { x: number; y: number } // тип точки

export enum Type {
    Start,
    Cross,
    Finish
}

export type LineSegmentData = [Point, Point] // тип отрезка
export type CrossPoint = [Point]
export type ListEvent = {x: number, type: Type, id: number, id2?: number}


