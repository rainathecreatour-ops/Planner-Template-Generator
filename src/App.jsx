import React, { useState } from 'react';
import { Download, Lock } from 'lucide-react';

const PlannerGenerator = () => {
 const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('minimalist');
  const [pattern, setPattern] = useState('none');
  const [selectedSections, setSelectedSections] = useState([]);


  const templates = {
    minimalist: {
      name: 'Minimalist',
      description: 'Clean, simple, uncluttered',
      background: '#FFFFFF',
      primary: '#F5F5F5',
      accent: '#666666',
      border: '#CCCCCC',
      text: '#333333',
      layout: 'simple-grid'
    },
    boho: {
      name: 'Boho',
      description: 'Warm, earthy, relaxed',
      background: '#FFF8F0',
      primary: '#F4E4D7',
      accent: '#A67C52',
      border: '#D4C4B0',
      text: '#5C4033',
      layout: 'arched-flow'
    },
    funky: {
      name: 'Funky',
      description: 'Bold, expressive, playful',
      background: '#FFF9E6',
      primary: '#FFE5B4',
      accent: '#FF6B9D',
      border: '#FFB84D',
      text: '#2D1B4E',
      layout: 'wavy-blocks'
    },
    zen: {
      name: 'Zen',
      description: 'Calm, mindful, peaceful',
      background: '#F7F9F9',
      primary: '#E8EEEE',
      accent: '#6B7F7F',
      border: '#C2D1D1',
      text: '#3A4848',
      layout: 'centered-flow'
    },
    prayer: {
      name: 'Prayer',
      description: 'Spiritual, peaceful, reflective',
      background: '#F3F0FF',
      primary: '#E6DEFF',
      accent: '#7C3AED',
      border: '#C4B5FD',
      text: '#5B21B6',
      layout: 'vertical-sections'
    },
    parenting: {
      name: 'Parenting',
      description: 'Organized, nurturing, family-focused',
      background: '#FFF5E6',
      primary: '#FFE8CC',
      accent: '#FF8C42',
      border: '#FFD4A3',
      text: '#8B4513',
      layout: 'family-sections'
    },
    money: {
      name: 'Money',
      description: 'Professional, goal-oriented, structured',
      background: '#F0F8F0',
      primary: '#D4EDDA',
      accent: '#28A745',
      border: '#A8D5BA',
      text: '#155724',
      layout: 'financial-grid'
    },
    professional: {
      name: 'Professional',
      description: 'Clean, corporate, efficient',
      background: '#F8F9FA',
      primary: '#E9ECEF',
      accent: '#2C5F8D',
      border: '#CED4DA',
      text: '#212529',
      layout: 'business-blocks'
    },
    cozy: {
      name: 'Cozy',
      description: 'Warm, comfortable, inviting',
      background: '#FFF9F5',
      primary: '#FFE4D6',
      accent: '#D4885C',
      border: '#E8C4A8',
      text: '#5D3A1A',
      layout: 'soft-rounded'
    },
    selfWellness: {
      name: 'Self Wellness',
      description: 'Holistic, balanced, mindful',
      background: '#F5FFFA',
      primary: '#E0F7F4',
      accent: '#20B2AA',
      border: '#B0E5DF',
      text: '#2F4F4F',
      layout: 'wellness-flow'
    },
    artistic: {
      name: 'Artistic',
      description: 'Creative, expressive, painterly',
      background: '#FFFBF5',
      primary: '#FFE5D9',
      accent: '#E63946',
      border: '#FFCDB2',
      text: '#1D3557',
      layout: 'canvas-flow'
    },
    whimsical: {
      name: 'Whimsical',
      description: 'Magical, dreamy, enchanting',
      background: '#FFF8FC',
      primary: '#F8E8FF',
      accent: '#C77DFF',
      border: '#E0AAFF',
      text: '#5A189A',
      layout: 'floating-elements'
    },
    luxury: {
      name: 'Luxury',
      description: 'Opulent, sophisticated, prestigious',
      background: '#1A1A1A',
      primary: '#2D2D2D',
      accent: '#D4AF37',
      border: '#B8960F',
      text: '#F5F5F5',
      layout: 'gold-frame'
    },
    elegant: {
      name: 'Elegant',
      description: 'Refined, graceful, timeless',
      background: '#FEFEFE',
      primary: '#F8F6F4',
      accent: '#8B7355',
      border: '#D4C4B0',
      text: '#2C2416',
      layout: 'classical-lines'
    }
  };
  const optionalSections = {
  monthlyReset: {
    name: 'Monthly Reset',
    height: 200,
    render: (colors, yPos) => (
      <g>
        <rect x="100" y={yPos} width="630" height="180" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="12" />
        <text x="425" y={yPos + 30} fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">MONTHLY RESET</text>
        <text x="120" y={yPos + 60} fontSize="12" fill={colors.text} fontWeight="600">What worked this month:</text>
        <line x1="120" y1={yPos + 75} x2="710" y2={yPos + 75} stroke={colors.border} strokeWidth="1" />
        <text x="120" y={yPos + 100} fontSize="12" fill={colors.text} fontWeight="600">What to improve:</text>
        <line x1="120" y1={yPos + 115} x2="710" y2={yPos + 115} stroke={colors.border} strokeWidth="1" />
        <text x="120" y={yPos + 140} fontSize="12" fill={colors.text} fontWeight="600">Next month's focus:</text>
        <line x1="120" y1={yPos + 155} x2="710" y2={yPos + 155} stroke={colors.border} strokeWidth="1" />
      </g>
    )
  },
  weeklyCheckin: {
    name: 'Weekly Check-in',
    height: 180,
    render: (colors, yPos) => (
      <g>
        <rect x="100" y={yPos} width="630" height="160" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="12" />
        <text x="425" y={yPos + 30} fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">WEEKLY CHECK-IN</text>
        {['Wins', 'Challenges', 'Lessons Learned'].map((item, i) => (
          <g key={i}>
            <text x="120" y={yPos + 60 + i * 35} fontSize="11" fill={colors.text} fontWeight="600">{item}:</text>
            <line x1="120" y1={yPos + 70 + i * 35} x2="710" y2={yPos + 70 + i * 35} stroke={colors.border} strokeWidth="1" />
          </g>
        ))}
      </g>
    )
  },
  lifeBalance: {
    name: 'Life Balance Wheel',
    height: 220,
    render: (colors, yPos) => (
      <g>
        <text x="425" y={yPos + 20} fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">LIFE BALANCE WHEEL</text>
        <circle cx="425" cy={yPos + 120} r="80" fill={colors.primary} stroke={colors.accent} strokeWidth="2" />
        {[0,1,2,3,4,5,6,7].map(i => {
          const angle = (i * 45 - 90) * Math.PI / 180;
          const x1 = 425 + 30 * Math.cos(angle);
          const y1 = yPos + 120 + 30 * Math.sin(angle);
          const x2 = 425 + 80 * Math.cos(angle);
          const y2 = yPos + 120 + 80 * Math.sin(angle);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={colors.accent} strokeWidth="1" />;
        })}
        {['Health', 'Career', 'Finance', 'Relations', 'Growth', 'Fun', 'Spirit', 'Home'].map((area, i) => {
          const angle = (i * 45 - 90) * Math.PI / 180;
          const x = 425 + 100 * Math.cos(angle);
          const y = yPos + 120 + 100 * Math.sin(angle);
          return <text key={i} x={x} y={y} fontSize="9" fill={colors.text} textAnchor="middle">{area}</text>;
        })}
      </g>
    )
  },
  energyTracker: {
    name: 'Energy Tracker',
    height: 160,
    render: (colors, yPos) => (
      <g>
        <rect x="100" y={yPos} width="630" height="140" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="12" />
        <text x="425" y={yPos + 30} fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">ENERGY TRACKER</text>
        <line x1="150" y1={yPos + 100} x2="700" y2={yPos + 100} stroke={colors.border} strokeWidth="1" />
        <text x="120" y={yPos + 70} fontSize="10" fill={colors.text}>High</text>
        <text x="120" y={yPos + 105} fontSize="10" fill={colors.text}>Low</text>
        {[0,1,2,3,4,5,6].map(i => (
          <circle key={i} cx={200 + i * 75} cy={yPos + 80} r="8" fill="none" stroke={colors.accent} strokeWidth="2" />
        ))}
      </g>
    )
  },
  winsLessons: {
    name: 'Wins & Lessons',
    height: 180,
    render: (colors, yPos) => (
      <g>
        <rect x="100" y={yPos} width="300" height="160" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="12" />
        <text x="250" y={yPos + 30} fontSize="14" fill={colors.accent} textAnchor="middle" fontWeight="700">WINS 🎉</text>
        {[0,1,2,3].map(i => (
          <line key={i} x1="120" y1={yPos + 55 + i * 25} x2="380" y2={yPos + 55 + i * 25} stroke={colors.border} strokeWidth="1" />
        ))}
        
        <rect x="430" y={yPos} width="300" height="160" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="12" />
        <text x="580" y={yPos + 30} fontSize="14" fill={colors.accent} textAnchor="middle" fontWeight="700">LESSONS 📚</text>
        {[0,1,2,3].map(i => (
          <line key={i} x1="450" y1={yPos + 55 + i * 25} x2="710" y2={yPos + 55 + i * 25} stroke={colors.border} strokeWidth="1" />
        ))}
      </g>
    )
  },
  quotesAffirmations: {
    name: 'Quotes & Affirmations',
    height: 160,
    render: (colors, yPos) => (
      <g>
        <rect x="100" y={yPos} width="630" height="140" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="12" />
        <text x="425" y={yPos + 30} fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">✨ DAILY AFFIRMATIONS</text>
        {[0,1,2,3].map(i => (
          <line key={i} x1="150" y1={yPos + 60 + i * 25} x2="700" y2={yPos + 60 + i * 25} stroke={colors.border} strokeWidth="1" />
        ))}
      </g>
    )
  },
  notesDoodle: {
    name: 'Notes & Doodles',
    height: 200,
    render: (colors, yPos) => (
      <g>
        <rect x="100" y={yPos} width="630" height="180" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="12" />
        <text x="425" y={yPos + 30} fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">NOTES & DOODLES</text>
        <rect x="120" y={yPos + 50} width="590" height="110" fill="white" stroke={colors.border} strokeWidth="1" strokeDasharray="5,5" />
      </g>
    )
  },
  lettingGo: {
    name: 'Letting Go',
    height: 160,
    render: (colors, yPos) => (
      <g>
        <rect x="100" y={yPos} width="630" height="140" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="12" />
        <text x="425" y={yPos + 30} fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">THINGS I'M LETTING GO OF 🍃</text>
        {[0,1,2,3].map(i => (
          <g key={i}>
            <circle cx="130" cy={yPos + 60 + i * 25} r="5" fill="none" stroke={colors.accent} strokeWidth="1" />
            <line x1="150" y1={yPos + 60 + i * 25} x2="710" y2={yPos + 60 + i * 25} stroke={colors.border} strokeWidth="1" />
          </g>
        ))}
      </g>
    )
  },
  excitedAbout: {
    name: 'Excited About',
    height: 160,
    render: (colors, yPos) => (
      <g>
        <rect x="100" y={yPos} width="630" height="140" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="12" />
        <text x="425" y={yPos + 30} fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">THINGS I'M EXCITED ABOUT ✨</text>
        {[0,1,2,3].map(i => (
          <g key={i}>
            <text x="130" y={yPos + 63 + i * 25} fontSize="14" fill={colors.accent}>★</text>
            <line x1="150" y1={yPos + 60 + i * 25} x2="710" y2={yPos + 60 + i * 25} stroke={colors.border} strokeWidth="1" />
          </g>
        ))}
      </g>
    )
  }
};

  const renderMinimalistLayout = (colors) => {
    return (
      <g>
        {/* Simple grid layout with thin lines */}
        <text x="100" y="80" fontSize="28" fontWeight="300" fill={colors.text}>Daily Notes</text>
        <line x1="100" y1="100" x2="750" y2="100" stroke={colors.border} strokeWidth="0.5" />
        
        {/* To-do list section */}
        <text x="100" y="140" fontSize="14" fill={colors.accent}>TO-DO LIST</text>
        {[0,1,2,3,4,5,6,7,8].map(i => (
          <g key={i}>
            <rect x="100" y={165 + i * 35} width="12" height="12" fill="none" stroke={colors.border} strokeWidth="1" />
            <line x1="125" y1={172 + i * 35} x2="400" y2={172 + i * 35} stroke={colors.border} strokeWidth="0.5" />
          </g>
        ))}
        
        {/* Monthly overview - right side */}
        <text x="450" y="140" fontSize="14" fill={colors.accent}>MONTHLY OVERVIEW</text>
        <rect x="450" y="160" width="280" height="320" fill={colors.primary} stroke={colors.border} strokeWidth="0.5" rx="4" />
        <line x1="470" y1="200" x2="710" y2="200" stroke={colors.border} strokeWidth="0.3" />
        <line x1="470" y1="240" x2="710" y2="240" stroke={colors.border} strokeWidth="0.3" />
        <line x1="470" y1="280" x2="710" y2="280" stroke={colors.border} strokeWidth="0.3" />
        <line x1="470" y1="320" x2="710" y2="320" stroke={colors.border} strokeWidth="0.3" />
        
        {/* Habit tracker at bottom */}
        <text x="100" y="530" fontSize="14" fill={colors.accent}>HABIT TRACKER</text>
        <rect x="100" y="550" width="630" height="180" fill={colors.primary} stroke={colors.border} strokeWidth="0.5" rx="4" />
        {[0,1,2,3,4,5,6].map(i => (
          <rect key={i} x={120 + i * 85} y="580" width="70" height="20" fill="white" stroke={colors.border} strokeWidth="0.5" />
        ))}
        
        {/* Reflections */}
        <text x="100" y="770" fontSize="14" fill={colors.accent}>REFLECTIONS</text>
        {[0,1,2,3].map(i => (
          <line key={i} x1="100" y1={800 + i * 30} x2="730" y2={800 + i * 30} stroke={colors.border} strokeWidth="0.3" />
        ))}
      </g>
    );
  };

  const renderBohoLayout = (colors) => {
    return (
      <g>
        {/* Arched header with organic shapes */}
        <path d="M 100 50 Q 425 80 750 50" fill={colors.primary} opacity="0.6" />
        <text x="425" y="100" fontSize="32" fontWeight="400" fill={colors.text} textAnchor="middle" fontFamily="Georgia">Monthly Intentions</text>
        
        {/* Curved sections with organic flow */}
        <ellipse cx="250" cy="240" rx="140" ry="120" fill={colors.primary} stroke={colors.border} strokeWidth="2" />
        <text x="250" y="185" fontSize="13" fill={colors.accent} textAnchor="middle" fontWeight="600">Gratitude</text>
        {[0,1,2,3].map(i => (
          <text key={i} x="250" y={210 + i * 20} fontSize="10" fill={colors.text} textAnchor="middle">___________</text>
        ))}
        
        <ellipse cx="600" cy="240" rx="140" ry="120" fill={colors.primary} stroke={colors.border} strokeWidth="2" />
        <text x="600" y="185" fontSize="13" fill={colors.accent} textAnchor="middle" fontWeight="600">Self-Care</text>
        {[0,1,2,3].map(i => (
          <text key={i} x="600" y={210 + i * 20} fontSize="10" fill={colors.text} textAnchor="middle">___________</text>
        ))}
        
        {/* Mood tracker with circles */}
        <text x="425" y="380" fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="600">Mood Tracker</text>
        <path d="M 150 420 Q 425 380 700 420" fill="none" stroke={colors.border} strokeWidth="2" />
        {[0,1,2,3,4,5,6].map(i => (
          <circle key={i} cx={200 + i * 75} cy="420" r="25" fill={colors.primary} stroke={colors.accent} strokeWidth="2" />
        ))}
        
        {/* Affirmations in flowing text area */}
        <path d="M 120 550 Q 425 520 730 550 L 730 720 Q 425 750 120 720 Z" fill={colors.primary} stroke={colors.border} strokeWidth="2" />
        <text x="425" y="590" fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="600">Daily Affirmations</text>
        {[0,1,2,3,4].map(i => (
          <text key={i} x="425" y={625 + i * 25} fontSize="11" fill={colors.text} textAnchor="middle">_________________________________</text>
        ))}
      </g>
    );
  };

  const renderFunkyLayout = (colors) => {
    return (
      <g>
        {/* Bold wavy header */}
        <path d="M 80 50 Q 200 30 320 50 T 560 50 T 800 50 L 800 120 Q 680 140 560 120 T 320 120 T 80 120 Z" fill={colors.accent} opacity="0.8" />
        <text x="425" y="95" fontSize="34" fontWeight="900" fill="white" textAnchor="middle">BRAIN DUMP</text>
        
        {/* Blob shapes for different sections */}
        <ellipse cx="220" cy="250" rx="160" ry="140" fill={colors.primary} stroke={colors.accent} strokeWidth="4" transform="rotate(-15 220 250)" />
        <text x="220" y="230" fontSize="16" fill={colors.text} textAnchor="middle" fontWeight="700">Creative Notes</text>
        {[0,1,2,3,4].map(i => (
          <line key={i} x1="130" y1={250 + i * 25} x2="310" y2={250 + i * 25} stroke={colors.accent} strokeWidth="2" />
        ))}
        
        <rect x="450" y="150" width="280" height="240" fill={colors.primary} stroke={colors.accent} strokeWidth="4" rx="25" transform="rotate(5 590 270)" />
        <text x="590" y="200" fontSize="16" fill={colors.text} textAnchor="middle" fontWeight="700">Currently Loving</text>
        {[0,1,2,3,4,5].map(i => (
          <text key={i} x="590" y={230 + i * 30} fontSize="13" fill={colors.text} textAnchor="middle" fontWeight="600">♥ __________</text>
        ))}
        
        {/* Mood tracker with color blocks */}
        <text x="100" y="480" fontSize="18" fill={colors.accent} fontWeight="900">MOOD TRACKER</text>
        {[0,1,2,3,4,5,6].map(i => (
          <rect key={i} x={100 + i * 95} y="510" width="80" height="80" fill={colors.primary} stroke={colors.accent} strokeWidth="3" rx="15" />
        ))}
        
        {/* Weekly highlights in dynamic boxes */}
        <path d="M 100 650 L 730 650 L 720 850 L 110 850 Z" fill={colors.primary} stroke={colors.accent} strokeWidth="4" />
        <text x="425" y="690" fontSize="18" fill={colors.text} textAnchor="middle" fontWeight="900">WEEKLY HIGHLIGHTS</text>
        {[0,1,2,3].map(i => (
          <line key={i} x1="130" y1={720 + i * 30} x2="700" y2={720 + i * 30} stroke={colors.accent} strokeWidth="2" />
        ))}
      </g>
    );
  };

  const renderZenLayout = (colors) => {
    return (
      <g>
        {/* Centered minimalist header */}
        <circle cx="425" cy="100" r="60" fill="none" stroke={colors.accent} strokeWidth="0.5" opacity="0.5" />
        <text x="425" y="110" fontSize="24" fontWeight="300" fill={colors.text} textAnchor="middle" fontFamily="Georgia">Daily Mindfulness</text>
        
        {/* Breathing prompts in centered circles */}
        <text x="425" y="200" fontSize="12" fill={colors.accent} textAnchor="middle">Breathing Exercise</text>
        <circle cx="425" cy="260" r="80" fill={colors.primary} stroke={colors.border} strokeWidth="1" />
        <text x="425" y="255" fontSize="10" fill={colors.text} textAnchor="middle">Inhale</text>
        <text x="425" y="275" fontSize="10" fill={colors.text} textAnchor="middle">Hold</text>
        <text x="425" y="295" fontSize="10" fill={colors.text} textAnchor="middle">Exhale</text>
        
        {/* Intentions section - minimal lines */}
        <text x="425" y="390" fontSize="12" fill={colors.accent} textAnchor="middle">Today's Intentions</text>
        {[0,1,2].map(i => (
          <line key={i} x1="200" y1={420 + i * 40} x2="650" y2={420 + i * 40} stroke={colors.border} strokeWidth="0.5" />
        ))}
        
        {/* Gratitude section */}
        <text x="425" y="570" fontSize="12" fill={colors.accent} textAnchor="middle">Gratitude</text>
        <rect x="180" y="590" width="490" height="120" fill={colors.primary} stroke={colors.border} strokeWidth="0.5" rx="10" />
        {[0,1,2].map(i => (
          <line key={i} x1="200" y1={620 + i * 30} x2="650" y2={620 + i * 30} stroke={colors.border} strokeWidth="0.3" />
        ))}
        
        {/* Mood reflection - soft circles */}
        <text x="425" y="760" fontSize="12" fill={colors.accent} textAnchor="middle">Mood Reflection</text>
        {[0,1,2,3,4].map(i => (
          <circle key={i} cx={275 + i * 70} cy="810" r="22" fill="none" stroke={colors.accent} strokeWidth="1" opacity="0.6" />
        ))}
      </g>
    );
  };

  const renderPrayerLayout = (colors) => {
    return (
      <g>
        {/* Decorative header with cross */}
        <text x="425" y="80" fontSize="30" fontWeight="400" fill={colors.text} textAnchor="middle" fontFamily="Georgia">Prayer Journal</text>
        <line x1="405" y1="50" x2="405" y2="70" stroke={colors.accent} strokeWidth="2" />
        <line x1="395" y1="60" x2="415" y2="60" stroke={colors.accent} strokeWidth="2" />
        <line x1="445" y1="50" x2="445" y2="70" stroke={colors.accent} strokeWidth="2" />
        <line x1="435" y1="60" x2="455" y2="60" stroke={colors.accent} strokeWidth="2" />
        
        {/* Prayer requests section */}
        <rect x="100" y="120" width="630" height="180" fill={colors.primary} stroke={colors.border} strokeWidth="1" rx="12" />
        <text x="425" y="150" fontSize="15" fill={colors.accent} textAnchor="middle" fontWeight="600">Prayer Requests & Praise</text>
        {[0,1,2,3,4].map(i => (
          <line key={i} x1="120" y1={175 + i * 25} x2="710" y2={175 + i * 25} stroke={colors.border} strokeWidth="0.5" />
        ))}
        
        {/* Scripture reflection */}
        <text x="100" y="340" fontSize="15" fill={colors.accent} fontWeight="600">Scripture of the Day</text>
        <rect x="100" y="360" width="310" height="200" fill={colors.primary} stroke={colors.border} strokeWidth="1" rx="12" />
        <text x="255" y="390" fontSize="11" fill={colors.text} textAnchor="middle" fontStyle="italic">Verse:</text>
        {[0,1,2,3,4].map(i => (
          <line key={i} x1="120" y1={415 + i * 25} x2="390" y2={415 + i * 25} stroke={colors.border} strokeWidth="0.3" />
        ))}
        
        {/* Answered prayers */}
        <text x="420" y="340" fontSize="15" fill={colors.accent} fontWeight="600">Answered Prayers</text>
        <rect x="420" y="360" width="310" height="200" fill={colors.primary} stroke={colors.border} strokeWidth="1" rx="12" />
        {[0,1,2,3,4,5,6].map(i => (
          <g key={i}>
            <circle cx="440" cy={385 + i * 25} r="4" fill={colors.accent} />
            <line x1="455" y1={385 + i * 25} x2="710" y2={385 + i * 25} stroke={colors.border} strokeWidth="0.5" />
          </g>
        ))}
        
        {/* Prayer time log */}
        <text x="425" y="600" fontSize="15" fill={colors.accent} textAnchor="middle" fontWeight="600">Prayer Time Log</text>
        {[0,1,2,3,4,5,6].map(i => (
          <rect key={i} x={135 + i * 85} y="625" width="70" height="35" fill={colors.primary} stroke={colors.border} strokeWidth="1" rx="6" />
        ))}
        
        {/* Reflection space */}
        <text x="100" y="710" fontSize="15" fill={colors.accent} fontWeight="600">Today's Reflections</text>
        {[0,1,2,3].map(i => (
          <line key={i} x1="100" y1={740 + i * 30} x2="730" y2={740 + i * 30} stroke={colors.border} strokeWidth="0.5" />
        ))}
      </g>
    );
  };
const renderParentingLayout = (colors) => {
    return (
      <g>
        {/* Header with heart decoration */}
        <text x="425" y="80" fontSize="32" fontWeight="600" fill={colors.text} textAnchor="middle">Family Planner</text>
        <text x="350" y="75" fontSize="24" fill={colors.accent}>♥</text>
        <text x="500" y="75" fontSize="24" fill={colors.accent}>♥</text>
        
        {/* Kids' schedule section */}
        <rect x="100" y="120" width="300" height="250" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="15" />
        <text x="250" y="150" fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">Kids' Schedule</text>
        {['Morning', 'Afternoon', 'Evening', 'Bedtime'].map((time, i) => (
          <g key={i}>
            <text x="120" y={185 + i * 45} fontSize="12" fill={colors.text} fontWeight="600">{time}</text>
            <line x1="120" y1={195 + i * 45} x2="380" y2={195 + i * 45} stroke={colors.border} strokeWidth="1" />
          </g>
        ))}
        
        {/* Meal planning */}
        <rect x="450" y="120" width="280" height="250" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="15" />
        <text x="590" y="150" fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">Meal Planning</text>
        {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map((meal, i) => (
          <g key={i}>
            <circle cx="470" cy={182 + i * 50} r="6" fill={colors.accent} />
            <text x="490" y={187 + i * 50} fontSize="12" fill={colors.text} fontWeight="600">{meal}</text>
            <line x1="490" y1={195 + i * 50} x2="710" y2={195 + i * 50} stroke={colors.border} strokeWidth="1" />
          </g>
        ))}
        
        {/* Shopping list */}
        <text x="100" y="420" fontSize="16" fill={colors.accent} fontWeight="700">Shopping List</text>
        <rect x="100" y="440" width="630" height="140" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="15" />
        {[0,1,2,3,4,5].map(i => (
          <g key={i}>
            <rect x={120 + (i % 3) * 210} y={465 + Math.floor(i / 3) * 45} width="15" height="15" fill="none" stroke={colors.accent} strokeWidth="2" />
            <line x1={145 + (i % 3) * 210} y1={473 + Math.floor(i / 3) * 45} x2={310 + (i % 3) * 210} y2={473 + Math.floor(i / 3) * 45} stroke={colors.border} strokeWidth="1" />
          </g>
        ))}
        
        {/* Activities tracker */}
        <text x="100" y="630" fontSize="16" fill={colors.accent} fontWeight="700">Activities & Appointments</text>
        <rect x="100" y="650" width="630" height="100" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="15" />
        {[0,1,2].map(i => (
          <line key={i} x1="120" y1={680 + i * 30} x2="710" y2={680 + i * 30} stroke={colors.border} strokeWidth="1" />
        ))}
        
        {/* Gratitude section */}
        <text x="425" y="800" fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">Today I'm Grateful For...</text>
        {[0,1].map(i => (
          <line key={i} x1="150" y1={830 + i * 35} x2="700" y2={830 + i * 35} stroke={colors.border} strokeWidth="1" />
        ))}
      </g>
    );
  };

  const renderMoneyLayout = (colors) => {
    return (
      <g>
        {/* Professional header */}
        <rect x="100" y="50" width="630" height="60" fill={colors.accent} rx="8" />
        <text x="425" y="90" fontSize="28" fontWeight="700" fill="white" textAnchor="middle">Financial Tracker</text>
        
        {/* Income section */}
        <rect x="100" y="140" width="300" height="180" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="10" />
        <text x="250" y="170" fontSize="15" fill={colors.accent} textAnchor="middle" fontWeight="700">INCOME</text>
        {['Salary', 'Side Hustle', 'Other', 'TOTAL'].map((item, i) => (
          <g key={i}>
            <text x="120" y={200 + i * 30} fontSize="11" fill={colors.text} fontWeight={i === 3 ? '700' : '400'}>{item}</text>
            <line x1="220" y1={203 + i * 30} x2="380" y2={203 + i * 30} stroke={colors.border} strokeWidth={i === 3 ? '2' : '1'} />
            <text x="370" y={200 + i * 30} fontSize="11" fill={colors.text} textAnchor="end">$</text>
          </g>
        ))}
        
        {/* Expenses section */}
        <rect x="430" y="140" width="300" height="180" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="10" />
        <text x="580" y="170" fontSize="15" fill={colors.accent} textAnchor="middle" fontWeight="700">EXPENSES</text>
        {['Housing', 'Food', 'Transport', 'Other', 'TOTAL'].map((item, i) => (
          <g key={i}>
            <text x="450" y={200 + i * 28} fontSize="11" fill={colors.text} fontWeight={i === 4 ? '700' : '400'}>{item}</text>
            <line x1="560" y1={203 + i * 28} x2="710" y2={203 + i * 28} stroke={colors.border} strokeWidth={i === 4 ? '2' : '1'} />
            <text x="700" y={200 + i * 28} fontSize="11" fill={colors.text} textAnchor="end">$</text>
          </g>
        ))}
        
        {/* Savings goals */}
        <text x="425" y="360" fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">SAVINGS GOALS</text>
        {[0,1,2].map(i => (
          <g key={i}>
            <rect x={130 + i * 230} y="380" width="200" height="100" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="8" />
            <text x={230 + i * 230} y="410" fontSize="12" fill={colors.text} textAnchor="middle" fontWeight="600">Goal {i + 1}</text>
            <line x1={150 + i * 230} y1="430" x2={310 + i * 230} y2="430" stroke={colors.border} strokeWidth="1" />
            <text x={150 + i * 230} y="460" fontSize="10" fill={colors.text}>Target: $</text>
            <line x1={200 + i * 230} y1="462" x2={310 + i * 230} y2="462" stroke={colors.border} strokeWidth="1" />
          </g>
        ))}
        
        {/* Budget breakdown */}
        <text x="100" y="530" fontSize="16" fill={colors.accent} fontWeight="700">BUDGET BREAKDOWN</text>
        <rect x="100" y="550" width="630" height="140" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="10" />
        {['Needs (50%)', 'Wants (30%)', 'Savings (20%)'].map((cat, i) => (
          <g key={i}>
            <rect x={140 + i * 210} y="575" width="180" height="35" fill="white" stroke={colors.accent} strokeWidth="2" rx="6" />
            <text x={230 + i * 210} y="598" fontSize="11" fill={colors.text} textAnchor="middle" fontWeight="600">{cat}</text>
            <line x1={150 + i * 210} y1="630" x2={310 + i * 210} y2="630" stroke={colors.border} strokeWidth="1" />
            <text x={150 + i * 210} y="660" fontSize="10" fill={colors.text}>Actual: $</text>
            <line x1={200 + i * 210} y1="662" x2={310 + i * 210} y2="662" stroke={colors.border} strokeWidth="1" />
          </g>
        ))}
        
        {/* Notes */}
        <text x="100" y="740" fontSize="16" fill={colors.accent} fontWeight="700">FINANCIAL NOTES</text>
        {[0,1,2,3].map(i => (
          <line key={i} x1="100" y1={770 + i * 30} x2="730" y2={770 + i * 30} stroke={colors.border} strokeWidth="1" />
        ))}
      </g>
    );
  };

  const renderProfessionalLayout = (colors) => {
    return (
      <g>
        {/* Corporate header */}
        <rect x="80" y="50" width="690" height="70" fill={colors.accent} />
        <text x="425" y="95" fontSize="30" fontWeight="700" fill="white" textAnchor="middle">DAILY PLANNER</text>
        
        {/* Time blocks */}
        <text x="100" y="160" fontSize="14" fill={colors.accent} fontWeight="700">SCHEDULE</text>
        {['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM'].map((time, i) => (
          <g key={i}>
            <rect x="100" y={180 + i * 70} width="300" height="60" fill={colors.primary} stroke={colors.border} strokeWidth="1" />
            <text x="115" y={205 + i * 70} fontSize="12" fill={colors.text} fontWeight="600">{time}</text>
            <line x1="115" y1={215 + i * 70} x2="380" y2={215 + i * 70} stroke={colors.border} strokeWidth="0.5" />
          </g>
        ))}
        
        {/* Priority tasks */}
        <rect x="430" y="140" width="300" height="280" fill={colors.primary} stroke={colors.border} strokeWidth="2" />
        <text x="580" y="170" fontSize="14" fill={colors.accent} textAnchor="middle" fontWeight="700">PRIORITY TASKS</text>
        {[1,2,3,4,5,6,7].map(i => (
          <g key={i}>
            <rect x="450" y={185 + i * 35} width="20" height="20" fill="none" stroke={colors.accent} strokeWidth="2" />
            <line x1="480" y1={196 + i * 35} x2="710" y2={196 + i * 35} stroke={colors.border} strokeWidth="1" />
          </g>
        ))}
        
        {/* Goals section */}
        <rect x="430" y="440" width="300" height="140" fill={colors.primary} stroke={colors.border} strokeWidth="2" />
        <text x="580" y="470" fontSize="14" fill={colors.accent} textAnchor="middle" fontWeight="700">GOALS</text>
        {['Today', 'This Week', 'This Month'].map((period, i) => (
          <g key={i}>
            <text x="450" y={500 + i * 30} fontSize="11" fill={colors.text} fontWeight="600">{period}:</text>
            <line x1="520" y1={502 + i * 30} x2="710" y2={502 + i * 30} stroke={colors.border} strokeWidth="1" />
          </g>
        ))}
        
        {/* Meetings */}
        <text x="100" y="630" fontSize="14" fill={colors.accent} fontWeight="700">MEETINGS</text>
        <rect x="100" y="650" width="630" height="120" fill={colors.primary} stroke={colors.border} strokeWidth="2" />
        {[0,1,2].map(i => (
          <g key={i}>
            <text x="120" y={680 + i * 35} fontSize="11" fill={colors.text}>Time:</text>
            <line x1="165" y1={682 + i * 35} x2="260" y2={682 + i * 35} stroke={colors.border} strokeWidth="1" />
            <text x="280" y={680 + i * 35} fontSize="11" fill={colors.text}>Topic:</text>
            <line x1="330" y1={682 + i * 35} x2="710" y2={682 + i * 35} stroke={colors.border} strokeWidth="1" />
          </g>
        ))}
        
        {/* Action items */}
        <text x="425" y="820" fontSize="14" fill={colors.accent} textAnchor="middle" fontWeight="700">ACTION ITEMS</text>
        {[0,1].map(i => (
          <line key={i} x1="120" y1={850 + i * 30} x2="710" y2={850 + i * 30} stroke={colors.border} strokeWidth="1" />
        ))}
      </g>
    );
  };

  const renderCozyLayout = (colors) => {
    return (
      <g>
        {/* Soft rounded header */}
        <ellipse cx="425" cy="80" rx="250" ry="50" fill={colors.primary} opacity="0.7" />
        <text x="425" y="90" fontSize="32" fontWeight="500" fill={colors.text} textAnchor="middle" fontFamily="Georgia">Cozy Day Planner</text>
        
        {/* Morning routine - rounded box */}
        <rect x="100" y="150" width="280" height="200" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="25" />
        <text x="240" y="185" fontSize="15" fill={colors.accent} textAnchor="middle" fontWeight="600">☀ Morning Routine</text>
        {['Wake up time', 'Breakfast', 'Self-care', 'Start work'].map((item, i) => (
          <g key={i}>
            <circle cx="125" cy={212 + i * 35} r="5" fill={colors.accent} />
            <line x1="140" y1={215 + i * 35} x2="360" y2={215 + i * 35} stroke={colors.border} strokeWidth="1" />
          </g>
        ))}
        
        {/* Cozy activities */}
        <rect x="420" y="150" width="310" height="200" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="25" />
        <text x="575" y="185" fontSize="15" fill={colors.accent} textAnchor="middle" fontWeight="600">✨ Cozy Activities</text>
        {['Reading time', 'Tea/Coffee break', 'Creative project', 'Relaxation'].map((item, i) => (
          <g key={i}>
            <rect x="440" y={200 + i * 40} width="270" height="30" fill="white" stroke={colors.border} strokeWidth="1" rx="15" />
            <text x="575" y={220 + i * 40} fontSize="11" fill={colors.text} textAnchor="middle">{item}</text>
          </g>
        ))}
        
        {/* Comfort tracker */}
        <text x="425" y="400" fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="600">🏠 Comfort Check-In</text>
        {['Physical', 'Mental', 'Emotional', 'Environmental'].map((type, i) => (
          <g key={i}>
            <rect x={115 + i * 150} y="420" width="130" height="100" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="20" />
            <text x={180 + i * 150} y="450" fontSize="11" fill={colors.text} textAnchor="middle" fontWeight="600">{type}</text>
            {[0,1,2,3,4].map(j => (
              <circle key={j} cx={130 + j * 20 + i * 150} cy="480" r="6" fill="none" stroke={colors.accent} strokeWidth="1.5" />
            ))}
          </g>
        ))}
        
        {/* Meal & drink tracker */}
        <rect x="100" y="560" width="630" height="130" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="25" />
        <text x="425" y="590" fontSize="15" fill={colors.accent} textAnchor="middle" fontWeight="600">☕ Nourishment Tracker</text>
        <text x="150" y="620" fontSize="12" fill={colors.text} fontWeight="600">Meals:</text>
        {[0,1,2].map(i => (
          <circle key={i} cx={240 + i * 60} cy="615" r="18" fill="white" stroke={colors.accent} strokeWidth="2" />
        ))}
        <text x="450" y="620" fontSize="12" fill={colors.text} fontWeight="600">Water:</text>
        {[0,1,2,3,4,5,6,7].map(i => (
          <circle key={i} cx={530 + i * 25} cy="615" r="8" fill="none" stroke={colors.accent} strokeWidth="2" />
        ))}
        <text x="425" y="665" fontSize="11" fill={colors.text} textAnchor="middle">Snacks & treats: ___________________</text>
        
        {/* Evening wind down */}
        <rect x="100" y="730" width="630" height="140" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="25" />
        <text x="425" y="765" fontSize="15" fill={colors.accent} textAnchor="middle" fontWeight="600">🌙 Evening Wind Down</text>
        {['Dinner time', 'Evening activity', 'Bedtime routine', 'Gratitude'].map((item, i) => (
          <line key={i} x1="150" y1={790 + i * 25} x2="700" y2={790 + i * 25} stroke={colors.border} strokeWidth="1" />
        ))}
      </g>
    );
  };

  const renderSelfWellnessLayout = (colors) => {
    return (
      <g>
        {/* Flowing header */}
        <path d="M 100 50 Q 425 90 750 50" fill="none" stroke={colors.accent} strokeWidth="3" opacity="0.6" />
        <text x="425" y="90" fontSize="30" fontWeight="400" fill={colors.text} textAnchor="middle" fontFamily="Georgia">Wellness Journey</text>
        
        {/* Mind, Body, Spirit sections */}
        <rect x="100" y="130" width="200" height="240" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="15" />
        <text x="200" y="160" fontSize="14" fill={colors.accent} textAnchor="middle" fontWeight="700">🧠 MIND</text>
        {['Meditation', 'Journaling', 'Learning', 'Mindfulness'].map((item, i) => (
          <g key={i}>
            <circle cx="120" cy={187 + i * 45} r="8" fill="none" stroke={colors.accent} strokeWidth="2" />
            <text x="140" y={192 + i * 45} fontSize="11" fill={colors.text}>{item}</text>
            <line x1="140" y1={200 + i * 45} x2="280" y2={200 + i * 45} stroke={colors.border} strokeWidth="0.5" />
          </g>
        ))}
        
        <rect x="325" y="130" width="200" height="240" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="15" />
        <text x="425" y="160" fontSize="14" fill={colors.accent} textAnchor="middle" fontWeight="700">💪 BODY</text>
        {['Movement', 'Nutrition', 'Hydration', 'Rest'].map((item, i) => (
          <g key={i}>
            <circle cx="345" cy={187 + i * 45} r="8" fill="none" stroke={colors.accent} strokeWidth="2" />
            <text x="365" y={192 + i * 45} fontSize="11" fill={colors.text}>{item}</text>
            <line x1="365" y1={200 + i * 45} x2="505" y2={200 + i * 45} stroke={colors.border} strokeWidth="0.5" />
          </g>
        ))}
        
        <rect x="550" y="130" width="180" height="240" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="15" />
        <text x="640" y="160" fontSize="14" fill={colors.accent} textAnchor="middle" fontWeight="700">✨ SPIRIT</text>
        {['Gratitude', 'Connection', 'Joy', 'Purpose'].map((item, i) => (
          <g key={i}>
            <circle cx="570" cy={187 + i * 45} r="8" fill="none" stroke={colors.accent} strokeWidth="2" />
            <text x="590" y={192 + i * 45} fontSize="11" fill={colors.text}>{item}</text>
            <line x1="590" y1={200 + i * 45} x2="710" y2={200 + i * 45} stroke={colors.border} strokeWidth="0.5" />
          </g>
        ))}
        
        {/* Energy levels tracker */}
        <text x="425" y="420" fontSize="15" fill={colors.accent} textAnchor="middle" fontWeight="700">ENERGY LEVELS</text>
        <path d="M 150 480 L 200 450 L 250 470 L 300 440 L 350 460 L 400 430 L 450 450 L 500 420 L 550 440 L 600 410 L 650 430 L 700 400" fill="none" stroke={colors.accent} strokeWidth="2" strokeDasharray="5,5" />
        <line x1="100" y1="500" x2="750" y2="500" stroke={colors.border} strokeWidth="1" />
        <text x="80" y="455" fontSize="10" fill={colors.text}>High</text>
        <text x="80" y="505" fontSize="10" fill={colors.text}>Low</text>
        
        {/* Self-care activities */}
        <text x="425" y="560" fontSize="15" fill={colors.accent} textAnchor="middle" fontWeight="700">SELF-CARE ACTIVITIES</text>
        <rect x="100" y="580" width="630" height="120" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="15" />
        {[0,1,2,3,4,5].map(i => (
          <g key={i}>
            <rect x={120 + (i % 3) * 210} y={605 + Math.floor(i / 3) * 50} width="180" height="35" fill="white" stroke={colors.accent} strokeWidth="1" rx="8" />
            <circle cx={135 + (i % 3) * 210} cy={622 + Math.floor(i / 3) * 50} r="6" fill="none" stroke={colors.accent} strokeWidth="2" />
          </g>
        ))}
        
        {/* Reflections */}
        <text x="100" y="750" fontSize="15" fill={colors.accent} fontWeight="700">TODAY'S REFLECTIONS</text>
        {[0,1,2,3].map(i => (
          <line key={i} x1="100" y1={780 + i * 28} x2="730" y2={780 + i * 28} stroke={colors.border} strokeWidth="1" />
        ))}
      </g>
    );
  };
  const renderArtisticLayout = (colors) => {
    return (
      <g>
        {/* Paint splash header */}
        <ellipse cx="425" cy="80" rx="280" ry="60" fill={colors.primary} opacity="0.5" transform="rotate(-5 425 80)" />
        <text x="425" y="90" fontSize="34" fontWeight="700" fill={colors.text} textAnchor="middle" fontStyle="italic">Creative Journal</text>
        
        {/* Palette section - circular creative prompts */}
        <text x="100" y="150" fontSize="16" fill={colors.accent} fontWeight="700">CREATIVE PROMPTS</text>
        {[0,1,2,3,4].map(i => {
          const angle = (i * 72 - 90) * Math.PI / 180;
          const cx = 250 + 100 * Math.cos(angle);
          const cy = 280 + 100 * Math.sin(angle);
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r="45" fill={colors.primary} stroke={colors.accent} strokeWidth="3" />
              <text x={cx} y={cy + 5} fontSize="10" fill={colors.text} textAnchor="middle" fontWeight="600">Prompt {i + 1}</text>
            </g>
          );
        })}
        
        {/* Inspiration board - asymmetric boxes */}
        <text x="480" y="150" fontSize="16" fill={colors.accent} fontWeight="700">INSPIRATION BOARD</text>
        <rect x="480" y="170" width="250" height="130" fill={colors.primary} stroke={colors.accent} strokeWidth="3" rx="5" transform="rotate(2 605 235)" />
        <rect x="490" y="190" width="110" height="90" fill="white" stroke={colors.border} strokeWidth="2" />
        <rect x="610" y="190" width="110" height="90" fill="white" stroke={colors.border} strokeWidth="2" />
        
        {/* Sketch area with organic border */}
        <path d="M 100 450 Q 90 460 100 470 L 100 650 Q 90 660 100 670 L 730 670 Q 740 660 730 650 L 730 470 Q 740 460 730 450 Z" 
              fill={colors.primary} stroke={colors.accent} strokeWidth="3" />
        <text x="425" y="485" fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">DAILY SKETCH SPACE</text>
        {[0,1,2,3,4,5,6].map(i => (
          <path key={i} d={`M ${150 + i * 85} 520 Q ${170 + i * 85} 540 ${150 + i * 85} 560`} 
                fill="none" stroke={colors.border} strokeWidth="1.5" opacity="0.4" />
        ))}
        
        {/* Color mood tracker */}
        <text x="425" y="730" fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">COLOR MOOD</text>
        {['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Pink'].map((color, i) => (
          <g key={i}>
            <circle cx={165 + i * 85} cy="770" r="25" fill={colors.primary} stroke={colors.accent} strokeWidth="2" />
            <text x={165 + i * 85} y="815" fontSize="9" fill={colors.text} textAnchor="middle">{color}</text>
          </g>
        ))}
        
        {/* Creative notes with paint strokes */}
        <text x="100" y="860" fontSize="16" fill={colors.accent} fontWeight="700">CREATIVE NOTES</text>
        <path d="M 100 870 L 730 875" stroke={colors.accent} strokeWidth="2" opacity="0.6" />
      </g>
    );
  };

  const renderWhimsicalLayout = (colors) => {
    return (
      <g>
        {/* Magical header with stars */}
        <text x="425" y="90" fontSize="36" fontWeight="600" fill={colors.text} textAnchor="middle" fontFamily="cursive">Dream Diary</text>
        {[0,1,2,3,4,5,6,7].map(i => {
          const x = 150 + Math.random() * 550;
          const y = 40 + Math.random() * 80;
          const size = 8 + Math.random() * 8;
          return (
            <g key={i}>
              <polygon points={`${x},${y-size} ${x+size*0.3},${y-size*0.3} ${x+size},${y} ${x+size*0.3},${y+size*0.3} ${x},${y+size} ${x-size*0.3},${y+size*0.3} ${x-size},${y} ${x-size*0.3},${y-size*0.3}`} 
                       fill={colors.accent} opacity="0.3" />
            </g>
          );
        })}
        
        {/* Floating cloud sections */}
        <ellipse cx="250" cy="200" rx="170" ry="110" fill={colors.primary} stroke={colors.accent} strokeWidth="2" />
        <ellipse cx="200" cy="180" rx="60" ry="50" fill={colors.primary} stroke={colors.accent} strokeWidth="2" />
        <ellipse cx="300" cy="180" rx="60" ry="50" fill={colors.primary} stroke={colors.accent} strokeWidth="2" />
        <text x="250" y="190" fontSize="15" fill={colors.accent} textAnchor="middle" fontWeight="700">✨ Dreams</text>
        {[0,1,2].map(i => (
          <line key={i} x1="150" y1={210 + i * 25} x2="350" y2={210 + i * 25} stroke={colors.border} strokeWidth="1" />
        ))}
        
        <ellipse cx="600" cy="200" rx="170" ry="110" fill={colors.primary} stroke={colors.accent} strokeWidth="2" />
        <ellipse cx="550" cy="180" rx="60" ry="50" fill={colors.primary} stroke={colors.accent} strokeWidth="2" />
        <ellipse cx="650" cy="180" rx="60" ry="50" fill={colors.primary} stroke={colors.accent} strokeWidth="2" />
        <text x="600" y="190" fontSize="15" fill={colors.accent} textAnchor="middle" fontWeight="700">🌙 Wishes</text>
        {[0,1,2].map(i => (
          <line key={i} x1="500" y1={210 + i * 25} x2="700" y2={210 + i * 25} stroke={colors.border} strokeWidth="1" />
        ))}
        
        {/* Magic wand tracker */}
        <text x="425" y="370" fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">✨ Daily Magic Moments</text>
        {[0,1,2,3,4,5,6].map(i => (
          <g key={i}>
            <path d={`M ${150 + i * 85} 400 L ${170 + i * 85} 380 L ${175 + i * 85} 390 L ${185 + i * 85} 385 L ${180 + i * 85} 395 L ${190 + i * 85} 395 L ${180 + i * 85} 400`} 
                  fill={colors.accent} opacity="0.3" />
            <circle cx={150 + i * 85} cy="425" r="20" fill={colors.primary} stroke={colors.accent} strokeWidth="2" />
          </g>
        ))}
        
        {/* Fairy tale section */}
        <path d="M 120 500 Q 100 520 120 540 L 120 680 Q 100 700 120 720 L 730 720 Q 750 700 730 680 L 730 540 Q 750 520 730 500 Z" 
              fill={colors.primary} stroke={colors.accent} strokeWidth="2" />
        <text x="425" y="535" fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">🦋 Today's Story</text>
        {[0,1,2,3,4,5].map(i => (
          <line key={i} x1="150" y1={565 + i * 25} x2="700" y2={565 + i * 25} stroke={colors.border} strokeWidth="1" />
        ))}
        
        {/* Rainbow mood tracker */}
        <text x="425" y="780" fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">🌈 Mood Rainbow</text>
        <path d="M 200 850 Q 425 780 650 850" fill="none" stroke={colors.accent} strokeWidth="3" opacity="0.4" />
        <path d="M 220 850 Q 425 790 630 850" fill="none" stroke={colors.accent} strokeWidth="3" opacity="0.5" />
        <path d="M 240 850 Q 425 800 610 850" fill="none" stroke={colors.accent} strokeWidth="3" opacity="0.6" />
        {[0,1,2,3,4,5,6].map(i => (
          <circle key={i} cx={240 + i * 65} cy="850" r="15" fill={colors.primary} stroke={colors.accent} strokeWidth="2" />
        ))}
      </g>
    );
  };

  const renderLuxuryLayout = (colors) => {
    return (
      <g>
        {/* Elegant gold frame border */}
        <rect x="80" y="40" width="690" height="820" fill="none" stroke={colors.accent} strokeWidth="4" />
        <rect x="90" y="50" width="670" height="800" fill="none" stroke={colors.accent} strokeWidth="1" />
        
        {/* Monogram header */}
        <text x="425" y="110" fontSize="40" fontWeight="700" fill={colors.accent} textAnchor="middle" fontFamily="serif">PLANNER</text>
        <line x1="200" y1="130" x2="650" y2="130" stroke={colors.accent} strokeWidth="2" />
        
        {/* Priority section with gold accents */}
        <text x="120" y="180" fontSize="14" fill={colors.accent} fontWeight="700" letterSpacing="2">PRIORITIES</text>
        {[1,2,3,4,5].map(i => (
          <g key={i}>
            <rect x="120" y={195 + i * 45} width="610" height="35" fill={colors.primary} stroke={colors.accent} strokeWidth="1" />
            <text x="140" y={218 + i * 45} fontSize="18" fill={colors.accent} fontWeight="700">{i}</text>
            <line x1="170" y1={213 + i * 45} x2="710" y2={213 + i * 45} stroke={colors.border} strokeWidth="1" />
          </g>
        ))}
        
        {/* Schedule - luxury time blocks */}
        <text x="120" y="480" fontSize="14" fill={colors.accent} fontWeight="700" letterSpacing="2">SCHEDULE</text>
      {['MORNING', 'AFTERNOON', 'EVENING'].map((period, i) => (
  <g key={i}>
    <rect x="120" y={500 + i * 90} width="610" height="80" fill={colors.primary} stroke={colors.accent} strokeWidth="2" />
    <text x="425" y={530 + i * 90} fontSize="12" fill={colors.accent} textAnchor="middle" fontWeight="700" letterSpacing="3">{period}</text>
    <line x1="140" y1={545 + i * 90} x2="710" y2={545 + i * 90} stroke={colors.border} strokeWidth="0.5" />
    <line x1="140" y1={565 + i * 90} x2="710" y2={565 + i * 90} stroke={colors.border} strokeWidth="0.5" />
          </g>
        ))}
        
        {/* Notes section with ornamental border */}
        <rect x="120" y="760" width="610" height="80" fill={colors.primary} stroke={colors.accent} strokeWidth="2" />
        <text x="425" y="785" fontSize="12" fill={colors.accent} textAnchor="middle" fontWeight="700" letterSpacing="3">NOTES</text>
        {[0,1].map(i => (
          <line key={i} x1="140" y1={800 + i * 20} x2="710" y2={800 + i * 20} stroke={colors.accent} strokeWidth="0.5" />
        ))}
        
        {/* Corner ornaments */}
        {[[100, 60], [750, 60], [100, 840], [750, 840]].map((pos, i) => (
          <g key={i}>
            <circle cx={pos[0]} cy={pos[1]} r="8" fill={colors.accent} />
            <circle cx={pos[0]} cy={pos[1]} r="5" fill={colors.background} />
          </g>
        ))}
      </g>
    );
  };

  const renderElegantLayout = (colors) => {
    return (
      <g>
        {/* Classic serif header */}
        <text x="425" y="80" fontSize="32" fontWeight="400" fill={colors.text} textAnchor="middle" fontFamily="Georgia">Daily Planner</text>
        <line x1="250" y1="95" x2="600" y2="95" stroke={colors.accent} strokeWidth="1" />
        <line x1="270" y1="100" x2="580" y2="100" stroke={colors.accent} strokeWidth="0.5" />
        
        {/* Morning section */}
        <rect x="100" y="140" width="630" height="150" fill={colors.primary} stroke={colors.border} strokeWidth="1" rx="3" />
        <text x="425" y="165" fontSize="14" fill={colors.accent} textAnchor="middle" fontFamily="Georgia">Morning</text>
        <line x1="350" y1="175" x2="500" y2="175" stroke={colors.border} strokeWidth="0.5" />
        {[0,1,2,3].map(i => (
          <line key={i} x1="120" y1={195 + i * 25} x2="710" y2={195 + i * 25} stroke={colors.border} strokeWidth="0.5" />
        ))}
        
        {/* Afternoon section */}
        <rect x="100" y="310" width="630" height="150" fill={colors.primary} stroke={colors.border} strokeWidth="1" rx="3" />
        <text x="425" y="335" fontSize="14" fill={colors.accent} textAnchor="middle" fontFamily="Georgia">Afternoon</text>
        <line x1="350" y1="345" x2="500" y2="345" stroke={colors.border} strokeWidth="0.5" />
        {[0,1,2,3].map(i => (
          <line key={i} x1="120" y1={365 + i * 25} x2="710" y2={365 + i * 25} stroke={colors.border} strokeWidth="0.5" />
        ))}
        
        {/* Evening section */}
        <rect x="100" y="480" width="630" height="150" fill={colors.primary} stroke={colors.border} strokeWidth="1" rx="3" />
        <text x="425" y="505" fontSize="14" fill={colors.accent} textAnchor="middle" fontFamily="Georgia">Evening</text>
        <line x1="350" y1="515" x2="500" y2="515" stroke={colors.border} strokeWidth="0.5" />
        {[0,1,2,3].map(i => (
          <line key={i} x1="120" y1={535 + i * 25} x2="710" y2={535 + i * 25} stroke={colors.border} strokeWidth="0.5" />
        ))}
        
        {/* Important tasks */}
        <text x="100" y="670" fontSize="14" fill={colors.accent} fontFamily="Georgia">Important Tasks</text>
        <rect x="100" y="685" width="300" height="140" fill={colors.primary} stroke={colors.border} strokeWidth="1" rx="3" />
        {[0,1,2,3,4,5].map(i => (
          <g key={i}>
            <circle cx="120" cy={707 + i * 22} r="4" fill="none" stroke={colors.accent} strokeWidth="1" />
            <line x1="135" y1={707 + i * 22} x2="380" y2={707 + i * 22} stroke={colors.border} strokeWidth="0.5" />
          </g>
        ))}
        
        {/* Notes section */}
        <text x="420" y="670" fontSize="14" fill={colors.accent} fontFamily="Georgia">Notes</text>
        <rect x="420" y="685" width="310" height="140" fill={colors.primary} stroke={colors.border} strokeWidth="1" rx="3" />
        {[0,1,2,3,4,5,6].map(i => (
          <line key={i} x1="440" y1={707 + i * 20} x2="710" y2={707 + i * 20} stroke={colors.border} strokeWidth="0.5" />
        ))}
        
        {/* Daily reflection */}
        <text x="425" y="860" fontSize="13" fill={colors.accent} textAnchor="middle" fontFamily="Georgia" fontStyle="italic">"Today's Reflection"</text>
        <line x1="150" y1="875" x2="700" y2="875" stroke={colors.border} strokeWidth="0.5" />
      </g>
    );
  };

  const renderPattern = (patternType, colors) => {
    if (patternType === 'none') return null;
    
    return (
      <defs>
        {patternType === 'zebra' && (
          <pattern id="zebraPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill={colors.background} />
            <path d="M0,0 Q10,20 0,40" fill="none" stroke="#000" strokeWidth="8" opacity="0.1" />
            <path d="M10,0 Q20,20 10,40" fill="none" stroke="#000" strokeWidth="8" opacity="0.1" />
            <path d="M20,0 Q30,20 20,40" fill="none" stroke="#000" strokeWidth="8" opacity="0.1" />
            <path d="M30,0 Q40,20 30,40" fill="none" stroke="#000" strokeWidth="8" opacity="0.1" />
          </pattern>
        )}
        {patternType === 'leopard' && (
          <pattern id="leopardPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <rect width="60" height="60" fill={colors.background} />
            <ellipse cx="10" cy="10" rx="8" ry="6" fill="none" stroke="#000" strokeWidth="2" opacity="0.15" />
            <ellipse cx="35" cy="15" rx="7" ry="5" fill="none" stroke="#000" strokeWidth="2" opacity="0.15" />
            <ellipse cx="50" cy="25" rx="6" ry="8" fill="none" stroke="#000" strokeWidth="2" opacity="0.15" />
          </pattern>
        )}
        {patternType === 'stars' && (
          <pattern id="starsPattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <rect width="50" height="50" fill={colors.background} />
            <polygon points="25,10 27,18 35,18 29,23 31,31 25,26 19,31 21,23 15,18 23,18" fill={colors.accent} opacity="0.12" />
          </pattern>
        )}
        {patternType === 'hearts' && (
          <pattern id="heartsPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill={colors.background} />
            <path d="M20,12 C20,10 18,8 16,8 C14,8 13,9 13,11 C13,9 12,8 10,8 C8,8 6,10 6,12 C6,16 13,20 13,20 C13,20 20,16 20,12" fill={colors.accent} opacity="0.15" />
          </pattern>
        )}
        {patternType === 'polkadot' && (
          <pattern id="polkadotPattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <rect width="30" height="30" fill={colors.background} />
            <circle cx="15" cy="15" r="4" fill="#000" opacity="0.1" />
 </pattern>
        )}
      </defs>
    );
  };

  const getPatternFill = (patternType) => {
    // ... rest of your code
  };

  // ... more functions ...

  // Then much later, inside your return statement:
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* ... */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            {/* ... */}
            
            <div>
              <label className="block text-sm font-semibold mb-2">Background Pattern</label>
              <select value={pattern} onChange={(e) => setPattern(e.target.value)} className="w-full p-2 border-2 rounded-lg">
                <option value="none">None</option>
                <option value="zebra">Zebra</option>

            <div>
              <label className="block text-sm font-semibold mb-2">Optional Sections</label>
              <div className="space-y-2 max-h-64 overflow-y-auto border-2 rounded-lg p-3">
                {Object.entries(optionalSections).map(([key, section]) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedSections.includes(key)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedSections([...selectedSections, key]);
                        } else {
                          setSelectedSections(selectedSections.filter(s => s !== key));
                        }
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">{section.name}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">Sections will appear at the bottom of your template</p>
            </div>

  
    if (accessCode === 'PLAN2024') setIsAuthenticated(true);
    else alert('Invalid code');
  };

  const downloadSVG = () => {
    try {
      const svg = document.getElementById('template-svg');
      if (!svg) return alert('Not found');
      const clone = svg.cloneNode(true);
      clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      const content = new XMLSerializer().serializeToString(clone);
      const blob = new Blob([content], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${selectedTemplate}-planner.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      alert('✅ Downloaded!');
    } catch (e) {
      alert('Failed');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="bg-pink-100 p-4 rounded-full">
              <Lock className="w-8 h-8 text-pink-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center mb-2">Planner Generator</h1>
          <p className="text-center text-gray-600 mb-6">Enter code</p>
          <input type="text" value={accessCode} onChange={(e) => setAccessCode(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleLogin()} placeholder="Code" className="w-full px-4 py-3 border-2 rounded-lg mb-4" />
          <button onClick={handleLogin} className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold">Enter</button>
          <p className="text-xs text-center text-gray-500 mt-4">Code: PLAN2024</p>
        </div>
      </div>
    );
  }

  const template = templates[selectedTemplate];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Planner Generator</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-bold mb-4">Choose Template</h2>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Template Style</label>
              <select value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)} className="w-full p-2 border-2 rounded-lg">
                {Object.entries(templates).map(([key, tmpl]) => (
                  <option key={key} value={key}>{tmpl.name}</option>
                ))}
              </select>
              <p className="text-xs text-gray-600 mt-2">{template.description}</p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Background Pattern</label>
              <select value={pattern} onChange={(e) => setPattern(e.target.value)} className="w-full p-2 border-2 rounded-lg">
                <option value="none">None</option>
                <option value="zebra">Zebra</option>
                <option value="leopard">Leopard</option>
                <option value="polkadot">Polka Dots</option>
                <option value="hearts">Hearts</option>
                <option value="stars">Stars</option>
              </select>
            </div>

            <button onClick={downloadSVG} className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download SVG
            </button>

            <div className="bg-blue-50 p-3 rounded text-xs">
              <p className="font-semibold mb-1">✨ Unique Layouts</p>
              <p className="text-gray-700">Each template has its own custom layout and sections!</p>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 overflow-auto">
            <h2 className="text-xl font-bold mb-4">Preview</h2>
           <svg id="template-svg" width="850" height={900 + selectedSections.reduce((total, key) => total + optionalSections[key].height, 0)} viewBox={`0 0 850 ${900 + selectedSections.reduce((total, key) => total + optionalSections[key].height, 0)}`}>
              {renderPattern(pattern, template)}
              <rect width="850" height={900 + selectedSections.reduce((total, key) => total + optionalSections[key].height, 0)} fill={getPatternFill(pattern) || template.background} />
              
              <text x="750" y="30" fontSize="11" fill="#888">Date: _____</text>
              
              {selectedTemplate === 'minimalist' && renderMinimalistLayout(template)}
              {selectedTemplate === 'boho' && renderBohoLayout(template)}
              {selectedTemplate === 'funky' && renderFunkyLayout(template)}
              {selectedTemplate === 'zen' && renderZenLayout(template)}
              {selectedTemplate === 'prayer' && renderPrayerLayout(template)}
              {selectedTemplate === 'parenting' && renderParentingLayout(template)}
              {selectedTemplate === 'money' && renderMoneyLayout(template)}
              {selectedTemplate === 'professional' && renderProfessionalLayout(template)}
              {selectedTemplate === 'cozy' && renderCozyLayout(template)}
              {selectedTemplate === 'selfWellness' && renderSelfWellnessLayout(template)}
              {selectedTemplate === 'artistic' && renderArtisticLayout(template)}
              {selectedTemplate === 'whimsical' && renderWhimsicalLayout(template)}
              {selectedTemplate === 'luxury' && renderLuxuryLayout(template)}
              {selectedTemplate === 'elegant' && renderElegantLayout(template)}
            const getPatternFill = (patternType) => {
  if (patternType === 'none') return null;
  const map = {
    'zebra': 'url(#zebraPattern)',
    'leopard': 'url(#leopardPattern)',
    'stars': 'url(#starsPattern)',
    'hearts': 'url(#heartsPattern)',
    'polkadot': 'url(#polkadotPattern)'
  };
  return map[patternType];
};

const handleLogin = () => {
  if (accessCode === 'PLAN2024') setIsAuthenticated(true);
  else alert('Invalid code');
};

const downloadSVG = () => {
  // ... your download code
};
              
              {/* Render optional sections */}
              {selectedSections.map((sectionKey, index) => {
                const yOffset = 900 + selectedSections.slice(0, index).reduce((total, key) => total + optionalSections[key].height, 0);
                return <g key={sectionKey}>{optionalSections[sectionKey].render(template, yOffset)}</g>;
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerGenerator;
