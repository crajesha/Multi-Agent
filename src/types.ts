export interface RubricScore {
  dimension: string;
  score: number; // 1-5
  feedback: string;
}

export interface Agent03Response {
  scores: RubricScore[];
  specificFeedback: string;
  strengths: string[];
  skillsToStrengthen: string[];
  encouragementMessage: string;
  overallGrade: string;
}

export interface Agent04Response {
  weeklySuccessScore: number;
  growthTrajectory: { day: string; score: number }[];
  summary: string;
  engagementQuality: string;
  improvementRate: string;
}

export enum DeploymentTier {
  TIER_1 = "Tier 1 – Deployment Ready",
  TIER_2 = "Tier 2 – Conditional Deployment",
  TIER_3 = "Tier 3 – Pre-Deployment",
  TIER_4 = "Tier 4 – Foundational Review",
}

export interface Agent06Response {
  tier: DeploymentTier;
  selfResolutionRate: number;
  peerFeedbackScore: number;
  technicalCollaboration: string;
  communicationQuality: string;
  culturalContribution: string;
  recommendation: string;
}
