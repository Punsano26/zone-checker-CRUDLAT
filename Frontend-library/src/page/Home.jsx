import { useEffect, useState } from 'react';
import Libraries from '../components/Libraries';
import Search from '../components/Search';
import LibrariesService from '../services/library.service';
import Swal from 'sweetalert2';
import FillterCandY from '../components/FillterCandY';
import BranderSlider from '../components/BranderSlider';


const Home = () => {
  const [libraries, setLibraries] = useState([]);
  const [filteredLibraries, setFilteredLibraries] = useState([]);
  useEffect(() => {
    const getAllLibrary = async () => {
      try {
        const response = await LibrariesService.getAllLibrary();
        if(response.status === 200){
          setLibraries(response.data);
        setFilteredLibraries(response.data);
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops... Get all libraries failed',
          text: error?.response?.data?.message || error.message,
          footer: '<a href="">Why do I have this issue?</a>'
        });
      }
    };
    getAllLibrary();
  }, []);

  return (
    <div className='container flex flex-col items-center justify-center mx-auto'>
      <BranderSlider />
  {/* Section for Search and Filters */}
  <div className="w-full flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0 lg:space-x-6 mb-8">
    <div className="w-full lg:w-auto">
      {/* Search Component */}
      <Search 
        library={libraries}
        setFilteredLibraries={setFilteredLibraries}
      />
    </div>

    <div className="w-full lg:w-auto">
      {/* Category and Year Filter Component */}
      <FillterCandY libraries={libraries} setFilteredLibraries={setFilteredLibraries} />
    </div>
  </div>

  {/* Section for Libraries */}
  <Libraries libraries={filteredLibraries} />
</div>

  );
}

export default Home