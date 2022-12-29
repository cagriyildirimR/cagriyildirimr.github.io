---
layout: default
title: Writing Good Commit Messages
nav_order: 3
---

# Writing Good Commit Messages

{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Introduction

Git commit messages are an important aspect of your version control workflow, as they allow you to communicate the changes you have made to your codebase and provide context for why those changes were necessary. Here are some key aspects of writing good Git commit messages:

1. Keep the subject line short and concise: The subject line should be no longer than 50 characters, and should clearly and concisely summarize the changes made in the commit.

2. Use the imperative mood: The subject line should be written in the imperative mood, as if you are issuing a command. For example, "Fix bug in login form" or "Add tests for new feature."

3. Capitalize the subject line: Capitalize the first letter of the subject line to make it more readable.

4. Use the body to provide more context: The body of the commit message should provide more context and detail about the changes made in the commit. It should be written in full sentences, and should use the past tense.

5. Keep it concise: Try to keep the commit message concise, while still providing enough information to understand the changes made. A good rule of thumb is to keep the subject line to 50 characters or less, and the body to 72 characters or less per line.

## Keep the subject line short and consise

Good:

* "Fix login form bug" (short and concise)
* "Update README with installation instructions" (short and concise)

Bad:

* "I fixed the really annoying bug in the login form that was causing problems for everyone and causing a lot of frustration, but it was really hard to track down and fix and I had to spend a lot of time on it but I finally figured it out and now it's all good" (too long and not concise)
* "Updating the readme file with instructions on how to install the application, which is important because it helps new users get set up and running quickly and easily" (too long and not concise)

In the good examples, the subject lines are short and to the point, clearly summarizing the changes made in the commit. In the bad examples, the subject lines are too long and rambling, and do not clearly summarize the changes made.


## Use the imperative mood

Good:

* "Add tests for new feature"
* "Refactor database schema"
* "Upgrade dependency to latest version"
* "Remove deprecated code"
* "Fix typo in documentation"

Bad: 

* "Added tests for the new feature" (uses the past tense instead of the imperative mood)
* "The database schema has been refactored" (uses the past tense instead of the imperative mood)
* "I upgraded the dependency to the latest version" (uses the first person instead of the imperative mood)
* "Deprecated code was removed" (uses the past tense instead of the imperative mood)
* "A typo was fixed in the documentation" (uses the past tense instead of the imperative mood)

In each of these examples, the commit message is written in the past tense instead of the imperative mood, which makes it less clear and less direct. It is important to use the imperative mood in commit messages because it helps to clearly convey the action that was taken in the commit.


## Capitalize the subject line

Good:

* "Fix typo in documentation" (capitalizes the first letter of the subject line)
* "Add support for new file format" (capitalizes the first letter of the subject line)

Bad:

* "fix typo in documentation" (does not capitalize the first letter of the subject line)
* "add support for new file format" (does not capitalize the first letter of the subject line)

In the good examples, the subject lines are capitalized, making them more readable and easier to understand. In the bad examples, the subject lines are not capitalized, which makes them harder to read and less professional. Capitalizing the first letter of the subject line is a simple way to make your commit messages more readable and easier to understand.

## Use the body to provide more context

Good:

```
Fix bug in login form

The login form was not properly validating the email field, allowing 
users to submit the form with an invalid email address. This commit 
fixes the bug by adding proper email validation to the form."

The login form was also allowing users to submit the form with an 
empty password field, which could allow malicious users to gain 
access to accounts. This commit adds a check to ensure that the 
password field is not empty before allowing the form to be submitted.
```

```txt
Add support for new file format

This commit adds support for the new XYZ file format to the application. 
The support includes parsing and validating the file contents, as well 
as displaying the data in the UI. The implementation makes use of the 
existing file parsing framework, and includes tests to ensure the 
correct functioning of the feature." 
```

provides more context and detail about the changes made in the commit.

Bad:
```
Add support for new file format

Added support for new file format
```
does not provide enough context or detail about the changes made in the commit.

In the good example, the commit message uses the body to provide more context and detail about the changes made in the commit. It describes the new feature that was added, and explains how it was implemented and tested. This level of detail helps to give a better understanding of the changes made and the reasoning behind them. In the bad example, the commit message does not provide enough context or detail, making it difficult to understand the changes made and the reasoning behind them. It is important to use the body of the commit message to provide as much context and detail as possible, as this will help you and your team understand the changes more clearly.

## Keep it concise

"Keep it concise", is important because it helps to ensure that your commit messages are easy to read and understand. Long, rambling commit messages can be difficult to read and can make it hard to understand the changes made in the commit. By keeping your commit messages concise, you can ensure that they are clear and easy to understand.

The 50 character limit for the subject line is based on the fact that the subject line is displayed on its own line in most Git tools, and it is important to ensure that the entire subject line is visible on the screen without wrapping. This makes it easier to read and understand the commit message at a glance.

The 72 character limit for the body is based on the fact that many code editors and terminal windows display text in a fixed-width font, with a line length of around 80 characters. By keeping the body of the commit message to 72 characters or less per line, the text will be easy to read and will not wrap awkwardly in these environments.

By following these guidelines, you can ensure that your commit messages are easy to read and understand, which will make it easier for you and your team to work with your version control system.

## Summary

```
Summarize changes in around 50 characters or less

More detailed explanatory text, if necessary. Wrap it to about 72
characters or so. In some contexts, the first line is treated as the
subject of the commit and the rest of the text as the body. The
blank line separating the summary from the body is critical (unless
you omit the body entirely); various tools like `log`, `shortlog`
and `rebase` can get confused if you run the two together.

Explain the problem that this commit is solving. Focus on why you
are making this change as opposed to how (the code explains that).
Are there side effects or other unintuitive consequences of this
change? Here's the place to explain them.

Further paragraphs come after blank lines.

 - Bullet points are okay, too

 - Typically a hyphen or asterisk is used for the bullet, preceded
   by a single space, with blank lines in between, but conventions
   vary here

If you use an issue tracker, put references to them at the bottom,
like this:

Resolves: #123
See also: #456, #789
```

## See also
[How to Write a Git Commit Message](https://cbea.ms/git-commit/)

[A Note About Git Commit Messages
](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)