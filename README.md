# deta-url-small

## Get started

1. To install the Deta CLI, open PowerShell and enter:
```shell
iwr https://get.deta.dev/cli.ps1 -useb | iex
```

2. Logging in to Deta via the CLI
```shell
deta login
```

3. Creating Your First Micro 
```shell
deta new --node first_micro --project Region-Asia
```

4. Deploying Local Changes#
```shell
deta deploy
```

5. Opening Your Micro To the Public
```shell
deta auth disable
```

6. Auto-deploy locally saved changes in real time to your Deta micro.
```shell
deta watch
```

## Commands

deta login - Trigger the login process for the Deta CLI.

deta version - Print the Deta version

deta projects - List Deta projects

deta new - Create a new Deta Micro

deta deploy - Deploy new code to a Deta micro

deta details - Get detailed information about a Deta Micro

deta watch - Auto-deploy local changes in real time to your Micro

deta auth - Change auth settings for a Deta Micro (public access, api keys)

deta pull - Pull the live code from a Deta Micro onto your local machine

deta clone - Clone a Deta Micro onto your local machine

deta update - Update a Deta Micro

deta visor - Change the Visor settings for a Deta Micro

deta run - Run a deta micro from the cli

deta cron - Change cron settings for a Deta Micro