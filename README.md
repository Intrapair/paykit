# paykit




# Wallet

## Update model or add migration?
If you update the model, you need to generate a new typed file. To do this, run the following command:
- Run `DATABASE_URL=db-connection-string DATABASE_NAME=db-name pnpm generate:schema`
- For dev environment, run `DATABASE_URL=mysql://root:testrootpassword@localhost:3306/walletmodule DATABASE_NAME=walletmodule pnpm generate:schema`