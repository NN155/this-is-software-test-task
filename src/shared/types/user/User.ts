import type { UserLocation } from "./UserLocation";
import type { UserName } from "./UserName"
import type { UserPicture } from "./UserPicture"

export interface User {
  gender: string;
  name: UserName;
  location: UserLocation;
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string;
  };
  picture: UserPicture;
  nat: string;
}