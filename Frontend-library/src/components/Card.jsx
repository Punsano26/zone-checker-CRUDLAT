import React from "react";
import Swal from "sweetalert2";
import LibraryService from "../services/library.service";
import { useAuthContext } from "../contexts/AuthContext";

const Card = ({
  bookID,
  title,
  img,
  author,
  publicationYear,
  category,
  page,
  price,
}) => {
  const { user } = useAuthContext();
  console.log("Price in Card component:", price);
  const deleteBook = async (bookID) => {
    console.log("Deleting book with ID:", bookID);
    try {
      const response = await LibraryService.deleteLibrary(bookID);
      if (response.status === 200) {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Remove หนังสืออกจากระบบเรียบร้อย!",
              icon: "success",
              timer: 1800,
            }).then(() => {
              window.location.reload();
            });
          } else if (result.isDismissed) {
            Swal.fire({
              title: "Cancelled",
              text: "Your file is safe.",
              icon: "info",
            });
          }
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error?.response?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="card glass w-80 shadow-xl">
      <figure>
        <img src={img} alt="Book!" className="rounded w-36 h-56 mt-3" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p><span className="font-bold">ผู้แต่ง: </span>{author}</p>
        <p><span className="font-bold">ปีที่ตีพิมพ์: </span>{publicationYear}</p>
        <p><span className="font-bold">หมวดหมู่: </span>{category}</p>
        <p><span className="font-bold">จำนวนหน้า: </span>{page}<span> หน้า</span></p>
        <p><span className="font-bold">ราคา: <span>{price ? `${price} ฿` : "N/A"}</span></span></p>

        {user &&
          (user.roles.includes("ROLE_MODERATOR") ||
            user.roles.includes("ROLE_ADMIN")) && (
            <div className="card-actions justify-end">
              <a href={`/edit/${bookID}`} className="btn btn-primary">
                Edit now!
              </a>
              {user && user.roles.includes("ROLE_ADMIN") && (
                <button
                  onClick={() => deleteBook(bookID)}
                  className="btn bg-red-500 hover:bg-red-300"
                >
                  Remove a book
                </button>
              )}
            </div>
          )}
          {user && 
            (user.roles.includes("ROLE_USER") && (
              <div className="card-actions justify-end">
                <a href="https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.15752-9/460124662_547760687645575_7105410169748693913_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeFLJImZv3j4-ChFMWb2H-MDAGYWCnHmI-YAZhYKceYj5mMxMh-Ks_Wt1GZJRDQJ8tBWJQsIHO1aKmi65ngkshl2&_nc_ohc=sPjoXJco1cgQ7kNvgFKWUfL&_nc_ht=scontent.fbkk2-8.fna&_nc_gid=Au3znoFft4N9HFAHWJBgC_R&oh=03_Q7cD1QFOZuKC3U2St8kJNZvC-NkGhceJojuJl7jo8zjvktjZTA&oe=671B433E" target="_blank" className="btn btn-success hover:bg-green-300">Buy now</a>
              </div>
            ))}
          
      </div>
    </div>
  );
};

export default Card;
