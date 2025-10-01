import './LoadMoreButton.css';

function LoadMoreButton({ onClick, loading }) {
  return (
    <button
      className="load-more-btn"
      onClick={onClick}
      disabled={loading}
      aria-busy={loading}
    >
      {loading ? 'Loading...' : 'Load More'}
    </button>
  );
}

export default LoadMoreButton;
