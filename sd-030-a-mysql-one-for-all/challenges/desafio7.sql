select artista, album, count(*) as pessoas_seguidoras
from Artista_usuario_seguidores aus
join Pessoa p on p.pessoa_usuaria_id = aus.usuario_id
join Artista ar on ar.artista_id = aus.artista_id
join Album al on al.artista_id = ar.artista_id
group by aus.artista_id, al.album_id
order by pessoas_seguidoras desc, artista, album;
