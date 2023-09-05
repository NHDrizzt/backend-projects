SELECT 
    (SELECT COUNT(*) FROM Cancoes) AS cancoes,
    (SELECT COUNT(*) FROM Artista) AS artistas,
	(SELECT COUNT(*) FROM Album) AS albuns;
