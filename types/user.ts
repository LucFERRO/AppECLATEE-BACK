export interface userTypes{

    id : number;
    name: string;
    mail: string;
    image: string;
    role: string;
    description: string;
}


// A VIRER
export interface User {
    username: string;
    password: string;
}

declare global {
    namespace Express {
      interface Request {
        headers?: Headers;
        body?: Body;
        user?: User;
      }
    }
  }
