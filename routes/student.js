import express from "express";
import courseHandler from "../handlers/course.js";
import studentCourseHandler from "../handlers/student/course.js";
import studentScheduleHandler from "../handlers/student/schedule.js";
import middlewares from "../middlewares/index.js";
import studentLectureHandler from "../handlers/student/lecture.js";

const router = express.Router();

router.route("/schedule").get(studentScheduleHandler.getSchedule);

router.route("/course").get(studentCourseHandler.getCourses);

router
  .route("/course/:courseId")
  .post(
    middlewares.checkStudentNotEnrolledInCourse,
    studentCourseHandler.enrollCourse
  )
  .get(middlewares.checkStudentEnrolledInCourse, courseHandler.getCourse)
  .delete(
    middlewares.checkStudentEnrolledInCourse,
    studentCourseHandler.unenrollCourse
  );

router
  .route("/course/:courseId/lecture/:lectureId")
  .post(studentLectureHandler.registerForLecture);

export default router;
