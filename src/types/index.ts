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
  question: string;
  options: {
    text: string;
    trait: string;
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
