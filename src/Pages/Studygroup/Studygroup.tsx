import { Button, Container, Stack, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export function Studygroup() {
  return (
    <Container>
    <Stack direction="row" alignItems="center" justifyContent="space-between" my={5}>
      <Typography variant="h4">Все учебные группы</Typography>

      <Button variant="contained" color="secondary" startIcon={<AddIcon />}  >
        Добавить группу
      </Button>
    </Stack>
    </Container>

  )
}