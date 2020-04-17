import {Component, Output, OnInit, Input, EventEmitter} from '@angular/core';
import Rating from '../Interfaces/rating';
import {CoursesServiceService} from '../courses-service.service';
import {ActiveCourseService} from '../active-course.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  userRating2: number;
  message: String = '';

  constructor(private courseService: CoursesServiceService, private activeCourseService: ActiveCourseService) {
    this.userRating2 = courseService.getUserRating(activeCourseService.getActiveCourse().toString());
  }

  @Input() rating: Rating;
  @Input() userRating: number;
  @Output() courseIsRating: EventEmitter<number> = new EventEmitter<number>();
  hovered = 0;

  static getAvg(rating: Rating) {
    return rating.allRatingCounter === 0 ? 0 : rating.sumRating / rating.allRatingCounter;
  }

  ngOnInit() {
  }

  onSaveRating(rate: number): void {
    this.courseIsRating.emit(rate);
    this.message = 'Oceniono!';
    this.userRating2 = this.courseService.getUserRating(this.activeCourseService.getActiveCourse().toString());
  }

  Round(n: number, k: number) {
    const factor = Math.pow(10, k);
    return Math.round(n * factor) / factor;
  }
}
