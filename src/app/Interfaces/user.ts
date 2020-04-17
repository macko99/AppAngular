export default interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: {
    delete: boolean;
    adding: boolean;
  };
  courseJoined: {};
  coursesRating: {};
}
