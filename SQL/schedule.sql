CREATE TABLE `soccer_schedule_category` (
  `idx` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`idx`),
  UNIQUE KEY `idx_UNIQUE` (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `soccer_schedule` (
  `idx` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `category_idx` int(10) unsigned NOT NULL,
  `date` int(10) unsigned NOT NULL,
  `location` varchar(150) CHARACTER SET latin1 NOT NULL,
  `team1` varchar(45) CHARACTER SET latin1 NOT NULL,
  `team1_score` tinyint(3) unsigned NOT NULL,
  `team2` varchar(45) CHARACTER SET latin1 NOT NULL,
  `team2_score` tinyint(3) unsigned NOT NULL,
  `content_record_url` varchar(800) CHARACTER SET latin1 DEFAULT NULL,
  `video_record_url` varchar(800) CHARACTER SET latin1 DEFAULT NULL,
  `compare_capability` varchar(800) CHARACTER SET latin1 DEFAULT NULL,
  `content` varchar(45) CHARACTER SET latin1 NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`idx`),
  UNIQUE KEY `idx_UNIQUE` (`idx`),
  KEY `ss_category_idx_idx` (`category_idx`),
  CONSTRAINT `ss_category_idx` FOREIGN KEY (`category_idx`) REFERENCES `soccer_schedule_category` (`idx`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

