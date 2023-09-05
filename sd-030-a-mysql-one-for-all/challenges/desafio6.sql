select min(valor_plano) as faturamento_minimo,
max(valor_plano) as faturamento_maximo,
round(avg(valor_plano), 2) as faturamento_medio,
SUM(valor_plano) as faturamento_total
from Plano pl
join Pessoa p on pl.plano_nome = p.plano_nome
