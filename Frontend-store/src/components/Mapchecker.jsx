import { useEffect, useState } from "react"; //
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  Circle,
  useMapEvents,
} from "react-leaflet"; //
import "leaflet/dist/leaflet.css"; //
import L from "leaflet";
import Swal from "sweetalert2";
import { icon, Icon } from "leaflet";
import StoreService from "../services/store.service";
import { useAuthContext } from "../contexts/AuthContext";

const Mapchecker = ({
  myLocation,
  setMyLocation,
  deliveryZone,
  setDeliveryZone,
}) => {
  const center = [13.838492331040143, 100.02533605919358]; //NPRU
  const [stores, setStores] = useState([]);
  const { user } = useAuthContext();

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

  const LocationMap = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMyLocation({ lat, lng });
      },
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "คุณแน่ใจแล้วหรือไม่ ที่จะลบมัน?",
      text: "คิดให้ดีๆนะสู? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#056f00",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่, ลบทิ้ง!",
      cancelButtonText: "ไม่, ยกเลิก!",
    });
    if (confirmDelete.isConfirmed) {
      try {
        const response = await StoreService.deletestore(id);
        if (response.status === 200) {
          Swal.fire({
            title: "ลบร้านค้าสำเร็จ",
            text: response.data.message,
            icon: "success",
          }).then(() => {
            window.location.reload();
          });
        }
      } catch (error) {
        Swal.fire({
          title: "ลบร้านค้าล้มเหลว",
          text: error?.response?.data?.message || error.message,
          icon: "error",
        });
      }
    }
  };

  return (
    <>
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "80vh", width: "80vw" }}
        className="shadow-lg rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* แสดงตำแหน่งที่คลิก */}
        {myLocation?.lat && myLocation?.lng && (
          <Marker position={[myLocation.lat, myLocation.lng]}>
            <Popup>
              ตำแหน่งที่เลือก: <br />
              Latitude: {myLocation.lat}, Longitude: {myLocation.lng}
            </Popup>
          </Marker>
        )}

        {stores &&
          stores.map((store) => {
            return (
              <Marker
                key={store.storeID}
                position={[store.lat, store.lng]}
                eventHandlers={{
                  click: () => {
                    setDeliveryZone(store);
                  },
                }}
              >
                <Popup>
                  <b>{store.storeName}</b>
                  <p>{store.address}</p>
                  <a
                    href={store.direction}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Direction
                  </a>
                  {user &&
                    (user.roles.includes("ROLES_MODERATOR") ||
                      user.roles.includes("ROLES_ADMIN")) && (
                      <div className="card-actions flex justify-center items-center p-2">
                        {/* ปุ่มลบจะแสดงเมื่อ user เป็น ADMIN และ user.id ตรงกับ store.userId */}
                        {user.roles.includes("ROLES_ADMIN") &&
                          user.id === store.userId && (
                            <button
                              className="btn btn-sm btn-error"
                              type="button"
                              onClick={() => handleDelete(store.id)}
                            >
                              ลบ
                            </button>
                          )}
                        {/* ตรวจสอบว่า user.id ตรงกับ store.userId ก่อนแสดงปุ่มแก้ไข */}
                        {user.id === store.userId && (
                          <a
                            href={`/edit/${store.id}`}
                            className="btn btn-sm btn-warning !text-black"
                            type="button"
                          >
                            แก้ไข
                          </a>
                        )}
                      </div>
                    )}
                </Popup>
                {deliveryZone && deliveryZone.storeID === store.storeID && (
                  <Circle
                    center={[store.lat, store.lng]}
                    radius={deliveryZone.deliveryRadius || 100} // ใช้ radius จาก deliveryZone
                    pathOptions={{
                      color: "#F5EED8",
                      fillColor: "#c4bcac",
                      fillOpacity: 0.3,
                    }}
                  />
                )}
                {console.log("deliveryRadius:", deliveryZone)}; // ตรวจสอบค่าของ
                deliveryRadius
                {console.log("deliveryRadius:", deliveryZone?.deliveryRadius)};
                // ตรวจสอบ radius
              </Marker>
            );
          })}
        <LocationMap />
      </MapContainer>
    </>
  );
};

export default Mapchecker;
