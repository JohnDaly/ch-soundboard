export interface AppTheme {
    bgColor: string
    cardBgColor: string
    shadowColor: string
    color: string
    lineColor: string
    headingColor: string
}

export const lightTheme: AppTheme = {
    bgColor: '#fff',
    cardBgColor: '#fff',
    shadowColor: '#888888',
    color: '#444',
    lineColor: '#ddd',
    headingColor: '#1e2357'
}

export const darkTheme: AppTheme = {
    bgColor: '#202126',
    cardBgColor: '#404040',
    shadowColor: 'black',
    color: '#efefef',
    lineColor: '#555',
    headingColor: '#c5c5c5'
}
