import {Component, OnInit} from '@angular/core';
import {CoursesServiceService} from '../courses-service.service';
import {Course} from '../Interfaces/course';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {

  courses: Course[];
  searchName: string;
  minRating: number;
  maxRating: number;
  minEcts: number;
  maxEcts: number;
  maxSem: number;
  minSem: number;

  constructor(private coursesService: CoursesServiceService,
              private authService: AuthService) {
  }

  getCourses(): void {
    this.coursesService.getCourses().subscribe(
      courses => {
        if (this.authService.getCurrentuser() != null) {
          this.courses = courses.filter(course => {
            return course.users != null && course.users[this.authService.getCurrentuser().uid] != null;
          });
        }
      }
    );
  }

  ngOnInit() {
    this.getCourses();
  }

  deleteCourse(key: string) {
    this.coursesService.deleteCours(key);
    this.getCourses();
  }

  searchCourses({searchName, minSem, maxSem, minRating, maxRating, minEcts, maxEcts}) {
    this.searchName = searchName;
    this.minSem = minSem;
    this.maxSem = maxSem;
    this.minRating = minRating;
    this.maxRating = maxRating;
    this.minEcts = minEcts;
    this.maxEcts = maxEcts;
  }
}
