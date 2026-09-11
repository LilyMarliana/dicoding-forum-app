import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Trophy} from 'lucide-react';
import Avatar from '../components/Avatar';
import {asyncPopulateLeaderboards} from '../states/users/action';

function LeaderboardPage() {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards());
  }, [dispatch]);

  const maxScore = Math.max(1, ...leaderboards.map((entry) => entry.score));

  return (
    <div>
      <h2 className="mb-3">Leaderboard</h2>
      {leaderboards.length === 0 && <p className="text-muted">Belum ada data leaderboard.</p>}
      <div className="d-flex flex-column gap-2">
        {leaderboards.map((entry, index) => (
          <div key={entry.user.id} className="leaderboard-row">
            <span className={`rank-badge${index < 3 ? ` rank-badge--${index + 1}` : ''}`}>
              {index < 3 ? <Trophy size={14} /> : index + 1}
            </span>
            <Avatar name={entry.user.name} size={32} useInitials />
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between">
                <span>{entry.user.name}</span>
                <span style={{fontFamily: 'var(--font-mono)'}}>{entry.score}</span>
              </div>
              <div className="leaderboard-bar-track">
                <div
                  className="leaderboard-bar-fill"
                  style={{width: `${(entry.score / maxScore) * 100}%`}}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeaderboardPage;
