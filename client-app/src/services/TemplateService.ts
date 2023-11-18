import { Template } from "@/models/Template";

import axios from "axios";

const API_URL = `/template`;

export async function getAllTemplates(): Promise<Template[]> {
  const { data } = await axios.get<Template[]>(`${API_URL}/All`);

  return data.map((x) => new Template(x));
}

export async function getTemplate(id: number): Promise<Template> {
  const { data } = await axios.get<Template>(`${API_URL}/`, { params: { id } });

  return new Template(data);
}
