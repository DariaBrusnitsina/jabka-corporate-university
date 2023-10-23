import { Box, Breadcrumbs, Button, Container, LinearProgress, Link, List, ListItem, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAllSubjects, getSubjectById } from "../../store/subjectReducer";
import { getFullSchedule, getSchedulesByIds } from "../../store/scheduleReducer";
import { useEffect } from "react";
import { useAppDispatch } from "../../store/store";
import { formatDate } from "../../utils/formatDate";
import { fetchAllGroups, getStudyGroupsByIds } from "../../store/groupReducer";

export function SubjectItem() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const subjectId = Number(location.pathname.split("/")[2])
  const subjectById = useSelector(getSubjectById(subjectId))
  const schedulesById = useSelector(getSchedulesByIds(subjectById?.scheduleIds))
  const studyGroupsByIds = useSelector(getStudyGroupsByIds(subjectById?.studyGroupsIds))

  useEffect(() => {
    dispatch(getFullSchedule())
    dispatch(fetchAllGroups())
    dispatch(fetchAllSubjects())
  }, []);

  if (!subjectById || !schedulesById ) {
    return <LinearProgress />
  }

// studyMaterialsIds

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" my={5}>
      <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/subject">
            Предметы
          </Link>
          <Typography color="text.primary">{subjectById.name}</Typography>
      </Breadcrumbs>
      </Stack>

      {schedulesById.length !== 0 &&
        <Box>
          <Typography variant="h5">Расписание</Typography>
          <List>
            {schedulesById.map((s) => <ListItem ><Button key={s.date} onClick={() => navigate(`/schedule/${s.id}`, {replace: true})} sx={{textTransform: 'none'}}>{formatDate(s.date)}</Button></ListItem>)}
          </List>
        </Box>
      }

      {studyGroupsByIds && studyGroupsByIds?.length !== 0 &&
        <Box>
          <Typography variant="h5">Группы</Typography>
          <List>
            {studyGroupsByIds.map((s) => <ListItem ><Button key={s.name} onClick={() => navigate(`/schedule/${s.id}`, {replace: true})} sx={{textTransform: 'none'}}>{s.name}</Button></ListItem>)}
          </List>
        </Box>
      }

    </Container>

  )
}