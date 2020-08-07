import Landing from '../src/components/Landing';
import api from '../src/services/api';

const index = ({ connections }) => <Landing connections={connections} />;

export async function getStaticProps() {
  return await api.get('connections').then(({ data }) => ({
    props: {
      connections: data.total,
    },
  }));
}

export default index;
