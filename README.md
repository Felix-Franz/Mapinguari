# Mapinguari

[![version](https://shields.io/badge/version-stable-blue)](https://gitlab.com/FelixFranz/mapinguari/-/releases)
[![pipeline status](https://gitlab.com/FelixFranz/mapinguari/badges/tags/pipeline.svg)](https://gitlab.com/FelixFranz/mapinguari/-/pipelines/tags/latest)
[![npm version](https://img.shields.io/npm/v/mapinguari)](https://www.npmjs.com/package/mapinguari)
[![license](https://img.shields.io/npm/l/mapinguari)](https://www.npmjs.com/package/mapinguari)
[![npm downloads](https://img.shields.io/npm/dw/mapinguari)](https://www.npmjs.com/package/mapinguari)
[![npm downloads](https://img.shields.io/npm/dm/mapinguari)](https://www.npmjs.com/package/mapinguari)
[![npm downloads](https://img.shields.io/npm/dy/mapinguari)](https://www.npmjs.com/package/mapinguari)
[![npm downloads](https://img.shields.io/npm/dt/mapinguari)](https://www.npmjs.com/package/mapinguari)

[![version](https://shields.io/badge/version-development-blue)](https://gitlab.com/FelixFranz/mapinguari/-/packages)
[![pipeline status](https://gitlab.com/FelixFranz/mapinguari/badges/master/pipeline.svg)](https://gitlab.com/FelixFranz/mapinguari/-/pipelines/master/latest)
[![npm version](https://img.shields.io/npm/v/@mapinguari/dev?registry_uri=https%3A%2F%2Fgitlab.com%2Fapi%2Fv4%2Fprojects%2F25292530%2Fpackages%2Fnpm)](https://gitlab.com/FelixFranz/mapinguari/-/packages)

Play online with your friends!

Just open [mapinguari.rocks](https://mapinguari.rocks) to start the game!
[![Website status](https://img.shields.io/website?label=Game&url=https%3A%2F%2Fmapinguari.rocks)](https://mapinguari.rocks)

> development has not finished yet!

If you encounter problems, just open an [issue](https://gitlab.com/FelixFranz/mapinguari/-/issues/new)!

For more information visit the [Gitlab development page](https://gitlab.com/FelixFranz/mapinguari).

## Install dev version

**Install node**

Install [node.js](https://nodejs.org/en/download/) by downloading a setup file or using your package manager.

**Add custom npm registry**

Because the development versions will not be published to the default npm registry, we need to add 

To add npm registry to current folder only execute:

```shell
[user@machine ~]$ echo @mapinguari:registry=https://gitlab.com/api/v4/projects/25292530/packages/npm/ >> .npmrc
```

To globally add npm registry execute:

```shell
[user@machine ~]$ npm config set @mapinguari:registry https://gitlab.com/api/v4/projects/25292530/packages/npm/
```

**Install**

Install the dev version:

```shell
[user@machine ~]$ npm install -g @mapinguari/dev
```

**Start**

Start the dev version:

```shell
[user@machine ~]$ mapinguari
```

## Starting app for development

**Install node**

Install [node.js](https://nodejs.org/en/download/) by downloading a setup file or using your package manager.

**Clone App**

Run following command:

```shell
[user@machine ~]$ git clone git@gitlab.com:FelixFranz/mapinguari.git
Cloning into 'mapinguari'...
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
[user@machine ~]$ git clone -c core.symlinks=true git@gitlab.com:FelixFranz/mapinguari.git
Cloning into 'mapinguari'...
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
[user@machine ~]$ cd mapinguari
```

**Install Dependencies**

To install all necessary dependencies type following:

```shell
[user@machine ~]$ npm run install-dev
> mapinguari@0.0.0 install-dev C:\Users\Felix\Documents\repos\mapinguari
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
