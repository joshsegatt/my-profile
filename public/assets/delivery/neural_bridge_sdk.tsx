// ==============================================================================
// NEURAL BRIDGE SDK - REACT CORE v1.0.0
// PURPOSE: SUB-100MS AI STREAMING INTERFACE
// AUTHOR: JOSH SEGATT | LICENSE: PROPRIETARY (COMMERCIAL)
// ==============================================================================

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

/**
 * CORE TYPES
 */
export interface NeuralState {
  isStreaming: boolean;
  tokens: string[];
  latency: number;
  status: 'idle' | 'computing' | 'linked';
}

type NeuralAction = 
  | { type: 'START_STREAM' }
  | { type: 'APPEND_TOKEN'; token: string }
  | { type: 'END_STREAM'; finalLatency: number };

/**
 * ARCHITECTURE: NEURAL CONTEXT
 */
const NeuralContext = createContext<{
  state: NeuralState;
  dispatch: React.Dispatch<NeuralAction>;
} | undefined>(undefined);

/**
 * CORE LOGIC: OPTIMIZED REDUCER
 */
function neuralReducer(state: NeuralState, action: NeuralAction): NeuralState {
  switch (action.type) {
    case 'START_STREAM':
      return { ...state, isStreaming: true, tokens: [], status: 'computing' };
    case 'APPEND_TOKEN':
      return { ...state, tokens: [...state.tokens, action.token] };
    case 'END_STREAM':
      return { ...state, isStreaming: false, latency: action.finalLatency, status: 'linked' };
    default:
      return state;
  }
}

/**
 * HIGH-PERFORMANCE HOOK
 */
export const useNeuralBridge = () => {
  const context = useContext(NeuralContext);
  if (!context) throw new Error("useNeuralBridge must be used within a NeuralProvider");
  return context;
};

/**
 * MISSION CONTROL PROVIDER
 */
export const NeuralProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(neuralReducer, {
    isStreaming: false,
    tokens: [],
    latency: 0,
    status: 'idle'
  });

  return (
    <NeuralContext.Provider value={{ state, dispatch }}>
      {children}
    </NeuralContext.Provider>
  );
};

// EXPORTED COMPONENTS & UTILS
export const NeuralBridgeUtils = {
  calculateThroughput: (tokens: string[], ms: number) => (tokens.length / (ms / 1000)).toFixed(2),
};
