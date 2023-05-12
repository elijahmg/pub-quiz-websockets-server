# Websocket server

This is helper repo for [Pub quiz app](https://github.com/elijahmg/Pub-Quiz-App)

1. Add `.env` file to the root and add `DATABASE_URL` for your PSQL, eg `DATABASE_URL="postgresql://${user_name}:${password}@localhost:5432/pubquizdb"`
2. Run `yarn`
3. Run `yarn dev` - to start server
4. Using PgAdmin login into DB and run sql script from `sql-utils/quiz-status-update.sql`
