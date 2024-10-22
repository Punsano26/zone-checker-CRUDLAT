import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Swal from "sweetalert2";
// MyLocation map
import StoreService from "../services/store.service";
const storeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/9198/9198446.png",
  iconSize: [38, 38],
  iconAnchor: [22, 38],
  popupAnchor: [0, -40],
});

const houseIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/7720/7720526.png",
  iconSize: [38, 38],
  iconAnchor: [22, 38],
  popupAnchor: [0, -40],
});

// Custom icon for selected store
const selectedStoreIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/7877/7877890.png", // ไอคอนใหม่สำหรับร้านค้าเมื่อถูกเลือก
  iconSize: [38, 38],
  iconAnchor: [22, 38],
  popupAnchor: [0, -40],
});

function Mapchecker() {
  const center = [13.838500199744178, 100.02534412184882];
  const [stores, setStores] = useState([]);
  const [myLocation, setMylocation] = useState({ lat: "", lng: "" });
  const [selectedStore, setSelectedStore] = useState(null);
  const [activeStore, setActiveStore] = useState(null);
  const [deliveryZone, setDeliveryZone] = useState({
    lat: null,
    lng: null,
    radius: 1000,
  });

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371e3; // Earth radius in meters
    const phi_1 = (lat1 * Math.PI) / 180;
    const phi_2 = (lat2 * Math.PI) / 180;

    const delta_phi = ((lat2 - lat1) * Math.PI) / 180;
    const delta_lambda = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(delta_phi / 2) * Math.sin(delta_phi / 2) +
      Math.cos(phi_1) *
        Math.cos(phi_2) *
        Math.sin(delta_lambda / 2) *
        Math.sin(delta_lambda / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
  };

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const data = await StoreService.getAllStore();
        setStores(data);
      } catch (error) {
        console.error("Error fetching store data:", error);
      }
    };
    fetchStores();
  }, []);

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setMylocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  const handleLocationCheck = () => {
    if (!myLocation.lat && !myLocation.lng) {
      Swal.fire({
        title: "Error!",
        text: "Please enter your valid location",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!selectedStore) {
      Swal.fire({
        title: "Error!",
        text: "Please select a store",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const distance = calculateDistance(
      myLocation.lat,
      myLocation.lng,
      selectedStore.lat,
      selectedStore.lng
    );

    if (distance <= selectedStore.radius) {
      Swal.fire({
        title: "Success",
        text: "You are within the delivery zone for " + selectedStore.name,
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "You are outside the delivery zone for " + selectedStore.name,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    return (
      <>
        <div className="button-container">
          <button className="get-location-btn" onClick={handleGetLocation}>
            Get My Location
          </button>
          <button className="get-location-btn" onClick={handleGetLocation}>
            Check Delivery Availability
          </button>
        </div>

        <div>
          <MapContainer
            center={center}
            zoom={13}
            style={{ height: "75vh", width: "100vw" }}
          />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {stores.map((store) => {
            const distance = calculateDistance(
              myLocation.lat,
              myLocation.lng,
              store.lat,
              store.lng
            );
            const icon =
              distance <= deliveryZone.radius ? houseIcon : storeIcon;

          return(
              <Marker
                key={store.storeID}
                position={[store.lat, store.lng]}
                icon={icon}
                eventHandlers={{
                  click: () => {
                    setDeliveryZone({
                      lat: store.lat,
                      lng: store.lng,
                      radius: store.deliveryRadius,
                    });
                    setActiveStore(store.storeID);
                  },
                }}
              >
      <Popup>
                <b>{store.name}</b>
                <p>{store.address}</p>
                <a 
                href={store.direction}
                target="_blank"
                rel="noopener noreferrer"
                >
                  ดูเส้นทาง
                </a>
                 {/* ปุ่มแก้ไข */}
                  {/* ปุ่มแก้ไข */}
      </Popup>
      </Marker>
    );
    })}
      {myLocation.lat && myLocation.lng && (
        <>
           <Marker
                position={[myLocation.lat, myLocation.lng]}
                icon={
                  new Icon({
                    iconUrl: houseIcon,
                    iconSize: [35, 35],
                  })
                }
              >
                <Popup>
                  <b>My Location</b>
                </Popup>
              </Marker>
        </>
      )}
      


        </div>
      </>
    );
  };
}

export default Mapchecker;
