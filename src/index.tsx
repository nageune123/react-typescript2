
import styled from "styled-components";
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { RecoilRoot } from "recoil";





const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const Root = () => {



  return (
    <RecoilRoot>
       <QueryClientProvider client={queryClient}>
      
      <App />
    
  </QueryClientProvider>

    </RecoilRoot>
   
  );
};

root.render(<Root />);
