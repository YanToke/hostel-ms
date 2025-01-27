DROP DATABASE IF EXISTS hostel;

CREATE DATABASE hostel CHARACTER SET utf8mb4;

USE hostel;

CREATE TABLE buildings(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    img VARCHAR(255) DEFAULT "/building.jpg"
);

INSERT INTO buildings (name) VALUES ("boys rooms"),("girls rooms");

CREATE TABLE floors(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    img VARCHAR(255) DEFAULT "/floor.jpg"
);

INSERT INTO floors (name) VALUES ("first floor"),("second floor");

CREATE TABLE rooms(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    img VARCHAR(255) DEFAULT "/room.jpg"
);

INSERT INTO rooms (name) VALUES
 ("fancy room"),
 ("normal room"),
 ("classic room"),
 ("full room");

