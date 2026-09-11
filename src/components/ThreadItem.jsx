import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {Card} from 'react-bootstrap';
import Avatar from './Avatar';
import VoteButton from './VoteButton';
import {postedAt, stripHtml} from '../utils';
import {
  asyncUpVoteThread, asyncDownVoteThread, asyncNeutralVoteThread,
} from '../states/threads/action';

function ThreadItem({thread, authUser}) {
  const dispatch = useDispatch();
  const isUpVoted = authUser && thread.upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && thread.downVotesBy.includes(authUser.id);

  function onUpVote() {
    if (!authUser) return alert('Login dulu buat vote');
    return dispatch(
      isUpVoted ? asyncNeutralVoteThread(thread.id) : asyncUpVoteThread(thread.id),
    );
  }

  function onDownVote() {
    if (!authUser) return alert('Login dulu buat vote');
    return dispatch(
      isDownVoted ? asyncNeutralVoteThread(thread.id) : asyncDownVoteThread(thread.id),
    );
  }

  return (
    <Card className="mb-3 thread-item">
      <Card.Body>
        {thread.category && (
          <span className="category-tag d-inline-block mb-2">#{thread.category}</span>
        )}
        <Card.Title>
          <Link to={`/threads/${thread.id}`}>{thread.title}</Link>
        </Card.Title>
        <Card.Text className="text-truncate">{stripHtml(thread.body)}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <Avatar src={thread.ownerAvatar} name={thread.ownerName} size={24} />
            <small className="text-muted">
              {thread.ownerName} • {postedAt(thread.createdAt)} • {thread.totalComments} komentar
            </small>
          </div>
          <VoteButton
            upCount={thread.upVotesBy.length}
            downCount={thread.downVotesBy.length}
            isUpVoted={isUpVoted}
            isDownVoted={isDownVoted}
            onUpVote={onUpVote}
            onDownVote={onDownVote}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

export default ThreadItem;
