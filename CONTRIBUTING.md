# Contributing to Misofome
First of all, thanks for taking the time to work on Misofome!

The following is a set of guidelines for contributing to Misofome and it's components. These are just guidelines, not strict rules. Feel free to propose changes to this and other documents in a pull request.

#### Table Of Contents


## What should I know before I get started?
### Code of Conduct
This project adheres to the Contributor Covenant [code of conduct](CODE_OF_CONDUCT.md).

### API and App
Misofome consists of two main parts; the API and the webapp. When you initially consider contributing to Misofome, you might be unsure which part of the project implements the functionality you want to change or report a bug for. Please read the documentation of the project thoroughly before you start modifying code.

## How Can I Contribute?
### Reporting bugs
When you are creating a bug report, please include as many details as possible. Fill out the required template; the information it asks for helps others resolve issues faster.

### Suggesting Enhancements
When you are creating an enhancement suggestion, please include as many details as possible. Fill out the required template; including the steps that you imagine you would take if the feature you're requesting existed.

### Your First Code Contribution
Unsure where to begin contributing to Misofome? You can start by looking through the `beginner` and `help-wanted` issues. Beginner issues are issues which should only require a few lines of code. Help wanted issues should be a bit more involved than `beginner` issues.

### Pull Requests
* Fill in the required template
* Follow the JavaScript styleguide
* End files with a newline.
* Adhere to the editorconfig file
* Place requires in the following order:
  * Built in Node Modules (such as `path`)
  * Other Node Modules
  * Local Modules (using relative paths)

### Styleguides
#### Git Commit Messages
* Use the present tense ("Add feature", not "Added feature")
* Limit the first line to around 60 characters
* Reference issues and pull requests
* Consider starting the commit message with an applicable emoji. See [Gitmoji](https://gitmoji.carloscuesta.me) for more info

#### JavaScript Styleguide
Please adhere to the rules set in `.eslintrc`. Consider using a linter in your editor or check your code with `npm run lint`.

## Additional notes
### Issue Labels
| Label name | Description |
| --- | --- |
| enhancement | Feature requests. |
| bug | Confirmed bugs or reports that are very likely to be bugs |
| question | |
| beginner | Less complex issues which would be good first issues to work on |
| duplicate | Issues which are duplicates of other issues |
