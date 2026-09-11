import {useDispatch} from 'react-redux';
import {Form, Button} from 'react-bootstrap';
import useInput from '../hooks/useInput';
import {asyncAddComment} from '../states/threadDetail/action';

function CommentForm({threadId}) {
  const dispatch = useDispatch();
  const [content, onContentChange, setContent] = useInput('');

  function onSubmit(event) {
    event.preventDefault();
    if (!content.trim()) return;
    dispatch(asyncAddComment({threadId, content}));
    setContent('');
  }

  return (
    <Form onSubmit={onSubmit} className="mb-3">
      <Form.Group className="mb-2">
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Tulis komentar..."
          value={content}
          onChange={onContentChange}
          required
        />
      </Form.Group>
      <Button type="submit" size="sm">Kirim Komentar</Button>
    </Form>
  );
}

export default CommentForm;
