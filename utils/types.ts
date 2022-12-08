import { ObjectId } from "mongodb";

export interface AnswerChoice {
  _id: ObjectId;
  type: string;
  choices: string[];
}

export interface QuestionChoice {
  _id: ObjectId;
  adult: boolean;
  multiple: boolean;
  number_input: boolean;
  drop_down: boolean;
  state: string;
  section: string;
  question: string;
  detail: string;
  answers: ObjectId;
  answer_choices: string[];
}
