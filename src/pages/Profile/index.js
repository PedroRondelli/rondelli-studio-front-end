import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ReadyButton } from "../../assets/ReadyButton";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import fetchArts from "../../auxiliaries/fetchArts";
import fetchProfilePic from "../../auxiliaries/fechProfilePic";
import ProfilePicContext from "../../contexts/profilePicContext";
import logout from "../../services/logout";
import backGroundImage from "../../assets/images/backGroundImage.jpg";
import { ProfilePicSlot } from "../../components/ProfilePicSlot";
import { checkProfileImage } from "../../auxiliaries/checkProfileImage";
import { separatesArtsIntoSlots } from "../../auxiliaries/separatesArtsIntoSlots";
import checkIfLocalStorageHasAToken from "../../auxiliaries/checkIfLocalStorageHasAToken";

export default function Profile() {
  const supabase = useSupabaseClient();
  const slots = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  const [arts, setArts] = useState([]);
  const { setProfileImage } = useContext(ProfilePicContext);
  const user = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    checkIfLocalStorageHasAToken(navigate);
    fetchArts(supabase, user).then((resp) => setArts(resp));
    fetchProfilePic(supabase, user).then((resp) =>
      checkProfileImage(resp, setProfileImage,user)
    );
  }, [user, setProfileImage, supabase, navigate]);

  return (
    <Container>
      <PhotoContainer>
        <ProfilePicSlot />
        <ReadyButton onClick={() => navigate("/edition")}>EDITAR</ReadyButton>
        <ion-icon
          onClick={() => logout(supabase, navigate)}
          size="large"
          name="exit-outline"
        ></ion-icon>
      </PhotoContainer>
      <Portfolio>
        {slots.map((e, i) =>
          separatesArtsIntoSlots(arts, e, supabase, setArts, user)
        )}
      </Portfolio>
    </Container>
  );
}

const PhotoContainer = styled.div`
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px;
  img {
    width: 140px;
    height: 140px;

    border-radius: 70px;
    filter: drop-shadow(0px 10px 4px rgba(0, 0, 0, 0.35));
  }
  ion-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    color: white;

    cursor: pointer;
  }
  @media (max-width: 768px) {
    height: 30vh;
    justify-content: center;
    button {
      margin-top: 15px;
    }
  }
`;

const Portfolio = styled.div`
  width: 100vw;
  min-height: 40vh;
  background-color: #444040;
  box-shadow: 0px -10px 4px rgba(0, 0, 0, 0.5);

  padding: 30px;
  box-sizing: border-box;

  display: flex;
  justify-content: space-around;

  @media (max-width: 768px) {
    min-height: 70vh;
    flex-direction: column;
  }
`;
const Container = styled.div`
  background-image: url(${backGroundImage});
  background-size: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
