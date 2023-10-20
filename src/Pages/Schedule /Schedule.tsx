import { Box, Card, Container, LinearProgress, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { ISchedule, fullSchedule, getFullSchedule } from "../../store/scheduleReducer";
import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function formatDate(dateString: string) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', options);
}

function sortByDate(array: ISchedule[]) {
  return array.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });
}

export default function Schedule () {
  const dispatch = useAppDispatch()
  const [selectedDate, handleDateChange] = useState(null);
  const schedule = useSelector(fullSchedule())
  const [sortedSc, setSortedSc]  = useState<ISchedule[] | null>(schedule);

  if (schedule !== null) {
  const sorted =  sortByDate(schedule)
  setSortedSc(sorted)

  }


  useEffect(() => {
    dispatch(getFullSchedule())

  }, []);


  if (!schedule) {
    return <LinearProgress />
  }

  console.log(schedule)

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" my={5}>
        <Typography variant="h4">Расписание</Typography>
      </Stack>


    <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Время</TableCell>
              <TableCell>Предмет</TableCell>
              <TableCell>Группа</TableCell>
              <TableCell>Преподаватель</TableCell>
              <TableCell>Аудитория</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule.map((s) => (
              <TableRow key={s.date}>
                <TableCell>{formatDate(s.date)}</TableCell>
                <TableCell>{s.subject.name}</TableCell>
                <TableCell>{s.studyGroup.name}</TableCell>
                <TableCell>{s.professor.name}</TableCell>
                <TableCell>{s.auditorium}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
  );
};

