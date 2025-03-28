DROP DATABASE IF EXISTS hostel;
CREATE DATABASE hostel CHARACTER SET utf8mb4;
USE hostel;

-- Create Building Table
CREATE TABLE Building (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    img VARCHAR(255) DEFAULT "/building-images/building.jpg"
);

INSERT INTO Building (name) VALUES 
("boys building"), 
("girls building");

-- Create Floor Table (with id and building_id)
CREATE TABLE Floor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    building_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    img VARCHAR(255) DEFAULT "/floor-images/floor.jpg",
    FOREIGN KEY (building_id) REFERENCES Building(id) ON DELETE CASCADE
);

INSERT INTO Floor (building_id, name) VALUES 
(1, "1st build first floor"),
(2, "2nd build first floor"),
(2, "2nd build second floor");

-- Create Room Table
CREATE TABLE Room (
    id INT AUTO_INCREMENT PRIMARY KEY,
    floor_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    img VARCHAR(255) DEFAULT "/room-images/room.jpg",
    capacity INT NOT NULL,
    FOREIGN KEY (floor_id) REFERENCES Floor(id) ON DELETE CASCADE
);

INSERT INTO Room (floor_id, name,capacity) VALUES
(1, "fancy room",3),
(1, "normal room",5),
(2, "classic room",4),
(2, "full room",3);