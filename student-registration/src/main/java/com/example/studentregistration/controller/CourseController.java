package com.example.studentregistration.controller;

import com.example.studentregistration.model.Course;
import com.example.studentregistration.model.request.CreateCourseRequest;
import com.example.studentregistration.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
public class CourseController {
    
    @Autowired
    private CourseRepository courseRepository;

    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @PostMapping
    public Course creatCourse(@RequestBody CreateCourseRequest request) {
        Course course = new Course(request.getName());
        return courseRepository.save(course);
    }

    @PutMapping("/{id}")
    public Course updatCourse(@PathVariable Long id, @RequestBody Course courseDetails) {
        Course course = courseRepository.findById(id).orElseThrow();
        course.setName(courseDetails.getName());
        return courseRepository.save(course);
    }

    @DeleteMapping("/{id}")
    public void deleteCourse(@PathVariable Long id) {
        courseRepository.deleteById(id);
    }
}
