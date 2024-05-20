DROP TABLE IF EXISTS error;
DROP TABLE IF EXISTS service;
DROP TABLE IF EXISTS service_type;
DROP TABLE IF EXISTS project_token;
DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS note_tag;
DROP TABLE IF EXISTS link;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS note;
DROP TABLE IF EXISTS note_visibility;
DROP TABLE IF EXISTS note_type;
DROP TABLE IF EXISTS user;

CREATE TABLE user
(
    user_id           INT          NOT NULL auto_increment,
    username          VARCHAR(255) NOT NULL unique,
    repository_token  VARCHAR(255) NULL     DEFAULT null,
    repository_url    VARCHAR(255) NULL     DEFAULT null,
    profile_image_url VARCHAR(255) NULL     default null,
    created_at        TIMESTAMP    NOT NULL default now(),
    updated_at        TIMESTAMP    NOT NULL default now() on update now(),
    deleted           BOOLEAN      NOT NULL DEFAULT false,
    primary key (user_id)
);

CREATE TABLE note_type
(
    note_type_id INT        NOT NULL auto_increment,
    type         varchar(8) NOT NULL unique COMMENT 'NORMAL, ERROR',
    primary key (note_type_id)
);

CREATE TABLE note_visibility
(
    note_visibility_id INT        NOT NULL auto_increment,
    visibility         varchar(8) NOT NULL unique COMMENT 'PUBLIC, PRIVATE',
    primary key (note_visibility_id)
);

CREATE TABLE note
(
    note_id            INT          NOT NULL auto_increment,
    user_id            INT          NOT NULL,
    note_type_id       INT          NOT NULL,
    note_visibility_id INT          NOT NULL,
    title              VARCHAR(255) NOT NULL,
    content            MEDIUMTEXT   NOT NULL,
    created_at         TIMESTAMP    NOT NULL default now(),
    updated_at         TIMESTAMP    NOT NULL default now() on update now(),
    backlink_count     INT          NOT NULL DEFAULT 0,
    primary key (note_id),
    foreign key (user_id) references user (user_id) on delete cascade,
    foreign key (note_type_id) references note_type (note_type_id),
    foreign key (note_visibility_id) references note_visibility (note_visibility_id),
    constraint backlink_count_not_negative check ( backlink_count >= 0 )
);

CREATE TABLE comment
(
    comment_id INT       NOT NULL auto_increment,
    user_id    INT       NOT NULL,
    note_id    INT       NOT NULL,
    content    TEXT      NOT NULL,
    created_at TIMESTAMP NOT NULL default now(),
    updated_at TIMESTAMP NOT NULL default now() on update now(),
    primary key (comment_id),
    foreign key (user_id) references user (user_id) on delete cascade,
    foreign key (note_id) references note (note_id) on delete cascade
);

CREATE TABLE link
(
    link_id        INT       NOT NULL auto_increment,
    note_id        INT       NOT NULL,
    linked_note_id INT       NOT NULL,
    created_at     TIMESTAMP NOT NULL default now(),
    primary key (link_id),
    foreign key (note_id) references note (note_id) on delete cascade,
    foreign key (linked_note_id) references note (note_id) on delete cascade,
    constraint note_is_not_linked_note check ( note_id != linked_note_id ),
    constraint linked_note_is_not_note check ( linked_note_id != note_id )
);

CREATE TABLE tag
(
    tag_id     INT          NOT NULL auto_increment,
    name       VARCHAR(100) NOT NULL unique,
    created_at TIMESTAMP    NOT NULL default now(),
    primary key (tag_id)
);

CREATE TABLE note_tag
(
    note_tag_id INT       NOT NULL auto_increment,
    note_id     INT       NOT NULL,
    tag_id      INT       NOT NULL,
    created_at  TIMESTAMP NOT NULL default now(),
    primary key (note_tag_id),
    foreign key (note_id) references note (note_id) on delete cascade,
    foreign key (tag_id) references tag (tag_id) on delete cascade
);

CREATE TABLE project
(
    project_id INT          NOT NULL auto_increment,
    user_id    INT          NOT NULL,
    name       VARCHAR(255) NOT NULL,
    created_at TIMESTAMP    NOT NULL default now(),
    updated_at TIMESTAMP    NOT NULL default now() on update now(),
    primary key (project_id),
    foreign key (user_id) references user (user_id) on delete cascade
);

CREATE TABLE project_token
(
    project_token_id INT          NOT NULL auto_increment,
    project_id       INT          NOT NULL,
    name             VARCHAR(127) NOT NULL,
    token            VARCHAR(255) NOT NULL,
    activated        BOOLEAN      not null,
    created_at       TIMESTAMP    NOT NULL default now(),
    updated_at       TIMESTAMP    NOT NULL default now() on update now(),
    primary key (project_token_id),
    foreign key (project_id) references project (project_id) on delete cascade
);

CREATE TABLE service_type
(
    service_type_id INT          NOT NULL auto_increment,
    name            VARCHAR(127) NOT NULL unique,
    image_url       VARCHAR(255) NOT NULL,
    primary key (service_type_id)
);

CREATE TABLE service
(
    service_id      INT          NOT NULL auto_increment,
    project_id      INT          NOT NULL,
    service_type_id INT          NOT NULL,
    name            VARCHAR(255) NOT NULL,
    created_at      TIMESTAMP    NOT NULL default now(),
    updated_at      TIMESTAMP    NOT NULL default now() on update now(),
    primary key (service_id),
    foreign key (project_id) references project (project_id) on delete cascade,
    foreign key (service_type_id) references service_type (service_type_id)
);

CREATE TABLE service_link
(
    service_link_id   INT       NOT NULL auto_increment,
    service_id        int       not null,
    linked_service_id int       not null,
    created_at        TIMESTAMP NOT NULL default now(),
    updated_at        TIMESTAMP NOT NULL default now() on update now(),
    enabled           BOOLEAN   NOT NULL,
    primary key (service_link_id),
    foreign key (service_id) references service (service_id) on delete cascade ,
    foreign key (linked_service_id) references service (service_id) on delete cascade,
    constraint service_is_not_linked_service check ( service_id != linked_service_id ),
    constraint linked_service_is_not_service check ( linked_service_id != service_id )
);

CREATE TABLE error
(
    error_id   INT          NOT NULL auto_increment,
    note_id    INT          NULL,
    service_id INT          NOT NULL,
    type       VARCHAR(255) NOT NULL,
    summary    TEXT         NOT NULL,
    time       TIMESTAMP    NOT NULL,
    solved     BOOLEAN      NOT NULL DEFAULT false,
    created_at TIMESTAMP    NOT NULL default now(),
    updated_at TIMESTAMP    NOT NULL default now() on update now(),
    primary key (error_id),
    foreign key (note_id) references note (note_id) on delete set null,
    foreign key (service_id) references service (service_id) on delete cascade
);