export class User {
    _id: String;
    name: String;
    created_date: Date;
    bt_mac: String;
    score: String;
    role: String;
    class: String;
    connects: [{ date: Date, station_id: String }]
}
