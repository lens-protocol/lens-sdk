import * as dotenv from 'dotenv';

// on CI, we inject env's directly into `process.env`
if (!process.env.CI) {
  dotenv.config();
}
