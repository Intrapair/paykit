npx @databases/mysql-schema-cli \
  --database ${DATABASE_URL} \
  --schemaName ${DATABASE_NAME} \
  --directory packages/wallet/__generated__

# Path: src/pacakges/wallet/generate-schema.sh
