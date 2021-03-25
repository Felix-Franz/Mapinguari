# Cthulhu

Indie Game inspired by [Don't Mess with Cthulhu](https://www.kickstarter.com/projects/ibcgames/dont-mess-with-cthulhu).


## Install dev version

**Install node**

Install [node.js](https://nodejs.org/en/download/) by downloading a setup file or using your package manager.

**Add custom npm registry**

Because the development versions will not be published to the default npm registry, we need to add 

To add npm registry to current folder only execute:

```shell
[user@machine ~]$ echo @cthulhu:registry=https://gitlab.com/api/v4/projects/25292530/packages/npm/ >> .npmrc
```

To globally add npm registry execute:

```shell
[user@machine ~]$ npm config set @cthulhu:registry https://gitlab.com/api/v4/projects/25292530/packages/npm/
```

**Install**

Install the dev version:

```shell
[user@machine ~]$ npm install -g @cthulhu/dev
```

**Start**

Start the dev version:

```shell
[user@machine ~]$ cthulhu
```

## Starting app for development

**Install node**

Install [node.js](https://nodejs.org/en/download/) by downloading a setup file or using your package manager.

**Clone App**

Run following command:

```shell
[user@machine ~]$ git clone git@gitlab.com:FelixFranz/cthulhu.git
Cloning into 'cthulhu'...
Enter passphrase for key '/c/Users/Felix/.ssh/id_rsa':
Enter passphrase for key '/c/Users/Felix/.ssh/id_rsa':
remote: Enumerating objects: 11, done.
remote: Counting objects: 100% (11/11), done.
remote: Compressing objects: 100% (8/8), done.
remote: Total 382 (delta 0), reused 0 (delta 0), pack-reused 371
Receiving objects: 100% (382/382), 442.02 KiB | 610.00 KiB/s, done.
Resolving deltas: 100% (175/175), done.
```

If you are on Windows you need to run following command to also resolve symbolic links instead:

```shell
[user@machine ~]$ git clone -c core.symlinks=true git@gitlab.com:FelixFranz/cthulhu.git
Cloning into 'cthulhu'...
Enter passphrase for key '/c/Users/Felix/.ssh/id_rsa':
Enter passphrase for key '/c/Users/Felix/.ssh/id_rsa':
remote: Enumerating objects: 11, done.
remote: Counting objects: 100% (11/11), done.
remote: Compressing objects: 100% (8/8), done.
remote: Total 382 (delta 0), reused 0 (delta 0), pack-reused 371
Receiving objects: 100% (382/382), 442.02 KiB | 610.00 KiB/s, done.
Resolving deltas: 100% (175/175), done.
```

From now, we are working in the project directory:

```shell
[user@machine ~]$ cd cthulhu
```

**Install Dependencies**

To install all necessary dependencies type following:

```shell
[user@machine ~]$ npm run install-dev
> cthulhu@0.0.0 install-dev C:\Users\Felix\Documents\repos\cthulhu
> cd backend && npm install && cd ../frontend && npm install
```

**Starting**

Start the complete app with:

```shell
[user@machine ~]$ npm run start-dev
```

To start only the frontend or backend go into the corresponding directory and run the start command:

```shell
[user@machine ~]$ cd frontend
[user@machine ~]$ npm start
```

```shell
[user@machine ~]$ cd backend
[user@machine ~]$ npm start
```
