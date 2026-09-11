import {ArrowUp, ArrowDown} from 'lucide-react';
import {Button} from 'react-bootstrap';

function VoteButton({
  upCount, downCount, isUpVoted, isDownVoted, onUpVote, onDownVote, disabled,
}) {
  return (
    <div className="d-flex align-items-center gap-2">
      <Button
        variant="outline-secondary"
        size="sm"
        className={`d-inline-flex align-items-center gap-1 ${isUpVoted ? 'vote-btn-active' : ''}`}
        onClick={onUpVote}
        disabled={disabled}
      >
        <ArrowUp size={14} /> {upCount}
      </Button>
      <Button
        variant="outline-secondary"
        size="sm"
        className={`d-inline-flex align-items-center gap-1 ${isDownVoted ? 'vote-btn-active' : ''}`}
        onClick={onDownVote}
        disabled={disabled}
      >
        <ArrowDown size={14} /> {downCount}
      </Button>
    </div>
  );
}

export default VoteButton;
