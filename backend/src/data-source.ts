
import { DataSource } from "typeorm";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "13467982",
    database: "db_to_do_list",
    synchronize: true,
    logging: false,
    entities: [
        __dirname + "/entity/*.ts"
    ],
    migrations: [],
    subscribers: [],
})

AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");
}).catch(err => {
    console.error("Error during Data Source initialization", err);
})