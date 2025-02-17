import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/";
import styled from "styled-components";
import * as THREE from 'three'; // Importar THREE

// Styled component for the canvas wrapper
const StyledCanvasWrapper = styled.div`
  width: 100%;
  height: auto;
  position: absolute;
  inset: 0;
`;

// Define the props for the Stars component
interface StarsProps {
  // You can add more props here if needed
}

// Stars component
const Stars: React.FC<StarsProps> = (props) => {
  const ref = useRef<THREE.Points | null>(null); // Cambiar a THREE.Points
  const [sphere] = useState(() => {
    // Generar un Float32Array en lugar de Float64Array
    const positions = random.inSphere(new Float32Array(5000), { radius: 1.2 });
    return new Float32Array(positions); // Asegurarse de que sea Float32Array
  });

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

// StyledStarsCanvas component
const StyledStarsCanvas: React.FC = () => {
  return (
    <StyledCanvasWrapper>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </StyledCanvasWrapper>
  );
};

export default StyledStarsCanvas;