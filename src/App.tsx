import { Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation/Navigation'
import Main from './Pages/Main/Main'
import AuthLayout from './Layouts/AuthLayout'
import News from './Pages/News/News'
import { useEffect } from 'react'
import { useAppDispatch } from './store/store'
import { fetchNews } from './store/newsReducer'
import NewsPost from './Pages/NewsPost/NewsPost'
import localStorageService from './services/localStorage.service'
import {  getCurrentUserWithToken, isAuthenticated } from './store/authReducer'
import { useSelector } from 'react-redux'
import Profile from './Pages/Profile/Profile'
import Application from './Pages/Application/Application'
import Schedule from './Pages/Schedule /Schedule'
import Applications from './Pages/Applications/Applications'
import { StudygroupItem } from './Pages/StudygroupItem/StudygroupItem'
import ScheduleItem from './Pages/ScheduleItem/ScheduleItem'
import { Subject } from './Pages/Subject/Subject'
import { SubjectItem } from './Pages/SubjectItem/SubjectItem'
import { StudentItem } from './Pages/StudentItem/StudentItem'
import { Student } from './Pages/Student/Student'
import { Studygroup } from './Pages/Studygroup/Studygroup'

export default function App() {
  const dispatch = useAppDispatch()
  const isAuth= useSelector(isAuthenticated())

  useEffect(() => {
    const id = localStorageService.getUserId()

    if (id && !isAuth) {
      dispatch(getCurrentUserWithToken(id))
    }
}, []);

  useEffect(() => {
    dispatch(fetchNews())
  }, []);

  return (
    <>
    <Navigation />

    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/auth' element={<AuthLayout/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/application' element={<Application />}/>
      <Route path='/applications' element={<Applications />}/>

      <Route path="studygroup">
        <Route index element={<Studygroup />}/>
        <Route path=":itemId" element={<StudygroupItem />}/>
      </Route>

      <Route path="subject">
        <Route index element={<Subject />}/>
        <Route path=":itemId" element={<SubjectItem />}/>
      </Route>

      <Route path="student">
        <Route index element={<Student />}/>
        <Route path=":itemId" element={<StudentItem />}/>
      </Route>

      <Route path="schedule">
        <Route index element={<Schedule />}/>
        <Route path=":itemId" element={<ScheduleItem />}/>
      </Route>

      <Route path="news">
        <Route index element={<News />}/>
        <Route path=":itemId" element={<NewsPost/>}/>
      </Route>
    </Routes>

    </>
  )
}
