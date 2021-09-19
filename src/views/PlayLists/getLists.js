import api from '../../api';

export default async function getLists() {
  const { data } = await api.get('lists');

  return data;
}
