import { Language } from './common';

export interface Doctor {
  id: string;
  name: string;
  title: Record<Language, string>;
  specialty: Record<Language, string>;
  experience: number;
  image: string;
  consultationTypes: ('online' | 'offline')[];
  consultationType: ('online' | 'offline')[]; // Backward compatibility
  nextAvailable?: string;
  rating?: number;
}

export interface DoctorScheduler {
  id: string;
  doctorId: string;
  date: string;
  startTime: string;
  endTime: string;
  consultationType: 'online' | 'offline';
  maxAppointments?: number;
  bookedCount?: number;
  status: 'available' | 'fully_booked' | 'unavailable' | 'cancelled';
  location?: string;
  note?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Appointment {
  id: string;
  userId: string;
  doctorId?: string;
  doctorName?: string;
  date: string;
  time: string;
  type: 'online' | 'offline' | 'phone' | 'video' | 'chat';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rejected' | 'rescheduled';
  note?: string;

  // Backward compatibility fields
  topic?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
}

export interface AppointmentHistory {
  id: string;
  appointmentId: string;
  previousStatus?: string;
  newStatus: string;
  changedBy: string;
  note?: string;
  createdAt: string;
}
