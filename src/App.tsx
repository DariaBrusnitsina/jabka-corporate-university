import { Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation/Navigation'
import Main from './Pages/Main/Main'
import AuthLayout from './Layouts/AuthLayout'
import News from './Pages/News/News'
import { useEffect } from 'react'
import { useAppDispatch } from './store/store'
import { fetchNews } from './store/newsReducer'
import NewsPost from './Pages/NewsPost/NewsPost'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchNews())
  }, []);

  return (
    <>
    <Navigation />

    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/auth' element={<AuthLayout/>}/>

      <Route path="news">
        <Route index element={<News />}/>
        <Route path=":itemId" element={<NewsPost/>}/>
      </Route>
    </Routes>

    </>
  )
}

export default App
