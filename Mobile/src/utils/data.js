export const data = (qtd) => {
  const res = [];
  for (let i = 1; i <= qtd; i++) {
    res.push({
      id: '1',
      usuario_id: '1',
      titulo: 'Alongamento',
      data_treino: `2020-04-${i < 10 ? `0${i}` : i}T03:00:00.000Z`,
      data_realizado: null,
      realizado: false,
      dificuldade_esperada: 10,
      nota: null,
      dificuldade_sentida: null,
      comentario: null,
      ativo: true,
      created_at: '2020-04-24 02:26:13',
      updated_at: '2020-04-24 02:26:13',
      treinos: [
        {
          id: '1',
          exercicio_id: '1',
          repeticoes: 15,
          qtd_series: 5,
          intervalo: 60,
          ativo: true,
          created_at: '2020-04-24 02:26:13',
          updated_at: '2020-04-24 02:26:13',
          exercicio: {
            id: '1',
            nome: 'Agachamento',
            descricao:
              'Ficar em pé: abrir as pernas, afastar os pés à largura dos ombros e apoiá-los totalmente no chão;\nDobrar os joelhos: os joelhos devem ser fletidos, jogando o quadril para baixo, até ultrapassar ligeiramente a linha do joelho e, empurrar o bumbum para trás, como se estivesse sentando em uma cadeira imaginária, mantendo as costas sempre eretas;\nEstender as pernas: deve-se esticar as pernas, que se encontram dobradas, para voltar à posição inicial, ficando em pé.',
            link: 'https://www.youtube.com/watch?v=Ufh39C5cMfU',
            ativo: true,
            created_at: '2020-04-24 02:26:09',
            updated_at: '2020-04-24 02:26:09',
          },
          pivot: {
            treino_id: '1',
            atividade_id: '1',
          },
        },
        {
          id: '2',
          exercicio_id: '2',
          repeticoes: 15,
          qtd_series: 5,
          intervalo: 60,
          ativo: true,
          created_at: '2020-04-24 02:26:13',
          updated_at: '2020-04-24 02:26:13',
          exercicio: {
            id: '1',
            nome: 'Burpie',
            descricao: 'Abaixa',
            link: 'asdasdasdasd.com',
            ativo: true,
            created_at: '2020-04-24 02:26:09',
            updated_at: '2020-04-24 02:26:09',
          },
          pivot: {
            treino_id: '1',
            atividade_id: '1',
          },
        },
      ],
    });
  }
  return res;
};
