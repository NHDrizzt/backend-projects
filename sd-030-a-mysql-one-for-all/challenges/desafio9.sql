select count(*) as musicas_no_historico 
from MusicasTocadas mt
join Pessoa p on p.pessoa_usuaria_id = mt.usuario_id
where p.nome_pessoa_usuaria = 'Barbara Liskov'
