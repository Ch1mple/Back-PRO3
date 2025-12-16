drop database if exists backpack;

CREATE DATABASE backpack;

USE backpack;

CREATE TABLE users (
    uuid CHAR(36) NOT NULL UNIQUE DEFAULT (UUID()) PRIMARY KEY,
    uuid_firebase VARCHAR(255) NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    img_url VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    wants JSON,
    offers JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type TEXT,
    supertype VARCHAR(50),
    subtype VARCHAR(50),
    rarity VARCHAR(50),
    setName VARCHAR(50),
    --year INT,
    --status VARCHAR(50),
    img_url VARCHAR(255)
);

CREATE TABLE trades (
    trade_id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id CHAR(36),
    receiver_id CHAR(36),
    card_ids JSON,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(uuid),
    FOREIGN KEY (receiver_id) REFERENCES users(uuid)
);

-- Insert statements for the users table
INSERT INTO users (uuid, uuid_firebase, username, email, img_url, password, wants, offers) VALUES
(UUID(), '3S6AAAOdRUgxxwhSzK8sdm85H1Y2', 'km', 'espa_japo@hotmail.com', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_1a.png', 'password1', '{"cards": [1, 2]}', '{"cards": [3]}'),
(UUID(), '2kfUBrMbuRN2nOshnbpvxC2st0I3', 'mk7', 'karina.mujica101@gmail.com', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_1a.png', 'password2', '{"cards": [4]}', '{"cards": [5, 6]}'),
(UUID(), 'p6azK1bl9YNvxSSBiXQdEFuVnPl2', 'jorg', 'jrivbel@hotmail.com', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_1a.png', 'password3', '{"cards": [7]}', '{"cards": [8]}'),
(UUID(), 'KxFejKPxUsNl1oVtztEImUS7phk2', 'bot', 'botnodejs2.0@gmail.com', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_1a.png', 'password4', '{"cards": [9]}', '{"cards": [10]}'),
(UUID(), 'koHWukPoUpYty3tFQE5G6RuN97w1', 'kkm', 'karina@c.om', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_1a.png', 'password5', '{"cards": [11]}', '{"cards": [12]}'),
(UUID(), 'firebase_uuid_6', 'user6', 'user6@example.com', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_1a.png', 'password6', '{"cards": [13]}', '{"cards": [14]}'),
(UUID(), 'firebase_uuid_7', 'user7', 'user7@example.com', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_1a.png', 'password7', '{"cards": [15]}', '{"cards": [16]}'),
(UUID(), 'firebase_uuid_8', 'user8', 'user8@example.com', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_1a.png', 'password8', '{"cards": [17]}', '{"cards": [18]}'),
(UUID(), 'firebase_uuid_9', 'user9', 'user9@example.com', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_1a.png', 'password9', '{"cards": [19]}', '{"cards": [20]}'),
(UUID(), 'firebase_uuid_10', 'user10', 'user10@example.com', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_1a.png', 'password10', '{"cards": [21]}', '{"cards": [22]}');

-- Insert statements for the cards table
INSERT INTO cards (name, type, rarity, expansion, year, status, img_url) VALUES
('card1', 'type1', 'common', 'expansion1', 2021, 'new', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_1.png'),
('card2', 'type2', 'rare', 'expansion2', 2020, 'used', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_2.png'),
('card3', 'type3', 'common', 'expansion3', 2019, 'new', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_3.png'),
('card4', 'type4', 'rare', 'expansion4', 2018, 'used', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_4.png'),
('card5', 'type5', 'common', 'expansion5', 2017, 'new', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_5.png'),
('card6', 'type6', 'rare', 'expansion6', 2016, 'used', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_6.png'),
('card7', 'type7', 'common', 'expansion7', 2015, 'new', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_7.png'),
('card8', 'type8', 'rare', 'expansion8', 2014, 'used', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_8.png'),
('card9', 'type9', 'common', 'expansion9', 2013, 'new', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_9.png'),
('card10', 'type10', 'rare', 'expansion10', 2012, 'used', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_10.png'),
('card11', 'type11', 'common', 'expansion11', 2021, 'new', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_11.png'),
('card12', 'type12', 'rare', 'expansion12', 2020, 'used', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_12.png'),
('card13', 'type13', 'common', 'expansion13', 2019, 'new', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_13.png'),
('card14', 'type14', 'rare', 'expansion14', 2018, 'used', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_14.png'),
('card15', 'type15', 'common', 'expansion15', 2017, 'new', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_15.png'),
('card16', 'type16', 'rare', 'expansion16', 2016, 'used', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_16.png'),
('card17', 'type17', 'common', 'expansion17', 2015, 'new', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_17.png'),
('card18', 'type18', 'rare', 'expansion18', 2014, 'used', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_18.png'),
('card19', 'type19', 'common', 'expansion19', 2013, 'new', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_19.png'),
('card20', 'type20', 'rare', 'expansion20', 2012, 'used', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_20.png'),
('card21', 'type21', 'common', 'expansion21', 2021, 'new', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_21.png'),
('card22', 'type22', 'rare', 'expansion22', 2020, 'used', 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_22.png');

-- Insert statements for the trades table
INSERT INTO trades (sender_id, receiver_id, card_ids) VALUES
((SELECT uuid FROM users WHERE username = 'user1'), (SELECT uuid FROM users WHERE username = 'user2'), '{"cards": [1, 2]}'),
((SELECT uuid FROM users WHERE username = 'user3'), (SELECT uuid FROM users WHERE username = 'user4'), '{"cards": [3, 4]}'),
((SELECT uuid FROM users WHERE username = 'user5'), (SELECT uuid FROM users WHERE username = 'user6'), '{"cards": [5, 6]}'),
((SELECT uuid FROM users WHERE username = 'user7'), (SELECT uuid FROM users WHERE username = 'user8'), '{"cards": [7, 8]}'),
((SELECT uuid FROM users WHERE username = 'user9'), (SELECT uuid FROM users WHERE username = 'user10'), '{"cards": [9, 10]}'),
((SELECT uuid FROM users WHERE username = 'user2'), (SELECT uuid FROM users WHERE username = 'user3'), '{"cards": [11, 12]}'),
((SELECT uuid FROM users WHERE username = 'user4'), (SELECT uuid FROM users WHERE username = 'user5'), '{"cards": [13, 14]}'),
((SELECT uuid FROM users WHERE username = 'user6'), (SELECT uuid FROM users WHERE username = 'user7'), '{"cards": [15, 16]}'),
((SELECT uuid FROM users WHERE username = 'user8'), (SELECT uuid FROM users WHERE username = 'user9'), '{"cards": [17, 18]}'),
((SELECT uuid FROM users WHERE username = 'user10'), (SELECT uuid FROM users WHERE username = 'user1'), '{"cards": [19, 20]}');
