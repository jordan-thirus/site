---
title: AWS Identity And Access Management
id: 2409221841
aliases:
  - AWS Identity And Access Management
  - IAM
  - "2409221841"
created: 2024-09-22
modified: 2024-09-22
tags:
  - aws
  - aws-iam
---
Identity and Access Management (IAM) is an AWS global service. Identities are separated into [[2409221859-AWS-IAM-Users|IAM users]] and roles (which are assigned to resources). Permissions are managed by policies that can be attached

## Best Practices
- Apply least privilege principle - users and roles should have the minimum amount of permissions required to fulfill their needs. Access Analyzer can help identify those minimum permissions. [^1]


See also:
- [IAM Documentation](https://docs.aws.amazon.com/iam/)



[^1]: _Reviewing Last Accessed Information for Your AWS Account - AWS Identity and Access Management_. https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started-reduce-permissions.html. Accessed 22 Sept. 2024.