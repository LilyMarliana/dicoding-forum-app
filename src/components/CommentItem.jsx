import {useDispatch} from 'react-redux';
import {Card} from 'react-bootstrap';
import Avatar from './Avatar';
import VoteButton from './VoteButton';
import {postedAt} from '../utils';
import {asyncVoteComment} from '../states/threadDetail/action';

function CommentItem({comment, authUser, threadId}) {
  const dispatch = useDispatch();
  const isUpVoted = authUser && comment.upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && comment.downVotesBy.includes(authUser.id);

  function onUpVote() {
    if (!authUser) return alert('Login dulu buat vote');
    dispatch(asyncVoteComment(threadId, comment.id, isUpVoted ? 'neutral' : 'up'));
  }

  function onDownVote() {
    if (!authUser) return alert('Login dulu buat vote');
    dispatch(asyncVoteComment(threadId, comment.id, isDownVoted ? 'neutral' : 'down'));
  }

  return (
    <Card className="mb-2">
      <Card.Body>
        <div className="d-flex align-items-center gap-2 mb-2">
          <Avatar src={comment.owner.avatar} name={comment.owner.name} size={24} />
          <small className="text-muted">
            {comment.owner.name} • {postedAt(comment.createdAt)}
          </small>
        </div>
        <Card.Text>{comment.content}</Card.Text>
        <VoteButton
          upCount={comment.upVotesBy.length}
          downCount={comment.downVotesBy.length}
          isUpVoted={isUpVoted}
          isDownVoted={isDownVoted}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
      </Card.Body>
    </Card>
  );
}

export default CommentItem;
