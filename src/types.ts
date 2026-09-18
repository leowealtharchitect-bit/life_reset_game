export interface Character {
  id: string;
  name: string;
  title: string;
  desc: string;
  avatarBg: string;
  avatarImage: string;
  initialSavings: number;
  initialHealth: number;
  monthlyIncome: number;
  monthlyExpense: number;
  icon: string;
}

export interface Stage {
  age: number;
  name: string;
  desc: string;
}

export interface Crisis {
  name: string;
  medicalCost: number;
  incomeLossYears: number;
}

export interface DefensePillar {
  id: number;
  title: string;
  sub: string;
  desc: string;
  icon: string;
  color: string;
}

export type ShieldLevel = 'NONE' | 'MEDICAL_ONLY' | 'FULL_SHIELD';

export type ScreenType = 'start' | 'play' | 'result';

export interface GameState {
  screen: ScreenType;
  character: Character | null;
  currentStageIdx: number;
  health: number;
  savings: number;
  shieldLevel: ShieldLevel;
  historyLogs: string[];
  totalCrisesHandled: number;
  totalInsuranceClaims: number;
  incomeLossPrevented: number;
  avatarUrl: string;
}
