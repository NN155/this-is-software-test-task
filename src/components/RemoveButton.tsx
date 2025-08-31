import { Delete } from '@mui/icons-material'
import { Button } from '@mui/material'

export default function RemoveButton({ onClick }: { onClick: () => void }) {
    return (
        <Button 
          variant="outlined" 
          fullWidth 
          startIcon={<Delete />}
          onClick={onClick}
          color='error'
        >
          Remove
        </Button>
    )
}