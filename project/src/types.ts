export interface DocumentFile {
  id: string;
  name: string;
  type: string;
  data: string; // Base64 encoded file data
  createdAt: Date;
}

export interface PersonalInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  company?: string;
  jobTitle?: string;
  notes?: string;
  createdAt: Date;
  documents: DocumentFile[];
}