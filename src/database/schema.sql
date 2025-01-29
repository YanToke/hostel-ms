DROP DATABASE IF EXISTS hostel;

CREATE DATABASE hostel CHARACTER SET utf8mb4;

USE hostel;

CREATE TABLE Building(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    img VARCHAR(255) DEFAULT "/building.jpg"
);

INSERT INTO Building (name) VALUES ("boys building"),("girls building");

CREATE TABLE floors(
    name VARCHAR(255) NOT NULL,
    img VARCHAR(255) DEFAULT "/floor.jpg",
    FOREIGN KEY(building_id) REFERENCES Building(id) ON DELETE CASCADE
);

INSERT INTO Floor (building_id,name) VALUES (1,"1st bulid first floor"),(2,"2nd build first floor"),(2,"2nd build second floor");

CREATE TABLE Room(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    floor_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    img VARCHAR(255) DEFAULT "/room.jpg",
    FOREIGN KEY(floor_id) REFERENCES Floor(id) ON DELETE CASCADE
);

INSERT INTO Room (floor_id,name) VALUES
 (1,"fancy room"),
 (1,"normal room"),
 (2,"classic room"),
 (2,"full room");

