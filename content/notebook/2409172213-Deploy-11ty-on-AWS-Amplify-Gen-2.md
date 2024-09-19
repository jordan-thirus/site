---
title: Deploy 11ty on AWS Amplify Gen 2
id: 2409172213
aliases:
  - Deploy 11ty on AWS Amplify Gen 2
  - "2409172213"
created: 2024-09-17
modified: 2024-09-17
tags:
  - aws
  - 11ty
  - featured
---

## Configuring the Build

In your `package.json`, add the following line to the scripts section: `"build": "npx @11ty/eleventy"` . 

Add an `amplify.yml` file to the root of your repository with the following contents.

```yaml
version: 1
frontend:
	phases:
		preBuild:
			commands:
				- npm ci
		build:
			commands:
				- npm run build
	artifacts:
		baseDirectory: public
		files:
			- "**/*"
```

## Configuring the `404` Redirect

Go to `Hosting > Rewrites & Redirects` .

Click the `Manage redirects` button.

Edit the rule present to have target address of `/404.html` and change the type to `404 (Redirect)`. 

### Before

![AWS Amplify Redirect Screenshot - before](2409172213-aws-amplify-redirect-before.png)

### After

![AWS Amplify Redirect Screenshot - after](2409172213-aws-amplify-redirect-after.png)
