import { awscdk } from 'projen';
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.77.0',
  defaultReleaseBranch: 'main',
  minNodeVersion: '18.0.0',
  name: 'demo-20230525',
  projenrcTs: true,
  deps: [
    'axios',
    '@lumigo/cdk-constructs-v2',
  ],
  devDeps: [
    '@types/aws-lambda',
    'esbuild',
  ],
});
project.synth();