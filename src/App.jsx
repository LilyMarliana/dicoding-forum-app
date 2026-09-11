import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Routes, Route, Navigate} from 'react-router-dom';
import {Container, Spinner} from 'react-bootstrap';
import Navigation from './components/Navigation';
import LoadingBar from './components/LoadingBar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import DetailThreadPage from './pages/DetailThreadPage';
import CreateThreadPage from './pages/CreateThreadPage';
import LeaderboardPage from './pages/LeaderboardPage';
import {asyncPreloadProcess} from './states/isPreload/action';

function ProtectedRoute({children}) {
  const authUser = useSelector((state) => state.authUser);
  if (!authUser) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  const dispatch = useDispatch();
  const isPreload = useSelector((state) => state.isPreload);

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  return (
    <>
      <LoadingBar />
      <Navigation />
      <Container className="py-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/threads/:id" element={<DetailThreadPage />} />
          <Route path="/leaderboards" element={<LeaderboardPage />} />
          <Route
            path="/new"
            element={(
              <ProtectedRoute>
                <CreateThreadPage />
              </ProtectedRoute>
            )}
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;
