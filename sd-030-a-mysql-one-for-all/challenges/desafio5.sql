select cancao, count(m.cancao_id) as reproducoes
from Cancoes c
inner join MusicasTocadas m on m.cancao_id = c.cancao_id
group by c.cancao
order by reproducoes desc, c.cancao limit 2;
