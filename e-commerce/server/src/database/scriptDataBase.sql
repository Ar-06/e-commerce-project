CREATE DATABASE my_store;
use my_store;

CREATE TABLE users (
	id INT auto_increment primary key,
    username varchar(100),
    email varchar(50),
    password varchar(100)
);

