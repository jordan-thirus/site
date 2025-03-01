---
title: AWS IAM Policies
id: 2410282012
aliases:
  - AWS IAM Policies
  - "2410282012"
created: 2024-10-28
modified: 2024-10-28
tags:
  - aws
  - aws-iam
---
An **AWS IAM Policy** defines permissions that are applied to entities the policy is attached to. Policies can be *identity-based* (attached to a role, user,or  group) or *resource-based* (attached to a AWS resource).

The policy is defined as a JSON document[^1]. Common elements seen in a policy include the following:
- **`version`** - policy language version. The current version is `2012-10-17`.
- `id` - optional identifier for the policy
- `statement` - array of one or more defined permissions
	- `sid` - optional identifier for the statement
	- **`effect`** - whether the statement allows or denies access. Allowed Values: `Allow`, `Deny`
	- `principal` - for a resource-based policy, defines the principals that have access to that resource, identified by their Amazon Resource Name (ARN)
	- **`action`** - list of actions that will be given the defined effect. A wildcard can be used to specify all possible actions (`*`) or all actions on a specific resource (i.e. `s3:*`)
	- **`resource`** - list of resources to which the actions and effects are applied to, identified by their ARNs
	- condition - optional conditions for when the policy is in effect

[^1]: See reference for schema [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#access_policies-json).