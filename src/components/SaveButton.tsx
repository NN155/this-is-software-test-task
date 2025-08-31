import { Save } from '@mui/icons-material'
import { Button } from '@mui/material'

export default function SaveButton({ onClick }: { onClick: () => void }) {
    return (
        <Button 
          variant="outlined" 
          fullWidth 
          startIcon={<Save />}
          onClick={onClick}
          color='primary'
        >
          Save
        </Button>
    )
}