
export type TUpcomingEvent = {
  event_type: string;
  booking_id: number;
  athlete_name: string;
  status: "Upcoming";
  title: string;
  location: string;
  start_date: string;
  start_date_display: string;
  end_date: string;
  photo: string;
  session_time: string | null;
  provider_name: string;
  provider_image: string;
  program_photo: string;
  booking_type: string
  program_id: number
  program_goal: {id: number, goal: string}[]
}