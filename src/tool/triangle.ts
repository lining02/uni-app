export interface InitData {
    width: number
    height: number
    angle: number
    direction: string
    color: string
    [key: string]: string | number
}
export interface Direction {
    name: string
    id: string
}
export interface DirectionList {
    top: string
    bottom: string
    left: string
    right: string
    [key: string]: string
}
