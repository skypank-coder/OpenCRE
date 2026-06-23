import { useEffect, useState } from 'react';

import { useEnvironment } from './useEnvironment';

export type Capabilities = {
  myopencre: boolean;
  login: boolean;
};

export const useCapabilities = () => {
  const { apiUrl } = useEnvironment();
  const [capabilities, setCapabilities] = useState<Capabilities | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const baseUrl = apiUrl.replace('/rest/v1', '');

    fetch(`${baseUrl}/api/capabilities`)
      .then((res) => res.json())
      .then(setCapabilities)
      .catch(() => setCapabilities({ myopencre: false, login: false }))
      .finally(() => setLoading(false));
  }, [apiUrl]);

  return { capabilities, loading };
};
