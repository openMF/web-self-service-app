We are glad that you here to contribute to the Online Banking App. Now, First things first, before you start contributing please do the following things:

1. Setup the developer environment. For that, you can refer the [README.md](https://github.com/ankit01ojha/web-self-service-app/blob/contribute/README.md) or you can follow this [video](https://mifosforge.jira.com/wiki/spaces/docs/pages/498794497/Developer+Environment+Setup+for+Online+Banking+App+2.0).
2. Sign our [Mifos CLA](http://mifos.org/about-us/financial-legal/mifos-contributor-agreement/).

After you are done with the previous steps, please follow these guidelines:

## Submitting an issue

- Before submitting an issue please search the issue tracker whether that issue is already present or not.
- Follow the issue template while creating the issue
- Please include screenshots.
- In case of feature addition please give a detailed description of the feature so, that we could help you in getting that feature successfully accepted into the project.
- For UI enhancements please include mockups and workflows.

## Getting assigned to an issue
- If you would like to work on an issue. please inform in the issue ticket by commenting on it ( you can comment like this eg: I would like to work on this issue)
- Please reproduce the issue before commenting on the ticket. If you are not able to reproduce the issue please ask for clarification by commenting or ask the issue creator.
- If any other contributor is already working on the issue, please ask the previous contributor whether he/she is still working on the issue.

## Coding guidelines
- Please run `npm run lint` ( Eslint check whether the code is in the right format or not )
- Do not use inline statements for CSS changes.

## Submitting a Pull Request (PR)
- If you are not at the develop branch them checkout to develop branch by

   ` git checkout -b develop`
   
- Once, you are at develop branch then, before you start working on the fix or the feature , create a new branch using
  
  `git checkout -b <branch-name>`
  
  Branch name eg: Fix #1234 - Issue Description
    ` 
- After you have done the changes, follows these steps to create a commit
    ` git add <file name> ` or ` git add -A `
    
    ` git commit -m"<meaningful commit message>"`  ( commit message : Fix #IssueNo. - brief description to make everyone understand what you have done)
    
    ` git push origin <branch name>`

- If you have pushed the changes and want to do some changes to it after that
  1. Go to the branch of the PR
  2. Do the changes which you want to do.
  3. Then `git add -A `
  4. ` git commit --amend` ( You can also change the commit name here )
  5. ` git push -f origin <branch name>` ( force push)

- If you want to squash multiple commits then ( For example you want to squash last 2 commits on this branch to into one commit)
     
     `git rebase --interactive HEAD~2`
     
     `git push -f origin <branch name>`

-  Update your branch from the repository

    `git add upstream https://github.com/openMF/web-self-service-app.git`
  
    `git pull --rebase upstream develop` ( this will fetch from upstream and will rebase the branch too).

## Communication Channels
- [Gitter channel](https://gitter.im/openMF/web-self-service-app)
- [Mailing list](https://lists.sourceforge.net/lists/listinfo/mifos-developer)
