CREATE TABLE `board` (
	`board_id`	long	NOT NULL,
	`content`	varchar(200)	NULL,
	`created_date`	timestamp	NULL,
	`image_file_id`	long	NOT NULL,
	`users_id`	long	NOT NULL,
	`age`	int	NULL,
	`style`	bit	NULL,
	`numlikes`	int	NULL
);

CREATE TABLE `users` (
	`users_id`	long	NOT NULL,
	`email`	varchar(63)	NOT NULL	COMMENT '유저 이메일',
	`birth`	date	NOT NULL	COMMENT '유저 생일',
	`nickname`	varchar(15)	NULL	COMMENT '유저 닉네임',
	`profile_file_id`	long	NOT NULL,
	`created_date`	timestamp	NULL
);

CREATE TABLE `board_like` (
	`board_id`	long	NOT NULL,
	`users_id`	long	NOT NULL,
	`created_date`	timestamp	NULL
);

CREATE TABLE `files` (
	`file_id`	long	NOT NULL,
	`path`	varchar(255)	NULL,
	`name`	varchar(255)	NULL,
	`type`	varchar(50)	NULL,
	`upload_date`	timestamp	NULL
);

CREATE TABLE `coordinate` (
	`coordinate_id`	long	NOT NULL	COMMENT '코디 id',
	`style`	bit(10)	NULL,
	`name`	varchar(100)	NULL,
	`low_temper`	float	NULL,
	`high_temper`	float	NULL,
	`humidity`	tinyint	NULL,
	`weather`	tinuint	NULL,
	`created_date`	timestamp	NULL,
	`users_id`	long	NOT NULL,
	`image_file_id`	long	NOT NULL
);

CREATE TABLE `clothes` (
	`clothes_id`	long	NOT NULL,
	`image_file_id`	long	NOT NULL,
	`category_low_id`	tinyint	NOT NULL,
	`users_id`	long	NOT NULL,
	`color`	bit(32)	NULL,
	`name`	varchar(255)	NULL,
	`size`	tinyint	NULL,
	`fit`	tinyint	NULL,
	`texture`	bit(20)	NULL,
	`memo`	varchar(255)	NULL,
	`brand`	varchar(50)	NULL,
	`purchase_date`	timestamp	NULL,
	`purchase_site`	varchar(100)	NULL,
	`created_date`	timestamp	NULL,
	`style`	bit(10)	NULL,
	`season`	bit(4)	NULL
);

CREATE TABLE `category_high` (
	`category_high_id`	tinyint	NOT NULL,
	`name`	varchar(30)	NULL
);

CREATE TABLE `category_low` (
	`category_low_id`	tinyint	NOT NULL,
	`name`	varchar(30)	NULL,
	`category_high_id`	long	NOT NULL
);

CREATE TABLE `favorite` (
	`favorite_group_id`	long	NULL,
	`coordinate_id`	long	NOT NULL	COMMENT '코디 id'
);

CREATE TABLE `favorite_group` (
	`favorite_group_id`	long	NULL,
	`users_id`	long	NOT NULL,
	`favorite_group_name`	varchar	NOT NULL
);

CREATE TABLE `clothes_tag` (
	`clothes_tag_id`	long	NOT NULL,
	`board_id`	long	NOT NULL,
	`x_position`	float	NULL,
	`y_position`	float	NULL,
	`board_clothes_id`	long	NOT NULL
);

CREATE TABLE `coordinate_clothes` (
	`coordinate_id`	long	NOT NULL	COMMENT '코디 id',
	`clothes_id`	long	NOT NULL,
	`offset`	tinyint	NULL
);

CREATE TABLE `notification` (
	`notification_id`	long	NOT NULL,
	`content`	varchar(200)	NULL,
	`is_read`	tinyint	NULL,
	`created_date`	timestamp	NULL,
	`users_id`	long	NOT NULL,
	`board_id`	long	NOT NULL
);

