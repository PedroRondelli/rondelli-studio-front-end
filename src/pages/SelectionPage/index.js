import { useContext, useEffect } from "react";
import CustomerContext from "../../contexts/customerContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getArtistProfiles } from "../../services/getArtistProfiles";
import { Form } from "../../components/DescriptionForm";
import { Container, PhotoContainer } from "../ProfileEditionPage";
import { ReadyButton } from "../../assets/ReadyButton";
import { changeArtist } from "../../auxiliaries/changeArtist";
import styled from "styled-components";
import fetchArts from "../../auxiliaries/fetchArts";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { fetchArtstoSelecion } from "../../auxiliaries/fetchArtstoSelection";

export default function SelectionPage() {
  const { customer, listOfAllArtists, setList } = useContext(CustomerContext);
  const slots = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  const [turn, setTurn] = useState(0);
  const supabase = useSupabaseClient();
  const [arts, setArts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (customer.name === "") navigate("/customer");
    getArtistProfiles(setList);
    if (listOfAllArtists.length !== 0)
      fetchArts(supabase, listOfAllArtists[turn].users).then((resp) =>
        setArts(resp)
      );
  }, [customer.name, navigate,supabase ,setList, turn]);
  if (listOfAllArtists.length === 0) return <></>;
  console.log(arts);

  return (
    <Container>
      <Form>
        <ArtistHistory>
          <Block>
            <Topic>{`NOME : ${listOfAllArtists[turn].name} (${listOfAllArtists[turn].nickname})`}</Topic>
          </Block>
          <Block>
            <Topic>{`SOBRE O TATUADOR :`}</Topic>
            <Paragraph>{listOfAllArtists[turn].description}</Paragraph>
          </Block>
          <Block>
            <Topic>{`ESPECIALIDADES :`}</Topic>
            <Paragraph>{listOfAllArtists[turn].specialties}</Paragraph>
          </Block>
          <Block>
            <Topic>{`DESTAQUES :`}</Topic>
            <RollOfArts>
              {slots.map((e, i) =>
                fetchArtstoSelecion(
                  arts,
                  e,
                  supabase,
                  listOfAllArtists[turn]
                )
              )}
            </RollOfArts>
          </Block>
        </ArtistHistory>
      </Form>

      <PhotoContainer>
        <img
          alt="profile pic"
          src={
            process.env.REACT_APP_PROFILE + listOfAllArtists[turn].users.supaId
          }
        />
        <icons>
          <ion-icon
            onClick={() =>
              changeArtist("backward", setTurn, turn, listOfAllArtists.length)
            }
            name="arrow-back-circle"
          ></ion-icon>
          <ion-icon
            onClick={() =>
              changeArtist("forward", setTurn, turn, listOfAllArtists.length)
            }
            name="arrow-forward-circle"
          ></ion-icon>
        </icons>
        <ReadyButton onClick={()=>navigate("/success")}>ESCOLHER</ReadyButton>
      </PhotoContainer>
    </Container>
  );
}

const Topic = styled.h1`
  font-family: Saira Stencil One;
  color: white;
  font-size: 2vw;
  font-weight: 400;
  line-height: 50px;
  letter-spacing: 0em;
`;

const Paragraph = styled.p`
  font-family: Saira Stencil One;
  color: white;
  font-size: 1.5vw;
  font-weight: 400;
  line-height: 50px;
  letter-spacing: 0em;
`;

const Block = styled.div``;

const ArtistHistory = styled.div``;

const RollOfArts = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40vh;

  @media (max-width: 414px) {
    flex-direction: column;
  }
`;

const Art = styled.div`
  border-radius: 32px;
  width: 20%;
  height: 100%;
  background-color: white;
  cursor: pointer;
`;
