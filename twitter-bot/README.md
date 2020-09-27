# Twitter Bot Workshop

Welcome to the onboard.money twitter bot workshop!

By then end of this workshop, you will have a fully operational twitter bot that interacts directly with ethereum.

![](https://i.imgur.com/hiHEYgn.png)

As a part of this tutorial we will use the following tools:

- onboard.money
- typescript
- graph protocol
- twitter API
- docker
- redis
- ethereum

Ready? Lets jump into it!

## Twitter Project

You'll need a twitter developer account to get started. In can take a few hours to get a new account approved so make sure to apply for it ASAP. You can add a link to this workshop in your application to accelerate the approval process.

Once your account is active, create a new project and store your api keys somewhere safe.

![](https://i.imgur.com/1zuztJn.png)

## Clone this repository

```shell
$ git clone https://github.com/onboardmoney/workshops.git
$ cd workshops/twitter-bot/boilerplate
$ yarn install
```

You are now in the root of the boilerplate project. This boilerplate is populated with all the boring twitter api, docker, and typescript setup. We start here so that we can focus on the fun ethereum stuff instead!

To help you in the creation of your app, we've created an [example bot](https://twitter.com/treefarmerbot) built on top of [rDAI](https://rdai.money/) that allows anyone to start accumulating yield on their DAI and share the profit with charity.

If you get lost at any point in the development process, take a peak at the [completed bot](https://github.com/onboardmoney/farmerbot) to see what a full implementation looks like.

## Installation

Install dependencies
```bash
yarn
```

Build the bot
```bash
yarn bot build
```

Then, you'll need:

* an onboard money application's API key.
* a twitter developer account
* optionally, a subgraph deployed on the graph protocol

## Getting the onboard.money application's API key

You can run `npx onboardmoney` and follow the instructions. After registering and choosing your app's name, you'll get an API key and a relay address.

You can checkout our [documentation page](https://docs.onboard.money) for a more detailed explanation

## Obtaining bot's credentials 

You'll need to create a dev account at the [Twitter Dev Portal](https://developer.twitter.com/).
Once you got your dev account you'll need to create a Project.
In the _Keys and tokens_ tab, under the _Consumer Key_ section you'll see the API key & secret created for your project, you'll also need to get and bearer token under _Authentication Tokens_.
Back to the _Settings_ tab, you need to enable the 3rd party authentication and provide a callback URL.


After you've done these steps you're almost ready to go, but first you need to set up your environment variables, and for that you should go to .env.example


The `PORT` is where the bot will listen for incoming HTTP requests, 3000 by default.
The `NETWORK` indicates on what network the bot will interact with.
```bash
PORT=3000
NETWORK=
```

`OM_API_KEY` refers to the onboard money application API key you got earlier
```bash
OM_API_KEY=
```

`API_KEY` and `API_KEY_SECRET` refers to your Twitter Project's keys.

`AUTH_CALLBACK` should be the URL you configured in your twitter project, and it will handle the bot's account authentication. 
```bash
TWITTER_API_KEY=
TWITTER_API_KEY_SECRET=
TWITTER_V2_BEARER_TOKEN=
TWITTER_AUTH_CALLBACK=
```

`BOT_NAME` is the account's name, this will be used to search for mentions.
```bash
BOT_NAME=
```

If you already got your bot's account access token & secret you can put them in there, if not you can do it later.
```bash
BOT_ACCESS_TOKEN=
BOT_ACCESS_TOKEN_SECRET=
```

If you are planning to check for events in some network, we recommend using the Graph Protocol for that, and you can place your graph's name in here.
```bash
SUBGRAPH_NAME=
```

After you configured these env variables, you need to rename .env.example to .env
```bash
mv .env.example .env
```

And then run the bot by executing

`sudo docker-compose up`

This start the nestjs project, along with a redis instance.

The bot consists has 3 _croned_ functions
* search for tweets mentioning the bot, parse the tweets and store them in redis
* pull parsed tweets from redis and process them one by one.
* check for events in the network through the Graph Protocol.

## searching for tweets

## processing tweets

## checking for events

The bot also has some endpoints:

`/ping`: should always return a "pong" response.

`/auth`: You can use this endpoint to authenticate your bot's account and obtain the bot's access token 

`/callback`: Twitter will redirect to this endpoint after you authorize your account. If the request is authentic, you'll get the bot's access token and secret, which you should put in your .env file.



Then we have the following services:

`auth.service`: it contains everything related to the twitter's oauth, no need to modify anything in here.
 
`bot.service`: it contains the bot's logic. This boilerplate comes with two functions, which are scheduled to every minute, you can modify this by changing the cron time string in the @Cron decorator to whatever you see fit.

`command.service`: it contains logic for the bot's commands

`subgraph.service`: it contains logic for the bot's commands

