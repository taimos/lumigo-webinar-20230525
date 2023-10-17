import path from 'path';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface EcsAppProps {

}

export class EcsApp extends Construct {

  public readonly service: cdk.aws_ecs_patterns.ApplicationLoadBalancedFargateService;

  constructor(scope: Construct, id: string, _props: EcsAppProps) {
    super(scope, id);

    const vpc = new cdk.aws_ec2.Vpc(this, 'Vpc', {
      maxAzs: 3,
      natGateways: 0,
      subnetConfiguration: [{
        name: 'public',
        subnetType: cdk.aws_ec2.SubnetType.PUBLIC,
        mapPublicIpOnLaunch: true,
      }],
    });

    this.service = new cdk.aws_ecs_patterns.ApplicationLoadBalancedFargateService(this, 'Resource', {
      vpc,
      assignPublicIp: true,
      circuitBreaker: {
        rollback: true,
      },
      taskImageOptions: {
        containerPort: 8080,
        image: cdk.aws_ecs.ContainerImage.fromAsset(path.join(__dirname, '..', 'ecs-app'), {
          platform: cdk.aws_ecr_assets.Platform.LINUX_AMD64,
        }),
      },
      healthCheckGracePeriod: cdk.Duration.minutes(5),
    });
    this.service.targetGroup.configureHealthCheck({
      healthyThresholdCount: 2,
      unhealthyThresholdCount: 2,
      interval: cdk.Duration.seconds(15),
      timeout: cdk.Duration.seconds(10),
    });
    this.service.targetGroup.setAttribute('deregistration_delay.timeout_seconds', '10');

  }
}