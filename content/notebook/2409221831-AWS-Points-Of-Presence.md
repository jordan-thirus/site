---
title: AWS Points Of Presence
id: 2409221831
aliases:
  - Points Of Presence
  - "2409221831"
created: 2024-09-22
modified: 2024-09-22
tags:
  - aws
  - aws-infrastructure
---
In AWS, **Points of Presence** consists of infrastructure separate from [[2409221748-AWS-Region|regions]] located in strategic locations near user centers that provide content to users with low latency. Points of presence are distributed across:
- 400+ Edge Locations
- 10+ mid-tier Regional Caches
Services distributed via points of presence include:
- Cloudfront
- Route53
- Global Accelerator

See also:
- [AWS Whitepaper - Points of Presence](https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/points-of-presence.html)
- [AWS Fundamentals](https://blog.awsfundamentals.com/aws-edge-locations)