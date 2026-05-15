import React, { useEffect, useState } from 'react';

const StudentDashboard = () => {

  const [student, setStudent] = useState(null);
  const [marks, setMarks] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {

    fetchStudentData();

  }, []);

  const fetchStudentData = async () => {

    try {

      const studentId = user?.student_id;

      if (!studentId) {

        console.log('Student ID not found');

        setLoading(false);

        return;
      }

      // Student

      try {

        const studentRes = await fetch(
          `http://localhost:5000/api/student/${studentId}`
        );

        if (studentRes.ok) {

          const studentData = await studentRes.json();

          setStudent(studentData);
        }

      } catch (error) {

        console.log('Student data error:', error);
      }

      // Marks

      try {

        const marksRes = await fetch(
          `http://localhost:5000/api/student/${studentId}/marks`
        );

        if (marksRes.ok) {

          const marksData = await marksRes.json();

          setMarks(Array.isArray(marksData) ? marksData : []);
        }

      } catch (error) {

        console.log('Marks error:', error);
      }

      // Attendance

      try {

        const attendanceRes = await fetch(
          `http://localhost:5000/api/student/${studentId}/attendance`
        );

        if (attendanceRes.ok) {

          const attendanceData = await attendanceRes.json();

          setAttendance(
            Array.isArray(attendanceData)
              ? attendanceData
              : []
          );
        }

      } catch (error) {

        console.log('Attendance error:', error);
      }

      // Subjects

      try {

        const subjectsRes = await fetch(
          `http://localhost:5000/api/student/${studentId}/subjects`
        );

        if (subjectsRes.ok) {

          const subjectsData = await subjectsRes.json();

          setSubjects(
            Array.isArray(subjectsData)
              ? subjectsData
              : []
          );
        }

      } catch (error) {

        console.log('Subjects error:', error);
      }

      // Timetable

      try {

        const timetableRes = await fetch(
          `http://localhost:5000/api/student/${studentId}/timetable`
        );

        if (timetableRes.ok) {

          const timetableData = await timetableRes.json();

          setTimetable(
            Array.isArray(timetableData)
              ? timetableData
              : []
          );
        }

      } catch (error) {

        console.log('Timetable error:', error);
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  if (loading) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl">

        Loading Dashboard...

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-black text-white p-6">

      {/* Header */}

      <div className="bg-blue-700 rounded-xl p-6 shadow-lg mb-6">

        <h1 className="text-3xl font-bold">
          Student Dashboard
        </h1>

        {student ? (

          <div className="mt-4 grid md:grid-cols-2 gap-4">

            <div>

              <p>
                <strong>Name:</strong> {student?.name}
              </p>

              <p>
                <strong>Student ID:</strong> {student?.student_id}
              </p>

            </div>

            <div>

              <p>
                <strong>Department:</strong> {student?.department}
              </p>

              <p>
                <strong>Email:</strong> {student?.email}
              </p>

            </div>

          </div>

        ) : (

          <div className="mt-4 bg-yellow-100 text-black p-4 rounded-lg">

            Student details not available in database.

          </div>
        )}

      </div>

      {/* Marks & Attendance */}

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Marks */}

        <div className="bg-white text-black rounded-xl p-5 shadow-lg">

          <h2 className="text-2xl font-bold mb-4 text-blue-700">
            Marks
          </h2>

          {marks.length > 0 ? (

            <div className="overflow-x-auto">

              <table className="w-full border">

                <thead className="bg-blue-700 text-white">

                  <tr>

                    <th className="p-2">Subject</th>

                    <th className="p-2">Mid 1</th>

                    <th className="p-2">Mid 2</th>

                    <th className="p-2">Semester</th>

                  </tr>

                </thead>

                <tbody>

                  {marks.map((mark) => (

                    <tr
                      key={mark.id}
                      className="border-b"
                    >

                      <td className="p-2">
                        {mark.subject_name}
                      </td>

                      <td className="p-2">
                        {mark.mid1}
                      </td>

                      <td className="p-2">
                        {mark.mid2}
                      </td>

                      <td className="p-2">
                        {mark.semester_marks}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          ) : (

            <p className="text-gray-500">
              Marks not uploaded yet.
            </p>
          )}

        </div>

        {/* Attendance */}

        <div className="bg-white text-black rounded-xl p-5 shadow-lg">

          <h2 className="text-2xl font-bold mb-4 text-blue-700">
            Attendance
          </h2>

          {attendance.length > 0 ? (

            attendance.map((item) => (

              <div
                key={item.id}
                className="border rounded-lg p-3 mb-3"
              >

                <p>
                  <strong>Subject:</strong> {item.subject_code}
                </p>

                <p>
                  <strong>Total Classes:</strong> {item.total_classes}
                </p>

                <p>
                  <strong>Attended:</strong> {item.attended_classes}
                </p>

                <p>
                  <strong>Attendance:</strong> {item.attendance_percentage}%
                </p>

              </div>
            ))

          ) : (

            <p className="text-gray-500">
              Attendance data not available.
            </p>
          )}

        </div>

      </div>

      {/* Subjects & Timetable */}

      <div className="grid lg:grid-cols-2 gap-6 mt-6">

        {/* Subjects */}

        <div className="bg-white text-black rounded-xl p-5 shadow-lg">

          <h2 className="text-2xl font-bold mb-4 text-blue-700">
            Subjects
          </h2>

          {subjects.length > 0 ? (

            subjects.map((subject) => (

              <div
                key={subject.id}
                className="border rounded-lg p-3 mb-3"
              >

                <p>
                  <strong>Code:</strong> {subject.subject_code}
                </p>

                <p>
                  <strong>Name:</strong> {subject.subject_name}
                </p>

              </div>
            ))

          ) : (

            <p className="text-gray-500">
              Subjects not available.
            </p>
          )}

        </div>

        {/* Timetable */}

        <div className="bg-white text-black rounded-xl p-5 shadow-lg">

          <h2 className="text-2xl font-bold mb-4 text-blue-700">
            Timetable
          </h2>

          {timetable.length > 0 ? (

            timetable.map((item) => (

              <a
                key={item.id}
                href={`http://localhost:5000/uploads/timetables/${item.pdf_file}`}
                target="_blank"
                rel="noreferrer"
                className="block bg-blue-700 text-white px-4 py-3 rounded-lg mb-3 hover:bg-blue-800"
              >

                View Timetable PDF

              </a>
            ))

          ) : (

            <p className="text-gray-500">
              Timetable not uploaded yet.
            </p>
          )}

        </div>

      </div>

    </div>
  );
};

export default StudentDashboard;