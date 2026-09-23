import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/';
import styled from 'styled-components';
import * as THREE from 'three'; // Importar THREE

const StyledCanvasWrapper = styled.div`
  width: 100%;
  height: auto;
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

const Stars: React.FC = () => {
  const ref = useRef<THREE.Points | null>(null);

  const [sphere] = useState(() => {
    const positions = new Float32Array(900 * 3);
    random.inSphere(positions, { radius: 1.2 });
    return positions;
  });

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
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

const StyledStarsCanvas: React.FC = () => {
  return (
    <StyledCanvasWrapper aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
      </Canvas>
    </StyledCanvasWrapper>
  );
};

export default StyledStarsCanvas;
