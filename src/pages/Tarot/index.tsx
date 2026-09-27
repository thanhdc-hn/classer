import { useSearchParams } from 'react-router-dom';
import TarotV1 from './tarot.tsx';
import TarotV2 from './v2/tarotV2.tsx';

const TarotPage = () => {
  const [params] = useSearchParams();
  return params.get('v') === '1' ? <TarotV1 /> : <TarotV2 />;
};

export default TarotPage;
