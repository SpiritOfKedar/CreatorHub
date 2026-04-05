'use client';

import React, { useState, useEffect } from 'react';

interface FeatureToggle {
  id: string;
  title: string;
  description: string;
  isEnabled: boolean;
}

interface Props {
  feature: FeatureToggle;
  delay?: number;
  onToggle?: (id: string, isEnabled: boolean) => void;
}

export function FeatureToggleRow({ feature, delay = 0, onToggle }: Props) {
  const [enabled, setEnabled] = useState(feature.isEnabled);

  useEffect(() => {
    setEnabled(feature.isEnabled);
  }, [feature.isEnabled]);

  const handleToggle = () => {
    const newState = !enabled;
    setEnabled(newState);
    if (onToggle) {
      onToggle(feature.id, newState);
    }
  };

  return (
    <div
      className="flex items-center justify-between py-6"
      style={{
        borderBottom: '1px solid #E5E7EB',
        animation: `cardFadeUp 0.6s ease-out ${delay}ms both`,
      }}
    >
      <div className="pr-6">
        <h4 style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 4 }}>
          {feature.title}
        </h4>
        <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.5, maxWidth: 500 }}>
          {feature.description}
        </p>
      </div>

      <button
        onClick={handleToggle}
        style={{
          width: 44,
          height: 24,
          borderRadius: 12,
          background: enabled ? '#111827' : '#E5E7EB',
          position: 'relative',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          flexShrink: 0,
        }}
        aria-pressed={enabled}
        aria-label={`Toggle ${feature.title}`}
      >
        <div
          style={{
            width: 20,
            height: 20,
            background: 'white',
            borderRadius: '50%',
            position: 'absolute',
            top: 2,
            left: enabled ? 22 : 2,
            transition: 'all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          }}
        />
      </button>
    </div>
  );
}
