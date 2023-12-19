import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { RootNavigation } from './src/navigations';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigation />
    </QueryClientProvider>
  );
}

export default App;
