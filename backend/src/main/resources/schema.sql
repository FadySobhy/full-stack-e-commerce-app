SET @sql = (SELECT IF(
    EXISTS(
        SELECT * FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = 'ecommerce_db' 
        AND TABLE_NAME = 'products' 
        AND COLUMN_NAME = 'category'
    ),
    'ALTER TABLE products DROP COLUMN category',
    'SELECT 1'
));

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt; 