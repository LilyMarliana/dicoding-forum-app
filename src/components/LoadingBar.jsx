// src/components/LoadingBar.jsx
import {useSelector} from 'react-redux';
import {ProgressBar} from 'react-bootstrap';

function LoadingBar() {
  const isLoading = useSelector((state) => state.isLoading);
  if (!isLoading) return null;
  return (
    <ProgressBar
      animated
      now={100}
      style={{
        height: 4, borderRadius: 0,
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 2000,
      }}
    />
  );
}

export default LoadingBar;
