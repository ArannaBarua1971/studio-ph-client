interface StudioTypes {
  _id?: string;
  address: string;
  category: string;
  cleaningFee: string;
  deposit: string;
  hourtlyRate: string;
  location: string;
  max_capacity: string;
  overview: string;
  title: string;
  images:[string, string][],
  user_id:string,
  features:string[]
}
interface BookingStudioTypes {
    _id: string;
    title: string;
    category: string;
    max_capacity: string;
    hourtlyRate: string;
    deposit: string;
    cleaningFee: string;
    location: string;
    address: string;
    overview: string;
    images: [string, string][];
    user_email: string;
    features: string[];
    studio_id: string;
    Booked: boolean;
    status:string,
}

export type {StudioTypes,BookingStudioTypes}
