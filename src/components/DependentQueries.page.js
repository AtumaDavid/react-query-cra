// import React from "react";
// import axios from "axios";
// import { useQuery } from "react-query";

// const fetchUserByEmail = (email) => {
//   return axios.get(`http://localhost:4000/users/${email}`);
// };

// const fetchCoursesByChannelId = (channelId) => {
//   return axios.get(`http://localhost:4000/channels/${channelId}`);
// };

// export default function DependentQueriesPage({ email }) {
//   const { data: user } = useQuery(["user", email], () =>
//     fetchUserByEmail(email)
//   );

//   const channelId = user?.data.channelId;

//   useQuery(["courses", channelId], () => fetchCoursesByChannelId(channelId), {
//     enabled: !!channelId,
//   });
//   return <div>DependentQueriesPage</div>;
// }

import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

export default function DependentQueriesPage({ email }) {
  const { data: user, isLoading: isUserLoading } = useQuery(
    ["user", email],
    () => fetchUserByEmail(email)
  );

  const channelId = user?.data.channelId;

  const {
    data: coursesData,
    isLoading: isCoursesLoading,
    isError,
  } = useQuery(
    ["courses", channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      enabled: !!channelId,
    }
  );

  if (isUserLoading || isCoursesLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  const courses = coursesData?.data.courses || [];

  return (
    <div>
      <h2>Courses for Channel ID: {channelId}</h2>
      {courses.length > 0 ? (
        <ul>
          {courses.map((course, index) => (
            <li key={index}>{course}</li>
          ))}
        </ul>
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
}
