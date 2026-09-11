import CommentItem from './CommentItem';

function CommentList({comments, authUser, threadId}) {
  if (comments.length === 0) {
    return <p className="text-muted">Belum ada komentar.</p>;
  }

  return (
    <div>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} authUser={authUser} threadId={threadId} />
      ))}
    </div>
  );
}

export default CommentList;
