'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import GenreCard from './GenreCard';
import GenreActionFooter from './GenreActionFooter';

const GENRES = [
  // Row 1
  { id: 'fitness', title: 'Fitness', image: '/assets/genres/fitness.png' },
  { id: 'nutrition', title: 'Nutrition', image: '/assets/genres/nutrition.png' },
  { id: 'wellness', title: 'Wellness', image: '/assets/genres/wellness.png' },
  // Row 2
  { id: 'mental-health', title: 'Mental Health', image: '/assets/genres/mental-health.png' },
  { id: 'exercise', title: 'Exercise', image: '/assets/genres/exercise.png' },
  { id: 'social-connections', title: 'Social Connections', image: '/assets/genres/social-connections.png' },
  // Row 3
  { id: 'hydration', title: 'Hydration', image: '/assets/genres/hydration.png' },
  { id: 'sleep', title: 'Sleep', image: '/assets/genres/sleep.png' },
  { id: 'preventive-care', title: 'Preventive Care', image: '/assets/genres/preventive-care.png' },
];

export default function GenreGrid() {
  const router = useRouter();
  const [selectedGenres, setSelectedGenres] = useState<Set<string>>(new Set());

  const toggleGenre = (id: string) => {
    const newSet = new Set(selectedGenres);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedGenres(newSet);
  };

  const handleNext = () => {
    router.push('/user');
  };

  const handleSkip = () => {
    router.push('/user');
  };

  return (
    <div className="flex flex-col w-full z-10 gap-[32px]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-[24px] gap-y-[24px] w-full">
        {GENRES.map((genre) => (
          <GenreCard
            key={genre.id}
            title={genre.title}
            imageSrc={genre.image}
            isSelected={selectedGenres.has(genre.id)}
            onClick={() => toggleGenre(genre.id)}
          />
        ))}
      </div>
      <GenreActionFooter 
        onSkip={handleSkip} 
        onNext={handleNext} 
        nextDisabled={selectedGenres.size === 0} 
      />
    </div>
  );
}
