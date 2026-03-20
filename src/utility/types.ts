export interface CourseQuery {
  course?: string;
}

export interface FilterForUsers {
  email?: string;
}

export interface FilterForBooks {
  category?: string;
}

export interface SortForBooks {
  price?: number;
  name?: number;
}
