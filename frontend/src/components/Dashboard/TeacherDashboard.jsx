import React, { useEffect, useState } from 'react';

const TeacherDashboard = () => {

  const [students, setStudents] = useState([]);

  const [markData, setMarkData] = useState({
    student_id: '',
    subject_name: '',
    mid1: '',
    mid2: '',
    semester_marks: ''
  });

  useEffect(() => {

    fetchStudents();

  }, []);

  const fetchStudents = async () => {

    try {

      const response = await fetch(
        'http://localhost:5000/api/teacher/students/all'
      );

      const data = await response.json();

      setStudents(data);

    } catch (error) {

      console.log(error);
    }
  };

  const handleChange = (e) => {

    setMarkData({
      ...markData,
      [e.target.name]: e.target.value
    });
  };

  const addMarks = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        'http://localhost:5000/api/teacher/marks',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(markData)
        }
      );

      const data = await response.json();

      alert(data.message);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="min-h-screen bg-black text-white p-6">

      <div className="bg-blue-700 rounded-xl p-6 mb-6 shadow-lg">
        <h1 className="text-3xl font-bold">
          Teacher Dashboard
        </h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white text-black rounded-xl p-5 shadow-lg">

          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            Students List
          </h2>

          <div className="overflow-y-auto max-h-[500px]">

            {students.map((student) => (

              <div
                key={student.id}
                className="border rounded-lg p-3 mb-3"
              >
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>ID:</strong> {student.student_id}</p>
                <p><strong>Department:</strong> {student.department}</p>
              </div>

            ))}

          </div>

        </div>

        <div className="bg-white text-black rounded-xl p-5 shadow-lg">

          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            Add Student Marks
          </h2>

          <form
            onSubmit={addMarks}
            className="space-y-4"
          >

            <input
              type="text"
              name="student_id"
              placeholder="Student ID"
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />

            <input
              type="text"
              name="subject_name"
              placeholder="Subject Name"
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />

            <input
              type="number"
              name="mid1"
              placeholder="Mid 1 Marks"
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />

            <input
              type="number"
              name="mid2"
              placeholder="Mid 2 Marks"
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />

            <input
              type="number"
              name="semester_marks"
              placeholder="Semester Marks"
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800"
            >
              Add Marks
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default TeacherDashboard;