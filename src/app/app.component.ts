import {Component, OnInit} from '@angular/core';
import {Course} from './Interfaces/course';
import {ActiveCourseService} from './active-course.service';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {CoursesServiceService} from './courses-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userData: Object;
  course: Course = null;
  active:any = 'brak';

  constructor(private activeCourseService: ActiveCourseService, private router: Router, private authService: AuthService, public afAuth: AngularFireAuth, private courseService: CoursesServiceService) {
    console.log(this.userData);
  }

  updateActive(){
    this.active = this.activeCourseService.getActiveCourse();
    this.router.navigate(['/details',this.active]);
  }

  logOut() {
    this.authService.SignOut();
  }

  isUser() {
    return !this.authService.isLoggedIn();
  }

  ngOnInit(){
    this.authService.getUser().subscribe(
      user => {if(user != null){
        this.userData = user;

      }else{this.userData= new Object; this.userData={email: " "};}

      });
  }
}
