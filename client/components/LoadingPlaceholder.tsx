
import '../styles/loadingplaceholder.css';



const LoadingPlaceholder = () => (
  <div className="location-grid">
    {[...Array(16)].map((_, index) => (
      <div key={index} className="location-card">
        <div className="image-placeholder"></div>
        <div className="location-overlay">
          <div className="location-info">
            <div className="title-placeholder"></div>
            <div className="rating-placeholder"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default LoadingPlaceholder;