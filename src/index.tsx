
import styled from "styled-components";
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { RecoilRoot } from "recoil";
import { darkTheme } from "./theme";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const Root = () => {



  return (
    <RecoilRoot>
      <RecoilRoot>
        <ThemeProvider theme={darkTheme}>

          <App />
        </ThemeProvider>

      </RecoilRoot>





    </RecoilRoot>

  );
};

root.render(<Root />);
