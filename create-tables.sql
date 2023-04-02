\c regulasun;

DROP SCHEMA IF EXISTS public;
DROP DATABASE IF EXISTS postgres;

CREATE SCHEMA regula_sun_schema;

CREATE TABLE regula_sun_schema.usuarios (
  id SERIAL PRIMARY KEY,
  login VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  permissao INT NOT NULL
);