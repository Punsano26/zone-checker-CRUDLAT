import { useEffect, useState } from "react";

const FillterCandY = ({ libraries, setFilteredLibraries }) => {
  const [categoryFillter, setCategorysFillter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  const handleFilter = () => {
    let filtered = libraries;

    if (categoryFillter) {
      filtered = filtered.filter((lib) => lib.category === categoryFillter);
    }

    if (yearFilter) {
      filtered = filtered.filter(
        (lib) => lib.publicationYear === parseInt(yearFilter)
      );
    }

    setFilteredLibraries(filtered);
  };

  const handleCategoryChange = (e) => {
    setCategorysFillter(e.target.value);
  };

  const handleYearChange = (e) => {
    setYearFilter(e.target.value);
  };

  useEffect(() => {
    handleFilter(); // เรียกใช้การกรองเมื่อค่าเปลี่ยนแปลง
  }, [categoryFillter, yearFilter, libraries]);

  return (
    <div className="flex justify-end mr-5 space-x-4 mt-4">
      {/* Category Filter */}
      <div className="flex flex-col">
        <label htmlFor="category" className="text-gray-600 font-semibold mb-1">
          Filter by category
        </label>
        <select
          name="category"
          id="category"
          value={categoryFillter}
          onChange={handleCategoryChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
        >
          <option value="">เลือกหมวดหมู่</option>
          <option value="หนังสือผู้ใหญ่">หนังสือผู้ใหญ่</option>
          <option value="วารสาร">วารสาร</option>
          <option value="หนังสือการ์ตูน">หนังสือการ์ตูน</option>
          <option value="นิวนิยาย">นิวนิยาย</option>
          <option value="สารคดีประวัติศาสตร์">สารคดีประวัติศาสตร์</option>
          <option value="การศึกษา">การศึกษา</option>
        </select>
      </div>

      {/* Year Filter */}
      <div className="flex flex-col">
        <label htmlFor="year" className="text-gray-600 font-semibold mb-1">
          Filter by year
        </label>
        <select
          id="year"
          value={yearFilter}
          onChange={handleYearChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
        >
          <option value="">All Years</option>
          {Array.from({ length: 2025 - 1990 + 1 }, (v, i) => 1990 + i).map(
            (year) => (
              <option key={year} value={year}>
                {year}
              </option>
            )
          )}
        </select>
      </div>
    </div>
  );
};

export default FillterCandY;
