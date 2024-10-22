import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LibrariesService from '../services/library.service';


const Editbook = () => {
    const navigate = useNavigate();
    const { bookID } = useParams();
  const [libraryBook, setLibraryBook] = useState({
    title: '',
    img: '',
    author: '',
    publicationYear: '',
    category: '',
    page: '',
    price: '',
  });

  //Get LibraryBook By ID
useEffect(() => {
    LibrariesService.getLibraryById(bookID).then((response) => {
        if (response.status === 200) {
            setLibraryBook(response.data);
        }
    })
}, [bookID])
  const handleChange = (e) => {
    setLibraryBook({ ...libraryBook, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
        const response = await LibrariesService.updateLibrary(bookID,libraryBook);
        if (response.status === 200) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'แก้ไขรายการหนังสือสำเร็จ',
                text: response.data.message,
                timer: 2000
            });
            navigate("/");
        }
    } catch (error) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: error?.response?.data?.message || error.message,
            timer: 2000
        });
    }
  };

  const years = Array.from({ length: 36 }, (v, i) => 1990 + i);
  const categories = ['วารสาร', 'หนังสือการ์ตูน', 'หนังสือผู้ใหญ่', 'นิวนิยาย', 'สารคดีประวัติศาสตร์', 'การศึกษา'];

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold mb-6">Edit a Book</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={libraryBook.title}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Image URL</label>
          {libraryBook.img && (
            <div className='flex justify-center gap-2 py-4'>
              <img src={libraryBook.img} className="h-32" />
            </div>
          )}
          <input
            type="text"
            name="img"
            value={libraryBook.img}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Author */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Author</label>
          <input
            type="text"
            name="author"
            value={libraryBook.author}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Publication Year */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Publication Year</label>
          <select
            name="publicationYear"
            value={libraryBook.publicationYear}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="" disabled>Select a year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Category</label>
          <div className="flex flex-col space-y-2">
            {categories.map((category) => (
              <label key={category} className="cursor-pointer flex items-center space-x-2">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  onChange={handleChange}
                  checked={libraryBook.category === category}
                  className="radio radio-primary"
                  required
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Page Count */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Page Count</label>
          <input
            type="number"
            name="page"
            value={libraryBook.page}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

         {/* Price manage*/}
         <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={libraryBook.price}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Editbook;
