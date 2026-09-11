import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Form, Button, Card} from 'react-bootstrap';
import useInput from '../hooks/useInput';
import {asyncAddThread} from '../states/threads/action';

function CreateThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, onTitleChange] = useInput('');
  const [body, onBodyChange] = useInput('');
  const [category, onCategoryChange] = useInput('');

  async function onSubmit(event) {
    event.preventDefault();
    const thread = await dispatch(asyncAddThread({title, body, category}));
    if (thread) navigate(`/threads/${thread.id}`);
  }

  return (
    <Card className="mx-auto" style={{maxWidth: 600}}>
      <Card.Body>
        <Card.Title className="mb-3">Buat Thread Baru</Card.Title>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Judul</Form.Label>
            <Form.Control type="text" value={title} onChange={onTitleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Kategori (opsional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="contoh: redux, react, umum"
              value={category}
              onChange={onCategoryChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Isi Thread</Form.Label>
            <Form.Control as="textarea" rows={6} value={body} onChange={onBodyChange} required />
          </Form.Group>
          <Button type="submit">Publikasikan</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CreateThreadPage;
