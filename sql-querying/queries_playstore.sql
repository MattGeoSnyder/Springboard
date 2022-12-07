-- Comments in SQL Start with dash-dash --
SELECT app_name FROM analytics WHERE id = 1880;

SELECT id, app_name FROM analytics WHERE last_updated < 2018-08-01;

SELECT category, COUNT(*) FROM analytics GROUP BY category;

SELECT app_name, reviews FROM analytics ORDER BY reviews desc LIMIT 5;

SELECT app_name FROM analytics WHERE rating > 4.8 ORDER BY reviews desc LIMIT 1;

SELECT AVG(rating) FROM analytics GROUP BY category ORDER BY AVG(rating) desc;

SELECT name, price, rating FROM analytics WHERE rating < 3 ORDER BY price desc LIMIT 1;

SELECT app_name FROM analytics WHERE min_install <= 50;

SELECT app_name FROM analytics WHERE rating < 3 AND review >= 10000;

SELECT app_name FROM analytics WHERE price BETWEEN 0.10 AND 1.00 ORDER BY reviews desc LIMIT 10;

SELECT app_name FROM analytics ORDER BY last_updated LIMIT 1;

SELECT app_name FROM analytics ORDER BY price desc LIMIT 1;

SELECT SUM(reviews) FROM analytics;

SELECT category FROM analytics GROUP BY category HAVING COUNT(*) > 300;

SELECT app_name, reviews, min_install, min_install/reviews AS proportion FROM analytics ORDER BY proportion desc LIMIT 1;