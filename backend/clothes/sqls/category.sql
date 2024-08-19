use ozz;

-- Insert into category_high
INSERT INTO category_high (name) VALUES ('상의');
INSERT INTO category_high (name) VALUES ('하의');
INSERT INTO category_high (name) VALUES ('아우터');
INSERT INTO category_high (name) VALUES ('원피스');
INSERT INTO category_high (name) VALUES ('신발');
INSERT INTO category_high (name) VALUES ('악세서리');
INSERT INTO category_high (name) VALUES ('가방');

-- Insert into category_low with corresponding category_high IDs

-- 상의 (category_high_id = 1)
INSERT INTO category_low (name, category_high_id) VALUES ('탑', 1);
INSERT INTO category_low (name, category_high_id) VALUES ('블라우스', 1);
INSERT INTO category_low (name, category_high_id) VALUES ('티셔츠', 1);
INSERT INTO category_low (name, category_high_id) VALUES ('니트웨어', 1);
INSERT INTO category_low (name, category_high_id) VALUES ('셔츠', 1);
INSERT INTO category_low (name, category_high_id) VALUES ('브라탑', 1);
INSERT INTO category_low (name, category_high_id) VALUES ('후드티', 1);

-- 하의 (category_high_id = 2)
INSERT INTO category_low (name, category_high_id) VALUES ('청바지', 2);
INSERT INTO category_low (name, category_high_id) VALUES ('팬츠', 2);
INSERT INTO category_low (name, category_high_id) VALUES ('스커트', 2);
INSERT INTO category_low (name, category_high_id) VALUES ('레깅스', 2);
INSERT INTO category_low (name, category_high_id) VALUES ('조거팬츠', 2);

-- 아우터 (category_high_id = 3)
INSERT INTO category_low (name, category_high_id) VALUES ('코트', 3);
INSERT INTO category_low (name, category_high_id) VALUES ('재킷', 3);
INSERT INTO category_low (name, category_high_id) VALUES ('점퍼', 3);
INSERT INTO category_low (name, category_high_id) VALUES ('패딩', 3);
INSERT INTO category_low (name, category_high_id) VALUES ('베스트', 3);
INSERT INTO category_low (name, category_high_id) VALUES ('가디건', 3);
INSERT INTO category_low (name, category_high_id) VALUES ('짚업', 3);

-- 원피스 (category_high_id = 4)
INSERT INTO category_low (name, category_high_id) VALUES ('드레스', 4);
INSERT INTO category_low (name, category_high_id) VALUES ('점프수트', 4);

-- 신발 (category_high_id = 5)
INSERT INTO category_low (name, category_high_id) VALUES ('운동화', 5);
INSERT INTO category_low (name, category_high_id) VALUES ('구두', 5);
INSERT INTO category_low (name, category_high_id) VALUES ('샌들/슬리퍼', 5);

-- 악세서리 (category_high_id = 6)
INSERT INTO category_low (name, category_high_id) VALUES ('주얼리', 6);
INSERT INTO category_low (name, category_high_id) VALUES ('기타', 6);
INSERT INTO category_low (name, category_high_id) VALUES ('모자', 6);

-- 가방 (category_high_id = 7)
INSERT INTO category_low (name, category_high_id) VALUES ('백팩', 7);
INSERT INTO category_low (name, category_high_id) VALUES ('힙색', 7);
