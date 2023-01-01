export interface UserConnection {
  userID: string
}

export interface Image extends UserConnection {
  url: string;
}

export interface User extends UserConnection {
  username: string;
  country: string;
  name: string;
}

export interface Payment {
  totalSum: number;
  date: string;
}

export interface Account extends UserConnection {
  posts: number;
  payments: Payment[];
}
