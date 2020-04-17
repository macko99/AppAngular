import {Injectable} from '@angular/core';
import {Course} from './Interfaces/course';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesServiceService {

  private courses: Object;
  private maxId: number;
  private user: Object;

  constructor(private db: AngularFireDatabase, private authService: AuthService) {
    this.getMaxId().subscribe(id => this.maxId = id);
    this.getCourses().subscribe(courses => this.courses = courses);
    this.getUsers().subscribe(users => this.user = users);
  }

  getCourses(): Observable<Course[]> {
    return this.db.list<Course>('kursy').valueChanges();
  }

  getUsers(): Observable<Course[]> {
    return this.db.list<Course>('users').valueChanges();
  }

  addCours(course: Course) {
    if (this.getUser(this.authService.getCurrentuser().uid)[0].role.adding === true) {
      console.log(this.maxId[0]);
      let c = 1;
      while (Object.keys(this.courses).includes(String(this.maxId[0] + c))) {
        c++;
      }
      course.id = this.maxId[0] + c;
      this.db.list('kursy').set(String((this.maxId[0] + c)), course);
      this.db.list('maxId').set('maxId', this.maxId[0] + c);
      return true;
    } else {
      console.log('error, no permision');
      return false;
    }
  }

  getMaxId(): Observable<any> {
    return this.db.list('maxId').valueChanges();
  }

  getCours(key: String) {
    return Object.values(this.courses).filter(course => course.id == key)[0];
  }

  getUser(key: String) {
    return Object.values(this.user).filter(user => user.id == key);
  }

  deleteCours(key: String) {
    if (this.getUser(this.authService.getCurrentuser().uid)[0].role.delete === true) {
      this.db.list('kursy/' + key).remove();
      return true;
    } else {
      console.log('error');
      return false;
    }
  }

  joinCourse(id) {
    const user = this.authService.getCurrentuser().uid;
    const course = this.getCours(id);
    if (course.occupiedPlaces < course.maxStudents
      && ((course.users != null && course.users[user] == null) || course.users == null)) {
      if (this.authService.isLoggedIn()) {
        this.db.list('kursy/' + id).set('occupiedPlaces', this.getCours(id).occupiedPlaces + 1);
        this.db.list('kursy/' + id + '/users').set(this.authService.getCurrentuser().uid, true);
        const uid = this.authService.getCurrentuser().uid;
        this.db.list('users/' + uid + '/courses').set(id, true);
      } else {
        return false;
      }
      return true;
    }
    return false;
  }

  saveRating(id: String, rate: number) {
    const course = this.getCours(id);
    const uid = this.authService.getCurrentuser().uid;
    const user = this.getUser(uid)[0];
    if (user.ratings != null && user.ratings[course.id] != null) {
      return false;
    } else {
      if (course.users != null && course.users[uid] != null) {
        this.db.list('users/' + uid + '/ratings').set(course.id.toString(), rate);
        this.db.list('kursy/' + id + '/rating').set('allRatingCounter', course.rating.allRatingCounter + 1);
        this.db.list('kursy/' + id + '/rating').set('sumRating', course.rating.sumRating + rate);
      } else {
        return false;
      }
    }
    return true;
  }

  getUserRating(id: String) {
    const course = this.getCours(id);
    const user = this.getUser(this.authService.getCurrentuser().uid)[0];
    if (user.ratings != null && user.ratings[course.id] != null) {
      return user.ratings[course.id];
    }
  }
}
