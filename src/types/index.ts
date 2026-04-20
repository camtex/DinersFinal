import React from 'react';

export interface Role {
  id: string;
  title: string;
  category: string;
  description: string;
  skills: string[];
  interests: string[];
  route: string[];
  score?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  helper?: string;
  options: {
    text: string;
    tag: string;
    scores: Record<string, number>;
  }[];
}

export interface LearningPath {
  title: string;
  duration: string;
  modules: string[];
  icon: React.ReactNode;
}

export interface Challenge {
  title: string;
  description: string;
  difficulty: string;
  points: number;
}

export interface Vacancy {
  id: string;
  title: string;
  type: string;
  area: string;
  description: string;
}

export interface UserProfile {
  uid?: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  lastAccessMode?: "login" | "register";
}

export interface VacancyApplication {
  id: string;
  vacancyId: string;
  vacancyTitle: string;
  area: string;
  type: string;
  description: string;
  appliedAt: string;
  fullName: string;
  linkedinUrl: string;
  cvFileName: string;
}

export interface PendingVacancyApplication {
  vacancyId: string;
  vacancyTitle: string;
  area: string;
  type: string;
  description: string;
}
