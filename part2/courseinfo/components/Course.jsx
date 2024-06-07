import React from "react";
import Header from "./Header";
import Content from "./Content";
import Part from "./Part";
import Total from "./Total";

const Course = ({ course }) => {
  return (
    <div>
      {course.map((course) => (
        <div key={course.id}>
          <Header course={course} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </div>
  );
};

export default Course;
