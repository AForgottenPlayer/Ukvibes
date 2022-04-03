CREATE DATABASE IF NOT EXISTS ukvibes;
USE ukvibes;

SET FOREIGN_KEY_CHECKS=1;

create table playlist(
    play_id INT auto_increment NOT NULL Primary key,
    play_name varchar(60),
    date_created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
);

insert into playlist (play_id, play_name, date_created)  values (musica_dir);

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(100) NOT NULL,
    user_password VARCHAR(100) NOT NULL,
    date_created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

insert into users (user_name, user_email, user_password) values ("juary", "juary.882.junior@gmail.com", "123");

Create table generos(
    genero_id INT auto_increment NOT NULL Primary key,
    genero_nome varchar(50),
    date_created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

insert into generos (genero_id, genero_nome) values (1,"pop"),(2, "Hip Hop"),(3,"Rap"),(4,"Chill"),(5,"Música Brasileira"),(6,"Indie"),(13,"eletronica"),(14,"rock"),(15,"funk"),(16,"r&b"),(17,"jazz"),(18,"afro"),(19,"classical"),(20,"country"),(21,"trance"),(22,"anos 80"),(23,"lo fi"),(24,"heavy metal"),(25,"house"),(26,"reggae"),(27,"trap"),(28,"reggaeton"),(29,"disco"),(30,"meteal"),(30,"K-POP");

create table artista(
    artista_id INT auto_increment NOT NULL Primary key,
    artista_nome varchar(50),
    artista_image_name varchar(200),
    date_created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
insert into artista ( artista_nome, artista_image_name) values ("The Beatles","	
beatles.jpg"), ("Michael Jackson","michael-jackson-ok-1550763542.jpg"), ("Marilyn Monroev","marilyn_monroev.jpg"), ("Lady Gaga","lady_gaga.jpg"), ("Madonna","maddonna.jpg"), ("Beyoncé","beyonce.jpg"), ("Rihanna","Rihanna.jpg"), ("Britney Spears","britney_spears.jpg"), ("Katy Perry","katy_perry.jpg"), ("Dua Lipa","dua_lipa.jpg"), ("Doja Cat","doja_3.png"), ("Justin Bieber","justin_bieber.png"),("Selena Gomez","selena_gomez.jpg"), ("Taylor Swift","Taylor_Swift.jpg"), ("Demi Lovato","Demi_Lovato.jpg"), ("Maroon 5","Maroon5.jpg"), ("U2","U2.jpg"), ("Kelly Clarkson","kelly_clarkson.jpg"), ("Justin Timberlake","Justin_Timberlake.jpg"), ("Billie Eilish","Billie_Eilish.jpg"), ("Sasha Sloan","sasha_sloan.jpg"), ("Christina Aguilera","Christina_Aguilera.jpg"), ("Kylie Minogue","Kylie_Minogue.jpg"), ("Skrillex","Skrillex.jpg"), ("Bruno Mars","Bruno_Mars.jpg");


Create table musica(
    musica_id INT auto_increment NOT NULL Primary key,
    musica_nome varchar(50),
    musica_dir varchar(500),
    id_genero int,
    INDEX id_genero_idx(id_genero),
    FOREIGN KEY id_genero_idx(id_genero) REFERENCES generos(genero_id),
    date_created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
insert into musica (musica_nome, musica_dir) values ("that's the way you are","Bruno Mars - Just The Way You Are [Official Video]...
"), ("that's what i like","Bruno Mars-that's what I like Official-music-video");

Create table musica_has_artista(
    id_musica INT,
    INDEX id_musica_idx(id_musica),
    FOREIGN KEY id_musica_idx(id_musica) REFERENCES musica(musica_id),
    id_artista INT,
    INDEX id_artista_idx(id_artista),
    FOREIGN KEY id_artista_idx(id_artista) REFERENCES artista(artista_id)
)
 
insert into musica_has_artista (id_musica, id_artista)

SET FOREIGN_KEY_CHECKS=0; 
