
import { MapPin, Clock, CheckCircle2, User, Bike } from 'lucide-react';
import './component.css'; // Make sure this path is correct

// --- 1. INDIVIDUAL RIDE CARD COMPONENT ---
const RideCard = ({ ride,fullname }) => {
  const formattedDate = new Date(ride.completedOn).toLocaleString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });


  const vehiclePlate = ride.captain?.vehicle?.plate || 'N/A';

  return (
    <div className="ride-card-container">
      {/* Header: Date & Status */}
      <div className="ride-card-header">
        <div className="ride-card-time">
          <Clock size={16} />
          {formattedDate}
        </div>
        <div className="ride-card-status">
          <CheckCircle2 size={16} />
          {ride.status}
        </div>
      </div>

      {/* Body: Locations */}
      <div className="ride-card-locations">
        <div className="ride-card-timeline-line"></div>

        {/* Pickup */}
        <div className="ride-location-row">
          <div className="location-icon-container pickup">
            <div className="pickup-dot"></div>
          </div>
          <div className="location-text-box">
            <p className="location-label">Pickup</p>
            <p className="location-address">{ride.pickup}</p>
          </div>
        </div>

        {/* Destination */}
        <div className="ride-location-row">
          <div className="location-icon-container drop">
            <MapPin size={12} color="#ef4444" />
          </div>
          <div className="location-text-box">
            <p className="location-label">Drop</p>
            <p className="location-address">{ride.destination}</p>
          </div>
        </div>
      </div>

      {/* Footer: Captain & Ride Details */}
      <div className="ride-card-footer">
        <div className="ride-card-captain-info">
          <div className="captain-avatar-placeholder">
            <User size={20} />
          </div>
          <div className="captain-text-box">
            <p className="captain-name-text">{fullname}</p>
            <p className="captain-plate-text">
              <Bike size={12} />
              {vehiclePlate}
            </p>
          </div>
        </div>
        
        <div className="ride-card-fare-info">
          <p className="ride-fare-text">₹{ride.fare}</p>
          <p className="ride-distance-text">{ride.distance}</p>
        </div>
      </div>
    </div>
  );
};

export default RideCard