import styled, { keyframes } from "styled-components";

const rocketAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-30px);
  }
  100% {
    transform: translateY(0);
  }
`;

// Contenedor principal de la pantalla de carga
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  padding: 20px;
  background-color: #090917;
`;

// Estilos del cohete
const Rocket = styled.div`
  position: relative;
  width: 50px;
  height: 100px;
  background-color: #4FBFC2;
  border-radius: 10px;
  margin-bottom: 20px;
  animation: ${rocketAnimation} 1.5s ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    background-color: #ff6347;
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    width: 8px;
    height: 15px;
    background-color: #ffd700;
    border-radius: 50%;
  }
`;

// Estilo del texto "Cargando"
const LoadingText = styled.h2`
  font-size: 24px;
  color: white;
  font-family: 'Arial', sans-serif;
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;


const Loading = () => (
  <LoadingContainer>
  <Rocket />
  <LoadingText>Cargando...</LoadingText>
</LoadingContainer>
);



export default Loading