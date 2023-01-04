---
layout: default
title: Introduction to GitHub Actions
nav_order: 2
---

# Introduction to GitHub Actions: Automate Your Workflow

{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## What is GitHub Actions?

GitHub Actions is a tool that allows you to automate your workflow by creating custom software development life cycle (SDLC) events. You can use it to build, test, and deploy your code, as well as automate other tasks that are part of your workflow.

With GitHub Actions, you can create custom actions that are triggered by specific events, such as a push to a repository or the creation of a pull request. You can also use pre-built actions from the GitHub Actions Marketplace, which is a directory of actions created by the community.

To use GitHub Actions, you create a workflow file in your repository. This file is written in YAML and defines the steps that make up your workflow. Each step can be a custom action or a pre-built action from the Marketplace.

GitHub Actions is a powerful tool that can help you automate your workflow and improve the speed and efficiency of your development process.

## What is a Workflow?

A GitHub workflow is a set of automated processes that are triggered by specific events in a repository. Workflows are defined using a YAML file in the .github/workflows directory of your repository.

Here are two examples of GitHub workflows:

Continuous integration (CI) workflow: This type of workflow is triggered whenever code is pushed to a repository. The workflow runs tests and other checks to ensure that the code is of high quality and ready to be merged into the main branch.

Deployment workflow: This type of workflow is triggered whenever a new release is created in a repository. The workflow can handle tasks such as building and packaging the code, uploading it to a server, and updating any necessary configuration files.

Both of these examples show how GitHub workflows can automate common tasks in the software development process, saving time and effort for developers. There are many other types of workflows that you can create with GitHub Actions, depending on your specific needs.

Here is an example of a GitHub workflow that sends a "hello" message to the person who created an issue in the repository:



```yaml
name: Hello Message

on:[pull_request_target, issues]

jobs:
  hello:
    runs-on: ubuntu-latest
    steps:
      - name: Send hello message
        uses: actions/first-interraction@v1
        with:
          repo-token: \${{secrets.GITHUB_TOKEN}}
          issue-message: "Message that will be displayed on users' first issue"
          pr-message: "Message that will be displayed on users; first pull request"
```

This workflow is triggered whenever an issue is opened in the repository or created a pull request. It contains a single job called "hello," which runs on an Ubuntu virtual machine. The job has a single step, which uses the actions/first-interraction action from the GitHub Actions Marketplace to send a message to the person who triggered this event.

Here is an example of a continuous integration (CI) workflow for a Go project that runs tests whenever a pull request is merged:

```yaml
name: CI

on:
  pull_request:
    types: [closed]
    branches: [ master ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install Go
        uses: actions/setup-go@v2
        with:
          go-version: latest
      - name: Set up Go module
        run: go mod download
      - name: Run tests
        run: go test ./...
```

This workflow is triggered whenever a pull request is closed and merged into the master branch of the repository. It contains a single job called "build," which runs on an Ubuntu virtual machine. The job has four steps:

The actions/checkout action is used to check out the code that was merged into the repository.
The actions/setup-go action is used to install the latest version of Go.
The go mod download command is run to install any necessary dependencies for the project.
The go test command is run to execute the tests for the code.
You can customize this workflow to fit your specific needs, such as running different tests or checks depending on the type of code being merged.

## What is an Action

In GitHub Actions, an action is a piece of code that performs a specific task as part of a workflow. Actions can be custom actions that you create yourself, or they can be pre-built actions from the GitHub Actions Marketplace.

Actions are defined in a YAML file as part of a workflow. They are typically used in the steps section of a job, and they can be combined with other actions or command-line scripts to perform complex tasks.

```yaml
name: Deployment

on:
  push:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install Go
        uses: actions/setup-go@v2
        with:
          go-version: latest
      - name: Set up Go module
        run: go mod download
      - name: Build code
        run: go build -o main .
      - name: Package code
        run: zip function.zip main
      - name: Deploy code
        uses: aws-actions/aws-lambda-deploy-function@v1
        with:
          region: us-east-1
          function-name: my-function
          zip-file: function.zip
```

This workflow is triggered whenever code is pushed to the master branch of the repository. It contains a single job called "build," which runs on an Ubuntu virtual machine. The job has six steps:

1. The actions/checkout action is used to check out the code from the repository.
2. The actions/setup-go action is used to install the latest version of Go.
3. The go mod download command is run to install any necessary dependencies for the project.
4. The go build command is run to build the code.
5. The zip command is used to package the built code into a ZIP file.
6. The aws-actions/aws-lambda-deploy-function action is used to deploy the packaged code to an AWS Lambda function.

You can customize this workflow to fit your specific needs, such as using different deployment targets or performing additional tasks before or after the deployment.

## Benefits of using GitHub Actions

There are several benefits to using GitHub Actions:

1. Automation: GitHub Actions allows you to automate your workflow by creating custom processes that are triggered by specific events in your repository. This can save time and effort for developers, and reduce the risk of errors caused by manual tasks.

2. Customizability: GitHub Actions gives you the flexibility to create custom actions that fit your specific needs. You can also use pre-built actions from the GitHub Actions Marketplace to quickly set up common tasks in your workflow.

3. Integration: GitHub Actions integrates seamlessly with other tools and services, such as popular continuous integration and delivery (CI/CD) platforms, cloud providers, and testing tools. This allows you to easily incorporate GitHub Actions into your existing workflow.

4. Community support: GitHub Actions has a large and active community of developers who share their actions and workflows in the Marketplace. You can use these actions to get started quickly, or learn from the work of others to create your own custom actions.

5. Ease of use: GitHub Actions has a simple and intuitive interface that makes it easy to create, customize, and manage your workflows. You can use the GitHub web interface or the command-line interface to create and edit your workflows.

## Workflow Syntax

```yaml
name: Workflow name
# Optional name for workflow

on:
  # Required. Event(s) that trigger the workflow
  push:
  # Every time someone pushes to the repo
    branches: [main, v3.1.1]
    # Every push to given branches triggers jobs/workflow

jobs:
  # Jobs that make up the workflow
  job_name:
    # Arbitrary name for job eg build. Job settings
    runs-on: ubuntu-latest
    
    ## Alternative approach for multiple os
    # runs-on: ${{matrix.os}}
    #   matrix:
    #       os: [ubuntu-latest, windows-latest, macos-latest]
    # this will run your job on all three operating systems.
    
    # Environment to run the job on
    steps:
        -uses: actions/checkout@v3
        # We clone the repo to our remote workspace where these steps run. Predefined
      # Steps to be performed in the job

      - step_name: # Step name (optional)
        uses: # Action to be performed in the step
        with: # Inputs to the action (optional)
        env: # Environment variables for the step (optional)
        run: # Run command on machine eg. chmod +x gradlew which will grant execute permission for gradlew

        - name: Build and Push Docker Image
          uses: mr-smithers-excellent/docker-build-push@v4
          with:
            image: cagri/demo-app
            registry: docker.io
            username: ${{ secrets.DOCKER_USERNAME }}
            password: ${{ secrets.DOCKER_PASSWORD }}
```

Sources: [All the events](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows)

Actions: [Predefined Actions](www.github.com/actions)


## Important considerations for using GitHub Actions
- Workflow triggers: Make sure to define the events that trigger your workflow in the on section of the workflow file. This will ensure that the workflow runs at the appropriate times.

- Job environments: Choose the appropriate environment for your jobs to run on. GitHub Actions supports various environments, such as different versions of Linux, macOS, and Windows.

- Action inputs: Use the with section to specify input parameters for actions. This can help you customize the behavior of the action to fit your needs.

- Environment variables: Use the env section to define environment variables for your jobs and steps. This can help you customize the behavior of your scripts and actions based on the environment they are running in.

- Security: Be mindful of security when using GitHub Actions. Avoid storing sensitive information, such as passwords or API keys, in your workflow files. Instead, use secure environment variables or secrets to store this information.

- Performance: Monitor the performance of your workflows and optimize as needed. This can help you ensure that your workflows run smoothly and efficiently.

## Security and permissions

- Secrets: Avoid storing sensitive information, such as passwords or API keys, in your workflow files. Instead, use secure environment variables or secrets to store this information. Secrets can be encrypted and stored in the repository, and they can be accessed by your workflow using the secrets context.

- Permissions: Make sure that your workflows have the necessary permissions to access resources and perform tasks. For example, if your workflow needs to deploy code to a cloud provider, you need to make sure that it has the necessary permissions to do so.

- Third-party actions: Be cautious when using third-party actions from the GitHub Actions Marketplace. Make sure to review the code and documentation for the action, and consider the security implications of using it in your workflow.


## Scaling and resource limits

GitHub Actions has some limits on the resources that are available to workflows. These limits are in place to ensure that workflows do not consume too many resources and impact the performance of other workflows.

Here are some of the main resource limits for GitHub Actions:

1. Timeout: 
     * Job execution time - Each job in a workflow can run for up to 6 hours of execution time. If a job reaches this limit, the job is terminated and fails to complete.

     * Workflow run time - Each workflow run is limited to 35 days. If a workflow run reaches this limit, the workflow run is cancelled. This period includes execution duration, and time spent on waiting and approval.

2. Storage: On free tier Workflows are allocated of 500 MB of storage.

3. CPU: On free tier, Workflows are allocated of 2 virtual CPU cores.

4. Concurrency: The number of concurrent jobs you can run in your account depends on your GitHub plan, as well as the type of runner used. If exceeded, any additional jobs are queued. Currently Free tier has 20 total concurrent jobs and 5 macOS jobs available.

5. GitHub Actions is available on all GitHub products, but GitHub Actions is not available for private repositories owned by accounts using legacy per-repository plans

for more information about billing and limits:  
[1](https://docs.github.com/en/billing/managing-billing-for-github-actions/about-billing-for-github-actions) 
[2](https://docs.github.com/en/actions/learn-github-actions/usage-limits-billing-and-administration)

## Code review and quality checks

Code review and quality checks can be automated as part of your workflow. This allows you to automatically enforce coding standards, run tests, and perform other checks on your code as part of your continuous integration and delivery (CI/CD) process.

For example, you can use GitHub Actions to set up a workflow that is triggered whenever a pull request is opened in your repository. The workflow can then run linting, testing, and static analysis actions on the code in the pull request, and report the results back to GitHub. If any issues are found, the workflow can fail, which can prevent the code from being merged until the issues are resolved.

You can also use GitHub Actions to set up automated code coverage checks, and ensure that your tests cover a certain percentage of your code. This can help you identify areas of your code that are not being tested, and improve the overall quality of your tests.

Finally, you can use GitHub Actions to automate the deployment of your code to various environments, such as staging or production. This can help you ensure that your code is deployed consistently and reliably, and that any issues are detected and addressed before they reach production.

## Deployment and release management

Deployment and release management are important aspects of the software development process, and GitHub Actions can be used to automate these tasks.

Here are some examples of how you can use GitHub Actions for deployment and release management:

Deploying to a cloud provider: You can use actions from the GitHub Actions Marketplace to automate the deployment of your code to various cloud providers, such as AWS, Azure, or GCP. These actions typically allow you to specify the deployment environment, such as a staging or production environment, and the deployment method, such as a blue-green or rolling deployment.

Releasing to a package manager: You can use actions from the GitHub Actions Marketplace to automate the release of your code to package managers, such as npm, PyPI, or RubyGems. These actions typically allow you to specify the version number and release notes for the release, and handle the packaging and publishing of your code.

Creating a release in GitHub: You can use the create-release action to automate the creation of a release in GitHub. This action allows you to specify the release tag, title, and description, and attach assets, such as binary files or documentation, to the release.

Updating a deployment status: You can use the create-deployment-status action to update the deployment status of a commit in GitHub. This can be useful for tracking the progress of a deployment, and for providing feedback to developers about the status of their code.

## YAML

[Yaml Cheat Sheet](https://quickref.me/yaml)

## Example

To be added

Github action for testing if pull request has more than 75% coverage. If otherwise fail.
