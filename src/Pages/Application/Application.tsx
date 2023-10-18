import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import CreateApplicationModal from "./CreateApplicationModal";

export default function Application() {
  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" my={5}>
        <Typography variant="h4">Заявления</Typography>

        <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={handleOpen}>
          Создать заявление
        </Button>
      </Stack>

      <Box>
      <Typography variant="h5">Созданные заявления</Typography>

      </Box>

      <CreateApplicationModal/>
    </Container>
  )
}