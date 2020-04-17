import {Injectable} from '@angular/core';
import {CoursesServiceService} from './courses-service.service';

@Injectable({
  providedIn: 'root'
})
export class ActiveCourseService {

  private activeCourse: number;

  constructor(private courses: CoursesServiceService) {
  }

  setActiveCourse(id: any) {
    this.activeCourse = id;
  }

  getActiveCourse() {
    return this.activeCourse;
  }
}
