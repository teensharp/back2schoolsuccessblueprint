# Back up this project to GitHub

No code changes are needed. This is a one-time setup you do in the Lovable UI.

## Steps

1. In the Lovable editor, open the **Plus (+)** menu in the chat input (bottom left) → **GitHub** → **Connect project**.
2. Authorize the **Lovable GitHub App** when GitHub prompts you.
3. Choose the GitHub account or organization that should own the repository.
4. Back in Lovable, click **Create Repository**.

After that, every change made in Lovable pushes to the repo automatically, and pushes made on GitHub sync back into Lovable.

## Good to know

- Only one GitHub account can be linked to a Lovable account at a time.
- Alternative one-off export: Code Editor → **Download codebase** (paid workspaces).
- The repo backs up **code only**. The Cloud backend (database tables, auth users, stored responses) is not in Git. Export data separately via Cloud → Advanced settings → Export data.
- Lovable cannot import an existing GitHub repo into a new project, so if you later want this app in another workspace, you would create a new project there and copy files in from the repo, then rebuild the backend.
