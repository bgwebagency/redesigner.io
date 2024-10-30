<h1 align="center"><a href="https://www.">redesigner.io</a>
<br>
<br>
<img src="https://avatars.githubusercontent.com/u/124807178?s=48&v=4"></img>
</h1>
<br>


# Follow these rules to contribute

Conventional Commits is a specification for writing standardized commit messages. This guide will walk you through the process of creating a perfect commit step by step. You have to follow this document so that your commits can be added to the project.

# Step 1: Understand Conventional Commits Format

The basic format of a conventional commit message is:
`type(scope): subject`

- **type:** The type of change (e.g., feat, fix, docs, style, refactor, perf, test).
- **scope:** An optional scope that describes the section of the codebase affected (e.g., component or file name).
- **subject** A short description of the change, capitalize the first letter and do not end with a period.

#### Real example

`feat(api): Add X api and configure`

# Step 2: Choose the Right Type

Select the appropriate type for your commit. Here are some common types:
<br>
* `feat:` A new feature
* `fix:` A bug fix
* `docs:` Documentation only changes
* `style:` Changes that do not affect the meaning of the code (white-space, formatting, etc.)
* `refactor:` A code change that neither fixes a bug nor adds a feature
* `perf:` A code change that improves performance
* `test:` Adding missing or correcting existing tests

# Step 3: Write a Clear Subject

Your subject should be concise and descriptive. Aim for 50 characters
or less. Use the imperative mood (e.g., "add" instead of "added").
Example:

`feat(auth): Add login functionality`

# Step 4: Add a Body (Optional)

If necessary, provide additional context in the body of the commit
message. Use this section to explain what and why you’ve made the
changes.
Format your body like this:

`BODY`

* Explain the reason for the change.
* Reference issues, if applicable (e.g., `Closes #123`)

# Step 5: Commit Your Changes

Once you have your commit message ready, you can commit your changes using:

`git commit -m "type(scope): subject"`

### Happy coding 👨‍💻