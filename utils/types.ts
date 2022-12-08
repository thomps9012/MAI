import { ObjectId } from "mongodb";

export interface ClientOverview {
  _id: ObjectId | string;
  PID: string;
  adult: boolean;
  client_name: string;
  agency: string;
}

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

export interface InterviewOverview {
  _id: ObjectId;
  date: string;
  type: string;
  agency: string;
}

export interface InterviewData {
  _id: ObjectId;
  gift_card_received: boolean;
  risk_attitudes: RiskAttitudes | YouthRiskAttitudes;
  demographics: Demographics | YouthDemographics;
  date: string;
  type: string;
  client_name: string;
  phone_number: string;
  adult: boolean;
  PID: string;
  agency: string;
  behaviors: {
    drug: DrugBehaviors;
    sexual: SexualBehaviors | YouthSexualBehaviors;
  };
}

export interface GiftCardData {
  _id: ObjectId;
  interview_id: ObjectId;
  PID: string;
  amount: number;
  type: string;
  interview_type: string;
  received_date: string;
  number: number;
}

export interface RiskAttitudes {
  tobacco_use: string;
  binge_alcohol_use: string;
  marijuana_use: string;
  shared_needle_use: string;
  nonprescription_opiod: string;
  prescription_opiod: string;
  unprotected_sex: string;
  sex_under_influence: string;
  could_refuse_unprotected_sex: string;
}
export interface YouthRiskAttitudes {
  tobacco_use: string;
  binge_alcohol_use: string;
  marijuana_use: string;
  nonprescription_opiod: string;
  prescription_opiod: string;
  unprotected_sex: string;
  inject_drugs: string;
  could_refuse_alcohol: string;
  could_refuse_drugs: string;
  could_refuse_unprotected_sex: string;
}
interface Demographics {
  latinx: string[];
  race: string[];
  gender: string;
  sexual_orientation: string;
  living_situation: string;
  college_enrolled: string;
  employment_status: string;
  military_service: string;
  arrested_in_last_month: number;
  parole_or_probation: string;
  informed_of_HIV_status: string;
  informed_of_VH_status: string;
  knowledge_of_SUD_healthcare_treatment: string;
  knowledge_of_HIV_STD_healthcare_treatment: string;
  pretax_household_income: string;
  date_of_birth: string;
}
interface YouthDemographics {
  latinx: string[];
  race: string[];
  gender: string;
  sexual_orientation: string;
  living_situation: string;
  household_members: string[];
  suspension: string;
  arrested_in_last_month: number;
  informed_of_HIV_status: string;
  informed_of_VH_status: string;
  knowledge_of_healthcare_treatment: string;
  date_of_birth: string;
}
interface DrugBehaviors {
  smoke_cigarettes: number;
  tobacco_products: number;
  electronic_vapor: number;
  alcohol: number;
  binge_drink: number;
  marijuana: number;
  prescription_opioid: number;
  prescription_drugs: number;
  nonprescription_drugs: number;
  illegal_drugs: number;
  inject_drugs: number;
  share_needles: number;
  inject_drugs_annual: number;
}
interface SexualBehaviors {
  sexual_partners: string;
  unprotected_partners: string[];
  exchanged_sex_for_goods: string;
  relationship_abuse: string;
  partner_sexual_pressure: string;
  safe_in_relationship: string;
}
interface YouthSexualBehaviors {
  sexual_partners: string;
  sex_under_influence: string;
  unprotected_sex: string;
  relationship_abuse: string;
  partner_sexual_pressure: string;
  safe_in_relationship: string;
}
