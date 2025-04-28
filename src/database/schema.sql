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
    father_name VARCHAR(255) NOT NULL,
    nrc_no VARCHAR(255) NOT NULL,
    roll_no VARCHAR(255) NOT NULL,
    major VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    student_phone VARCHAR(15) NOT NULL,
    parent_phone VARCHAR(15) NOT NULL,
    gender ENUM('male','female') NOT NULL,
    FOREIGN KEY (room_id) REFERENCES Room(id) ON DELETE CASCADE
);


INSERT INTO Resident (room_id, name, father_name, nrc_no, roll_no, major, address, student_phone, parent_phone, gender)
VALUES
(1, 'John Doe', 'Richard Doe', '12/MN123456', '12345', 'Computer Science', '123 Main St, Cityville', '555-1234', '555-9876', 'male'),
(1, 'Jane Smith', 'Michael Smith', '12/MN654321', '54321', 'Electrical Engineering', '456 Oak St, Townsville', '555-2345', '555-8765', 'female'),
(2, 'Alice Brown', 'James Brown', '12/MN987654', '67890', 'Mathematics', '789 Pine St, Villageburg', '555-3456', '555-7654', 'female'),
(3, 'Bob Johnson', 'David Johnson', '12/MN112233', '11223', 'Mechanical Engineering', '101 Maple St, Suburbia', '555-4567', '555-6543', 'male');
