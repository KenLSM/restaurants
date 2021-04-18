-- SELECT `Restaurant`.`id`, `Restaurant`.`name`, `Restaurant`.`createdAt`, `Restaurant`.`updatedAt`, `OpeningTimes`.`id` AS `OpeningTimes.id`, `OpeningTimes`.`day` AS `OpeningTimes.day`, `OpeningTimes`.`start` AS `OpeningTimes.start`, `OpeningTimes`.`end` AS `OpeningTimes.end`, `OpeningTimes`.`createdAt` AS `OpeningTimes.createdAt`, `OpeningTimes`.`updatedAt` AS `OpeningTimes.updatedAt`, `OpeningTimes`.`RestaurantId` AS `OpeningTimes.RestaurantId` FROM `Restaurants` AS `Restaurant` 
-- INNER JOIN `OpeningTimes` AS `OpeningTimes` ON `Restaurant`.`id` = `OpeningTimes`.`RestaurantId`

-- AND `OpeningTimes`.`day` = 0
-- AND `OpeningTimes`.`start` >= 1230 
-- AND `OpeningTimes`.`end` <= 1230
-- WHERE `Restaurant`.`name` LIKE '%k%';

DROP TABLE Collections;
-- DROP TABLE Users;