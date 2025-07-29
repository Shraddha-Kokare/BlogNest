import React, { useEffect, useState } from 'react';
import Blog from './Blog';
import { api_base_url } from '../helper';

const Blogs = () => {
  const [data, setData] = useState(null);

  const getBlogs = () => {
    fetch(api_base_url + "/getBlogs", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("Blogs data received: ", data.blogs);
          setData(data.blogs);
        } else {
          alert(data.msg);
        }
      });
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <>
      <div className="blogs px-4 sm:px-6 md:px-10 lg:px-[100px] mt-4 mb-5">
        <h3 className="text-2xl font-semibold mb-6">Latest Blogs</h3>

<div className="blogsCon grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data ? (
            data.map((item, index) => (
              <Blog key={index} data={item} />
            ))
          ) : (
            <p className="text-gray-500">No Blogs Found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Blogs;
