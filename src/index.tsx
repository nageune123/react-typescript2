import { useState, useEffect } from "react";
import styled from "styled-components";
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { DarkTheme,LightTheme } from './theme';
const ToggleBox = styled.div`
width:60px;
height:30px;
background-color:black;
display:flex;
align-items:center;
border-radius:15px;
`;
const ToggleButton = styled.button`
width:20px;
height:20px;
background-color:white;
border-radius:10px;
margin-left: 5px;
cursor: pointer;
`;




const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const Root = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDarkMode ? DarkTheme : LightTheme}>
        <ToggleBox>
          <ToggleButton onClick={toggleDarkMode} />
        </ToggleBox>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

root.render(<Root />);
