select artista, album 
from Artista a
join Album al on a.artista_id = al.artista_id
where a.artista = 'Elis Regina'
