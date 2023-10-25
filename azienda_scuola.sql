create database Aziende_scuola;

use Aziende_scuola;

create table Users(
	id_user bigint auto_increment primary key,
	nome varchar(50) not null,
	cognome varchar(50) not null,
	data_nascita date not null,
	numero_tel varchar(255),
	token varchar(10),
	username varchar(50) not null unique,
	email varchar(255) not null unique,
	password varchar(255) not null
);

create table Azienda(
  id_azienda bigint auto_increment primary key,
  ragione_sociale varchar(100) not null,
  p_iva varchar(20),
  numero_dipendenti int,
  numero_tel varchar(255) not null,
  email varchar(255) not null,
  indirizzo varchar(255) ,
  comune varchar(255) not null,
  provincia varchar(100) not null,
  regione varchar(50) not null,
  referente varchar(255),
  note varchar(255),
  descrizione varchar(255),
  ambito varchar(255),
  id_user bigint,
  foreign key(id_user) references Users(id_user),
  index ragione_sociale(ragione_sociale),
  index ambito(ambito)
);

create table Tecnologia(
  id_tecnologia bigint auto_increment primary key,
  nome varchar(100) not null,
  tipo varchar(100),
  descrizione varchar(255),
  id_user bigint,
  foreign key(id_user) references Users(id_user)
);

create table Azienda_usa_tech(
  id_azieda_to_tech bigint auto_increment primary key,
  id_azienda bigint,
  id_tecnologia bigint,
  id_user bigint,
  foreign key(id_azienda) references Azienda(id_azienda),
  foreign key(id_tecnologia) references Tecnologia(id_tecnologia),
  foreign key(id_user) references Users(id_user)
);


create table Risorsa_richiesta(
  id_risorse_richiesta bigint auto_increment primary key,
  id_azienda bigint not null,
  tipo varchar(100),
  data_inizio dateTime,
  data_fine dateTime,
  note varchar(255),
  assume bool,
  id_user bigint,
  foreign key(id_user) references Users(id_user)
);

create table Risorse_rischiesta_teck(
	id_ris_teck bigint auto_increment primary key,
	id_risorse_richieste bigint,
	id_tecnologia bigint,
	foreign key(id_risorse_richieste) references Risorsa_richiesta(id_risorse_richiesta),
    foreign key(id_tecnologia) references Tecnologia(id_tecnologia)
);


create table UtentiLoggati2(
	id_utenti_loggato int auto_increment primary key,
	session_id varchar(255) not null,
	id_user bigint,
	foreign key(id_user) references Users(id_user)
);


