export interface File {
  name: string;
}

export interface Img {
  contain?: boolean;
  id: string;
  name: string;
  url: string;
  thumbnail?: string;
  type?: string;
}

export interface History {
  history: {
    push(url: string): void;
  };
}

export interface Match {
  match: {
    url: string;
    params: {
      userEnvId: string;
      admin: string;
    };
  };
}

export interface Location {
  location: object;
}

export type LngLat = {
  latitude: number;
  longitude: number;
};

export type RouterTypes = History & Match & Location;
