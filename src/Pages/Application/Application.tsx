import { Box, Button, Card, CardActions, CardContent, Chip, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import localStorageService from "../../services/localStorage.service";
import { useAppDispatch } from "../../store/store";
import { getUserApplicationById, getUserApplications } from "../../store/applicationReducer";
import { useSelector } from "react-redux";
import CreateApplicationModal from "./CreateApplicationModal";
import { getCurrentUserData } from "../../store/userReducer";
import EditApplicationModal from "./EditApplicationModal";

export default function Application() {
  const userId = localStorageService.getUserId()
  const dispatch = useAppDispatch()
  const application = useSelector(getUserApplications())
  const currentUser = useSelector(getCurrentUserData());


  console.log('application', application)

  useEffect(() => {
    dispatch(getUserApplicationById(Number(userId)))
  }, []);

  //modal
  const [openCreate, setOpenCreate] = useState(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);



  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" my={5}>
        <Typography variant="h4">Заявления</Typography>

        {!application && <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={handleOpenCreate}>
          Создать заявление
        </Button>}
      </Stack>

      <Box>
      <Typography my={3} variant="h5">Созданные заявления</Typography>

      {application ? <Card sx={{ maxWidth: 400 }}>
      <Chip sx={{margin: '10px'}} label={application.requestStatus === null ? "На рассмотрении" : ""} color="error"/>
      <CardContent>
      <Typography variant="h5" component="div">
        Название подразделения: {application.subunitName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Текущая должность: {application.currentPosition}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Руководитель: {application.leaderName}
        </Typography>

      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleOpenEdit}>Посмотреть</Button>
      </CardActions>
    </Card> :
    <Typography>У вас нет заявлений</Typography>
    }


      </Box>

      {currentUser && <CreateApplicationModal open={openCreate} handleClose={handleCloseCreate} user={currentUser} />}
      {currentUser && application && <EditApplicationModal open={openEdit} handleClose={handleCloseEdit} user={currentUser} application={application}/>}

    </Container>
  )
}