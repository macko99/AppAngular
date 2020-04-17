import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Course} from '../Interfaces/course';
import {ActiveCourseService} from '../active-course.service';
import {CoursesServiceService} from '../courses-service.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']

})
export class CourseComponent implements OnInit {

  @Input() course: Course;
  @Output() coursIsDeleted: EventEmitter<string> = new EventEmitter<string>();

  constructor(private activeCourseService: ActiveCourseService, private CourseService: CoursesServiceService) {
  }

  ngOnInit() {
  }

  onDelete(key: string): void {
    console.log(this.course.id);
    this.activeCourseService.setActiveCourse('brak');
    this.coursIsDeleted.emit(key);
    this.CourseService.deleteCours(key);
  }


}
