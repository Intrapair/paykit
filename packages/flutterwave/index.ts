import { IApiKeys } from "./types";
import Collection from "./services/collection.service";
export default class Flutterwave {

    private config: IApiKeys = {
        publicKey: '',
        secretKey: '',
    };

    Collection: Collection;

    constructor(publicKey: string, secretKey: string) {
        this.config.publicKey = publicKey;
        this.config.secretKey = secretKey;
        this.Collection = new Collection(this.config);
    }

}