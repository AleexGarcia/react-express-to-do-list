import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "db_to_do_list",
    synchronize: true,
    logging: true,
    entities: [
        __dirname + "/entity/*.ts"
    ],
    migrations: [__dirname + "/database/migrations/*.ts"],
    subscribers: [],
})

AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");
}).catch(err => {
    console.error("Error during Data Source initialization", err);
})