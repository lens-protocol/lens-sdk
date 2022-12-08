// No entity was required so far for this use case.

export enum ReportReason {
  // Illegal
  ANIMAL_ABUSE = 'animal-abuse',
  HARASSMENT = 'harassment',
  VIOLENCE = 'violence',
  SELF_HARM = 'self-harm',
  DIRECT_THREAT = 'direct-threat',
  HATE_SPEECH = 'hate-speech',

  // Sensitive content
  NUDITY = 'nudity',
  OFFENSIVE = 'offensive',

  // Fraud
  SCAM = 'scam',
  UNAUTHORIZED_SALE = 'unauthorized-sale',
  IMPERSONATION = 'impersonation',

  // Spam
  MISLEADING = 'misleading',
  MISUSE_HASHTAGS = 'misuse-hashtags',
  UNRELATED = 'unrelated',
  REPETITIVE = 'repetitive',
  FAKE_ENGAGEMENT = 'fake-engagement',
  MANIPULATION_ALGO = 'manipulation-algo',
  SOMETHING_ELSE = 'something-else',
}
