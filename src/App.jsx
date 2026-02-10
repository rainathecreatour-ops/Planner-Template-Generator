import React, { useState } from 'react';
import { Download, Lock } from 'lucide-react';

const PlannerGenerator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('minimalist');
  const [pattern, setPattern] = useState('none');
  const [selectedSections, setSelectedSections] = useState([]);
  const [fontFamily, setFontFamily] = useState('default');
  const [customColors, setCustomColors] = useState(null);
  const [hiddenSections, setHiddenSections] = useState([]);

  const templates = {
    minimalist: { name: 'Minimalist', description: 'Clean, simple, uncluttered', background: '#FFFFFF', primary: '#F5F5F5', accent: '#666666', border: '#CCCCCC', text: '#333333' },
    boho: { name: 'Boho', description: 'Warm, earthy, relaxed', background: '#FFF8F0', primary: '#F4E4D7', accent: '#A67C52', border: '#D4C4B0', text: '#5C4033' },
    funky: { name: 'Funky', description: 'Bold, expressive, playful', background: '#FFF9E6', primary: '#FFE5B4', accent: '#FF6B9D', border: '#FFB84D', text: '#2D1B4E' },
    zen: { name: 'Zen', description: 'Calm, mindful, peaceful', background: '#F7F9F9', primary: '#E8EEEE', accent: '#6B7F7F', border: '#C2D1D1', text: '#3A4848' },
    prayer: { name: 'Prayer', description: 'Spiritual, peaceful, reflective', background: '#F3F0FF', primary: '#E6DEFF', accent: '#7C3AED', border: '#C4B5FD', text: '#5B21B6' },
    parenting: { name: 'Parenting', description: 'Organized, nurturing, family-focused', background: '#FFF5E6', primary: '#FFE8CC', accent: '#FF8C42', border: '#FFD4A3', text: '#8B4513' },
    money: { name: 'Money', description: 'Professional, goal-oriented, structured', background: '#F0F8F0', primary: '#D4EDDA', accent: '#28A745', border: '#A8D5BA', text: '#155724' },
    professional: { name: 'Professional', description: 'Clean, corporate, efficient', background: '#F8F9FA', primary: '#E9ECEF', accent: '#2C5F8D', border: '#CED4DA', text: '#212529' },
    cozy: { name: 'Cozy', description: 'Warm, comfortable, inviting', background: '#FFF9F5', primary: '#FFE4D6', accent: '#D4885C', border: '#E8C4A8', text: '#5D3A1A' },
    selfWellness: { name: 'Self Wellness', description: 'Holistic, balanced, mindful', background: '#F5FFFA', primary: '#E0F7F4', accent: '#20B2AA', border: '#B0E5DF', text: '#2F4F4F' },
    artistic: { name: 'Artistic', description: 'Creative, expressive, painterly', background: '#FFFBF5', primary: '#FFE5D9', accent: '#E63946', border: '#FFCDB2', text: '#1D3557' },
    whimsical: { name: 'Whimsical', description: 'Magical, dreamy, enchanting', background: '#FFF8FC', primary: '#F8E8FF', accent: '#C77DFF', border: '#E0AAFF', text: '#5A189A' },
    luxury: { name: 'Luxury', description: 'Opulent, sophisticated, prestigious', background: '#1A1A1A', primary: '#2D2D2D', accent: '#D4AF37', border: '#B8960F', text: '#F5F5F5' },
    elegant: { name: 'Elegant', description: 'Refined, graceful, timeless', background: '#FEFEFE', primary: '#F8F6F4', accent: '#8B7355', border: '#D4C4B0', text: '#2C2416' },
    journal: { name: 'Journal', description: 'Clean, simple writing space', background: '#FFFFF8', primary: '#FFF9E6', accent: '#8B7355', border: '#D4C4B0', text: '#2C2416' },
    dreamJournal: { name: 'Dream Journal', description: 'Track and explore your dreams', background: '#F5F3FF', primary: '#EDE9FE', accent: '#7C3AED', border: '#C4B5FD', text: '#5B21B6' },
    kidsChores: { name: 'Kids Chores', description: 'Fun chore tracker with rewards for kids', background: '#FFF9E6', primary: '#FFE5CC', accent: '#FF9500', border: '#FFD4A3', text: '#8B4513' }
  };

  const fontOptions = {
    default: { name: 'Default', family: 'sans-serif' },
    serif: { name: 'Serif', family: 'Georgia, serif' },
    handwriting: { name: 'Handwriting', family: 'cursive' },
    modern: { name: 'Modern', family: 'Arial, Helvetica, sans-serif' },
    elegant: { name: 'Elegant Script', family: '"Times New Roman", serif' }
  };

  const templateSections = {
    minimalist: [{ id: 'todo', name: 'To-Do List' }, { id: 'monthly', name: 'Monthly Overview' }, { id: 'habits', name: 'Habit Tracker' }, { id: 'reflections', name: 'Reflections' }],
    boho: [{ id: 'gratitude', name: 'Gratitude' }, { id: 'selfcare', name: 'Self-Care' }, { id: 'mood', name: 'Mood Tracker' }, { id: 'affirmations', name: 'Affirmations' }],
    funky: [{ id: 'creative', name: 'Creative Notes' }, { id: 'loving', name: 'Currently Loving' }, { id: 'mood', name: 'Mood Tracker' }, { id: 'highlights', name: 'Weekly Highlights' }],
    zen: [{ id: 'breathing', name: 'Breathing Exercise' }, { id: 'intentions', name: 'Intentions' }, { id: 'gratitude', name: 'Gratitude' }, { id: 'mood', name: 'Mood Reflection' }],
    prayer: [{ id: 'requests', name: 'Prayer Requests' }, { id: 'scripture', name: 'Scripture' }, { id: 'answered', name: 'Answered Prayers' }, { id: 'timelog', name: 'Prayer Time Log' }, { id: 'reflections', name: 'Reflections' }],
    parenting: [{ id: 'schedule', name: 'Kids Schedule' }, { id: 'meals', name: 'Meal Planning' }, { id: 'shopping', name: 'Shopping List' }, { id: 'activities', name: 'Activities' }, { id: 'gratitude', name: 'Gratitude' }],
    money: [{ id: 'income', name: 'Income' }, { id: 'expenses', name: 'Expenses' }, { id: 'savings', name: 'Savings Goals' }, { id: 'budget', name: 'Budget Breakdown' }, { id: 'notes', name: 'Financial Notes' }],
    professional: [{ id: 'schedule', name: 'Schedule' }, { id: 'priorities', name: 'Priority Tasks' }, { id: 'goals', name: 'Goals' }, { id: 'meetings', name: 'Meetings' }, { id: 'actions', name: 'Action Items' }],
    cozy: [{ id: 'morning', name: 'Morning Routine' }, { id: 'activities', name: 'Cozy Activities' }, { id: 'comfort', name: 'Comfort Check-In' }, { id: 'nourishment', name: 'Nourishment Tracker' }, { id: 'evening', name: 'Evening Wind Down' }],
    selfWellness: [{ id: 'mind', name: 'Mind' }, { id: 'body', name: 'Body' }, { id: 'spirit', name: 'Spirit' }, { id: 'energy', name: 'Energy Levels' }, { id: 'selfcare', name: 'Self-Care Activities' }, { id: 'reflections', name: 'Reflections' }],
    artistic: [{ id: 'prompts', name: 'Creative Prompts' }, { id: 'inspiration', name: 'Inspiration Board' }, { id: 'sketch', name: 'Sketch Space' }, { id: 'colormood', name: 'Color Mood' }, { id: 'notes', name: 'Creative Notes' }],
    whimsical: [{ id: 'dreams', name: 'Dreams' }, { id: 'wishes', name: 'Wishes' }, { id: 'magic', name: 'Magic Moments' }, { id: 'story', name: 'Story' }, { id: 'rainbow', name: 'Mood Rainbow' }],
    luxury: [{ id: 'priorities', name: 'Priorities' }, { id: 'schedule', name: 'Schedule' }, { id: 'notes', name: 'Notes' }],
    elegant: [{ id: 'morning', name: 'Morning' }, { id: 'afternoon', name: 'Afternoon' }, { id: 'evening', name: 'Evening' }, { id: 'tasks', name: 'Important Tasks' }, { id: 'notes', name: 'Notes' }, { id: 'reflection', name: 'Reflection' }],
    journal: [{ id: 'lines', name: 'Writing Lines' }, { id: 'margin', name: 'Margin Line' }],
    dreamJournal: [{ id: 'sleepinfo', name: 'Sleep Info' }, { id: 'description', name: 'Dream Description' }, { id: 'elements', name: 'Key Elements' }, { id: 'mood', name: 'Dream Mood' }, { id: 'symbols', name: 'Symbols' }, { id: 'interpretation', name: 'Interpretation' }, { id: 'recurring', name: 'Recurring Theme' }],
    kidsChores: [{ id: 'header', name: 'Header' }, { id: 'petcare', name: 'Pet Care' }, { id: 'homework', name: 'Homework' }, { id: 'hygiene', name: 'Hygiene' }, { id: 'cleaning', name: 'Cleaning' }, { id: 'tracker', name: 'Weekly Tracker' }, { id: 'rewards', name: 'Rewards Section' }]
  };

  const optionalSections = {
    monthlyReset: {
      name: 'Monthly Reset', height: 200,
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
      name: 'Weekly Check-in', height: 180,
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
      name: 'Life Balance Wheel', height: 220,
      render: (colors, yPos) => (
        <g>
          <text x="425" y={yPos + 20} fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">LIFE BALANCE WHEEL</text>
          <circle cx="425" cy={yPos + 120} r="80" fill={colors.primary} stroke={colors.accent} strokeWidth="2" />
          {[0,1,2,3,4,5,6,7].map(i => {
            const angle = (i * 45 - 90) * Math.PI / 180;
            return <line key={i} x1={425 + 30 * Math.cos(angle)} y1={yPos + 120 + 30 * Math.sin(angle)} x2={425 + 80 * Math.cos(angle)} y2={yPos + 120 + 80 * Math.sin(angle)} stroke={colors.accent} strokeWidth="1" />;
          })}
          {['Health', 'Career', 'Finance', 'Relations', 'Growth', 'Fun', 'Spirit', 'Home'].map((area, i) => {
            const angle = (i * 45 - 90) * Math.PI / 180;
            return <text key={i} x={425 + 100 * Math.cos(angle)} y={yPos + 120 + 100 * Math.sin(angle)} fontSize="9" fill={colors.text} textAnchor="middle">{area}</text>;
          })}
        </g>
      )
    },
    energyTracker: {
      name: 'Energy Tracker', height: 160,
      render: (colors, yPos) => (
        <g>
          <rect x="100" y={yPos} width="630" height="140" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="12" />
          <text x="425" y={yPos + 30} fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">ENERGY TRACKER</text>
          <line x1="150" y1={yPos + 100} x2="700" y2={yPos + 100} stroke={colors.border} strokeWidth="1" />
          {[0,1,2,3,4,5,6].map(i => (
            <circle key={i} cx={200 + i * 75} cy={yPos + 80} r="8" fill="none" stroke={colors.accent} strokeWidth="2" />
          ))}
        </g>
      )
    },
    winsLessons: {
      name: 'Wins & Lessons', height: 180,
      render: (colors, yPos) => (
        <g>
          <rect x="100" y={yPos} width="300" height="160" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="12" />
          <text x="250" y={yPos + 30} fontSize="14" fill={colors.accent} textAnchor="middle" fontWeight="700">WINS 🎉</text>
          {[0,1,2,3].map(i => <line key={i} x1="120" y1={yPos + 55 + i * 25} x2="380" y2={yPos + 55 + i * 25} stroke={colors.border} strokeWidth="1" />)}
          <rect x="430" y={yPos} width="300" height="160" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="12" />
          <text x="580" y={yPos + 30} fontSize="14" fill={colors.accent} textAnchor="middle" fontWeight="700">LESSONS 📚</text>
          {[0,1,2,3].map(i => <line key={i} x1="450" y1={yPos + 55 + i * 25} x2="710" y2={yPos + 55 + i * 25} stroke={colors.border} strokeWidth="1" />)}
        </g>
      )
    },
    quotesAffirmations: {
      name: 'Quotes & Affirmations', height: 160,
      render: (colors, yPos) => (
        <g>
          <rect x="100" y={yPos} width="630" height="140" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="12" />
          <text x="425" y={yPos + 30} fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">✨ DAILY AFFIRMATIONS</text>
          {[0,1,2,3].map(i => <line key={i} x1="150" y1={yPos + 60 + i * 25} x2="700" y2={yPos + 60 + i * 25} stroke={colors.border} strokeWidth="1" />)}
        </g>
      )
    },
    notesDoodle: {
      name: 'Notes & Doodles', height: 200,
      render: (colors, yPos) => (
        <g>
          <rect x="100" y={yPos} width="630" height="180" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="12" />
          <text x="425" y={yPos + 30} fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">NOTES & DOODLES</text>
          <rect x="120" y={yPos + 50} width="590" height="110" fill="white" stroke={colors.border} strokeWidth="1" strokeDasharray="5,5" />
        </g>
      )
    },
    lettingGo: {
      name: 'Letting Go', height: 160,
      render: (colors, yPos) => (
        <g>
          <rect x="100" y={yPos} width="630" height="140" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="12" />
          <text x="425" y={yPos + 30} fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">THINGS I'M LETTING GO 🍃</text>
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
      name: 'Excited About', height: 160,
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
    },
    dailyJournal: {
      name: 'Daily Journal', height: 220,
      render: (colors, yPos) => (
        <g>
          <rect x="100" y={yPos} width="630" height="200" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="12" />
          <text x="425" y={yPos + 30} fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">DAILY JOURNAL</text>
          <text x="120" y={yPos + 55} fontSize="11" fill={colors.text}>Date: _________   Mood: _________</text>
          {[0,1,2,3,4,5,6,7,8,9].map(i => <line key={i} x1="120" y1={yPos + 75 + i * 12} x2="710" y2={yPos + 75 + i * 12} stroke={colors.border} strokeWidth="0.5" />)}
        </g>
      )
    },
    dreamJournal: {
      name: 'Dream Journal', height: 220,
      render: (colors, yPos) => (
        <g>
          <rect x="100" y={yPos} width="630" height="200" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="12" />
          <text x="425" y={yPos + 30} fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">🌙 DREAM JOURNAL</text>
          <text x="120" y={yPos + 55} fontSize="11" fill={colors.text}>Date: _________   Sleep: _________   Wake: _________</text>
          {[0,1,2,3,4,5,6,7].map(i => <line key={i} x1="120" y1={yPos + 90 + i * 13} x2="710" y2={yPos + 90 + i * 13} stroke={colors.border} strokeWidth="0.5" />)}
        </g>
      )
    },
    plainJournal: {
      name: 'Plain Journal', height: 220,
      render: (colors, yPos) => (
        <g>
          <rect x="100" y={yPos} width="630" height="200" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="12" />
          <text x="425" y={yPos + 25} fontSize="14" fill={colors.accent} textAnchor="middle" fontWeight="700">JOURNAL</text>
          {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => <line key={i} x1="120" y1={yPos + 45 + i * 13} x2="710" y2={yPos + 45 + i * 13} stroke={colors.border} strokeWidth="0.5" />)}
        </g>
      )
    },
    moodTracker: {
      name: 'Mood Tracker', height: 180,
      render: (colors, yPos) => (
        <g>
          <rect x="100" y={yPos} width="630" height="160" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="12" />
          <text x="425" y={yPos + 30} fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">MOOD TRACKER</text>
          {['😊', '😌', '😐', '😔', '😢'].map((emoji, i) => (
            <g key={i}>
              <circle cx={180 + i * 110} cy={yPos + 90} r="25" fill="white" stroke={colors.accent} strokeWidth="2" />
              <text x={180 + i * 110} y={yPos + 98} fontSize="24" textAnchor="middle">{emoji}</text>
              <text x={180 + i * 110} y={yPos + 125} fontSize="9" fill={colors.text} textAnchor="middle">Day __</text>
            </g>
          ))}
        </g>
      )
    },
    habitStreaks: {
      name: 'Habit Streaks', height: 180,
      render: (colors, yPos) => (
        <g>
          <rect x="100" y={yPos} width="630" height="160" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="12" />
          <text x="425" y={yPos + 30} fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">🔥 HABIT STREAKS</text>
          {['Habit 1', 'Habit 2', 'Habit 3'].map((habit, i) => (
            <g key={i}>
              <text x="120" y={yPos + 63 + i * 35} fontSize="11" fill={colors.text} fontWeight="600">{habit}:</text>
              {[0,1,2,3,4,5,6].map(j => (
                <rect key={j} x={530 + j * 25} y={yPos + 48 + i * 35} width="20" height="20" fill="none" stroke={colors.accent} strokeWidth="1.5" rx="3" />
              ))}
            </g>
          ))}
        </g>
      )
    },
    progressBars: {
      name: 'Progress Bars', height: 180,
      render: (colors, yPos) => (
        <g>
          <rect x="100" y={yPos} width="630" height="160" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="12" />
          <text x="425" y={yPos + 30} fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">📊 PROGRESS TRACKER</text>
          {['Goal 1', 'Goal 2', 'Goal 3', 'Goal 4'].map((goal, i) => (
            <g key={i}>
              <text x="120" y={yPos + 58 + i * 30} fontSize="11" fill={colors.text} fontWeight="600">{goal}:</text>
              <rect x="200" y={yPos + 45 + i * 30} width="490" height="16" fill="white" stroke={colors.border} strokeWidth="1" rx="8" />
            </g>
          ))}
        </g>
      )
    },
    gentleReminders: {
      name: 'Gentle Reminders', height: 180,
      render: (colors, yPos) => (
        <g>
          <rect x="100" y={yPos} width="630" height="160" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="12" />
          <text x="425" y={yPos + 30} fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">💝 GENTLE REMINDERS</text>
          {['✨ You are doing your best', '🌸 Progress, not perfection', '💫 Rest is productive too', '🌟 Small steps count'].map((reminder, i) => (
            <g key={i}>
              <rect x="130" y={yPos + 50 + i * 28} width="570" height="22" fill="white" stroke={colors.accent} strokeWidth="1" rx="11" />
              <text x="425" y={yPos + 66 + i * 28} fontSize="11" fill={colors.text} textAnchor="middle">{reminder}</text>
            </g>
          ))}
        </g>
      )
    },
    visionBoard: {
      name: 'Vision Board', height: 220,
      render: (colors, yPos) => (
        <g>
          <rect x="100" y={yPos} width="630" height="200" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="12" />
          <text x="425" y={yPos + 30} fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">✨ VISION BOARD</text>
          {[0,1,2,3,4,5].map(i => (
            <rect key={i} x={130 + (i % 3) * 200} y={yPos + 50 + Math.floor(i / 3) * 75} width="180" height="65" fill="white" stroke={colors.accent} strokeWidth="2" strokeDasharray="5,5" rx="8" />
          ))}
        </g>
      )
    },
    stickerElements: {
      name: 'Sticker Elements', height: 180,
      render: (colors, yPos) => (
        <g>
          <rect x="100" y={yPos} width="630" height="160" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="12" />
          <text x="425" y={yPos + 30} fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">✨ DECORATIVE ELEMENTS</text>
          {['⭐', '💫', '🌸', '🌙', '☀️', '💖', '🦋', '🌈', '✨', '🎀'].map((sticker, i) => (
            <g key={i}>
              <circle cx={180 + (i % 5) * 110} cy={yPos + 75 + Math.floor(i / 5) * 55} r="25" fill="white" stroke={colors.accent} strokeWidth="2" />
              <text x={180 + (i % 5) * 110} y={yPos + 85 + Math.floor(i / 5) * 55} fontSize="28" textAnchor="middle">{sticker}</text>
            </g>
          ))}
        </g>
      )
    }
  };

  const renderSectionOrReplacement = (sectionId, hiddenSections, colors, originalContent) => {
    if (!hiddenSections.includes(sectionId)) return originalContent;
    return null;
  };

  const renderMinimalistLayout = (colors, hiddenSections = []) => (
    <g>
      <text x="100" y="80" fontSize="28" fontWeight="300" fill={colors.text}>Daily Notes</text>
      <line x1="100" y1="100" x2="750" y2="100" stroke={colors.border} strokeWidth="0.5" />
      {renderSectionOrReplacement('todo', hiddenSections, colors, (
        <>
          <text x="100" y="140" fontSize="14" fill={colors.accent}>TO-DO LIST</text>
          {[0,1,2,3,4,5,6,7,8].map(i => (
            <g key={i}>
              <rect x="100" y={165 + i * 35} width="12" height="12" fill="none" stroke={colors.border} strokeWidth="1" />
              <line x1="125" y1={172 + i * 35} x2="400" y2={172 + i * 35} stroke={colors.border} strokeWidth="0.5" />
            </g>
          ))}
        </>
      ))}
      {renderSectionOrReplacement('monthly', hiddenSections, colors, (
        <>
          <text x="450" y="140" fontSize="14" fill={colors.accent}>MONTHLY OVERVIEW</text>
          <rect x="450" y="160" width="280" height="320" fill={colors.primary} stroke={colors.border} strokeWidth="0.5" rx="4" />
          {[0,1,2,3].map(i => <line key={i} x1="470" y1={200 + i * 40} x2="710" y2={200 + i * 40} stroke={colors.border} strokeWidth="0.3" />)}
        </>
      ))}
      {renderSectionOrReplacement('habits', hiddenSections, colors, (
        <>
          <text x="100" y="530" fontSize="14" fill={colors.accent}>HABIT TRACKER</text>
          <rect x="100" y="550" width="630" height="180" fill={colors.primary} stroke={colors.border} strokeWidth="0.5" rx="4" />
          {[0,1,2,3,4,5,6].map(i => <rect key={i} x={120 + i * 85} y="580" width="70" height="20" fill="white" stroke={colors.border} strokeWidth="0.5" />)}
        </>
      ))}
      {renderSectionOrReplacement('reflections', hiddenSections, colors, (
        <>
          <text x="100" y="770" fontSize="14" fill={colors.accent}>REFLECTIONS</text>
          {[0,1,2,3].map(i => <line key={i} x1="100" y1={800 + i * 30} x2="730" y2={800 + i * 30} stroke={colors.border} strokeWidth="0.3" />)}
        </>
      ))}
    </g>
  );

  const renderBohoLayout = (colors, hiddenSections = []) => (
    <g>
      <path d="M 100 50 Q 425 80 750 50" fill={colors.primary} opacity="0.6" />
      <text x="425" y="100" fontSize="32" fontWeight="400" fill={colors.text} textAnchor="middle" fontFamily="Georgia">Monthly Intentions</text>
      {renderSectionOrReplacement('gratitude', hiddenSections, colors, (
        <>
          <ellipse cx="250" cy="240" rx="140" ry="120" fill={colors.primary} stroke={colors.border} strokeWidth="2" />
          <text x="250" y="225" fontSize="13" fill={colors.accent} textAnchor="middle" fontWeight="600">Gratitude</text>
          {[0,1,2,3].map(i => <text key={i} x="250" y={250 + i * 20} fontSize="10" fill={colors.text} textAnchor="middle">___________</text>)}
        </>
      ))}
      {renderSectionOrReplacement('selfcare', hiddenSections, colors, (
        <>
          <ellipse cx="600" cy="240" rx="140" ry="120" fill={colors.primary} stroke={colors.border} strokeWidth="2" />
          <text x="600" y="225" fontSize="13" fill={colors.accent} textAnchor="middle" fontWeight="600">Self-Care</text>
          {[0,1,2,3].map(i => <text key={i} x="600" y={250 + i * 20} fontSize="10" fill={colors.text} textAnchor="middle">___________</text>)}
        </>
      ))}
      {renderSectionOrReplacement('mood', hiddenSections, colors, (
        <>
          <text x="425" y="380" fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="600">Mood Tracker</text>
          {[0,1,2,3,4,5,6].map(i => <circle key={i} cx={200 + i * 75} cy="420" r="25" fill={colors.primary} stroke={colors.accent} strokeWidth="2" />)}
        </>
      ))}
      {renderSectionOrReplacement('affirmations', hiddenSections, colors, (
        <>
          <path d="M 120 550 Q 425 520 730 550 L 730 720 Q 425 750 120 720 Z" fill={colors.primary} stroke={colors.border} strokeWidth="2" />
          <text x="425" y="590" fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="600">Daily Affirmations</text>
          {[0,1,2,3,4].map(i => <text key={i} x="425" y={625 + i * 25} fontSize="11" fill={colors.text} textAnchor="middle">_________________________________</text>)}
        </>
      ))}
    </g>
  );

  const renderFunkyLayout = (colors, hiddenSections = []) => (
    <g>
      <path d="M 80 50 Q 200 30 320 50 T 560 50 T 800 50 L 800 120 Q 680 140 560 120 T 320 120 T 80 120 Z" fill={colors.accent} opacity="0.8" />
      <text x="425" y="95" fontSize="34" fontWeight="900" fill="white" textAnchor="middle">BRAIN DUMP</text>
      {renderSectionOrReplacement('creative', hiddenSections, colors, (
        <>
          <ellipse cx="220" cy="250" rx="160" ry="140" fill={colors.primary} stroke={colors.accent} strokeWidth="4" transform="rotate(-15 220 250)" />
          <text x="220" y="230" fontSize="16" fill={colors.text} textAnchor="middle" fontWeight="700">Creative Notes</text>
          {[0,1,2,3,4].map(i => <line key={i} x1="130" y1={250 + i * 25} x2="310" y2={250 + i * 25} stroke={colors.accent} strokeWidth="2" />)}
        </>
      ))}
      {renderSectionOrReplacement('loving', hiddenSections, colors, (
        <>
          <rect x="450" y="150" width="280" height="240" fill={colors.primary} stroke={colors.accent} strokeWidth="4" rx="25" transform="rotate(5 590 270)" />
          <text x="590" y="200" fontSize="16" fill={colors.text} textAnchor="middle" fontWeight="700">Currently Loving</text>
          {[0,1,2,3,4,5].map(i => <text key={i} x="590" y={230 + i * 30} fontSize="13" fill={colors.text} textAnchor="middle" fontWeight="600">♥ __________</text>)}
        </>
      ))}
      {renderSectionOrReplacement('mood', hiddenSections, colors, (
        <>
          <text x="100" y="480" fontSize="18" fill={colors.accent} fontWeight="900">MOOD TRACKER</text>
          {[0,1,2,3,4,5,6].map(i => <rect key={i} x={100 + i * 95} y="510" width="80" height="80" fill={colors.primary} stroke={colors.accent} strokeWidth="3" rx="15" />)}
        </>
      ))}
      {renderSectionOrReplacement('highlights', hiddenSections, colors, (
        <>
          <path d="M 100 650 L 730 650 L 720 850 L 110 850 Z" fill={colors.primary} stroke={colors.accent} strokeWidth="4" />
          <text x="425" y="690" fontSize="18" fill={colors.text} textAnchor="middle" fontWeight="900">WEEKLY HIGHLIGHTS</text>
          {[0,1,2,3].map(i => <line key={i} x1="130" y1={720 + i * 30} x2="700" y2={720 + i * 30} stroke={colors.accent} strokeWidth="2" />)}
        </>
      ))}
    </g>
  );

  const renderZenLayout = (colors, hiddenSections = []) => (
    <g>
      <circle cx="425" cy="100" r="60" fill="none" stroke={colors.accent} strokeWidth="0.5" opacity="0.5" />
      <text x="425" y="110" fontSize="24" fontWeight="300" fill={colors.text} textAnchor="middle" fontFamily="Georgia">Daily Mindfulness</text>
      {renderSectionOrReplacement('breathing', hiddenSections, colors, (
        <>
          <text x="425" y="200" fontSize="12" fill={colors.accent} textAnchor="middle">Breathing Exercise</text>
          <circle cx="425" cy="260" r="80" fill={colors.primary} stroke={colors.border} strokeWidth="1" />
          <text x="425" y="255" fontSize="10" fill={colors.text} textAnchor="middle">Inhale / Hold / Exhale</text>
        </>
      ))}
      {renderSectionOrReplacement('intentions', hiddenSections, colors, (
        <>
          <text x="425" y="390" fontSize="12" fill={colors.accent} textAnchor="middle">Today's Intentions</text>
          {[0,1,2].map(i => <line key={i} x1="200" y1={420 + i * 40} x2="650" y2={420 + i * 40} stroke={colors.border} strokeWidth="0.5" />)}
        </>
      ))}
      {renderSectionOrReplacement('gratitude', hiddenSections, colors, (
        <>
          <text x="425" y="570" fontSize="12" fill={colors.accent} textAnchor="middle">Gratitude</text>
          <rect x="180" y="590" width="490" height="120" fill={colors.primary} stroke={colors.border} strokeWidth="0.5" rx="10" />
          {[0,1,2].map(i => <line key={i} x1="200" y1={620 + i * 30} x2="650" y2={620 + i * 30} stroke={colors.border} strokeWidth="0.3" />)}
        </>
      ))}
      {renderSectionOrReplacement('mood', hiddenSections, colors, (
        <>
          <text x="425" y="760" fontSize="12" fill={colors.accent} textAnchor="middle">Mood Reflection</text>
          {[0,1,2,3,4].map(i => <circle key={i} cx={275 + i * 70} cy="810" r="22" fill="none" stroke={colors.accent} strokeWidth="1" opacity="0.6" />)}
        </>
      ))}
    </g>
  );

  const renderPrayerLayout = (colors, hiddenSections = []) => (
    <g>
      <text x="425" y="80" fontSize="30" fontWeight="400" fill={colors.text} textAnchor="middle" fontFamily="Georgia">Prayer Journal</text>
      {renderSectionOrReplacement('requests', hiddenSections, colors, (
        <>
          <rect x="100" y="120" width="630" height="180" fill={colors.primary} stroke={colors.border} strokeWidth="1" rx="12" />
          <text x="425" y="150" fontSize="15" fill={colors.accent} textAnchor="middle" fontWeight="600">Prayer Requests & Praise</text>
          {[0,1,2,3,4].map(i => <line key={i} x1="120" y1={175 + i * 25} x2="710" y2={175 + i * 25} stroke={colors.border} strokeWidth="0.5" />)}
        </>
      ))}
      {renderSectionOrReplacement('scripture', hiddenSections, colors, (
        <>
          <rect x="100" y="340" width="310" height="200" fill={colors.primary} stroke={colors.border} strokeWidth="1" rx="12" />
          <text x="255" y="370" fontSize="13" fill={colors.accent} textAnchor="middle" fontWeight="600">Scripture of the Day</text>
          {[0,1,2,3,4].map(i => <line key={i} x1="120" y1={395 + i * 25} x2="390" y2={395 + i * 25} stroke={colors.border} strokeWidth="0.3" />)}
        </>
      ))}
      {renderSectionOrReplacement('answered', hiddenSections, colors, (
        <>
          <rect x="430" y="340" width="300" height="200" fill={colors.primary} stroke={colors.border} strokeWidth="1" rx="12" />
          <text x="580" y="370" fontSize="13" fill={colors.accent} textAnchor="middle" fontWeight="600">Answered Prayers</text>
          {[0,1,2,3,4,5,6].map(i => (
            <g key={i}>
              <circle cx="450" cy={390 + i * 20} r="4" fill={colors.accent} />
              <line x1="465" y1={390 + i * 20} x2="710" y2={390 + i * 20} stroke={colors.border} strokeWidth="0.5" />
            </g>
          ))}
        </>
      ))}
      {renderSectionOrReplacement('timelog', hiddenSections, colors, (
        <>
          <text x="425" y="580" fontSize="15" fill={colors.accent} textAnchor="middle" fontWeight="600">Prayer Time Log</text>
          {[0,1,2,3,4,5,6].map(i => <rect key={i} x={135 + i * 85} y="600" width="70" height="35" fill={colors.primary} stroke={colors.border} strokeWidth="1" rx="6" />)}
        </>
      ))}
      {renderSectionOrReplacement('reflections', hiddenSections, colors, (
        <>
          <text x="100" y="690" fontSize="15" fill={colors.accent} fontWeight="600">Today's Reflections</text>
          {[0,1,2,3].map(i => <line key={i} x1="100" y1={720 + i * 30} x2="730" y2={720 + i * 30} stroke={colors.border} strokeWidth="0.5" />)}
        </>
      ))}
    </g>
  );

  const renderParentingLayout = (colors, hiddenSections = []) => (
    <g>
      <text x="425" y="80" fontSize="32" fontWeight="600" fill={colors.text} textAnchor="middle">Family Planner</text>
      {renderSectionOrReplacement('schedule', hiddenSections, colors, (
        <>
          <rect x="100" y="120" width="300" height="250" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="15" />
          <text x="250" y="150" fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">Kids' Schedule</text>
          {['Morning', 'Afternoon', 'Evening', 'Bedtime'].map((time, i) => (
            <g key={i}>
              <text x="120" y={185 + i * 45} fontSize="12" fill={colors.text} fontWeight="600">{time}</text>
              <line x1="120" y1={195 + i * 45} x2="380" y2={195 + i * 45} stroke={colors.border} strokeWidth="1" />
            </g>
          ))}
        </>
      ))}
      {renderSectionOrReplacement('meals', hiddenSections, colors, (
        <>
          <rect x="450" y="120" width="280" height="250" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="15" />
          <text x="590" y="150" fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">Meal Planning</text>
          {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map((meal, i) => (
            <g key={i}>
              <circle cx="470" cy={182 + i * 50} r="6" fill={colors.accent} />
              <line x1="490" y1={195 + i * 50} x2="710" y2={195 + i * 50} stroke={colors.border} strokeWidth="1" />
            </g>
          ))}
        </>
      ))}
      {renderSectionOrReplacement('shopping', hiddenSections, colors, (
        <>
          <rect x="100" y="440" width="630" height="140" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="15" />
          <text x="425" y="470" fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">Shopping List</text>
          {[0,1,2,3,4,5].map(i => (
            <g key={i}>
              <rect x={120 + (i % 3) * 210} y={485 + Math.floor(i / 3) * 45} width="15" height="15" fill="none" stroke={colors.accent} strokeWidth="2" />
              <line x1={145 + (i % 3) * 210} y1={493 + Math.floor(i / 3) * 45} x2={310 + (i % 3) * 210} y2={493 + Math.floor(i / 3) * 45} stroke={colors.border} strokeWidth="1" />
            </g>
          ))}
        </>
      ))}
      {renderSectionOrReplacement('activities', hiddenSections, colors, (
        <>
          <rect x="100" y="620" width="630" height="100" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="15" />
          <text x="425" y="650" fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">Activities & Appointments</text>
          {[0,1,2].map(i => <line key={i} x1="120" y1={670 + i * 30} x2="710" y2={670 + i * 30} stroke={colors.border} strokeWidth="1" />)}
        </>
      ))}
      {renderSectionOrReplacement('gratitude', hiddenSections, colors, (
        <>
          <text x="425" y="780" fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">Today I'm Grateful For...</text>
          {[0,1].map(i => <line key={i} x1="150" y1={810 + i * 35} x2="700" y2={810 + i * 35} stroke={colors.border} strokeWidth="1" />)}
        </>
      ))}
    </g>
  );

  const renderMoneyLayout = (colors, hiddenSections = []) => (
    <g>
      <rect x="100" y="50" width="630" height="60" fill={colors.accent} rx="8" />
      <text x="425" y="90" fontSize="28" fontWeight="700" fill="white" textAnchor="middle">Financial Tracker</text>
      {renderSectionOrReplacement('income', hiddenSections, colors, (
        <>
          <rect x="100" y="140" width="300" height="180" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="10" />
          <text x="250" y="170" fontSize="15" fill={colors.accent} textAnchor="middle" fontWeight="700">INCOME</text>
          {['Salary', 'Side Hustle', 'Other', 'TOTAL'].map((item, i) => (
            <g key={i}>
              <text x="120" y={200 + i * 30} fontSize="11" fill={colors.text}>{item}</text>
              <line x1="220" y1={203 + i * 30} x2="380" y2={203 + i * 30} stroke={colors.border} strokeWidth="1" />
            </g>
          ))}
        </>
      ))}
      {renderSectionOrReplacement('expenses', hiddenSections, colors, (
        <>
          <rect x="430" y="140" width="300" height="180" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="10" />
          <text x="580" y="170" fontSize="15" fill={colors.accent} textAnchor="middle" fontWeight="700">EXPENSES</text>
          {['Housing', 'Food', 'Transport', 'Other', 'TOTAL'].map((item, i) => (
            <g key={i}>
              <text x="450" y={200 + i * 28} fontSize="11" fill={colors.text}>{item}</text>
              <line x1="560" y1={203 + i * 28} x2="710" y2={203 + i * 28} stroke={colors.border} strokeWidth="1" />
            </g>
          ))}
        </>
      ))}
      {renderSectionOrReplacement('savings', hiddenSections, colors, (
        <>
          <text x="425" y="360" fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">SAVINGS GOALS</text>
          {[0,1,2].map(i => (
            <g key={i}>
              <rect x={130 + i * 230} y="380" width="200" height="100" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="8" />
              <text x={230 + i * 230} y="410" fontSize="12" fill={colors.text} textAnchor="middle" fontWeight="600">Goal {i + 1}</text>
              <line x1={150 + i * 230} y1="430" x2={310 + i * 230} y2="430" stroke={colors.border} strokeWidth="1" />
            </g>
          ))}
        </>
      ))}
      {renderSectionOrReplacement('budget', hiddenSections, colors, (
        <>
          <rect x="100" y="530" width="630" height="140" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="10" />
          <text x="425" y="560" fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">BUDGET BREAKDOWN</text>
          {['Needs (50%)', 'Wants (30%)', 'Savings (20%)'].map((cat, i) => (
            <g key={i}>
              <rect x={140 + i * 210} y="575" width="180" height="35" fill="white" stroke={colors.accent} strokeWidth="2" rx="6" />
              <text x={230 + i * 210} y="598" fontSize="11" fill={colors.text} textAnchor="middle" fontWeight="600">{cat}</text>
            </g>
          ))}
        </>
      ))}
      {renderSectionOrReplacement('notes', hiddenSections, colors, (
        <>
          <text x="100" y="720" fontSize="16" fill={colors.accent} fontWeight="700">FINANCIAL NOTES</text>
          {[0,1,2,3].map(i => <line key={i} x1="100" y1={750 + i * 30} x2="730" y2={750 + i * 30} stroke={colors.border} strokeWidth="1" />)}
        </>
      ))}
    </g>
  );

  const renderProfessionalLayout = (colors, hiddenSections = []) => (
    <g>
      <rect x="80" y="50" width="690" height="70" fill={colors.accent} />
      <text x="425" y="95" fontSize="30" fontWeight="700" fill="white" textAnchor="middle">DAILY PLANNER</text>
      {renderSectionOrReplacement('schedule', hiddenSections, colors, (
        <>
          <text x="100" y="160" fontSize="14" fill={colors.accent} fontWeight="700">SCHEDULE</text>
          {['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM'].map((time, i) => (
            <g key={i}>
              <rect x="100" y={180 + i * 70} width="300" height="60" fill={colors.primary} stroke={colors.border} strokeWidth="1" />
              <text x="115" y={205 + i * 70} fontSize="12" fill={colors.text} fontWeight="600">{time}</text>
              <line x1="115" y1={215 + i * 70} x2="380" y2={215 + i * 70} stroke={colors.border} strokeWidth="0.5" />
            </g>
          ))}
        </>
      ))}
      {renderSectionOrReplacement('priorities', hiddenSections, colors, (
        <>
          <rect x="430" y="140" width="300" height="280" fill={colors.primary} stroke={colors.border} strokeWidth="2" />
          <text x="580" y="170" fontSize="14" fill={colors.accent} textAnchor="middle" fontWeight="700">PRIORITY TASKS</text>
          {[1,2,3,4,5,6,7].map(i => (
            <g key={i}>
              <rect x="450" y={185 + i * 35} width="20" height="20" fill="none" stroke={colors.accent} strokeWidth="2" />
              <line x1="480" y1={196 + i * 35} x2="710" y2={196 + i * 35} stroke={colors.border} strokeWidth="1" />
            </g>
          ))}
        </>
      ))}
      {renderSectionOrReplacement('goals', hiddenSections, colors, (
        <>
          <rect x="430" y="440" width="300" height="140" fill={colors.primary} stroke={colors.border} strokeWidth="2" />
          <text x="580" y="470" fontSize="14" fill={colors.accent} textAnchor="middle" fontWeight="700">GOALS</text>
          {['Today', 'This Week', 'This Month'].map((period, i) => (
            <g key={i}>
              <text x="450" y={500 + i * 30} fontSize="11" fill={colors.text} fontWeight="600">{period}:</text>
              <line x1="520" y1={502 + i * 30} x2="710" y2={502 + i * 30} stroke={colors.border} strokeWidth="1" />
            </g>
          ))}
        </>
      ))}
      {renderSectionOrReplacement('meetings', hiddenSections, colors, (
        <>
          <rect x="100" y="620" width="630" height="120" fill={colors.primary} stroke={colors.border} strokeWidth="2" />
          <text x="425" y="650" fontSize="14" fill={colors.accent} textAnchor="middle" fontWeight="700">MEETINGS</text>
          {[0,1,2].map(i => (
            <g key={i}>
              <text x="120" y={675 + i * 35} fontSize="11" fill={colors.text}>Time:</text>
              <line x1="165" y1={677 + i * 35} x2="260" y2={677 + i * 35} stroke={colors.border} strokeWidth="1" />
              <text x="280" y={675 + i * 35} fontSize="11" fill={colors.text}>Topic:</text>
              <line x1="330" y1={677 + i * 35} x2="710" y2={677 + i * 35} stroke={colors.border} strokeWidth="1" />
            </g>
          ))}
        </>
      ))}
      {renderSectionOrReplacement('actions', hiddenSections, colors, (
        <>
          <text x="425" y="790" fontSize="14" fill={colors.accent} textAnchor="middle" fontWeight="700">ACTION ITEMS</text>
          {[0,1].map(i => <line key={i} x1="120" y1={820 + i * 30} x2="710" y2={820 + i * 30} stroke={colors.border} strokeWidth="1" />)}
        </>
      ))}
    </g>
  );

  const renderCozyLayout = (colors, hiddenSections = []) => (
    <g>
      <ellipse cx="425" cy="80" rx="250" ry="50" fill={colors.primary} opacity="0.7" />
      <text x="425" y="90" fontSize="32" fontWeight="500" fill={colors.text} textAnchor="middle" fontFamily="Georgia">Cozy Day Planner</text>
      {renderSectionOrReplacement('morning', hiddenSections, colors, (
        <>
          <rect x="100" y="150" width="280" height="200" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="25" />
          <text x="240" y="185" fontSize="15" fill={colors.accent} textAnchor="middle" fontWeight="600">☀ Morning Routine</text>
          {['Wake up', 'Breakfast', 'Self-care', 'Start work'].map((item, i) => (
            <g key={i}>
              <circle cx="125" cy={212 + i * 35} r="5" fill={colors.accent} />
              <line x1="140" y1={215 + i * 35} x2="360" y2={215 + i * 35} stroke={colors.border} strokeWidth="1" />
            </g>
          ))}
        </>
      ))}
      {renderSectionOrReplacement('activities', hiddenSections, colors, (
        <>
          <rect x="420" y="150" width="310" height="200" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="25" />
          <text x="575" y="185" fontSize="15" fill={colors.accent} textAnchor="middle" fontWeight="600">✨ Cozy Activities</text>
          {['Reading time', 'Tea/Coffee break', 'Creative project', 'Relaxation'].map((item, i) => (
            <g key={i}>
              <rect x="440" y={200 + i * 40} width="270" height="30" fill="white" stroke={colors.border} strokeWidth="1" rx="15" />
              <text x="575" y={220 + i * 40} fontSize="11" fill={colors.text} textAnchor="middle">{item}</text>
            </g>
          ))}
        </>
      ))}
      {renderSectionOrReplacement('comfort', hiddenSections, colors, (
        <>
          <text x="425" y="400" fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="600">🏠 Comfort Check-In</text>
          {['Physical', 'Mental', 'Emotional', 'Environmental'].map((type, i) => (
            <rect key={i} x={115 + i * 150} y="420" width="130" height="100" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="20" />
          ))}
        </>
      ))}
      {renderSectionOrReplacement('nourishment', hiddenSections, colors, (
        <>
          <rect x="100" y="560" width="630" height="130" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="25" />
          <text x="425" y="590" fontSize="15" fill={colors.accent} textAnchor="middle" fontWeight="600">☕ Nourishment Tracker</text>
          <text x="150" y="625" fontSize="12" fill={colors.text} fontWeight="600">Water:</text>
          {[0,1,2,3,4,5,6,7].map(i => <circle key={i} cx={230 + i * 25} cy="620" r="8" fill="none" stroke={colors.accent} strokeWidth="2" />)}
        </>
      ))}
      {renderSectionOrReplacement('evening', hiddenSections, colors, (
        <>
          <rect x="100" y="730" width="630" height="140" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="25" />
          <text x="425" y="765" fontSize="15" fill={colors.accent} textAnchor="middle" fontWeight="600">🌙 Evening Wind Down</text>
          {[0,1,2,3].map(i => <line key={i} x1="150" y1={790 + i * 25} x2="700" y2={790 + i * 25} stroke={colors.border} strokeWidth="1" />)}
        </>
      ))}
    </g>
  );

  const renderSelfWellnessLayout = (colors, hiddenSections = []) => (
    <g>
      <text x="425" y="90" fontSize="30" fontWeight="400" fill={colors.text} textAnchor="middle" fontFamily="Georgia">Wellness Journey</text>
      {renderSectionOrReplacement('mind', hiddenSections, colors, (
        <>
          <rect x="100" y="130" width="200" height="240" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="15" />
          <text x="200" y="160" fontSize="14" fill={colors.accent} textAnchor="middle" fontWeight="700">🧠 MIND</text>
          {['Meditation', 'Journaling', 'Learning', 'Mindfulness'].map((item, i) => (
            <g key={i}>
              <circle cx="120" cy={187 + i * 45} r="8" fill="none" stroke={colors.accent} strokeWidth="2" />
              <text x="140" y={192 + i * 45} fontSize="11" fill={colors.text}>{item}</text>
            </g>
          ))}
        </>
      ))}
      {renderSectionOrReplacement('body', hiddenSections, colors, (
        <>
          <rect x="325" y="130" width="200" height="240" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="15" />
          <text x="425" y="160" fontSize="14" fill={colors.accent} textAnchor="middle" fontWeight="700">💪 BODY</text>
          {['Movement', 'Nutrition', 'Hydration', 'Rest'].map((item, i) => (
            <g key={i}>
              <circle cx="345" cy={187 + i * 45} r="8" fill="none" stroke={colors.accent} strokeWidth="2" />
              <text x="365" y={192 + i * 45} fontSize="11" fill={colors.text}>{item}</text>
            </g>
          ))}
        </>
      ))}
      {renderSectionOrReplacement('spirit', hiddenSections, colors, (
        <>
          <rect x="550" y="130" width="180" height="240" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="15" />
          <text x="640" y="160" fontSize="14" fill={colors.accent} textAnchor="middle" fontWeight="700">✨ SPIRIT</text>
          {['Gratitude', 'Connection', 'Joy', 'Purpose'].map((item, i) => (
            <g key={i}>
              <circle cx="570" cy={187 + i * 45} r="8" fill="none" stroke={colors.accent} strokeWidth="2" />
              <text x="590" y={192 + i * 45} fontSize="11" fill={colors.text}>{item}</text>
            </g>
          ))}
        </>
      ))}
      {renderSectionOrReplacement('energy', hiddenSections, colors, (
        <>
          <text x="425" y="420" fontSize="15" fill={colors.accent} textAnchor="middle" fontWeight="700">ENERGY LEVELS</text>
          <line x1="100" y1="500" x2="750" y2="500" stroke={colors.border} strokeWidth="1" />
        </>
      ))}
      {renderSectionOrReplacement('selfcare', hiddenSections, colors, (
        <>
          <text x="425" y="560" fontSize="15" fill={colors.accent} textAnchor="middle" fontWeight="700">SELF-CARE ACTIVITIES</text>
          <rect x="100" y="580" width="630" height="120" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="15" />
          {[0,1,2,3,4,5].map(i => (
            <rect key={i} x={120 + (i % 3) * 210} y={605 + Math.floor(i / 3) * 50} width="180" height="35" fill="white" stroke={colors.accent} strokeWidth="1" rx="8" />
          ))}
        </>
      ))}
      {renderSectionOrReplacement('reflections', hiddenSections, colors, (
        <>
          <text x="100" y="750" fontSize="15" fill={colors.accent} fontWeight="700">TODAY'S REFLECTIONS</text>
          {[0,1,2,3].map(i => <line key={i} x1="100" y1={780 + i * 28} x2="730" y2={780 + i * 28} stroke={colors.border} strokeWidth="1" />)}
        </>
      ))}
    </g>
  );

  const renderArtisticLayout = (colors, hiddenSections = []) => (
    <g>
      <ellipse cx="425" cy="80" rx="280" ry="60" fill={colors.primary} opacity="0.5" transform="rotate(-5 425 80)" />
      <text x="425" y="90" fontSize="34" fontWeight="700" fill={colors.text} textAnchor="middle" fontStyle="italic">Creative Journal</text>
      {renderSectionOrReplacement('prompts', hiddenSections, colors, (
        <>
          <text x="100" y="150" fontSize="16" fill={colors.accent} fontWeight="700">CREATIVE PROMPTS</text>
          {[0,1,2,3,4].map(i => {
            const angle = (i * 72 - 90) * Math.PI / 180;
            const cx = 250 + 100 * Math.cos(angle);
            const cy = 280 + 100 * Math.sin(angle);
            return <circle key={i} cx={cx} cy={cy} r="45" fill={colors.primary} stroke={colors.accent} strokeWidth="3" />;
          })}
        </>
      ))}
      {renderSectionOrReplacement('sketch', hiddenSections, colors, (
        <>
          <rect x="100" y="450" width="630" height="220" fill={colors.primary} stroke={colors.accent} strokeWidth="3" rx="8" />
          <text x="425" y="485" fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">DAILY SKETCH SPACE</text>
        </>
      ))}
      {renderSectionOrReplacement('colormood', hiddenSections, colors, (
        <>
          <text x="425" y="730" fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">COLOR MOOD</text>
          {['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Pink'].map((color, i) => (
            <circle key={i} cx={165 + i * 85} cy="770" r="25" fill={colors.primary} stroke={colors.accent} strokeWidth="2" />
          ))}
        </>
      ))}
      {renderSectionOrReplacement('notes', hiddenSections, colors, (
        <>
          <text x="100" y="860" fontSize="16" fill={colors.accent} fontWeight="700">CREATIVE NOTES</text>
          <line x1="100" y1="870" x2="730" y2="875" stroke={colors.accent} strokeWidth="2" opacity="0.6" />
        </>
      ))}
    </g>
  );

  const renderWhimsicalLayout = (colors, hiddenSections = []) => (
    <g>
      <text x="425" y="90" fontSize="36" fontWeight="600" fill={colors.text} textAnchor="middle" fontFamily="cursive">Dream Diary</text>
      {renderSectionOrReplacement('dreams', hiddenSections, colors, (
        <>
          <ellipse cx="250" cy="200" rx="170" ry="110" fill={colors.primary} stroke={colors.accent} strokeWidth="2" />
          <text x="250" y="190" fontSize="15" fill={colors.accent} textAnchor="middle" fontWeight="700">✨ Dreams</text>
          {[0,1,2].map(i => <line key={i} x1="150" y1={210 + i * 25} x2="350" y2={210 + i * 25} stroke={colors.border} strokeWidth="1" />)}
        </>
      ))}
      {renderSectionOrReplacement('wishes', hiddenSections, colors, (
        <>
          <ellipse cx="600" cy="200" rx="170" ry="110" fill={colors.primary} stroke={colors.accent} strokeWidth="2" />
          <text x="600" y="190" fontSize="15" fill={colors.accent} textAnchor="middle" fontWeight="700">🌙 Wishes</text>
          {[0,1,2].map(i => <line key={i} x1="500" y1={210 + i * 25} x2="700" y2={210 + i * 25} stroke={colors.border} strokeWidth="1" />)}
        </>
      ))}
      {renderSectionOrReplacement('magic', hiddenSections, colors, (
        <>
          <text x="425" y="370" fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">✨ Daily Magic Moments</text>
          {[0,1,2,3,4,5,6].map(i => <circle key={i} cx={150 + i * 85} cy="425" r="20" fill={colors.primary} stroke={colors.accent} strokeWidth="2" />)}
        </>
      ))}
      {renderSectionOrReplacement('story', hiddenSections, colors, (
        <>
          <rect x="120" y="500" width="610" height="220" fill={colors.primary} stroke={colors.accent} strokeWidth="2" rx="15" />
          <text x="425" y="535" fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">🦋 Today's Story</text>
          {[0,1,2,3,4,5].map(i => <line key={i} x1="150" y1={565 + i * 25} x2="700" y2={565 + i * 25} stroke={colors.border} strokeWidth="1" />)}
        </>
      ))}
      {renderSectionOrReplacement('rainbow', hiddenSections, colors, (
        <>
          <text x="425" y="780" fontSize="16" fill={colors.accent} textAnchor="middle" fontWeight="700">🌈 Mood Rainbow</text>
          {[0,1,2,3,4,5,6].map(i => <circle key={i} cx={240 + i * 65} cy="840" r="15" fill={colors.primary} stroke={colors.accent} strokeWidth="2" />)}
        </>
      ))}
    </g>
  );

  const renderLuxuryLayout = (colors, hiddenSections = []) => (
    <g>
      <rect x="80" y="40" width="690" height="820" fill="none" stroke={colors.accent} strokeWidth="4" />
      <rect x="90" y="50" width="670" height="800" fill="none" stroke={colors.accent} strokeWidth="1" />
      <text x="425" y="110" fontSize="40" fontWeight="700" fill={colors.accent} textAnchor="middle" fontFamily="serif">PLANNER</text>
      <line x1="200" y1="130" x2="650" y2="130" stroke={colors.accent} strokeWidth="2" />
      {renderSectionOrReplacement('priorities', hiddenSections, colors, (
        <>
          <text x="120" y="180" fontSize="14" fill={colors.accent} fontWeight="700" letterSpacing="2">PRIORITIES</text>
          {[1,2,3,4,5].map(i => (
            <g key={i}>
              <rect x="120" y={195 + i * 45} width="610" height="35" fill={colors.primary} stroke={colors.accent} strokeWidth="1" />
              <text x="140" y={218 + i * 45} fontSize="18" fill={colors.accent} fontWeight="700">{i}</text>
              <line x1="170" y1={213 + i * 45} x2="710" y2={213 + i * 45} stroke={colors.border} strokeWidth="1" />
            </g>
          ))}
        </>
      ))}
      {renderSectionOrReplacement('schedule', hiddenSections, colors, (
        <>
          <text x="120" y="480" fontSize="14" fill={colors.accent} fontWeight="700" letterSpacing="2">SCHEDULE</text>
          {['MORNING', 'AFTERNOON', 'EVENING'].map((period, i) => (
            <g key={i}>
              <rect x="120" y={500 + i * 90} width="610" height="80" fill={colors.primary} stroke={colors.accent} strokeWidth="2" />
              <text x="425" y={530 + i * 90} fontSize="12" fill={colors.accent} textAnchor="middle" fontWeight="700" letterSpacing="3">{period}</text>
              <line x1="140" y1={545 + i * 90} x2="710" y2={545 + i * 90} stroke={colors.border} strokeWidth="0.5" />
            </g>
          ))}
        </>
      ))}
      {renderSectionOrReplacement('notes', hiddenSections, colors, (
        <>
          <rect x="120" y="780" width="610" height="70" fill={colors.primary} stroke={colors.accent} strokeWidth="2" />
          <text x="425" y="805" fontSize="12" fill={colors.accent} textAnchor="middle" fontWeight="700" letterSpacing="3">NOTES</text>
          {[0,1].map(i => <line key={i} x1="140" y1={820 + i * 15} x2="710" y2={820 + i * 15} stroke={colors.accent} strokeWidth="0.5" />)}
        </>
      ))}
    </g>
  );

  const renderElegantLayout = (colors, hiddenSections = []) => (
    <g>
      <text x="425" y="80" fontSize="32" fontWeight="400" fill={colors.text} textAnchor="middle" fontFamily="Georgia">Daily Planner</text>
      <line x1="250" y1="95" x2="600" y2="95" stroke={colors.accent} strokeWidth="1" />
      {renderSectionOrReplacement('morning', hiddenSections, colors, (
        <>
          <rect x="100" y="140" width="630" height="150" fill={colors.primary} stroke={colors.border} strokeWidth="1" rx="3" />
          <text x="425" y="165" fontSize="14" fill={colors.accent} textAnchor="middle" fontFamily="Georgia">Morning</text>
          {[0,1,2,3].map(i => <line key={i} x1="120" y1={195 + i * 25} x2="710" y2={195 + i * 25} stroke={colors.border} strokeWidth="0.5" />)}
        </>
      ))}
      {renderSectionOrReplacement('afternoon', hiddenSections, colors, (
        <>
          <rect x="100" y="310" width="630" height="150" fill={colors.primary} stroke={colors.border} strokeWidth="1" rx="3" />
          <text x="425" y="335" fontSize="14" fill={colors.accent} textAnchor="middle" fontFamily="Georgia">Afternoon</text>
          {[0,1,2,3].map(i => <line key={i} x1="120" y1={365 + i * 25} x2="710" y2={365 + i * 25} stroke={colors.border} strokeWidth="0.5" />)}
        </>
      ))}
      {renderSectionOrReplacement('evening', hiddenSections, colors, (
        <>
          <rect x="100" y="480" width="630" height="150" fill={colors.primary} stroke={colors.border} strokeWidth="1" rx="3" />
          <text x="425" y="505" fontSize="14" fill={colors.accent} textAnchor="middle" fontFamily="Georgia">Evening</text>
          {[0,1,2,3].map(i => <line key={i} x1="120" y1={535 + i * 25} x2="710" y2={535 + i * 25} stroke={colors.border} strokeWidth="0.5" />)}
        </>
      ))}
      {renderSectionOrReplacement('tasks', hiddenSections, colors, (
        <>
          <rect x="100" y="650" width="300" height="140" fill={colors.primary} stroke={colors.border} strokeWidth="1" rx="3" />
          <text x="250" y="675" fontSize="14" fill={colors.accent} textAnchor="middle" fontFamily="Georgia">Important Tasks</text>
          {[0,1,2,3,4,5].map(i => (
            <g key={i}>
              <circle cx="120" cy={700 + i * 22} r="4" fill="none" stroke={colors.accent} strokeWidth="1" />
              <line x1="135" y1={700 + i * 22} x2="380" y2={700 + i * 22} stroke={colors.border} strokeWidth="0.5" />
            </g>
          ))}
        </>
      ))}
      {renderSectionOrReplacement('notes', hiddenSections, colors, (
        <>
          <rect x="420" y="650" width="310" height="140" fill={colors.primary} stroke={colors.border} strokeWidth="1" rx="3" />
          <text x="575" y="675" fontSize="14" fill={colors.accent} textAnchor="middle" fontFamily="Georgia">Notes</text>
          {[0,1,2,3,4,5,6].map(i => <line key={i} x1="440" y1={700 + i * 20} x2="710" y2={700 + i * 20} stroke={colors.border} strokeWidth="0.5" />)}
        </>
      ))}
      {renderSectionOrReplacement('reflection', hiddenSections, colors, (
        <text x="425" y="840" fontSize="13" fill={colors.accent} textAnchor="middle" fontFamily="Georgia" fontStyle="italic">"Today's Reflection"</text>
      ))}
    </g>
  );

  const renderJournalLayout = (colors, hiddenSections = []) => (
    <g>
      <text x="425" y="70" fontSize="28" fontWeight="400" fill={colors.text} textAnchor="middle" fontFamily="Georgia">Journal</text>
      <line x1="300" y1="85" x2="550" y2="85" stroke={colors.accent} strokeWidth="1" />
      {renderSectionOrReplacement('lines', hiddenSections, colors, (
        <>
          {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].map(i => (
            <line key={i} x1="100" y1={160 + i * 24} x2="750" y2={160 + i * 24} stroke={colors.border} strokeWidth="1" opacity="0.6" />
          ))}
        </>
      ))}
      {renderSectionOrReplacement('margin', hiddenSections, colors, (
        <line x1="130" y1="160" x2="130" y2="880" stroke={colors.accent} strokeWidth="1" opacity="0.3" />
      ))}
    </g>
  );

  const renderDreamJournalLayout = (colors, hiddenSections = []) => (
    <g>
      <text x="425" y="70" fontSize="32" fontWeight="500" fill={colors.text} textAnchor="middle" fontFamily="Georgia">Dream Journal</text>
      {renderSectionOrReplacement('sleepinfo', hiddenSections, colors, (
        <>
          <rect x="100" y="110" width="630" height="50" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="10" />
          <text x="120" y="135" fontSize="12" fill={colors.text}>Date: ___________</text>
          <text x="300" y="135" fontSize="12" fill={colors.text}>Bedtime: ___________</text>
          <text x="500" y="135" fontSize="12" fill={colors.text}>Wake: ___________</text>
        </>
      ))}
      {renderSectionOrReplacement('description', hiddenSections, colors, (
        <>
          <rect x="100" y="180" width="630" height="200" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="10" />
          <text x="425" y="205" fontSize="14" fill={colors.accent} textAnchor="middle" fontWeight="700">🌙 DREAM DESCRIPTION</text>
          {[0,1,2,3,4,5,6,7,8,9].map(i => <line key={i} x1="120" y1={225 + i * 15} x2="710" y2={225 + i * 15} stroke={colors.border} strokeWidth="0.5" />)}
        </>
      ))}
      {renderSectionOrReplacement('elements', hiddenSections, colors, (
        <>
          <rect x="100" y="400" width="300" height="140" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="10" />
          <text x="250" y="425" fontSize="13" fill={colors.accent} textAnchor="middle" fontWeight="700">KEY ELEMENTS</text>
          {['People', 'Places', 'Objects', 'Emotions'].map((item, i) => (
            <g key={i}>
              <text x="120" y={450 + i * 22} fontSize="10" fill={colors.text} fontWeight="600">{item}:</text>
              <line x1="180" y1={452 + i * 22} x2="380" y2={452 + i * 22} stroke={colors.border} strokeWidth="0.5" />
            </g>
          ))}
        </>
      ))}
      {renderSectionOrReplacement('mood', hiddenSections, colors, (
        <>
          <rect x="430" y="400" width="300" height="140" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="10" />
          <text x="580" y="425" fontSize="13" fill={colors.accent} textAnchor="middle" fontWeight="700">DREAM MOOD</text>
          {['Happy', 'Calm', 'Confused', 'Scary', 'Exciting'].map((mood, i) => (
            <g key={i}>
              <circle cx="460" cy={447 + i * 20} r="6" fill="none" stroke={colors.accent} strokeWidth="1.5" />
              <text x="480" y={452 + i * 20} fontSize="10" fill={colors.text}>{mood}</text>
            </g>
          ))}
        </>
      ))}
      {renderSectionOrReplacement('symbols', hiddenSections, colors, (
        <>
          <rect x="100" y="560" width="630" height="100" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="10" />
          <text x="425" y="585" fontSize="13" fill={colors.accent} textAnchor="middle" fontWeight="700">SYMBOLS & MEANINGS</text>
          {[0,1,2].map(i => <line key={i} x1="120" y1={600 + i * 20} x2="710" y2={600 + i * 20} stroke={colors.border} strokeWidth="0.5" />)}
        </>
      ))}
      {renderSectionOrReplacement('interpretation', hiddenSections, colors, (
        <>
          <rect x="100" y="680" width="630" height="100" fill={colors.primary} stroke={colors.border} strokeWidth="2" rx="10" />
          <text x="425" y="705" fontSize="13" fill={colors.accent} textAnchor="middle" fontWeight="700">MY INTERPRETATION</text>
          {[0,1,2,3].map(i => <line key={i} x1="120" y1={720 + i * 18} x2="710" y2={720 + i * 18} stroke={colors.border} strokeWidth="0.5" />)}
        </>
      ))}
      {renderSectionOrReplacement('recurring', hiddenSections, colors, (
        <text x="425" y="815" fontSize="12" fill={colors.accent} textAnchor="middle" fontWeight="700">Recurring theme? ☐ Yes  ☐ No</text>
      ))}
    </g>
  );

  const renderKidsChoresLayout = (colors, hiddenSections = []) => (
    <g>
      {renderSectionOrReplacement('header', hiddenSections, colors, (
        <>
          <rect x="80" y="40" width="690" height="80" fill={colors.accent} rx="15" />
          <text x="425" y="75" fontSize="36" fontWeight="700" fill="white" textAnchor="middle">⭐ MY CHORE CHART ⭐</text>
          <text x="425" y="105" fontSize="16" fontWeight="600" fill="white" textAnchor="middle">Name: _______________</text>
        </>
      ))}
      {renderSectionOrReplacement('petcare', hiddenSections, colors, (
        <>
          <rect x="100" y="150" width="300" height="180" fill={colors.primary} stroke={colors.border} strokeWidth="3" rx="15" />
          <text x="250" y="180" fontSize="18" fill={colors.accent} textAnchor="middle" fontWeight="700">🐾 PET CARE</text>
          {['Feed pets', 'Water bowl', 'Walk dog', 'Clean cage'].map((task, i) => (
            <g key={i}>
              <circle cx="120" cy={207 + i * 35} r="10" fill="none" stroke={colors.accent} strokeWidth="3" />
              <text x="145" y={213 + i * 35} fontSize="14" fill={colors.text} fontWeight="600">{task}</text>
            </g>
          ))}
        </>
      ))}
      {renderSectionOrReplacement('homework', hiddenSections, colors, (
        <>
          <rect x="430" y="150" width="300" height="180" fill={colors.primary} stroke={colors.border} strokeWidth="3" rx="15" />
          <text x="580" y="180" fontSize="18" fill={colors.accent} textAnchor="middle" fontWeight="700">📚 HOMEWORK</text>
          {['Reading', 'Math', 'Writing', 'Study time'].map((task, i) => (
            <g key={i}>
              <circle cx="450" cy={207 + i * 35} r="10" fill="none" stroke={colors.accent} strokeWidth="3" />
              <text x="475" y={213 + i * 35} fontSize="14" fill={colors.text} fontWeight="600">{task}</text>
            </g>
          ))}
        </>
      ))}
      {renderSectionOrReplacement('hygiene', hiddenSections, colors, (
        <>
          <rect x="100" y="360" width="300" height="180" fill={colors.primary} stroke={colors.border} strokeWidth="3" rx="15" />
          <text x="250" y="390" fontSize="18" fill={colors.accent} textAnchor="middle" fontWeight="700">🛁 HYGIENE</text>
          {['Brush teeth AM', 'Brush teeth PM', 'Shower/Bath', 'Wash hands'].map((task, i) => (
            <g key={i}>
              <circle cx="120" cy={417 + i * 35} r="10" fill="none" stroke={colors.accent} strokeWidth="3" />
              <text x="145" y={423 + i * 35} fontSize="14" fill={colors.text} fontWeight="600">{task}</text>
            </g>
          ))}
        </>
      ))}
      {renderSectionOrReplacement('cleaning', hiddenSections, colors, (
        <>
          <rect x="430" y="360" width="300" height="180" fill={colors.primary} stroke={colors.border} strokeWidth="3" rx="15" />
          <text x="580" y="390" fontSize="18" fill={colors.accent} textAnchor="middle" fontWeight="700">🧹 CLEANING</text>
          {['Make bed', 'Clean room', 'Put away toys', 'Help dishes'].map((task, i) => (
            <g key={i}>
              <circle cx="450" cy={417 + i * 35} r="10" fill="none" stroke={colors.accent} strokeWidth="3" />
              <text x="475" y={423 + i * 35} fontSize="14" fill={colors.text} fontWeight="600">{task}</text>
            </g>
          ))}
        </>
      ))}
      {renderSectionOrReplacement('tracker', hiddenSections, colors, (
        <>
          <rect x="100" y="570" width="630" height="140" fill={colors.primary} stroke={colors.border} strokeWidth="3" rx="15" />
          <text x="425" y="600" fontSize="18" fill={colors.accent} textAnchor="middle" fontWeight="700">📅 WEEKLY TRACKER</text>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
            <g key={i}>
              <rect x={120 + i * 85} y="620" width="75" height="70" fill="white" stroke={colors.accent} strokeWidth="2" rx="10" />
              <text x={157.5 + i * 85} y="645" fontSize="14" fill={colors.text} textAnchor="middle" fontWeight="700">{day}</text>
              <line x1={135 + i * 85} y1="665" x2={180 + i * 85} y2="665" stroke={colors.border} strokeWidth="2" />
            </g>
          ))}
        </>
      ))}
      {renderSectionOrReplacement('rewards', hiddenSections, colors, (
        <>
          <rect x="100" y="740" width="630" height="140" fill={colors.accent} stroke={colors.border} strokeWidth="3" rx="15" />
          <text x="425" y="770" fontSize="20" fill="white" textAnchor="middle" fontWeight="700">🎁 REWARDS & GOALS 🎁</text>
          <rect x="120" y="785" width="280" height="75" fill="white" stroke={colors.border} strokeWidth="2" rx="10" />
          <text x="260" y="810" fontSize="14" fill={colors.text} textAnchor="middle" fontWeight="600">Goal for this week:</text>
          <line x1="140" y1="830" x2="380" y2="830" stroke={colors.border} strokeWidth="2" />
          <rect x="430" y="785" width="280" height="75" fill="white" stroke={colors.border} strokeWidth="2" rx="10" />
          <text x="570" y="810" fontSize="14" fill={colors.text} textAnchor="middle" fontWeight="600">Reward when done:</text>
          <line x1="450" y1="830" x2="690" y2="830" stroke={colors.border} strokeWidth="2" />
        </>
      ))}
    </g>
  );

  const renderPattern = (patternType, colors) => {
    if (patternType === 'none') return null;
    return (
      <defs>
        {patternType === 'zebra' && (
          <pattern id="zebraPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill={colors.background} />
            <path d="M0,0 Q10,20 0,40" fill="none" stroke="#000" strokeWidth="8" opacity="0.1" />
            <path d="M20,0 Q30,20 20,40" fill="none" stroke="#000" strokeWidth="8" opacity="0.1" />
          </pattern>
        )}
        {patternType === 'leopard' && (
          <pattern id="leopardPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <rect width="60" height="60" fill={colors.background} />
            <ellipse cx="15" cy="15" rx="8" ry="6" fill="none" stroke="#000" strokeWidth="2" opacity="0.15" />
            <ellipse cx="45" cy="40" rx="7" ry="5" fill="none" stroke="#000" strokeWidth="2" opacity="0.15" />
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
    const map = { zebra: 'url(#zebraPattern)', leopard: 'url(#leopardPattern)', stars: 'url(#starsPattern)', hearts: 'url(#heartsPattern)', polkadot: 'url(#polkadotPattern)' };
    return map[patternType] || null;
  };

  const getActiveColors = () => {
    const baseColors = templates[selectedTemplate];
    if (!customColors) return baseColors;
    return { ...baseColors, accent: customColors.accent || baseColors.accent, border: customColors.border || baseColors.border, text: customColors.text || baseColors.text };
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
    } catch (e) {
      alert('SVG download failed');
    }
  };

  const downloadPNG = () => {
    try {
      const svg = document.getElementById('template-svg');
      if (!svg) return alert('Not found');
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      const scale = 3;
      canvas.width = 850 * scale;
      canvas.height = parseInt(svg.getAttribute('height')) * scale;
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      img.onload = () => {
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        canvas.toBlob((blob) => {
          const pngUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = pngUrl;
          link.download = `${selectedTemplate}-planner.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(pngUrl);
        });
      };
      img.src = url;
    } catch (e) {
      alert('PNG download failed');
    }
  };

  const downloadA4 = () => {
    try {
      const svg = document.getElementById('template-svg');
      if (!svg) return alert('Not found');
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgHeight = parseInt(svg.getAttribute('height'));
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      const pdfWidth = 2480;
      const pdfHeight = 3508;
      canvas.width = pdfWidth;
      canvas.height = pdfHeight;
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      img.onload = () => {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, pdfWidth, pdfHeight);
        const scale = Math.min(pdfWidth / 850, pdfHeight / svgHeight);
        const offsetX = (pdfWidth - 850 * scale) / 2;
        const offsetY = (pdfHeight - svgHeight * scale) / 2;
        ctx.save();
        ctx.translate(offsetX, offsetY);
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0);
        ctx.restore();
        URL.revokeObjectURL(url);
        canvas.toBlob((blob) => {
          const pngUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = pngUrl;
          link.download = `${selectedTemplate}-planner-A4.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(pngUrl);
          alert('✅ Downloaded! In Canva: New design → A4 → Upload → drag to fit page.');
        }, 'image/png');
      };
      img.src = url;
    } catch (e) {
      alert('A4 download failed');
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
          <p className="text-center text-gray-600 mb-6">Enter your access code</p>
          <input
            type="text"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Access Code"
            className="w-full px-4 py-3 border-2 rounded-lg mb-4"
          />
          <button onClick={handleLogin} className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold">
            Enter
          </button>
          <p className="text-xs text-center text-gray-500 mt-4">Code: PLAN2024</p>
        </div>
      </div>
    );
  }

  const template = templates[selectedTemplate];
  const totalHeight = 900 + selectedSections.reduce((total, key) => total + (optionalSections[key]?.height || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Planner Generator</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Controls Panel */}
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-bold mb-4">Choose Template</h2>

            <div>
              <label className="block text-sm font-semibold mb-2">Template Style</label>
              <select value={selectedTemplate} onChange={(e) => { setSelectedTemplate(e.target.value); setHiddenSections([]); }} className="w-full p-2 border-2 rounded-lg">
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

            <div>
              <label className="block text-sm font-semibold mb-2">Font Style</label>
              <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} className="w-full p-2 border-2 rounded-lg">
                {Object.entries(fontOptions).map(([key, font]) => (
                  <option key={key} value={key}>{font.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Custom Colors</label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-xs w-20">Accent:</label>
                  <input type="color" value={customColors?.accent || template.accent} onChange={(e) => setCustomColors({...customColors, accent: e.target.value})} className="w-12 h-8 border-2 rounded cursor-pointer" />
                  <button onClick={() => setCustomColors(null)} className="text-xs text-gray-500 hover:text-gray-700">Reset</button>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs w-20">Border:</label>
                  <input type="color" value={customColors?.border || template.border} onChange={(e) => setCustomColors({...customColors, border: e.target.value})} className="w-12 h-8 border-2 rounded cursor-pointer" />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs w-20">Text:</label>
                  <input type="color" value={customColors?.text || template.text} onChange={(e) => setCustomColors({...customColors, text: e.target.value})} className="w-12 h-8 border-2 rounded cursor-pointer" />
                </div>
              </div>
            </div>

            {templateSections[selectedTemplate] && (
              <div>
                <label className="block text-sm font-semibold mb-2">Toggle Sections</label>
                <div className="space-y-2 max-h-48 overflow-y-auto border-2 rounded-lg p-3">
                  {templateSections[selectedTemplate].map((section) => (
                    <label key={section.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!hiddenSections.includes(section.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setHiddenSections(hiddenSections.filter(s => s !== section.id));
                          } else {
                            setHiddenSections([...hiddenSections, section.id]);
                          }
                        }}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{section.name}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">Uncheck to hide sections.</p>
              </div>
            )}

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
              <p className="text-xs text-gray-500 mt-2">Sections appear at the bottom of your template.</p>
            </div>

            <div className="space-y-2">
              <button onClick={downloadSVG} className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                <Download className="w-5 h-5" /> Download SVG
              </button>
              <button onClick={downloadPNG} className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                <Download className="w-5 h-5" /> Download PNG
              </button>
              <button onClick={downloadA4} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                <Download className="w-5 h-5" /> Download A4 for Canva
              </button>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded text-xs">
              <p className="font-semibold mb-1 text-yellow-800">📌 Canva Instructions:</p>
              <ol className="text-yellow-700 space-y-1 list-decimal list-inside">
                <li>Download A4 PNG</li>
                <li>Open Canva → New design → A4</li>
                <li>Upload the PNG → drag to page</li>
                <li>Add text boxes on top to fill in!</li>
              </ol>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 overflow-auto">
            <h2 className="text-xl font-bold mb-4">Preview</h2>
            <svg id="template-svg" width="850" height={totalHeight} viewBox={`0 0 850 ${totalHeight}`}>
              {renderPattern(pattern, template)}
              <rect width="850" height={totalHeight} fill={getPatternFill(pattern) || template.background} />
              <text x="750" y="30" fontSize="11" fill="#888">Date: _____</text>

              <g fontFamily={fontOptions[fontFamily].family}>
                {selectedTemplate === 'minimalist' && renderMinimalistLayout(getActiveColors(), hiddenSections)}
                {selectedTemplate === 'boho' && renderBohoLayout(getActiveColors(), hiddenSections)}
                {selectedTemplate === 'funky' && renderFunkyLayout(getActiveColors(), hiddenSections)}
                {selectedTemplate === 'zen' && renderZenLayout(getActiveColors(), hiddenSections)}
                {selectedTemplate === 'prayer' && renderPrayerLayout(getActiveColors(), hiddenSections)}
                {selectedTemplate === 'parenting' && renderParentingLayout(getActiveColors(), hiddenSections)}
                {selectedTemplate === 'money' && renderMoneyLayout(getActiveColors(), hiddenSections)}
                {selectedTemplate === 'professional' && renderProfessionalLayout(getActiveColors(), hiddenSections)}
                {selectedTemplate === 'cozy' && renderCozyLayout(getActiveColors(), hiddenSections)}
                {selectedTemplate === 'selfWellness' && renderSelfWellnessLayout(getActiveColors(), hiddenSections)}
                {selectedTemplate === 'artistic' && renderArtisticLayout(getActiveColors(), hiddenSections)}
                {selectedTemplate === 'whimsical' && renderWhimsicalLayout(getActiveColors(), hiddenSections)}
                {selectedTemplate === 'luxury' && renderLuxuryLayout(getActiveColors(), hiddenSections)}
                {selectedTemplate === 'elegant' && renderElegantLayout(getActiveColors(), hiddenSections)}
                {selectedTemplate === 'journal' && renderJournalLayout(getActiveColors(), hiddenSections)}
                {selectedTemplate === 'dreamJournal' && renderDreamJournalLayout(getActiveColors(), hiddenSections)}
                {selectedTemplate === 'kidsChores' && renderKidsChoresLayout(getActiveColors(), hiddenSections)}
              </g>

              {selectedSections.map((sectionKey, index) => {
                const yOffset = 900 + selectedSections.slice(0, index).reduce((total, key) => total + (optionalSections[key]?.height || 0), 0);
                return <g key={sectionKey}>{optionalSections[sectionKey].render(getActiveColors(), yOffset)}</g>;
              })}
            </svg>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PlannerGenerator;
