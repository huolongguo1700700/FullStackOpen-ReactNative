import RepositoryList from './components/Repositories/RepositoryList';
import AppBar from './components/AppBar/AppBar';
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './components/SignIn';
import SingleRepository from './components/Repositories/SingleRepository';
import ReviewForm from './components/Repositories/ReviewForm';
import SignUp from './components/SignUp/SignUp';
import UserReviews from './components/UserReviews';

const Main = () => {

  return (
    <>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/:id' element={<SingleRepository />} />
        <Route path='/create-review' element={<ReviewForm />} />
        <Route path='/my-reviews' element={<UserReviews />} />
        <Route path='*' element={<Navigate to='/' replace />} />        
      </Routes>
    </>
  )
}

export default Main;