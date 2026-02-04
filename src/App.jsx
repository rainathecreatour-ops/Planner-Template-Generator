import React, { useState } from 'react';
import { Download, Lock } from 'lucide-react';

const PlannerGenerator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('minimalist');
  const [pattern, setPattern] = useState('none');

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
        <ellipse cx="250" cy="200" rx="140" ry="120" fill={colors.primary} stroke={colors.border} strokeWidth="2" />
        <text x="250" y="185" fontSize="13" fill={colors.accent} textAnchor="middle" fontWeight="600">Gratitude</text>
        {[0,1,2,3].map(i => (
          <text key={i} x="250" y={210 + i * 20} fontSize="10" fill={colors.text} textAnchor="middle">___________</text>
        ))}
        
        <ellipse cx="600" cy="200" rx="140" ry="120" fill={colors.primary} stroke={colors.border} strokeWidth="2" />
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
            <svg id="template-svg" width="850" height="900" viewBox="0 0 850 900">
              {renderPattern(pattern, template)}
              <rect width="850" height="900" fill={getPatternFill(pattern) || template.background} />
              
              <text x="750" y="30" fontSize="11" fill="#888">Date: _____</text>
              
              {selectedTemplate === 'minimalist' && renderMinimalistLayout(template)}
              {selectedTemplate === 'boho' && renderBohoLayout(template)}
              {selectedTemplate === 'funky' && renderFunkyLayout(template)}
              {selectedTemplate === 'zen' && renderZenLayout(template)}
              {selectedTemplate === 'prayer' && renderPrayerLayout(template)}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerGenerator;
