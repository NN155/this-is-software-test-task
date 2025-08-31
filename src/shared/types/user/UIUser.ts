export interface UIUser {
  id: string;
  name: string;
  gender: string;
  email: string;
  location: string;
  avatar: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}