CREATE TABLE `board_clothes` (
	`board_clothes_id`	long	NOT NULL,
	`image_file_id`	long	NOT NULL,
	`category_low_id`	tinyint	NOT NULL,
	`color`	bit(32)	NULL,
	`name`	varchar(255)	NULL,
	`size`	tinyint	NULL,
	`fit`	tinyint	NULL,
	`texture`	bit(20)	NULL,
	`memo`	varchar(255)	NULL,
	`brand`	varchar(50)	NULL,
	`style`	bit(10)	NULL,
	`season`	bit(4)	NULL
);

ALTER TABLE `board` ADD CONSTRAINT `PK_BOARD` PRIMARY KEY (
	`board_id`
);

ALTER TABLE `users` ADD CONSTRAINT `PK_USERS` PRIMARY KEY (
	`users_id`
);

ALTER TABLE `board_like` ADD CONSTRAINT `PK_BOARD_LIKE` PRIMARY KEY (
	`board_id`,
	`users_id`
);

ALTER TABLE `files` ADD CONSTRAINT `PK_FILES` PRIMARY KEY (
	`file_id`
);

ALTER TABLE `coordinate` ADD CONSTRAINT `PK_COORDINATE` PRIMARY KEY (
	`coordinate_id`
);

ALTER TABLE `clothes` ADD CONSTRAINT `PK_CLOTHES` PRIMARY KEY (
	`clothes_id`
);

ALTER TABLE `category_high` ADD CONSTRAINT `PK_CATEGORY_HIGH` PRIMARY KEY (
	`category_high_id`
);

ALTER TABLE `category_low` ADD CONSTRAINT `PK_CATEGORY_LOW` PRIMARY KEY (
	`category_low_id`
);

ALTER TABLE `favorite` ADD CONSTRAINT `PK_FAVORITE` PRIMARY KEY (
	`favorite_group_id`,
	`coordinate_id`
);

ALTER TABLE `favorite_group` ADD CONSTRAINT `PK_FAVORITE_GROUP` PRIMARY KEY (
	`favorite_group_id`
);

ALTER TABLE `clothes_tag` ADD CONSTRAINT `PK_CLOTHES_TAG` PRIMARY KEY (
	`clothes_tag_id`
);

ALTER TABLE `coordinate_clothes` ADD CONSTRAINT `PK_COORDINATE_CLOTHES` PRIMARY KEY (
	`coordinate_id`,
	`clothes_id`
);

ALTER TABLE `notification` ADD CONSTRAINT `PK_NOTIFICATION` PRIMARY KEY (
	`notification_id`
);

ALTER TABLE `board_clothes` ADD CONSTRAINT `PK_BOARD_CLOTHES` PRIMARY KEY (
	`board_clothes_id`
);

ALTER TABLE `board_like` ADD CONSTRAINT `FK_board_TO_board_like_1` FOREIGN KEY (
	`board_id`
)
REFERENCES `board` (
	`board_id`
);

ALTER TABLE `board_like` ADD CONSTRAINT `FK_users_TO_board_like_1` FOREIGN KEY (
	`users_id`
)
REFERENCES `users` (
	`users_id`
);

ALTER TABLE `favorite` ADD CONSTRAINT `FK_favorite_group_TO_favorite_1` FOREIGN KEY (
	`favorite_group_id`
)
REFERENCES `favorite_group` (
	`favorite_group_id`
);

ALTER TABLE `favorite` ADD CONSTRAINT `FK_coordinate_TO_favorite_1` FOREIGN KEY (
	`coordinate_id`
)
REFERENCES `coordinate` (
	`coordinate_id`
);

ALTER TABLE `coordinate_clothes` ADD CONSTRAINT `FK_coordinate_TO_coordinate_clothes_1` FOREIGN KEY (
	`coordinate_id`
)
REFERENCES `coordinate` (
	`coordinate_id`
);

ALTER TABLE `coordinate_clothes` ADD CONSTRAINT `FK_clothes_TO_coordinate_clothes_1` FOREIGN KEY (
	`clothes_id`
)
REFERENCES `clothes` (
	`clothes_id`
);

