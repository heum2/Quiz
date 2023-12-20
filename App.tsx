import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components/native';

import { RootNavigation } from './src/navigations';
import { theme } from './src/styles';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RootNavigation />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
