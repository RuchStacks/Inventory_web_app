

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `quantity` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `products` WRITE;
INSERT INTO `products` VALUES (4,'Perfumes','Strong one',12,5000.00,'Personal use');
UNLOCK TABLES;


-- Table structure for table `users`


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table `users`

LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES (1,'Ruchika Manke','mankeruchika@gmail.com','$2b$10$QQAntsybrU0/n/US4k56i.7I0ijm9zU1VvkijhYv9ISFwaq0Vj4GK'),(2,'Kavita Manke','zxcvb@gmail.com','$2b$10$4bS1DsQqmqb9nOpAEMIA2eTEA2Abs0yMiUFehE4fZSM2QXhVLtKCC'),(3,'Neem','ruchika@gmail.com','$2b$10$8JfjdUfZM79xyjOJh5EMH.noPtoU9DBS84nm3REnkZVfKMjVJ/n9W');
UNLOCK TABLES;






DROP TABLE IF EXISTS `wishlist`;

CREATE TABLE `wishlist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Dumping data for table `wishlist`


LOCK TABLES `wishlist` WRITE;
INSERT INTO `wishlist` VALUES (10,1,4),(18,2,4);
UNLOCK TABLES;


