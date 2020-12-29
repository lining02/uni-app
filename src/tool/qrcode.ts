export interface QrData {
    size: number
    foreground: string
    background: string
    icon: string | Detail | undefined | null
    text: string
}
export interface QrcodeData {
    width: number
    height: number
    foreground: string
    background: string
    canvasId: string
    text: string
    image?: Image
}
interface Image {
    imageResource: string
    dx: number
    dy: number
    dWidth: number
    dHeight: number
}

export interface EventDatail {
    detail?: string | Detail | undefined | null
}
interface Detail {
    [key: string]: string | number
}
