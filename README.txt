 ## Getting started

 -create your .env file in the project folder.

 -add 
    MYSQL_USER = "your database username"
    MYSQL_PASSWORD = "your database password"
    MYSQL_DATABASE = hostel
    MYSQL_HOST = 127.0.0.1

-run the [schema.sql] file inside database folder (or) 
 copy the text inside that files and paste it after you login into your database .
 for example, 
    ```bash
    mysql -u user_name -p
    - then paste it . 
-ready to run with [npm run dev] 