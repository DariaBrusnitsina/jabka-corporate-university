import { Avatar, Box, Breadcrumbs, Button, Card, Container, LinearProgress, Link, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { getFullSchedule, getScheduleById } from "../../store/scheduleReducer";
import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAllGroups, getGroupById } from "../../store/groupReducer";
import { fetchAllSubjects, getSubjectById } from "../../store/subjectReducer";
import { fetchAllUsers } from "../../store/userReducer";

const img = 'https://img.freepik.com/free-photo/aged-math-teacher-standing-in-classroom-with-chalk_23-2148201013.jpg?w=826&t=st=1698003403~exp=1698004003~hmac=cd7ff1c77ea8b32dc7d261562a0dc27a1f4b5714ee58c4d48b34de47651adf73%3D%3D'

function formatDate(dateString: string) {
  const options :Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', options);
}

export default function ScheduleItem () {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const postId = Number(location.pathname.split("/")[2])
  const scheduleById = useSelector(getScheduleById(postId))


  const gropupById = useSelector(getGroupById(scheduleById?.studyGroupId))
  const subjectById = useSelector(getSubjectById(scheduleById?.subjectId))

  useEffect(() => {
    dispatch(getFullSchedule())
    dispatch(fetchAllGroups())
    dispatch(fetchAllSubjects())
    dispatch(fetchAllUsers())
  }, []);

  if (!scheduleById  || !subjectById) {
    return <LinearProgress />
  }

  console.log('scheduleById', scheduleById)
  console.log('gropupById', gropupById)
  console.log('subjectById', subjectById)

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" my={5}>
      <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/schedule">
            Расписание
          </Link>
          <Typography color="text.primary">{formatDate(scheduleById.date)}</Typography>
      </Breadcrumbs>
      </Stack>

      <Box display='flex' justifyContent='space-between'>
        <Box>
          <Button variant="text" sx={{textTransform: 'none', fontSize: '32px'}} onClick={() => navigate(`/subject/${subjectById.id}`, {replace: true})}>{subjectById.name}</Button>
          {scheduleById.classFormat === 'DISTANT' ?
          <Box m={1}>
            <Link href={scheduleById.linkForTheClass} target="_blank">Виртуальная аудитория</Link>
          </Box>
          :
          <Typography variant="h6">Аудитория: {scheduleById.auditorium}</Typography>
          }
        </Box>

        <Box>
          <Card sx={{display: "flex", justifyContent: 'space-between'}}>
            <img height="250px" src={img} alt="prof" />
            <Box m={2}>
            <Button variant="text" sx={{textTransform: 'none', fontSize: '16px'}} onClick={() => navigate(`/subject/${subjectById.id}`, {replace: true})}>Иван Иванов</Button>
            <Typography variant="subtitle1">Аудитория: {scheduleById.classFormat}</Typography>
            <Typography variant="subtitle1">Аудитория: {scheduleById.classFormat}</Typography>
            <Typography variant="subtitle1">Аудитория: {scheduleById.classFormat}</Typography>
            </Box>
          </Card>
        </Box>
      </Box>

      <Box my={2}>
      <Button onClick={() => navigate(`/studygroup/${subjectById.id}`, {replace: true})} variant="text" sx={{textTransform: 'none', fontSize: '24px'}}>Группа {}</Button>

      <Box display='flex' py={2} columnGap={2}>
        {<Card>
          <Box display="flex" flexDirection="column" alignItems="center" m={3}>
            <Avatar/>
            <Button onClick={() => navigate(`/student/${subjectById.id}`, {replace: true})} variant="text" sx={{textTransform: 'none', fontSize: '16px', marginTop: '10px'}}>Name pat Sut</Button>
          </Box>
        </Card>}
      </Box>

      </Box>
    </Container>
  );
};

