select nome_pessoa_usuaria as pessoa_usuaria,
COUNT(*) as musicas_ouvidas,
ROUND(SUM(duracao_segundos)/60,2) as total_minutos
from Pessoa
join MusicasTocadas on Pessoa.pessoa_usuaria_id = MusicasTocadas.usuario_id
join Cancoes ON  MusicasTocadas.cancao_id = Cancoes.cancao_id
group by Pessoa.nome_pessoa_usuaria
order by Pessoa.nome_pessoa_usuaria;
