import ThreadItem from './ThreadItem';

function ThreadList({threads, authUser}) {
  if (threads.length === 0) {
    return <p className="text-muted">Belum ada thread pada kategori ini.</p>;
  }

  return (
    <div>
      {threads.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} authUser={authUser} />
      ))}
    </div>
  );
}

export default ThreadList;
