CREATE DATABASE IF NOT EXISTS charityevents_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE charityevents_db;
DROP TABLE IF EXISTS organisations;
CREATE TABLE organisations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  address TEXT,
  website VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
DROP TABLE IF EXISTS events;
CREATE TABLE events (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  short_description VARCHAR(500),
  full_description TEXT,
  event_date DATE NOT NULL,
  event_time TIME,
  location VARCHAR(255) NOT NULL,
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  postcode VARCHAR(20),
  category_id INT,
  organisation_id INT,
  ticket_price DECIMAL(10,2) DEFAULT 0.00,
  goal_amount DECIMAL(12,2) DEFAULT 0.00,
  raised_amount DECIMAL(12,2) DEFAULT 0.00,
  image_url VARCHAR(500),
  status ENUM('active','suspended','deleted') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  CONSTRAINT fk_events_category FOREIGN KEY (category_id) REFERENCES categories(id),
  CONSTRAINT fk_events_org FOREIGN KEY (organisation_id) REFERENCES organisations(id)
);
INSERT INTO organisations (name, description, contact_email, contact_phone, address, website) VALUES
('City Hope Foundation','A foundation focused on health and education initiatives.','contact@cityhope.org','+61 2 1234 5678','123 Main St, Central City','https://cityhope.org'),
('Green Future Trust','Environmental projects and climate resilience.','hello@greenfuture.org','+61 2 8765 4321','77 Riverside Ave, Central City','https://greenfuture.org');
INSERT INTO categories (name, description) VALUES
('Fun Run','Community running events'),
('Gala','Formal dinner galas'),
('Auction','Silent or live auctions'),
('Concert','Benefit music concerts');
INSERT INTO events (name, short_description, full_description, event_date, event_time, location, address, city, state, postcode, category_id, organisation_id, ticket_price, goal_amount, raised_amount, image_url, status) VALUES
('Riverfront 5K Fun Run','A family-friendly 5K along the river.','Join runners of all levels to raise funds for youth health programs.', DATE_ADD(CURDATE(), INTERVAL 14 DAY),'09:00:00','Riverside Park','1 River Rd','Central City','NSW','2000',1,1,20.00,10000.00,2500.00,'https://images.unsplash.com/photo-1520975954732-35ddf9a39155','active'),
('Midnight Charity Gala','Black-tie evening with dinner.','An elegant evening supporting cancer research. Includes dinner and keynote.', DATE_ADD(CURDATE(), INTERVAL 30 DAY),'19:00:00','Grand Hall','50 King St','Central City','NSW','2000',2,1,150.00,50000.00,12800.00,'https://images.unsplash.com/photo-1521337587164-cf3f2b8bec4e','active'),
('Art for Good Auction','Bid on donated artworks.','Local artists donate pieces to fund scholarships.', DATE_ADD(CURDATE(), INTERVAL -10 DAY),'18:00:00','City Gallery','22 Art Ln','Central City','NSW','2000',3,1,0.00,20000.00,20000.00,'https://images.unsplash.com/photo-1520697222869-9f8e5f0a8c29','active'),
('Summer Sounds Benefit Concert','Outdoor concert featuring local bands.','Bring a picnic and enjoy live music for a cause.', DATE_ADD(CURDATE(), INTERVAL 45 DAY),'16:00:00','Harbour Park','9 Bay St','Harbour Town','NSW','2100',4,2,35.00,30000.00,5200.00,'https://images.unsplash.com/photo-1511379938547-c1f69419868d','active'),
('Coastal 10K Challenge','Competitive 10K with scenic views.','Raise funds for coastal cleanup initiatives.', DATE_ADD(CURDATE(), INTERVAL 7 DAY),'08:00:00','Coastal Track','88 Beach Rd','Seaside','NSW','2200',1,2,25.00,15000.00,4000.00,'https://images.unsplash.com/photo-1534367610401-9f19f1d6d9a1','active'),
('Harvest Charity Gala','Autumn-themed gala dinner.','Support local food banks via a festive evening.', DATE_ADD(CURDATE(), INTERVAL -40 DAY),'18:30:00','Civic Centre','10 Market St','Central City','NSW','2000',2,1,120.00,40000.00,31000.00,'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17','active'),
('Books & Beyond Auction','Rare books auction.','Help build community libraries.', DATE_ADD(CURDATE(), INTERVAL 5 DAY),'17:00:00','Town Library','5 Read St','Central City','NSW','2000',3,1,10.00,12000.00,3500.00,'https://images.unsplash.com/photo-1519681393784-d120267933ba','active'),
('Harmony for Hope Concert','Choirs unite for charity.','An evening of choral music supporting mental health programs.', DATE_ADD(CURDATE(), INTERVAL 90 DAY),'19:30:00','Opera House','2 Theatre Rd','Harbour Town','NSW','2100',4,2,50.00,45000.00,9000.00,'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc','active');
INSERT INTO events (name, short_description, full_description, event_date, event_time, location, address, city, state, postcode, category_id, organisation_id, ticket_price, goal_amount, raised_amount, image_url, status) VALUES
('Suspended Test Event','This event is suspended.','Policy violation example.', DATE_ADD(CURDATE(), INTERVAL 20 DAY),'10:00:00','Hidden Venue','N/A','Central City','NSW','2000',1,1,0.00,0.00,0.00,NULL,'suspended');
