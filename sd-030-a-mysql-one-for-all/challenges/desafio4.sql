select nome_pessoa_usuaria as pessoa_usuaria,
if(max(year(data_reproducao)) >= 2021, 'Ativa', 'Inativa') as status_pessoa_usuaria
from Pessoa p
join MusicasTocadas m on m.usuario_id = p.pessoa_usuaria_id
group by p.pessoa_usuaria_id
order by nome_pessoa_usuaria;
