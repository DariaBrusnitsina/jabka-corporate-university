import { Button, Container, LinearProgress, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { fullSchedule, getFullSchedule } from "../../store/scheduleReducer";
import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllGroups, getAllGroups } from "../../store/groupReducer";
import { fetchAllSubjects, getAllSubjects } from "../../store/subjectReducer";

function formatDate(dateString: string) {
  const options :Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', options);
}

export default function Schedule () {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const schedule = useSelector(fullSchedule())
  const groups = useSelector(getAllGroups())
  const subjects = useSelector(getAllSubjects())

  function findGroupById(id: number) {
    const group = groups?.find((n) => n.id === id);
    if (group) {
      return group.name
    }
  }

  function findSubjectsById(id: number) {
    const subject = subjects?.find((n) => n.id === id);
    if (subject) {
      return subject.name
    }
  }

  useEffect(() => {
    dispatch(getFullSchedule())
    dispatch(fetchAllGroups())
    dispatch(fetchAllSubjects())
  }, []);


  if (!schedule) {
    return <LinearProgress />
  }


  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" my={5}>
        <Typography variant="h4">Расписание</Typography>
      </Stack>


    <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Дата</TableCell>
              <TableCell>Предмет</TableCell>
              <TableCell>Группа</TableCell>
              <TableCell>Преподаватель</TableCell>
              <TableCell>Аудитория</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule.map((s) => (
              <TableRow key={s.date}>
                <TableCell><Button onClick={() => navigate(`/schedule/${s.id}`, {replace: true})} sx={{textTransform: 'none'}}>{formatDate(s.date)}</Button></TableCell>
                <TableCell><Button onClick={() => navigate(`/subject/${s.subjectId}`, {replace: true})} sx={{textTransform: 'none'}}>{findSubjectsById(s.subjectId)}</Button></TableCell>
                <TableCell><Button onClick={() => navigate(`/studygroup/${s.studyGroupId}`, {replace: true})} sx={{textTransform: 'none'}}>{findGroupById(s.studyGroupId)}</Button></TableCell>
                {/* <TableCell>{s.professor.name}</TableCell> */}
                <TableCell>{s.auditorium}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      </Container>
  );
};

