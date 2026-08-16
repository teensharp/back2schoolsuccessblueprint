export const BEHAVIORS = [
  "Striver",
  "Learner",
  "Applier",
  "Connector",
  "Giver",
  "Starter",
] as const;

export type BehaviorName = (typeof BEHAVIORS)[number];

export const BEHAVIOR_DEFINITIONS: Record<BehaviorName, string> = {
  Learner:
    "Learners regularly read, research, reflect on, and use cutting-edge tools and technology to drive their ambitious self-improvement agenda.",
  Striver: "Strivers embrace rigor and persist through challenges.",
  Giver: "Givers commit to sharing, supporting, and empowering each other.",
  Starter: "Starters are poised to create, initiate, and lead in all settings.",
  Applier: "Appliers relentlessly explore opportunities to learn and apply.",
  Connector: "Connectors value and cultivate supportive and productive relationships.",
};
