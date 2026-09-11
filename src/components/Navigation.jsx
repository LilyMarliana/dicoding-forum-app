import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {
  Navbar, Nav, Container, Button,
} from 'react-bootstrap';
import {LogOut} from 'lucide-react';
import {asyncUnsetAuthUser} from '../states/authUser/action';

function Navigation() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onLogout() {
    dispatch(asyncUnsetAuthUser());
    navigate('/');
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Forum Diskusi</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Threads</Nav.Link>
            <Nav.Link as={Link} to="/leaderboards">Leaderboard</Nav.Link>
            {authUser && <Nav.Link as={Link} to="/new">Buat Thread</Nav.Link>}
          </Nav>
          <Nav>
            {authUser ? (
              <>
                <Navbar.Text className="me-3 text-light">Hai, {authUser.name}</Navbar.Text>
                <Button
                  variant="outline-light"
                  size="sm"
                  className="d-inline-flex align-items-center gap-1"
                  onClick={onLogout}
                >
                  <LogOut size={14} /> Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
