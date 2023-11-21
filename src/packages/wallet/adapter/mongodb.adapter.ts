import { MongoClient } from 'mongodb';
import DatabaseAdapter from './database.adapter';

export default class MongoDBAdapter extends DatabaseAdapter {
    // Implementation of database operations using MongoDB
  
    // Implement the methods from the DatabaseAdapter interface
    protected database: any;
    protected client: any;

    constructor() {
        super();
        this.client = null;
        this.database = null;
    }

    async connect({url, databaseName}: { url: string, databaseName: string }): Promise<boolean> {
        this.client = new MongoClient(url);
        await this.client.connect();
        this.database = this.client.db(databaseName);
        return true;
    }

    async disconnect(): Promise<boolean> {
        await this.client.close();
        return true;
    }

    async insert(collection: string, data: any): Promise<any> {
        return await this.database.collection(collection).insertOne(data);
    }


}