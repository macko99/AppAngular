import {Component, OnInit, Input} from '@angular/core';
import {Course} from '../Interfaces/course';
import {CoursesServiceService} from '../courses-service.service';
import {ActivatedRoute} from '@angular/router';
import {ActiveCourseService} from '../active-course.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  course: Course;
  id: any;
  canJoin = false;
  message: String = '';
  message2: String = '';

  constructor(private coursesService: CoursesServiceService, private route: ActivatedRoute, private activeCourseService: ActiveCourseService) {

  }

  onSaveRating(rate: number): void {
    this.id = this.route.snapshot.paramMap.get('id');
    const key = this.course.id;
    const result = this.coursesService.saveRating(String(key), rate);
    console.log(result);
    if (result != true) {
      this.message2 = 'nie mozna juz ocenic!';
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.initialiseState();
    });
  }

  initialiseState() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.message = '';
    if (this.id != 'brak') {
      this.course = this.coursesService.getCours(this.id);
      this.activeCourseService.setActiveCourse(this.id);
      this.canJoin = this.course.maxStudents >= this.course.occupiedPlaces;
    } else {
      this.course = null;
    }
  }

  tryJoinCourse() {
    if (this.id != 'brak') {
      if (this.canJoin) {
        if (this.coursesService.joinCourse(this.id)) {
          this.message = 'Dołączono pomyślnie :)';
          return;
        } else {
          this.message = 'Nie mozna dolaczyc!';
          return;
        }
      }
    } else {
      this.message = 'Wybierz kurs!';
      return;
    }
  }


}
