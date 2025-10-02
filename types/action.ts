import { IPerson } from "./person";

export type IAction = {
  user_id: string;
  person_id: string;
  status: string;
  person: IPerson;
};
