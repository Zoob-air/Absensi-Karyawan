const bcrypt = require("bcrypt");
require("dotenv").config();
const mysql = require("mysql2/promise");

const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "db_absensi_pekerja"
});

const data = [
    ["001","Abdul Manap","OB/Operator","HRGA"],
    ["002","Abdul Sukur","Operator","HRGA"],
    ["003","Ahmad Syarif","Operator","Produksi"],
    ["004","Ali Romli","Operator","Logistik"],
    ["005","Henricus Amridzal Hertanto","Manager","Logistik"],
    ["006","Apud Syarifudin","Operator","Logistik"],
    ["007","Bustomi","Operator","Logistik"],
    ["008","Christian Budiono","Manager",""],
    ["009","Derfen Una Nitcae","Outsource","Keamanan"],
    ["010","Endang Setiawan","Operator","Operator Forklift"],
    ["011","Faisyal Rafiq","Operator","Lokalisasi"],
    ["012","Jefri Harisandi","OB/Operator","Logistik"],
    ["013","Jodhy Rhenald Ariska","Operator","Testing"],
    ["014","Joey Michael Ariska","Staff","Logistik"],
    ["015","Maman Sumantri","Outsource","Keamanan"],
    ["016","Muhammad Ismail","Operator","Produksi"],
    ["017","Muhammad Ismail Saleh","Outsource","Keamanan"],
    ["018","Mulyadi","Outsource","Keamanan"],
    ["019","Raditya Nandyta","Staff","Ahli K3 Umum"],
    ["020","Rahmat Sofyan","Operator","Logistik"],
    ["021","Redi Saepul Bahri","Operator","Produksi"],
    ["022","Rizky Saputra","Operator","Produksi"],
    ["023","Rudy Rachmat","","Kepala Pabrik"],
    ["024","Rusyanto","Operator","Testing"],
    ["025","Semi","Outsource","Keamanan"],
    ["026","Sudarmaji","Staff","Testing"],
    ["027","Mohammad Swandi Noor","Manager","Produksi"],
    ["028","Udin","Keamanan","Keamanan"],
    ["029","Untoro","Staff","Lokalisasi"],
    ["030","Wandi","Operator","Produksi"],
    ["031","Yohan Abukari","Manager","Quality Assurance"],
    ["032","Yudhistira Dharmakusuma","Operator","Testing"],
    ["033","Landi Yupito","Manager","Testing"],
    ["034","Nanang Romadhlon","Staff","Testing"],
    ["035","Ega Fajrianti Nur","Staff","Accounting"],
    ["036","Bambang Setiawan","Staff","Logistik"],
    ["037","Octarifia Kusumawardhani","Staff","QHSE"],
    ["038","Agung Wisnu Cahyadi","Keamanan","Keamanan"],
    ["039","Yaminuddin Gulo","Keamanan","Keamanan"],
    ["040","Pepen Ependi","Keamanan","Keamanan"],
    ["041","Adix","Keamanan","Keamanan"],
    ["042","Abdurohman","Keamanan","Keamanan"],
    ["043","Vincentia Asdhi Kania","Keamanan","Keamanan"],
    ["044","Fina Fitriatun","Keamanan","Keamanan"],
    ["045","Iin mutiara Amelia","Keamanan","Keamanan"],
    ["046","Munadi","Keamanan","Keamanan"],
    ["047","Clara Silaban","Keamanan","Keamanan"],
];

(async()=>{

    const password = await bcrypt.hash("123456",10);

    for(const karyawan of data){

    const [nik,nama,jabatan,divisi] = karyawan;

    const email = nama
        .toLowerCase()
        .replace(/[^a-z0-9]+/g,".")
        .replace(/^\.+|\.+$/g,"")
        + "@twink.co.id";

    const nohp = "08" +
        Math.floor(1000000000 + Math.random()*9000000000);

    const jabatanFinal = divisi
        ? `${jabatan} ${divisi}`.trim()
        : jabatan;

    await db.query(`
        INSERT INTO users
        (
            nik,
            nama,
            email,
            no_hp,
            jabatan,
            password,
            role,
            status
        )
        VALUES
        (?,?,?,?,?,?,?,?)
    `,[
        nik,
        nama,
        email,
        nohp,
        jabatanFinal,
        password,
        "pekerja",
        "aktif"
    ]);

    console.log("Insert :", nama);
}
    process.exit();

})();