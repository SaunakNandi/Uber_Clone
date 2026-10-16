import { useContext } from "react";
import "../Style.css";
import { VehicleImgContext } from "../context/VehicleContext";
import UberBike from "../assets/uber-bike.jpeg";
import UberAuto from "../assets/uber-auto.jpeg";
import UberTaxi from "../assets/uber-Car.jpeg";

export const VehiclePanel = ({
  setvehiclePanelOpen,
  setConfirmedRidePanel,
  fare,
  selectVehicle,
}) => {
  const { setVehicleImg } = useContext(VehicleImgContext);
  return (
    <>
      <h5
        className="vehicle-panel-down"
        onClick={() => setvehiclePanelOpen(false)}
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="choose-vehicle">Choose a vehicle for travel</h3>
      <div
        className="mode"
        onClick={() => {
          setConfirmedRidePanel(true);
          setVehicleImg(UberTaxi);
          selectVehicle("car");
        }}
      >
        <img
          src={UberTaxi}
          style={{ borderRadius: "50%", height: "60px", width: "60px" }}
        />
        <div className="mode-row">
          <h4>
            Uber Taxi{" "}
            <span>
              <i className="ri-user-follow-fill"></i>4
            </span>
          </h4>
          <h5>2 min away</h5>
          <p>Affordable, compact rides</p>
        </div>
        <h2 className="price">₹{fare.car}</h2>
      </div>
      <div
        className="mode"
        onClick={() => {
          setConfirmedRidePanel(true);
          setVehicleImg(UberAuto);
          selectVehicle("auto");
        }}
      >
        <img
          src={UberAuto}
          style={{ borderRadius: "50%", height: "60px", width: "60px" }}
        />
        <div className="mode-row">
          <h4>
            Uber Auto{" "}
            <span>
              <i className="ri-user-follow-fill"></i>4
            </span>
          </h4>
          <h5>2 min away</h5>
          <p>Affordable, compact rides</p>
        </div>
        <h2 className="price">₹{fare.auto}</h2>
      </div>
      <div
        className="mode"
        onClick={() => {
          setConfirmedRidePanel(true);
          setVehicleImg(UberBike);
          selectVehicle("moto");
        }}
      >
        <img
          src={UberBike}
          style={{ borderRadius: "50%", height: "60px", width: "60px" }}
        />
        <div className="mode-row">
          <h4>
            Uber Bike{" "}
            <span>
              <i className="ri-user-follow-fill"></i>4
            </span>
          </h4>
          <h5>2 min away</h5>
          <p>Affordable, compact rides</p>
        </div>
        <h2 className="price">₹{fare.moto}</h2>
      </div>
    </>
  );
};
