-- write your queries here
SELECT * 
FROM owners
LEFT JOIN vehicles ON vehicles.owner_id = owners.id;


SELECT o.first_name, o.last_name, COUNT(*) AS count
FROM vehicles v 
JOIN owners o ON v.owner_id = o.id
GROUP BY v.owner_id, o.first_name, o.last_name
ORDER BY o.first_name;

SELECT o.first_name, o.last_name, ROUND(AVG(v.price)) AS average_price, COUNT(*) AS count
FROM vehicles v 
JOIN owners o ON v.owner_id = o.id
GROUP BY v.owner_id, o.first_name, o.last_name
HAVING ROUND(AVG(v.price)) > 10000 AND COUNT(*) > 1
ORDER BY o.first_name DESC;