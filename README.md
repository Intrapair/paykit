# Paykit
Paykit is a comprehensive module that provides wallet management and payment gateway interface on top of Flutterwave and paystack. It is designed to simplify and streamline payment processes within your application or system. With Paykit, users can easily manage their digital wallets and perform secure transactions using various payment gateway.



# Wallet

## Update model or add migration?
If you update the model, you need to generate a new typed file. To do this, run the following command:
- Run `DATABASE_URL=db-connection-string DATABASE_NAME=db-name pnpm generate:schema`
- For dev environment, run `DATABASE_URL=mysql://root:testrootpassword@localhost:3306/walletmodule DATABASE_NAME=walletmodule pnpm generate:schema`