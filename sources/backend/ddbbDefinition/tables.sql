DROP TABLE IF EXISTS `permissions`;
CREATE TABLE IF NOT EXISTS `permissions`(
    `perm_key`                                  VARCHAR(5) NOT NULL,
    `com_wolfchamane_login`                     BOOLEAN default 0,
    `com_wolfchamane_post_news`                 BOOLEAN default 0,
    `com_wolfchamane_mymovies_login`            BOOLEAN default 0,
    `com_wolfchamane_mymovies_list_movies`      BOOLEAN default 0,
    `com_wolfchamane_mymovies_limit`            INTEGER(2),
    `com_wolfchamane_mymovies_rate_movies`      BOOLEAN default 0,
    `com_wolfchamane_mymovies_post_movies`      BOOLEAN default 0,
    `com_wolfchamane_mymovies_edit_movies`      BOOLEAN default 0,
    `com_wolfchamane_mymovies_admin_users`      BOOLEAN default 0,
    `com_wolfchamane_myrecipes_login`           BOOLEAN default 0,
    `com_wolfchamane_myrecipes_list_recipes`    BOOLEAN default 0,
    `com_wolfchamane_myrecipes_limit`           INTEGER(2),
    `com_wolfchamane_myrecipes_rate_recipes`    BOOLEAN default 0,
    `com_wolfchamane_myrecipes_edit_recipes`    BOOLEAN default 0,
    `com_wolfchamane_myrecipes_admin_users`     BOOLEAN default 0,
    CONSTRAINT pk_permissions PRIMARY KEY (`perm_key`)
);

INSERT INTO `permissions`(
    `perm_key`,
    `com_wolfchamane_login`,
    `com_wolfchamane_post_news`,
    `com_wolfchamane_mymovies_login`,
    `com_wolfchamane_mymovies_list_movies`,
    `com_wolfchamane_mymovies_limit`,
    `com_wolfchamane_mymovies_rate_movies`,
    `com_wolfchamane_mymovies_post_movies`,
    `com_wolfchamane_mymovies_edit_movies`,
    `com_wolfchamane_mymovies_admin_users`,
    `com_wolfchamane_myrecipes_login`,
    `com_wolfchamane_myrecipes_list_recipes`,
    `com_wolfchamane_myrecipes_limit`,
    `com_wolfchamane_myrecipes_rate_recipes`,
    `com_wolfchamane_myrecipes_edit_recipes`,
    `com_wolfchamane_myrecipes_admin_users`)
VALUES
    ("root",    1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1),
    ("admin"    0,  0,  1,  1,  0,  1,  1,  1,  0,  1,  1,  0,  1,  1,  0),
    ("user",    0,  0,  1,  1,  0,  1,  0,  0,  0,  1,  1,  0,  1,  1,  0),
    ("test",    0,  0,  1,  1,  1,  0,  0,  0,  0,  1,  1,  1,  0,  0,  0);


DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users`(
    `user_id`       VARCHAR(12) NOT NULL,
    `email`         VARCHAR(100) NOT NULL,
    `password`      VARCHAR(100) NOT NULL,
    `alias`         VARCHAR(50),
    `name`          VARCHAR(50),
    `surname`       VARCHAR(100),
    `dob`           DATE,
    `lastLogin`     DATE,
    `rights`        VARCHAR(5) NOT NULL,
     CONSTRAINT pk_users        PRIMARY KEY (`user_id`, `email`, `password`)
);


INSERT INTO `users` (`user_id`, `email`, `password`, `alias`, `name`, `surname`, `dob`, `lastLogin`, `rights`) 
    VALUES
        ("200001010001", "test@wolfchamane.com", "123456", "Tester", "User", "Tester", null, null, "test"),
        ("200001010002", "user@wolfchamane.com", "123456", "User", "User", "Tester", null, null, "user"),
        ("200001010003", "admin@wolfchamane.com", "123456", "Admin", "User", "Tester", null, null, "admin"),
        ("200001010004", "root@wolfchamane.com", "123456", "Root", "User", "Tester", null, null, "root");

DROP TABLE IF EXISTS `movies`;
CREATE TABLE IF NOT EXISTS `movies`(
    `_id`           VARCHAR(100)    NOT NULL UNIQUE,
    `key`           VARCHAR(100)    NOT NULL,
    `title`         VARCHAR(100),
    `genre`         VARCHAR(50),
    `year`          INTEGER(4),
    `desc`          VARCHAR(4000),
    `rating`        DOUBLE(3,2)     DEFAULT "0.00",
    `totalVotes`    INTEGER,
    CONSTRAINT pk_movies PRIMARY KEY (`_id`, `key`)
);

INSERT INTO `movies` (`_id`, `key`, title`, `genre`, `year`)
    VALUES ("18_2028_P0M/bW8gc2FiZXMgc2kuLi4/_Q29tZWRpYQ==", "como-sabes-si", "¿Cómo sabes si...?", 2010, "Comedia"),
           ("10_2017_W1JFQ10qIFsxXQ==_VGVycm9y", "rec-1", "[REC]* [1]", 2007, "Terror"),
           ("10_2019_W1JFQ10qIFsyXQ==_VGVycm9y", "rec-2", "[REC]* [2]", 2009, "Terror"),
           ("21_2033_WwdSRUNdKiBbM10gLSBHP25lc2lz_VGVycm9y", "rec-3", "[REC]* [3] - Génesis", 2012, "Terror");