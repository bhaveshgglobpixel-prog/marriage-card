export interface ScheduleEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  location?: string;
}

export type RsvpStatus = 'attending' | 'declining' | 'not_sure';

export interface RsvpResponse {
  status: RsvpStatus;
  guestName?: string;
  guestCount?: number;
  message?: string;
  updatedAt: string;
}
