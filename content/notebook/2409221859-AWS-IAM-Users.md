---
title: AWS IAM Users
id: 2409221859
aliases:
  - "2409221859"
  - IAM users
created: 2024-09-22
modified: 2024-09-22
tags:
  - aws
  - aws-iam
---
**IAM Users** identify individual people with access to one or more AWS services. Users also include a root account which is created by default. These users can belong to zero to many groups. Users will inherit the permissions of policies applied to groups they belong to as well as policies applied directly to them. Access Advisor shows services a user can access and when it was last accessed.[^1]

## IAM Groups
**IAM Groups** are collections of users that can have policies applied to them. Groups cannot contain other groups. Groups can either be defined by another user (with the appropriate permission). 
## Best Practices
- One IAM user for one person


[^1]: _Reviewing Last Accessed Information for Your AWS Account - AWS Identity and Access Management_. https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started-reduce-permissions.html. Accessed 22 Sept. 2024.