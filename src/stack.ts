import { Duration, Stack, StackProps, aws_dynamodb, aws_events, aws_events_targets, aws_lambda, aws_lambda_event_sources, aws_lambda_nodejs, aws_sqs } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { EcsApp } from './ecs';

export interface AppStackProps extends StackProps {
  //
}

export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props: AppStackProps) {
    super(scope, id, props);

    const queue = new aws_sqs.Queue(this, 'Queue');

    new aws_events.Rule(this, 'EBToQueueRule', {
      eventPattern: {
        source: ['lumigo-test'],
      },
      targets: [new aws_events_targets.SqsQueue(queue)],
    });

    const table = new aws_dynamodb.Table(this, 'Table', {
      billingMode: aws_dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: 'PK',
        type: aws_dynamodb.AttributeType.STRING,
      },
    });

    const lambda = new aws_lambda_nodejs.NodejsFunction(this, 'Handler', {
      runtime: aws_lambda.Runtime.NODEJS_18_X,
      timeout: Duration.seconds(10),
      environment: {
        TABLE: table.tableName,
      },
    });

    lambda.addEventSource(new aws_lambda_event_sources.SqsEventSource(queue, { batchSize: 1 }));

    const ecsApp = new EcsApp(this, 'EcsApp', {});
    lambda.addEnvironment('HTTP_TARGET', 'http://' + ecsApp.service.loadBalancer.loadBalancerDnsName);
  }
}