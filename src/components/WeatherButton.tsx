import { WbCloudy } from '@mui/icons-material'
import { Button } from '@mui/material'

export default function WeatherButton({ onClick }: { onClick: () => void }) {
    return (
        <Button
            variant="contained"
            fullWidth
            startIcon={<WbCloudy />}
            onClick={onClick}
        >
            Weather
        </Button>
    )
}