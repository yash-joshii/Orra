CREATE TABLE user_roles (
  user_id bigint NOT NULL,
  role character varying NOT NULL,
  CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role),
  CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES .users(user_id)
);