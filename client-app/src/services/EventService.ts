import { Event } from "@/models/Event";
import api from "./GetAuthorizedUserService";


export async function getAllEvents(): Promise<Event[]> {
  const { data } = await api.get<Event[]>('/events/');

  return data.map((x) => new Event(x));
}

export async function addEvent(ev: {
  end_date: Date,
  description: string,
  type: number,
  level: number,
  version: number
}) {
  await api.post('/events/', ev);
}

