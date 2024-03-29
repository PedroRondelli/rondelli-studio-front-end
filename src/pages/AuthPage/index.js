import { useEffect, useState } from "react";
import LoginForm from "../../components/LoginForm";
import RegistrationForm from "../../components/RegistrationForm";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Container } from "../../assets/Container";
import { StudioName } from "../../assets/StudioName";
import checkIfLocalStorageHasAToken from "../../auxiliaries/checkIfLocalStorageHasAToken";
import testeBackend from "../../services/testeBackend";

export default function AuthPage() {
  const [registering, setregistering] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    checkIfLocalStorageHasAToken(navigate);
  },[navigate]);

  return (
    <Container>
      <StudioName onClick={testeBackend} className="letterPattern">RONDELLI TATTOO</StudioName>
      {registering ? (
        <RegistrationForm setregistering={setregistering} />
      ) : (
        <LoginForm />
      )}
      {!registering ? (
        <RegistrationLink
          onClick={() => setregistering(true)}
          className="letterPattern"
        >
          É NOVO POR AQUI ? CADASTRE-SE !
        </RegistrationLink>
      ) : (
        <RegistrationLink
          onClick={() => setregistering(false)}
          className="letterPattern"
        >
          JÁ POSSUI CADASTRO? FAÇA LOGIN !
        </RegistrationLink>
      )}
    </Container>
  );
}

const RegistrationLink = styled.a`
  font-size: 4vw;

  -webkit-text-stroke: 0.2vw black;
`;
