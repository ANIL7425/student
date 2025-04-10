
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StudentForm from './Components/StudentForm'
import { useState } from 'react'
import TemplateSwitcher from './Components/TemplateSwitcher'
import IDCard from './Components/IDCard'
import { useEffect } from 'react'
function App() {
 const [studentData,setStudentData]=useState(null);
 const [template, setTemplate] = useState("template1");
 const [allStudents, setAllStudents] = useState([]);
 useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("studentDataList") || "[]");
  setAllStudents(saved);
}, []);


const handleFormSubmit = (data) => {
  const updated = [...allStudents, data];
  setAllStudents(updated);
  localStorage.setItem("studentDataList", JSON.stringify(updated));
  setStudentData(data);
};
  return (
    <>
       
       <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center text-orange-800 mb-4">
          Student ID Generator
        </h1>

        <TemplateSwitcher template={template} setTemplate={setTemplate} />

        <StudentForm onSubmit={handleFormSubmit} />

        {studentData && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-green-700 mb-2">Generated ID Card</h2>
            <IDCard data={studentData} template={template} />
          </div>
        )}

        {allStudents.length > 1 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Previous ID Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allStudents.map((data, i) => (
                <div key={i} className="border border-gray-300 p-4 rounded shadow bg-white">
                  <p className="font-medium text-gray-700">
                    {data.name} - Roll: {data.roll}
                  </p>
                  <button
                    className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    onClick={() => setStudentData(data)}
                  >
                    View ID
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>



    </>
  )
}

export default App
