/*
1-How can you convert the table into 1NF?
 there is 3 rules 
  - unique names for columns
  - columns have atomic value
  - values in each columns must be in the same type
we can see that the food_code and food_description have
more than one value 
so we divide these valuse in different columns

member_id | member_name   | member_address | dinner_id | dinner_date | venue_code | venue_description | food_code | food_description |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
|        1 | Amit          | 325 Max park   | D00001001 | 2020-03-15  | B01        | Grand Ball Room   | C1    | Curry     |
         1 | Amit          | 325 Max park   | D00001001 | 2020-03-15  | B01        | Grand Ball Room   | C2    |  Cake  |



2-What are the super, candidate, primary keys in the table created in step (1)?
  candidate keys is member_id , dinner_id , food_code.
         primary keys member_id , food_code

3- How can you develop the set of 2NF tables?
for 2NF form two rules it is must be in Nf1 , and have no partial dependency
 to develop to 2NF table, must divide to thre tables
   tb1- have member_id , member_name , member_address.
   tb2_ have food_code , food description
   tb3- have member_id , food code , dinner_id , dinner_date , venue_code , venue_description

4-How can you develop the set of 3NF tables?
for 3NF two rules , it is must be in 2NF form and No transitive dependency
to develop it to 3NF form we divide it to 4 tables
  tb1- have member_id , member_name , member_address.
  tb2_ have food_code , food description
  tb3- dinner_id , dinner_date , venu_code
  tb4- venue_code , venu description

*/