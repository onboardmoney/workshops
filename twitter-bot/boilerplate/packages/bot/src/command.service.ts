import { InfuraProvider } from '@ethersproject/providers';
import { Injectable, Logger, Inject } from '@nestjs/common';
import { App } from '@onboardmoney/sdk';
import { ethers, Contract, VoidSigner } from "ethers";

import addresses from "./contracts/addresses";
import abis from "./contracts/abis";
import { User, CommandContext, Tweet } from './types';

import { DatabaseService } from './database/database.service';
import { TwitterService } from './twitter.service';

@Injectable()
export class CommandService {
  dai: Contract;

  constructor(private readonly db: DatabaseService,
    private readonly twitter: TwitterService,
    @Inject("ONBOARD_MONEY") private readonly onboardmoney: App) {

    // get provider
    const provider = new InfuraProvider(process.env.NETWORK, process.env.INFURA_ID);

    // init contracts
    this.dai = new ethers.Contract(
      addresses[process.env.NETWORK].DAI,
      abis.DAI,
      provider
    );

  }

  async processCommand(user: User, tweet: Tweet, command: string, args: any[]): Promise<void> {
    const ctx = {
      user,
      tweet,
      command,
      args
    }
    switch (command) {
      default:
        Logger.warn(`Unknown command ${command} ${args}`)
    }
  }

}
