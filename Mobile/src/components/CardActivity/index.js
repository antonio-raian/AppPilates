import React, {useState, useEffect} from 'react';
import {
  ContainerTreino,
  CardVideo,
  CardInfo,
  Title,
  Descript,
  Label,
} from './style';
import ButtonVideo from '../ButtonVideo';
import ModalVideo from '../ModalVideo';

const CardActivity = (props) => {
  const {title, qtd_series, repeticoes, intervalo, url} = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [videoId, setVideoId] = useState('');
  useEffect(() => {
    const [resto, id] = url.includes('watch')
      ? url.split('watch?v=')
      : url.split('.be/');
    setVideoId(id);
    console.log('ID', id);
  }, []);

  return (
    <>
      <ModalVideo
        animationType="slide"
        transparent={true}
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
        videoId={videoId}
      />
      <ContainerTreino>
        <CardVideo>
          <ButtonVideo
            openVideo={(value) => setModalOpen(value)}
            videoId={videoId}
          />
        </CardVideo>
        <CardInfo>
          <Title>{title}</Title>
          <Descript>
            {qtd_series}X{repeticoes}
          </Descript>
          <Label>Intervalo: {intervalo}</Label>
        </CardInfo>
      </ContainerTreino>
    </>
  );
};

export default CardActivity;
