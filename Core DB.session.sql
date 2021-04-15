SELECT *
FROM OpeningTimes
    JOIN Restaurants ON OpeningTimes.restaurantName = Restaurants.name
WHERE Restaurants.name = "ken";
-- DROP TABLE OpeningTimes;
-- DROP TABLE Restaurants;