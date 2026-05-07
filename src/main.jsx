import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "./context/userContext";
import CaptainContext from "./context/captainContext.jsx";
import { VehicleContext } from "./context/VehicleContext.jsx";
import SocketProvider from "./context/SocketContext.jsx";
import { JourneyContextProvider } from "./context/JourneyContext.jsx";
import { RiderContext } from "./context/userRideHistoryContext.jsx";
createRoot(document.getElementById("root")).render(
  <VehicleContext>
    <JourneyContextProvider>
      <CaptainContext>
        <UserContext>
          <RiderContext>
            <SocketProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </SocketProvider>
          </RiderContext>
        </UserContext>
      </CaptainContext>
    </JourneyContextProvider>
  </VehicleContext>,
);
