import { MongoClient } from 'mongodb'
import { TAnscriptAnnotatedType } from '@anscript/typescript'
import { AsCollection } from './as-collection'
import { NoopLogger, TGenericLogger } from './logger'

export class AsMongo {
  public readonly client: MongoClient
  constructor(
    client: string | MongoClient,
    protected readonly logger: TGenericLogger = NoopLogger
  ) {
    if (typeof client === 'string') {
      this.client = new MongoClient(client)
    } else {
      this.client = client
    }
  }

  get db() {
    return this.client.db()
  }

  protected collectionsList?: Promise<Set<string>>

  protected getCollectionsList() {
    if (!this.collectionsList) {
      this.collectionsList = this.db
        .listCollections()
        .toArray()
        .then(c => new Set(c.map(c => c.name)))
    }
    return this.collectionsList
  }

  async collectionExists(name: string) {
    const list = await this.getCollectionsList()
    return list.has(name)
  }

  getCollection<T extends TAnscriptAnnotatedType & (new (...args: any[]) => any)>(
    type: T,
    logger?: TGenericLogger
  ): AsCollection<T> {
    return new AsCollection(this, type, logger || this.logger)
  }
}
