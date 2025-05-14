aws cloudformation create-stack \
 --stack-name react-app-hosting \
 --template-body file://react-app-infrastructure.yml \
 --parameters ParameterKey=ApplicationName,ParameterValue=myreactapp

After Deployment
After you deploy this template, CloudFormation will output:

S3 bucket name
CloudFront distribution ID
CloudFront domain name
IAM user access key and secret key

Take these values and add them to your GitHub repository secrets:

AWS_ACCESS_KEY_ID: The DeploymentUserAccessKey output value
AWS_SECRET_ACCESS_KEY: The DeploymentUserSecretKey output value
AWS_S3_BUCKET: The S3BucketName output value
AWS_CLOUDFRONT_DISTRIBUTION_ID: The CloudFrontDistributionId output value
