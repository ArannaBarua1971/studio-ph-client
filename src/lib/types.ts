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
  images:object,
  user_id:string,
  features:string[]
}

export type {StudioTypes}
