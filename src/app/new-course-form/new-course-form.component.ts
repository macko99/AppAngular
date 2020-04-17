import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {CoursesServiceService} from '../courses-service.service';
import {Course} from '../Interfaces/course';
import Rating from '../Interfaces/rating';

@Component({
  selector: 'app-new-course-form',
  templateUrl: './new-course-form.component.html',
  styleUrls: ['./new-course-form.component.css']
})
export class NewCourseFormComponent implements OnInit {

  message: String = '';
  modelForm: FormGroup;
  private validationMessages = {
    name: {
      required: 'Imię jest wymagane!'
    },
    ects: {
      required: 'Ectsy są wymagany',
      maxlength: 'Maksymalna wartość to 99'
    },
    semestr: {
      required: 'Semestr jest wymagany'
    },
    forma: {
      required: 'Forma prowadzenia zajęć jest wymagana'
    },
    maxStudents: {
      required: 'Maksymalna liczba studentów jest wymagana',
      maxlength: 'Maksymalna liczba to 99'
    },
    desc: {
      required: 'Opis jest wymagany'
    },
    url: {
      required: 'Link do zdjęcia jest wymagany',
      pattern: 'Podaj właściwy link'
    }
  };

  formErrors = {
    name: '',
    ects: '',
    semestr: '',
    forma: '',
    maxStudents: '',
    desc: '',
    url: ''
  };

  constructor(private formBuilder: FormBuilder, private coursesService: CoursesServiceService) {
  }

  ngOnInit(): void {

    this.modelForm = this.formBuilder.group({
      name: ['', Validators.required],
      ects: ['', [Validators.required, Validators.maxLength(3)]],
      semestr: [1, Validators.required],
      forma: ['', Validators.required],
      maxStudents: ['', [Validators.required, Validators.maxLength(3)]],
      desc: ['', Validators.required],
      url: ['', [Validators.required]]
    });

    this.modelForm.valueChanges.subscribe((value) => {
      this.onControlValueChanged();
    });
    this.onControlValueChanged();
  }

  onControlValueChanged() {
    const form = this.modelForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const validationMessages = this.validationMessages[field];

        for (const key in control.errors) {
          this.formErrors[field] += validationMessages[key] + ' ';
        }
      }
    }
  }

  onSubmit(modelForm) {
    const rating: Rating = {
      allRatingCounter: 0,
      sumRating: 0,
      users: {}
    };
    const course: Course = {
      id: 'a',
      desc: modelForm.value.desc,
      forma: modelForm.value.forma,
      url: modelForm.value.url,
      ects: modelForm.value.ects,
      maxStudents: modelForm.value.maxStudents,
      name: modelForm.value.name,
      rating,
      semestr: modelForm.value.semestr,
      occupiedPlaces: 0,
      users: []
    };
    const result = this.coursesService.addCours(course);
    if (result === true) {
      this.message = 'Formularz wysłany!';
    } else {
      this.message = 'Brak uprawnien!';
    }
  }


}
