export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  designation: string;
  avatar: string; // image URL
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
