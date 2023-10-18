import { Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation/Navigation'
import Main from './Pages/Main/Main'
import AuthLayout from './Layouts/AuthLayout'
import News from './Pages/News/News'
import { useEffect, useState } from 'react'
import { useAppDispatch } from './store/store'
import { fetchNews } from './store/newsReducer'
import NewsPost from './Pages/NewsPost/NewsPost'
import Calendar from './Pages/Calendar/Calendar'
import localStorageService from './services/localStorage.service'
import {  getCurrentUserWithToken, isAuthenticated } from './store/userReducer'
import { useSelector } from 'react-redux'
import Profile from './Pages/Profile/Profile'
import Application from './Pages/Application/Application'

export default function App() {
  const dispatch = useAppDispatch()
  const isAuth= useSelector(isAuthenticated())

  useEffect(() => {
    const id = localStorageService.getUserId()

    if (id && !isAuth) {
      dispatch(getCurrentUserWithToken(id))
      console.log("Access token", isAuth)
    } else {
      // setLoading(false);
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
      <Route path='/calendar' element={<Calendar/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/application' element={<Application />}/>



      <Route path="news">
        <Route index element={<News />}/>
        <Route path=":itemId" element={<NewsPost/>}/>
      </Route>
    </Routes>

    </>
  )
}
