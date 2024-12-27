export type Tuser = {
  _id: string;
  name: string;
  email: string;
  password: string | undefined;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};
export type TAddContactData = {
  name: string;
  email: string;
  userId: string;
};
export type Tmessage = {
  from: string;
  to: string;
  content: string;
  _id: string;
};

//  createdAt: Date;
//updatedAt: Date;
