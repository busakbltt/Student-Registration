package com.example.studentregistration.controller;

import com.example.studentregistration.model.Course;
import com.example.studentregistration.model.Student;
import com.example.studentregistration.repository.CourseRepository;
import com.example.studentregistration.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
//....
@RestController
@RequestMapping("/students")
public class StudentCourseController {
    
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/{studentId}/courses/{courseId}")
    public ResponseEntity<Student> addCourseToStudent(@PathVariable Long studentId, @RequestBody Long courseId) {
        Optional<Student> studentOpt = studentRepository.findById(studentId);
        Optional<Course> courseOpt = courseRepository.findById(courseId);

        if (studentOpt.isPresent() && courseOpt.isPresent()) {
            Student student = studentOpt.get();
            Course course = courseOpt.get();
            student.getCourses().add(course);
            studentRepository.save(student);
            return ResponseEntity.ok(student);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{studentId}/courses/{courseId}")
    public ResponseEntity<Student> removeCourseFromStudent(@PathVariable Long studentId, @PathVariable Long courseId) {
        Optional<Student> studentOpt = studentRepository.findById(studentId);
        Optional<Course> courseOpt = courseRepository.findById(courseId);

        if (studentOpt.isPresent() && courseOpt.isPresent()) {
            Student student = studentOpt.get();
            student.getCourses().remove(courseOpt.get());
            studentRepository.save(student);
            return ResponseEntity.ok(student);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // @PostMapping("/{studentId}/courses/{courseId}")
    // public Student addCourseToStudent(@PathVariable Long studentId, @PathVariable Long courseId) {
    //     Optional<Student> studentOpt = studentRepository.findById(studentId);
    //     Optional<Course> courseOpt = courseRepository.findById(courseId);

    //     if (studentOpt.isPresent() && courseOpt.isPresent()) {
    //         Student student = studentOpt.get();
    //         Course course = courseOpt.get();
    //         student.getCourses().add(course);
    //         return studentRepository.save(student);
    //     } else {
    //         throw new RuntimeException("Student or Course not found");
    //     }
    // }

    // @DeleteMapping("/{studentId}/courses/{courseId}")
    // public Student removeCourseFromStudent(@PathVariable Long studentId, @PathVariable Long courseId) {
    //     Optional<Student> studentOpt = studentRepository.findById(studentId);
    //     Optional<Course> courseOpt = courseRepository.findById(courseId);

    //     if (studentOpt.isPresent() && courseOpt.isPresent()) {
    //         Student student = studentOpt.get();
    //         student.getCourses().remove(courseOpt.get());
    //         return studentRepository.save(student);
    //     } else {
    //         throw new RuntimeException("Student or Course not found");
    //     }
    // }

}
