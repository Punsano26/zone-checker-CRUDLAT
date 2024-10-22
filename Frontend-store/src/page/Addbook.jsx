import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LibrariesService from '../services/library.service';
import { useAuthContext } from '../contexts/AuthContext';

const AddForm = () => {
    const navigate = useNavigate();
  const [libraryBook, setLibraryBook] = useState({
    title: '',
    img: '',
    author: '',
    publicationYear: '',
    category: '',
    page: '',
    price: '',
  });

  const handleChange = (e) => {
    setLibraryBook({ ...libraryBook, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', libraryBook);
    try {
        const response = await LibrariesService.addLibrary(libraryBook);
        if (response.status === 200) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'เพิ่มรายการหนังสือสำเร็จ',
                text: response.data.message,
                timer: 2000
            }).then(() => {
                setLibraryBook({title: '',
                    img: '',
                    author: '',
                    publicationYear: '',
                    category: '',
                    page: '',});
                    navigate("/");
            });
        }
    } catch (error) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: error?.response?.data?.message,
            timer: 2000
        });
    }
  };

  const years = Array.from({ length: 36 }, (v, i) => 1990 + i);
  const categories = ['วารสาร', 'หนังสือการ์ตูน', 'หนังสือผู้ใหญ่', 'นิวนิยาย', 'สารคดีประวัติศาสตร์', 'การศึกษา'];

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold mb-6">Add New Book</h2>
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
        {/* Price page */}
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

export default AddForm;
