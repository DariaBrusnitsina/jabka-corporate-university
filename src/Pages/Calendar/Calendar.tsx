import { Box, Container, Stack, Typography } from "@mui/material";
import { ISchedule } from "../../store/scheduleReducer";


export interface ISubject{
  name: string
  studyGroup: {id: number, name: string}[]
  creatorId: number
  id?: number
  studyMaterials: IStudyMaterials[]
  schedule: ISchedule
  editorsIds: string[]
}

interface IStudyMaterials {
  studyMaterialsType: string
  subject: ISubject
  materialsText: string
  id: number
  homework:IHomework[]
}

interface IHomework {
  id: number
  task: IStudyMaterials
  studentId: number
  date: string
  grade: number
  comment: string
}

export interface IStudent {
  id: number
  login: string
  name: string
  surname: string
  patronymic: string
  email: string
  group: string
  photo: string
  password: string
  roles: {id:number, name: string}[]
  activationStatus: string
}

export default function Calendar() {


  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" my={5}>
        <Typography variant="h4">Расписание</Typography>

      </Stack>

    <Box>
      <Typography>Выбрать расписание</Typography>
    </Box>

    <Box>
    <Typography>Выберете</Typography>

    </Box>

    </Container>
  )
}