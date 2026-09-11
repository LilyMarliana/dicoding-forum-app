import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Card} from 'react-bootstrap';
import DOMPurify from 'dompurify';
import Avatar from '../components/Avatar';
import VoteButton from '../components/VoteButton';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import {postedAt} from '../utils';
import {asyncReceiveThreadDetail, asyncVoteThreadDetail} from '../states/threadDetail/action';

function DetailThreadPage() {
  const {id} = useParams();
  const dispatch = useDispatch();
  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [dispatch, id]);

  if (!threadDetail) return null;

  const isUpVoted = authUser && threadDetail.upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && threadDetail.downVotesBy.includes(authUser.id);

  function onUpVote() {
    if (!authUser) return alert('Login dulu buat vote');
    return dispatch(asyncVoteThreadDetail(id, isUpVoted ? 'neutral' : 'up'));
  }

  function onDownVote() {
    if (!authUser) return alert('Login dulu buat vote');
    return dispatch(asyncVoteThreadDetail(id, isDownVoted ? 'neutral' : 'down'));
  }

  return (
    <div>
      <Card className="mb-4">
        <Card.Body>
          {threadDetail.category && (
            <span className="category-tag d-inline-block mb-2">#{threadDetail.category}</span>
          )}
          <Card.Title as="h3">{threadDetail.title}</Card.Title>
          <div className="d-flex align-items-center gap-2 mb-3">
            <Avatar src={threadDetail.owner.avatar} name={threadDetail.owner.name} size={28} />
            <small className="text-muted">
              {threadDetail.owner.name} • {postedAt(threadDetail.createdAt)}
            </small>
          </div>
          <Card.Text
            as="div"
            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(threadDetail.body)}}
          />
          <VoteButton
            upCount={threadDetail.upVotesBy.length}
            downCount={threadDetail.downVotesBy.length}
            isUpVoted={isUpVoted}
            isDownVoted={isDownVoted}
            onUpVote={onUpVote}
            onDownVote={onDownVote}
          />
        </Card.Body>
      </Card>

      <h5>Komentar ({threadDetail.comments.length})</h5>
      {authUser ? (
        <CommentForm threadId={id} />
      ) : (
        <p className="text-muted">Login dulu buat kasih komentar.</p>
      )}
      <CommentList comments={threadDetail.comments} authUser={authUser} threadId={id} />
    </div>
  );
}

export default DetailThreadPage;
