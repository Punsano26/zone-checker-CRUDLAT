import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { Icon } from "leaflet";
import Swal from "sweetalert2";
import StoreService from "../services/store.service";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ComponentMap = () => {
  const center = [13.838504235249465, 100.02533369833033];
  const [stores, setStores] = useState([]);
  const [myLocation, setMyLocation] = useState({ lat: "", lng: "" });
  const [activeStore, setActiveStore] = useState(null);
  const [deliveryZone, setDeliveryZone] = useState({
    lat: "",
    lng: "",
    deliveryRadius: 0,
  });
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // Define store and house icons
  const storeIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/869/869636.png",
    iconSize: [38, 38],
    iconAnchor: [22, 38],
    popupAnchor: [0, -40],
  });

  const houseIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/7720/7720526.png",
    iconSize: [38, 38],
    iconAnchor: [22, 38],
    popupAnchor: [0, -40],
  });

  // Custom icon for selected store
  const selectedStoreIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/17001/17001986.png",
    iconSize: [38, 38],
    iconAnchor: [22, 38],
    popupAnchor: [0, -40],
  });

  const myStoreIsadmin = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2076/2076510.png",
    iconSize: [38, 38],
    iconAnchor: [22, 38],
    popupAnchor: [0, -40],
  });

  // Function to calculate distance between 2 points using Haversine Formula
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

  // Fetch stores from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await StoreService.getAllStore();
        if (response.status === 200) {
          console.log("response.data:", response.data);

          setStores(response.data);
        }
      } catch (error) {
        console.log("error fetch data Stores!!", error);
      }
    };
    fetchData();
  }, []);

  // Get user's current location
  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setMyLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  // Check delivery availability
  const handleLocationCheck = () => {
    if (!myLocation.lat || !myLocation.lng) {
      Swal.fire({
        title: "Error!",
        text: "Please get your location first.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const store = stores.find((store) => store.storeID === activeStore);

    if (!store) {
      Swal.fire({
        title: "Error!",
        text: "Please select a store first.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const distance = calculateDistance(
      myLocation.lat,
      myLocation.lng,
      store.lat,
      store.lng
    );

    if (distance <= deliveryZone.deliveryRadius) {
      Swal.fire({
        title: "Success!",
        text: `Your location is within the delivery zone for ${
          store.storeName
        }. Distance: ${distance.toFixed(2)} meters.`,
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Not Available",
        text: `Your location is outside the delivery zone for ${
          store.storeName
        }. Distance: ${distance.toFixed(2)} meters.`,
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  // Handle map click events to set location
  const LocationMap = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMyLocation({ lat, lng });
        console.log("Clicked at latitude:" + lat + ", longitude:" + lng);
      },
    });
  };

  // Manage active store selection
  const handleStoreCheck = (storeId) => {
    setActiveStore((prev) => (prev === storeId ? null : storeId));
  };

  // Navigate to edit page
  const handleEditStore = (id) => {
    navigate(`/edit/${id}`);
  };

  // Handle store deletion
  const handleDeleteStore = async (storeID) => {
    Swal.fire({
      title: "ยืนยันการลบข้อมูลร้าน?",
      text: "คุณแน่ใจว่าตัดสินใจดีแล้ว",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "แน่นอน, ฉันจะลบ!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await StoreService.deletestore(storeID);
          if (response.status === 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "ลบทิ้งไปแล้ว!",
              text: "ไอกระจอกไม่มีปัญญาบริหารร้าน ลบๆไปเหอะ!",
              timer: 7000,
            }).then(() => {
              // Refresh page or state after deletion
              window.location.reload();
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "ลบ ล้มเหลว!",
            text:
              "ไม่สามารถยืนยันการลบได้! เนื่องจากคุณไม่ได้เป็นเจ้าของ" +
              error.message,
          });
        }
      }
    });
  };

  return (
    <>
      <h1 className="text-center text-3xl font-bold font-serif mb-5">
        <span className="text-red-500">Lat Lng</span> Derivery Zone Stroe
      </h1>
      <div className="text-center">
        <div className="flex justify-center items-center space-x-10 p-2 mb-2">
          <button
            className="btn bg-[#50c478] text-white mb-3"
            onClick={handleGetLocation}
          >
            Get My Location
          </button>
          <button
            className="btn bg-[#59b85f] text-white mb-3"
            onClick={handleLocationCheck}
          >
            Check Delivery Availability
          </button>
        </div>
      </div>

      <div className="mapContainer w-full max-w-4xl">
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: "75vh", width: "99vw" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {stores &&
            stores.map((store) => {
              const distance = calculateDistance(
                myLocation.lat,
                myLocation.lng,
                store.lat,
                store.lng
              );
              let icon = storeIcon; // Default icon
              let popupMessage = ""; // Default popup message

              // Check if the store is owned by the logged-in admin user
              if (user && store.adminId === user.id) {
                icon = myStoreIsadmin; // Change icon for admin-owned stores
                popupMessage = "คุณเป็นเจ้าของร้านนี้!";
                // Ownership message
              }

              // Adjust icon based on delivery zone
              if (distance <= deliveryZone.deliveryRadius) {
                icon = selectedStoreIcon; // Change to selected icon if within delivery radius
              }

              return (
                <Marker
                  key={store.storeID}
                  position={[store.lat, store.lng]}
                  icon={icon}
                  eventHandlers={{
                    click: () => {
                      setDeliveryZone({
                        lat: store.lat,
                        lng: store.lng,
                        deliveryRadius: store.deliveryRadius,
                      });
                      setActiveStore(store.storeID);
                    },
                  }}
                >
                  <Popup>
                    <strong>{store.storeName}</strong> <br />
                    {store.address} <br />
                    ระยะทาง: {distance.toFixed(2)} เมตร <br />
                    {popupMessage && (
                      <div className="bg-green-100 text-green-800 rounded-full px-4  w-36 border-spacing-1">
                        {popupMessage}
                      </div>
                    )}{" "}
                    {/* Show ownership message */}
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                        store.lat
                      )},${encodeURIComponent(store.lng)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ดูเส้นทาง
                    </a>
                    <br />
                    {/* Circle for delivery area if active */}
                    {activeStore === store.storeID && store.deliveryRadius > 0 && (
                      <Circle
                        center={[store.lat, store.lng]}
                        radius={store.deliveryRadius}
                        pathOptions={{
                          color: "#B6BBC7",
                          fillColor: "#9292D1",
                          fillOpacity: 0.5,
                        }}
                      />
                    )}
                    {/* Edit and Delete Buttons */}
                    <div className="flex justify-between mt-2">
                      {user &&
                        (user.roles.includes("ROLE_ADMIN") ||
                          user.roles.includes("ROLE_MODERATOR")) && user.id === store.adminId && (
                          <a
                            onClick={() => handleEdit(store.storeID)}
                            className="text-blue-500 text-sm bg-slate-300 rounded-md px-2 py-1 mr-2"
                            href={`/edit/${store.storeID}`}
                          >
                            แก้ไข
                          </a>
                        )}

                      {user && user.roles.includes("ROLE_ADMIN") && (
                        <button
                          onClick={() => handleDeleteStore(store.storeID)}
                          className="text-red-500 text-sm bg-red-100 rounded-md px-2 py-1"
                        >
                          ลบ
                        </button>
                      )}

                      {user && user.roles.includes("ROLE_USER") && (
                        <button className="text-blue-500 text-sm bg-sky-100 rounded-md px-2 py-1 hover:bg-slate-400">
                          ช้อปเลย!
                        </button>
                      )}
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          {myLocation.lat && myLocation.lng && (
            <Marker
              position={[myLocation.lat, myLocation.lng]}
              icon={houseIcon}
            >
              <Popup>
                <strong>Your Location</strong>
              </Popup>
            </Marker>
          )}
          <LocationMap />
        </MapContainer>
      </div>
    </>
  );
};

export default ComponentMap;
