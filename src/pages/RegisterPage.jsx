import {useDispatch, useSelector} from 'react-redux';
import {Navigate, Link, useNavigate} from 'react-router-dom';
import {Form, Button, Card} from 'react-bootstrap';
import useInput from '../hooks/useInput';
import {asyncRegisterUser} from '../states/authUser/action';

function RegisterPage() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  if (authUser) return <Navigate to="/" replace />;

  async function onSubmit(event) {
    event.preventDefault();
    const success = await dispatch(asyncRegisterUser({name, email, password}));
    if (success) navigate('/login');
  }

  return (
    <Card className="mx-auto" style={{maxWidth: 400}}>
      <Card.Body>
        <Card.Title className="mb-3">Register</Card.Title>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nama</Form.Label>
            <Form.Control type="text" value={name} onChange={onNameChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={onEmailChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={onPasswordChange}
              required
              minLength={6}
            />
          </Form.Group>
          <Button type="submit" className="w-100">Daftar</Button>
        </Form>
        <div className="mt-3 text-center">
          Sudah punya akun? <Link to="/login">Login di sini</Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default RegisterPage;
