>(pertama kali yang harus dilakukan setelah clone git) instalasi dependencies
buka folder `cd graphql_crud_basic`
kemudian install depenciesnya dengan perintah `npm install`

untuk memulai graphql  `npm start` 
>untuk debugging servernya silahkan jalankan perintah `npm run test`(install nodemon terlebih dahulu jika belum menginstallnya)

Alamat url `http://localhost:8021/graphql` 
>jika terjadi error ubah port yang ada di variable PORT di file server.js 
const PORT = process.env.PORT || (masukkan port yang kalian inginkan)

untuk import database buka folder sql kemudian import databse ke phpmyadmin (test.sql)