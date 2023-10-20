import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "./store";
import axios from "axios";

export interface ISchedule {
  id: number
  date: string
  studyGroup: {id: number, name: string, studentsIds: number[]}
  subject: ISubject
  classFormat: string
  auditorium: string
  linkForTheClass: string
  professorId: number
  professor: IProfessor
}

export interface IProfessor {
  id: number
  login: string
  name: string
  surname: string
  patronymic: string
  email: string
  group: string
  photo: string
  password: string
  roles: { id: number, name: string}[]
  activationStatus: string
}

export interface IHomework {
  id: number
  task: string
  studentId: number
  date: string
  grade: number
  comment: string
  filesNames: string[]
  fileIds: number[]
}

export interface IStudyMaterial {
  id: number
  studyMaterialsType: string
  materialsText: string
  subject: string
  homework: IHomework[],
  filesId: number[]
  filesNames: string[]
}

export interface ISubject {
  id: number
  name: string
  studyGroup: {id: number, name: string, studentsIds: number[]}[]
  studyMaterials: IStudyMaterial[]
  schedule: string[]
  creatorId: number,
  editorsIds: number[]
}

interface scheduleState {
  entities: ISchedule[] | null;
  error: string | null;
  loading: boolean;
}


let mock = [
  {
    "id": 0,
    "date": "2023-10-20T17:17:04.024Z",
    "studyGroup": {
      "id": 0,
      "name": "201",
      "studentsIds": [
        0
      ]
    },
    "subject": {
      "id": 0,
      "name": "Математика",
      "studyGroup": [
        {
          "id": 0,
          "name": "201",
          "studentsIds": [
            0
          ]
        }
      ],
      "studyMaterials": [
        {
          "id": 0,
          "studyMaterialsType": "MATERIAL",
          "materialsText": "string",
          "subject": "string",
          "homework": [
            {
              "id": 0,
              "task": "string",
              "studentId": 0,
              "date": "2023-10-20T17:17:04.024Z",
              "grade": 0,
              "comment": "string",
              "filesNames": [
                "string"
              ],
              "fileIds": [
                0
              ]
            }
          ],
          "filesId": [
            0
          ],
          "filesNames": [
            "string"
          ]
        }
      ],
      "schedule": [
        "string"
      ],
      "creatorId": 0,
      "editorsIds": [
        0
      ]
    },
    "classFormat": "IN_PERSON",
    "auditorium": "string",
    "linkForTheClass": "string",
    "professorId": 0,
    "professor": {
      "id": 0,
      "login": "string",
      "name": "string",
      "surname": "string",
      "patronymic": "string",
      "email": "string",
      "group": "string",
      "photo": "string",
      "password": "string",
      "roles": [
        {
          "id": 0,
          "name": "ROLE_STUDENT"
        }
      ],
      "activationStatus": "ACTIVATED"
    }
  },
  {
    "id": 0,
    "date": "2023-10-19T17:17:04.024Z",
    "studyGroup": {
      "id": 0,
      "name": "201",
      "studentsIds": [
        0
      ]
    },
    "subject": {
      "id": 0,
      "name": "Физика",
      "studyGroup": [
        {
          "id": 0,
          "name": "201",
          "studentsIds": [
            0
          ]
        }
      ],
      "studyMaterials": [
        {
          "id": 0,
          "studyMaterialsType": "MATERIAL",
          "materialsText": "string",
          "subject": "string",
          "homework": [
            {
              "id": 0,
              "task": "string",
              "studentId": 0,
              "date": "2023-10-20T17:17:04.024Z",
              "grade": 0,
              "comment": "string",
              "filesNames": [
                "string"
              ],
              "fileIds": [
                0
              ]
            }
          ],
          "filesId": [
            0
          ],
          "filesNames": [
            "string"
          ]
        }
      ],
      "schedule": [
        "string"
      ],
      "creatorId": 0,
      "editorsIds": [
        0
      ]
    },
    "classFormat": "IN_PERSON",
    "auditorium": "string",
    "linkForTheClass": "string",
    "professorId": 0,
    "professor": {
      "id": 0,
      "login": "string",
      "name": "string",
      "surname": "string",
      "patronymic": "string",
      "email": "string",
      "group": "string",
      "photo": "string",
      "password": "string",
      "roles": [
        {
          "id": 0,
          "name": "ROLE_STUDENT"
        }
      ],
      "activationStatus": "ACTIVATED"
    }
  }
]

const initialState: scheduleState = {
  entities: null,
  error: null,
  loading: false
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action: PayloadAction<ISchedule[]>) => {
      state.entities = action.payload;
      state.error = null;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.entities = null;
      state.error = action.payload;
    }
  },
});

export const {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
} = scheduleSlice.actions;
export default scheduleSlice.reducer;

export const getFullSchedule = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(fetchDataStart());
      // const response = await axios.get(`http://158.160.49.7:8080/api/study/schedule`);
      // dispatch(fetchDataSuccess(response.data));
      dispatch(fetchDataSuccess(mock));

    } catch (error) {
      dispatch(fetchDataFailure("Что-то пошло не так"));
    }
  }
};

export const fullSchedule = () => (state: RootState) => state.schedule.entities;
