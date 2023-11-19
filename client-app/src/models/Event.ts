import { User } from "./User";

export class EventType {
  constructor(x?: Partial<EventType>) {
    this.id = x?.id ?? 0;
    this.name = x?.name ?? '';
  }

  id: number;
  name: string;
}

export class Event {
  constructor(x?: Partial<Event>) {
    this.id = x?.id ?? 0;
    this.description = x?.description ?? '';
    this.level = x?.level ?? 0;
    this.version = x?.version ?? 0;
    this.creation_date = new Date(x?.creation_date ?? 0);
    this.end_data = new Date(x?.end_data ?? 0);
    this.users_id = new User(x?.users_id);
    this.type = new EventType(x?.type);
  }

  id: number;
  description: string;
  level: number;
  version: number;
  creation_date: Date;
  end_data: Date;
  users_id: User;
  type: EventType;
}




