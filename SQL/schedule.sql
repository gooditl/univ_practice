CREATE TABLE `soccer_schedule_category` (
  `idx` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `created_at` int unsigned NOT NULL,
  `updated_at` int unsigned NOT NULL,
  PRIMARY KEY (`idx`),
  UNIQUE KEY `idx_UNIQUE` (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `soccer_schedule` (
  `idx` int unsigned NOT NULL AUTO_INCREMENT,
  `category_idx` int unsigned NOT NULL,
  `date` int unsigned NOT NULL,
  `location` varchar(150) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `team1` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `team1_score` tinyint unsigned NOT NULL,
  `team2` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `team2_score` tinyint unsigned NOT NULL,
  `content_record_url` varchar(800) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `video_record_url` varchar(800) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `compare_capability` varchar(800) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `content` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `created_at` int unsigned NOT NULL,
  `updated_at` int unsigned NOT NULL,
  PRIMARY KEY (`idx`),
  UNIQUE KEY `idx_UNIQUE` (`idx`),
  KEY `ss_category_idx_idx` (`category_idx`),
  CONSTRAINT `ss_category_idx` FOREIGN KEY (`category_idx`) REFERENCES `soccer_schedule_category` (`idx`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
