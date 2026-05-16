import React, { useEffect, useState } from 'react';

const ParentDashboard = () => {

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {

    try {

      if (!user?.mobile) {

        setLoading(false);

        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/parent/${user.mobile}/student`
      );

      if (!response.ok) {

        setData(null);

        setLoading(false);

        return;
      }

      const result = await response.json();

      // Safe check

      if (!result || !result.student) {

        setData(null);

      } else {

        setData(result);
      }

    } catch (error) {

      console.log(error);

      setData(null);

    } finally {

      setLoading(false);
    }
  };

  // Loading Screen

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

      <div className="bg-blue-700 rounded-xl p-6 mb-6 shadow-lg">

        <h1 className="text-3xl font-bold">
          Parent Dashboard
        </h1>

      </div>

      {/* No Student Found */}

      {!data && (

        <div className="bg-yellow-100 text-black rounded-xl p-5 shadow-lg">

          <h2 className="text-2xl font-bold mb-3">
            No Student Details Present
          </h2>

          <p>
            No student information is linked with this parent account.
          </p>

        </div>
      )}

      {/* Student Data */}

      {data && (

        <>

          {/* Student Details */}

          <div className="bg-white text-black rounded-xl p-5 shadow-lg mb-6">

            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Student Details
            </h2>

            <p>
              <strong>Name:</strong> {data?.student?.name}
            </p>

            <p>
              <strong>Student ID:</strong> {data?.student?.student_id}
            </p>

            <p>
              <strong>Department:</strong> {data?.student?.department}
            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Marks */}

            <div className="bg-white text-black rounded-xl p-5 shadow-lg">

              <h2 className="text-2xl font-bold text-blue-700 mb-4">
                Marks
              </h2>

              {data?.marks?.length > 0 ? (

                data.marks.map((mark) => (

                  <div
                    key={mark.id}
                    className="border rounded-lg p-3 mb-3"
                  >

                    <p>
                      <strong>Subject:</strong> {mark.subject_name}
                    </p>

                    <p>
                      <strong>Mid1:</strong> {mark.mid1}
                    </p>

                    <p>
                      <strong>Mid2:</strong> {mark.mid2}
                    </p>

                    <p>
                      <strong>Semester:</strong> {mark.semester_marks}
                    </p>

                  </div>
                ))

              ) : (

                <p className="text-gray-500">
                  Marks not uploaded yet.
                </p>
              )}

            </div>

            {/* Attendance */}

            <div className="bg-white text-black rounded-xl p-5 shadow-lg">

              <h2 className="text-2xl font-bold text-blue-700 mb-4">
                Attendance
              </h2>

              {data?.attendance?.length > 0 ? (

                data.attendance.map((item) => (

                  <div
                    key={item.id}
                    className="border rounded-lg p-3 mb-3"
                  >

                    <p>
                      <strong>Subject:</strong> {item.subject_code}
                    </p>

                    <p>
                      <strong>Attendance:</strong> {item.attendance_percentage}%
                    </p>

                  </div>
                ))

              ) : (

                <p className="text-gray-500">
                  Attendance not available.
                </p>
              )}

            </div>

          </div>

        </>
      )}

    </div>
  );
};

export default ParentDashboard;