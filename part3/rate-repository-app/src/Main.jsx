import RepositoryList from './components/RepositoryList';
import AppBar from './components/AppBar/AppBar';
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './components/SignIn';

const Main = () => {

  return (
    <>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </>
  )
}

export default Main;