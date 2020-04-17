import Rating from './rating';

export interface Course {
  id: string;
  name: string;
  ects: number;
  semestr: number;
  forma: CourseForm;
  maxStudents: number;
  rating: Rating;
  desc: string;
  url: string;
  occupiedPlaces: number;
  users: string[];
}

export enum CourseForm {
  lab = 'Laboratoria',
  lec = 'Wykłady',
  cla = 'Ćwiczenia'
}

