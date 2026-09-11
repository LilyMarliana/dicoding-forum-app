import {useDispatch, useSelector} from 'react-redux';
import {Navigate, Link} from 'react-router-dom';
import {Form, Button, Card} from 'react-bootstrap';
import useInput from '../hooks/useInput';
import {asyncSetAuthUser} from '../states/authUser/action';

function LoginPage() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  if (authUser) return <Navigate to="/" replace />;

  function onSubmit(event) {
    event.preventDefault();
    dispatch(asyncSetAuthUser({email, password}));
  }

  return (
    <Card className="mx-auto" style={{maxWidth: 400}}>
      <Card.Body>
        <Card.Title className="mb-3">Login</Card.Title>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="loginEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={onEmailChange} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={onPasswordChange} required />
          </Form.Group>
          <Button type="submit" className="w-100">Login</Button>
        </Form>
        <div className="mt-3 text-center">
          Belum punya akun? <Link to="/register">Daftar di sini</Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default LoginPage;