---
title: AWS IAM Users
id: 2409221859
aliases:
  - "2409221859"
  - IAM users
created: 2024-09-22
modified: 2024-10-28
tags:
  - aws
  - aws-iam
---
**IAM Users** identify individual people with access to one or more AWS services. Users also include a root account which is created by default. These users can belong to zero to many groups. Users will inherit the permissions of [[2410282012-AWS-IAM-Policies|policies]] applied to groups they belong to as well as policies applied directly to them. Access Advisor shows services a user can access and when it was last accessed.[^1] 

Users can access AWS resources via the following methods:
- Management console with password/Multi-Factor Authentication (MFA)
- CLI with access keys
	- Cloudshell provides an alternative CLI inside the management console that does not require any pre-configured SSH settings
- SDK with access keys

## IAM Groups
**IAM Groups** are collections of users that can have policies applied to them. Groups cannot contain other groups. Groups can either be defined by another user (with the appropriate permission).  It is recommended to add users to groups and assign policies to those groups

## Security Tools

### Credentials Report
A [credentials report](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_getting-report.html) contains users and the status of their credentials. Inside the report you are able to see when a user last logged in, if and when a password was changed, if MFA is enabled, what access keys are active, and what services were recently users.

### Access Advisor
[Access Advisor](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_last-accessed-view-data.html) provides visibility into the services a specific user can access and when a service was last accessed. It can be used as to help determine the least privileges a user may need,

### Password Policy
A password policy defined the requirements for a user's login password. By default it requires 8 total characters; 3 of 4 types of Uppercase, lowercase, numeric, and non-alphanumeric characters; never expires; and cannot be identical to the account name or email. The policy can be updated to require stronger passwords, prevent reuse, enable expiration, require multi-factor authentication, and allow users to change their own passwords.

## Best Practices
- One IAM user for one person for programmatic access only
	- Use [Identity Center](https://aws.amazon.com/iam/identity-center/) to give non-programmatic access
- Enable MFA for login to the AWS console
- Do not share access keys
- Avoid using the root account


[^1]: _Reviewing Last Accessed Information for Your AWS Account - AWS Identity and Access Management_. https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started-reduce-permissions.html. Accessed 22 Sept. 2024.