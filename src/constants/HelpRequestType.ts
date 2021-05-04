type HelpRequest = {
  action: string;
  creationDate: string;
  expiryDate: string;
  id: string;
  contactType:string;
  location:{
    latitude: number;
    longitude: number;
  }
};

export default HelpRequest;
