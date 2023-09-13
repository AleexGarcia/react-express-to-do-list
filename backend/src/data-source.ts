import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    url:"postgres://to_do_list_db_oaw4_user:YNLbzvHap0oE4i1QONKiZta9bQQ25Ne0@dpg-ck11qtfdorps738v5dbg-a/to_do_list_db_oaw4",
    type: "postgres",
    port: 5432,
    synchronize: true,
    logging: true,
    entities: [
        __dirname + "/entity/*.{ts,js}"
    ],
    migrations: [__dirname + "/database/migrations/*.{ts,js}"],
    subscribers: [],
})

AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");
}).catch(err => {
    console.error("Error during Data Source initialization", err);
})