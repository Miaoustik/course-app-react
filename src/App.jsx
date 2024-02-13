import { useState, useEffect, useRef } from "react";
import Compte from "./views/Compte";
import Home from "./views/Home";
import List from "./views/List";
import Course from "./views/Course";
import { useData, useDataDispatch } from "./contexts/DataContext";
import { getAll, save } from "./database/storage";
import styled from "styled-components";

function App() {
  const [loading, setLoading] = useState(true);
  const data = useData();
  const dispatch = useDataDispatch();
  const dataTimerRef = useRef(null);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    getAll()
      .then((data) => {
        dispatch({ type: "init", payload: data });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (data.update.shouldUpdate === true) {
      clearTimeout(dataTimerRef.current);

      dataTimerRef.current = setTimeout(() => {
        console.log("Saving data ...");
        for (let key of data.update.keys) {
          save(key, data[key]);
        }
        dispatch({ type: "resetUpdate" });
      }, 1000);
    }
  }, [data.update.shouldUpdate]);

  const [page, setPage] = useState("");

  if (loading) {
    //TODO spinner
    return <div>Chargement...</div>;
  }

  let component = <Compte />;

  if (page === "compte") {
    component = <Compte />;
  }

  if (page === "home") {
    component = <Home />;
  }

  if (page === "list") {
    component = <List />;
  }

  if (page === "course") {
    component = <Course />;
  }

  return (
    <Wrapper>
      <Header>
        <span>Compte</span>
        <Nav onClick={() => setShowPanel((s) => !s)}>X</Nav>
        <NavPanel $translate={showPanel ? "0" : "100%"}></NavPanel>
      </Header>
      {component}
      <Navigation>
        <Button onClick={() => setPage("compte")}>Compte</Button>
        <Button onClick={() => setPage("home")}>Home</Button>
        <Button onClick={() => setPage("list")}>List</Button>
        <Button onClick={() => setPage("course")}>Course</Button>
      </Navigation>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: black;
  display: grid;
  height: 100dvh;
  color: white;
  grid-template-rows: min-content minmax(0, 1fr) min-content;
  padding-inline: 1rem;
  position: relative;
  overflow: hidden;
`;

const Nav = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
  z-index: 2;
`;
const NavPanel = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 20%;
  background-color: black;
  border-left: 1px solid white;
  z-index: 1;
  transform: translateX(${(props) => props.$translate});
  transition: transform 0.7s ease-out;
`;

const Header = styled.div`
  padding-top: 1rem;
  padding-bottom: 1.25rem;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid white;
  align-items: center;
`;

const Navigation = styled.nav`
  align-self: end;
  display: flex;
  gap: 0.5rem;
  padding-bottom: 1rem;
`;

const Button = styled.button`
  display: block;
  flex: 1;
  padding-block: 1rem;
  background-color: transparent;
  border: 1px solid white;
  border-radius: 0.5rem;
  color: inherit;
`;

export default App;
