import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import axios, { AxiosInstance } from "axios";
import { Cron } from '@nestjs/schedule';
import { CommandService } from './command.service';


@Injectable()
export class SubGraphService {

  axiosInstance: AxiosInstance;

  constructor(
    private readonly db: DatabaseService,
    private readonly cmdService: CommandService
  ) {
    const url = "https://api.thegraph.com"
    this.axiosInstance = axios.create({
      baseURL: url
    });
  }

  @Cron(process.env.CRON_TIME || "45 * * * * *")
  async getTransfers() {
    const query = {
      query: `{
        transfers {
          id
          from
          to
          value
        }
      }`
    }

    Logger.debug(`Pulling transfers`)
    const ret = await this.axiosInstance.post(
      `/subgraphs/name/${process.env.SUBGRAPH_NAME}`,
      query
    )
    const { data } = ret;
    if (data === undefined) return;
    const { transfers } = data.data;
    // do something with the transfers 
  }
}
