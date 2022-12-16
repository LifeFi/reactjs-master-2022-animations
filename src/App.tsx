import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(135deg, #e09, #d0e);
  flex-direction: column;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 50vw;
  gap: 10px;
  /* div:first-child,
  div:last-child {
    grid-column: span 2;
  } */
`;

const Box = styled(motion.div)`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  cursor: pointer;

  &:nth-child(1) {
    transform-origin: bottom right;
  }
  &:nth-child(2) {
    transform-origin: bottom left;
  }
  &:nth-child(3) {
    transform-origin: top right;
  }
  &:nth-child(4) {
    transform-origin: top left;
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    transition: {
      duaration: 0.1,
      type: "tween",
    },
  },
};

const Circle = styled(motion.div)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: white;
  /* z-index: 11;
  position: relative; */
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

function App() {
  const [id, setId] = useState<null | string>(null);
  const [circlePosition, setCirclePosition] = useState("2");

  return (
    <Wrapper>
      <Grid>
        {["1", "2", "3", "4"].map((n) => (
          <Box
            onClick={() => setId(n)}
            key={n}
            layoutId={n}
            whileHover="hover"
            initial="normal"
            variants={boxVariants}
            custom={n}
            // transition={{ type: "tween" }}
          >
            {circlePosition === n ? <Circle layoutId="circle" /> : null}
          </Box>
        ))}
      </Grid>
      <AnimatePresence>
        {id ? (
          <Overlay
            variants={overlay}
            onClick={() => setId(null)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Box
              layoutId={id}
              style={{ width: 400, height: 200, backgroundColor: "white" }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
      <button
        onClick={() => {
          circlePosition === "2"
            ? setCirclePosition("3")
            : setCirclePosition("2");
        }}
      >
        Switch
      </button>
    </Wrapper>
  );
}

export default App;
