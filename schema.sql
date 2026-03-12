DROP TABLE IF EXISTS packages;

CREATE TABLE packages (
  id TEXT PRIMARY KEY,
  category TEXT,
  img TEXT,
  dest TEXT,
  title TEXT,
  duration TEXT,
  tour_type TEXT,
  price TEXT,
  badge TEXT
);

INSERT INTO packages (id, category, img, dest, title, duration, tour_type, price, badge) VALUES
('kashmir', 'india', '/images/destination-kashmir.png', 'India · Kashmir', 'Magical Kashmir — Srinagar, Gulmarg & Pahalgam', '5 Nights / 6 Days', 'Group Tour', '₹32,999', 'Bestseller'),
('kerala', 'india honeymoon', '/images/destination-kerala.png', 'India · Kerala', 'Wonders of Kerala — Munnar, Alleppey & Cochin', '4 Nights / 5 Days', 'Family Tour', '₹24,999', 'Popular'),
('europe', 'international honeymoon', '/images/destination-europe.png', 'International · Europe', 'Best of Europe — Paris, Swiss Alps & Santorini', '10 Nights / 11 Days', 'All Inclusive', '₹1,49,999', 'Premium'),
('rajasthan', 'india family', '/images/destination-rajasthan.png', 'India · Rajasthan', 'Royal Rajasthan — Jaipur, Udaipur & Jaisalmer', '6 Nights / 7 Days', 'Family Tour', '₹28,999', 'Royal'),
('dubai', 'international', '/images/destination-dubai.png', 'International · Dubai', 'Dazzling Dubai — Burj Khalifa, Safari & Marina', '5 Nights / 6 Days', 'Group Tour', '₹59,999', 'Luxury'),
('ladakh', 'india adventure', '/images/destination-ladakh.png', 'India · Ladakh', 'Ladakh Explorer — Pangong, Nubra & Khardungla', '7 Nights / 8 Days', 'Adventure Tour', '₹35,999', 'Adventure');
