import { Lumigo } from '@lumigo/cdk-constructs-v2';
import { App, SecretValue } from 'aws-cdk-lib';
import { AppStack } from './stack';

const app = new App();

new Lumigo({ lumigoToken: SecretValue.secretsManager('LumigoToken') }).traceEverything(app);

new AppStack(app, 'demo-20230525-dev', {
  env: {
    account: '538118019757',
    region: 'eu-central-1',
  },
});

app.synth();