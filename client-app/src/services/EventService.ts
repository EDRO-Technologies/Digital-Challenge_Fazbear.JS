import { Event } from "@/models/Event";
import api from "./GetAuthorizedUserService";


export async function getAllEvents(): Promise<Event[]> {
  const { data } = await api.get<Event[]>('/events/');

  return data.map((x) => new Event(x));
}

