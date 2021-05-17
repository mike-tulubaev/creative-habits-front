import { CreativeSpeciesEnum } from "./creative-species.enum";

export interface InterviewResultModel {
  id: string;
  Arch_ClusHabits_Sim: number;
  Arch_Habits_Sim: number;
  Biorhythm: string;
  Clus_Percent: number;
  Cluster_ID: string;
  Creative_Process: string;
  Creative_Species: CreativeSpeciesEnum;
  Habits_All: string[];
  Habits_Clus_shared: string[];
  Habits_Clus_union: string[];
  Habits_Orig: string[];
  Habits_unique: string[];
  Clus_Top_Habits: string[];
  Top_Habits: string[];
  Name: string;

  Cluster_Affinity: number;
  'Focus Mononovous_affinity': number;
  'Mono Routinus_affinity': number;
  'Novo Gregarious_affinity': number;
  'Socialis Adventurous_affinity': number;
  'Solo Noctus_affinity': number;
  'Sui Inspira_affinity': number;
  'Yolo Chaotis_affinity': number;

  n_habits_all: number;
  n_habits_orig: number;
  n_shared: number;
  n_union: number;
  n_unique: number;
  x: number;
  y: number;
}
