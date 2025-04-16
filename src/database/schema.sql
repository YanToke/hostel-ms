DROP DATABASE IF EXISTS hostel;
CREATE DATABASE hostel CHARACTER SET utf8mb4;
USE hostel;

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

CREATE TABLE Resident (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    roll_no VARCHAR(255) NOT NULL,
    major VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    status ENUM('paid','unpaid'),
    FOREIGN KEY (room_id) REFERENCES Room(id) ON DELETE CASCADE
);

INSERT INTO Resident (room_id,name,roll_no,major,phone,status) VALUES
(1,'Mg Hla','1katha-1','CS','09342523','paid'),
(1,'Mg Min','4katha-1','CS','09323521','paid'),
(2,'Mg Kyaw','2phys-1','Physics','0926456767','unpaid'),
(3,'Mg Ba','3chem-1','Chemistry','098542522','paid');