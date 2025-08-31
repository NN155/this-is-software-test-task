interface WeatherIconProps {
    weatherCode: number
    isDay: boolean
    size?: 'small' | 'medium' | 'large'
}

export default function WeatherIcon({ weatherCode, isDay, size = 'medium' }: WeatherIconProps) {
    const getIcon = () => {
        if (weatherCode === 0) return isDay ? '☀️' : '🌙' // Clear sky
        if (weatherCode <= 3) return isDay ? '🌤️' : '☁️' // Partly cloudy
        if (weatherCode <= 48) return '☁️' // Cloudy/Foggy
        if (weatherCode <= 57) return '🌦️' // Drizzle
        if (weatherCode <= 67) return '🌧️' // Rain
        if (weatherCode <= 77) return '❄️' // Snow
        if (weatherCode <= 82) return '🌦️' // Rain showers
        if (weatherCode <= 86) return '❄️' // Snow showers
        if (weatherCode <= 99) return '⛈️' // Thunderstorm
        return '🌤️' // Default
    }

    const fontSize = {
        small: '1.5rem',
        medium: '2rem',
        large: '3rem'
    }[size]

    return (
        <span style={{ fontSize }}>{getIcon()}</span>
    )
}
