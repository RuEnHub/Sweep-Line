export function map(
    num: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
): number {
    return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}
