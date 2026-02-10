import React, { useState, useRef } from 'react';
import { Download, Lock } from 'lucide-react';

/* ─── TEMPLATES ─────────────────────────────────────────────────────────── */
const TEMPLATES = {
  minimalist:   { name:'Minimalist',    bg:'#FFFFFF', primary:'#F5F5F5', accent:'#555555', border:'#CCCCCC', text:'#333333', head:'#EEEEEE' },
  boho:         { name:'Boho',          bg:'#FFF8F0', primary:'#F4E4D7', accent:'#A67C52', border:'#D4C4B0', text:'#5C4033', head:'#F0DDD0' },
  funky:        { name:'Funky',         bg:'#FFF9E6', primary:'#FFE5B4', accent:'#FF6B9D', border:'#FFB84D', text:'#2D1B4E', head:'#FFE5B4' },
  zen:          { name:'Zen',           bg:'#F7F9F9', primary:'#E8EEEE', accent:'#6B7F7F', border:'#C2D1D1', text:'#3A4848', head:'#DDE6E6' },
  prayer:       { name:'Prayer',        bg:'#F3F0FF', primary:'#E6DEFF', accent:'#7C3AED', border:'#C4B5FD', text:'#5B21B6', head:'#D9D0FF' },
  parenting:    { name:'Parenting',     bg:'#FFF5E6', primary:'#FFE8CC', accent:'#FF8C42', border:'#FFD4A3', text:'#8B4513', head:'#FFD4A3' },
  money:        { name:'Money',         bg:'#F0F8F0', primary:'#D4EDDA', accent:'#28A745', border:'#A8D5BA', text:'#155724', head:'#C3E6CB' },
  professional: { name:'Professional',  bg:'#F8F9FA', primary:'#E9ECEF', accent:'#2C5F8D', border:'#CED4DA', text:'#212529', head:'#DEE2E6' },
  cozy:         { name:'Cozy',          bg:'#FFF9F5', primary:'#FFE4D6', accent:'#D4885C', border:'#E8C4A8', text:'#5D3A1A', head:'#FFD4BD' },
  selfWellness: { name:'Self Wellness', bg:'#F5FFFA', primary:'#E0F7F4', accent:'#20B2AA', border:'#B0E5DF', text:'#2F4F4F', head:'#C5EDE9' },
  artistic:     { name:'Artistic',      bg:'#FFFBF5', primary:'#FFE5D9', accent:'#E63946', border:'#FFCDB2', text:'#1D3557', head:'#FFD4C0' },
  whimsical:    { name:'Whimsical',     bg:'#FFF8FC', primary:'#F8E8FF', accent:'#C77DFF', border:'#E0AAFF', text:'#5A189A', head:'#EDD5FF' },
  luxury:       { name:'Luxury',        bg:'#1A1A1A', primary:'#2D2D2D', accent:'#D4AF37', border:'#8B7300', text:'#F5F5F5', head:'#333300' },
  elegant:      { name:'Elegant',       bg:'#FEFEFE', primary:'#F8F6F4', accent:'#8B7355', border:'#D4C4B0', text:'#2C2416', head:'#EDE8E0' },
  journal:      { name:'Journal',       bg:'#FFFFF8', primary:'#FFF9E6', accent:'#8B7355', border:'#D4C4B0', text:'#2C2416', head:'#FFF0CC' },
  dreamJournal: { name:'Dream Journal', bg:'#F5F3FF', primary:'#EDE9FE', accent:'#7C3AED', border:'#C4B5FD', text:'#5B21B6', head:'#DDD6FE' },
  kidsChores:   { name:'Kids Chores',   bg:'#FFF9E6', primary:'#FFE5CC', accent:'#FF9500', border:'#FFD4A3', text:'#8B4513', head:'#FFD4A3' },
};

/* ─── STYLE HELPERS ──────────────────────────────────────────────────────── */
const S = {
  box:   (c,extra={}) => ({ background:c.primary, border:`2px solid ${c.border}`, borderRadius:12, padding:'14px 16px', marginBottom:14, ...extra }),
  title: (c,sz=13)    => ({ color:c.accent, fontWeight:700, fontSize:sz, marginBottom:10, textTransform:'uppercase', letterSpacing:1 }),
  label: (c)          => ({ fontSize:11, color:c.text, fontWeight:600, marginBottom:4, display:'block' }),
  line:  (c,mb=8)     => ({ borderBottom:`1px solid ${c.border}`, marginBottom:mb, minHeight:22 }),
  check: (c)          => ({ display:'flex', alignItems:'center', gap:8, marginBottom:8, fontSize:11, color:c.text }),
  circle:(c,sz=28)    => ({ width:sz, height:sz, borderRadius:'50%', border:`2px solid ${c.accent}`, display:'inline-flex', alignItems:'center', justifyContent:'center', flexShrink:0 }),
};

/* ─── REUSABLE COMPONENTS ────────────────────────────────────────────────── */
const Lines = ({c,n=5,label=''}) => (
  <div>
    {label && <div style={S.label(c)}>{label}</div>}
    {Array.from({length:n}).map((_,i)=><div key={i} style={S.line(c)} />)}
  </div>
);

const CheckList = ({c,items,days=false}) => (
  <div>
    {items.map((item,i)=>(
      <div key={i} style={S.check(c)}>
        <div style={{width:14,height:14,border:`2px solid ${c.accent}`,borderRadius:3,flexShrink:0}} />
        <span style={{flex:1}}>{item}</span>
        {days && (
          <div style={{display:'flex',gap:3}}>
            {['M','T','W','T','F','S','S'].map((d,j)=>(
              <div key={j} style={{width:14,height:14,border:`1.5px solid ${c.accent}`,borderRadius:2,fontSize:8,display:'flex',alignItems:'center',justifyContent:'center',color:c.accent}}>{d}</div>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
);

const ProgressBar = ({c,label}) => (
  <div style={{marginBottom:10}}>
    <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}>
      <span style={{fontSize:11,color:c.text,fontWeight:600}}>{label}</span>
      <span style={{fontSize:10,color:c.accent}}>___%</span>
    </div>
    <div style={{height:10,background:'white',borderRadius:5,border:`1px solid ${c.border}`}} />
  </div>
);

const MoodRow = ({c,moods=['😊','😌','😐','😔','😢']}) => (
  <div style={{display:'flex',justifyContent:'space-around',padding:'6px 0'}}>
    {moods.map((m,i)=>(
      <div key={i} style={{textAlign:'center'}}>
        <div style={{...S.circle(c,34),fontSize:20,marginBottom:3}}>{m}</div>
        <div style={{fontSize:9,color:c.text}}>Day __</div>
      </div>
    ))}
  </div>
);

const WeekBoxes = ({c}) => (
  <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:4}}>
    {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d,i)=>(
      <div key={i} style={{background:'white',border:`1.5px solid ${c.accent}`,borderRadius:8,padding:'6px 2px',textAlign:'center'}}>
        <div style={{fontSize:10,fontWeight:700,color:c.text,marginBottom:4}}>{d}</div>
        <div style={{borderBottom:`1px solid ${c.border}`,marginBottom:4}} />
        <div style={{fontSize:9,color:c.text}}>Score:</div>
        <div style={{borderBottom:`1px solid ${c.border}`,marginTop:4}} />
      </div>
    ))}
  </div>
);

const Grid2 = ({children,gap=14}) => <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap,marginBottom:14}}>{children}</div>;

/* ─── TEMPLATE LAYOUTS ───────────────────────────────────────────────────── */
const LAYOUTS = {
  minimalist: (c) => (
    <>
      <Grid2>
        <div style={S.box(c,{marginBottom:0})}>
          <div style={S.title(c)}>✓ To-Do List</div>
          {Array.from({length:10}).map((_,i)=>(
            <div key={i} style={S.check(c)}>
              <div style={{width:12,height:12,border:`1.5px solid ${c.border}`,borderRadius:2,flexShrink:0}} />
              <div style={{flex:1,...S.line(c,0)}} />
            </div>
          ))}
        </div>
        <div>
          <div style={S.box(c)}>
            <div style={S.title(c)}>📅 Monthly Overview</div>
            <Lines c={c} n={5} />
          </div>
          <div style={S.box(c,{marginBottom:0})}>
            <div style={S.title(c)}>🔁 Habit Tracker</div>
            <CheckList c={c} items={['Habit 1','Habit 2','Habit 3','Habit 4']} days={true} />
          </div>
        </div>
      </Grid2>
      <div style={S.box(c)}>
        <div style={S.title(c)}>💭 Reflections</div>
        <Lines c={c} n={4} />
      </div>
    </>
  ),

  boho: (c) => (
    <>
      <div style={{textAlign:'center',marginBottom:16}}>
        <div style={{fontSize:22,fontWeight:400,color:c.text,fontFamily:'Georgia',marginBottom:4}}>Monthly Intentions</div>
        <div style={{borderBottom:`2px solid ${c.accent}`,width:120,margin:'0 auto'}} />
      </div>
      <Grid2>
        <div style={{...S.box(c,{marginBottom:0}),borderRadius:40,textAlign:'center'}}>
          <div style={S.title(c)}>🌿 Gratitude</div>
          <Lines c={c} n={4} />
        </div>
        <div style={{...S.box(c,{marginBottom:0}),borderRadius:40,textAlign:'center'}}>
          <div style={S.title(c)}>✨ Self-Care</div>
          <Lines c={c} n={4} />
        </div>
      </Grid2>
      <div style={S.box(c)}>
        <div style={S.title(c)}>🌙 Mood Tracker</div>
        <MoodRow c={c} moods={['🌞','🌤','⛅','🌧','⛈']} />
      </div>
      <div style={S.box(c)}>
        <div style={S.title(c)}>🌸 Daily Affirmations</div>
        <Lines c={c} n={5} />
      </div>
    </>
  ),

  funky: (c) => (
    <>
      <div style={{background:c.accent,borderRadius:20,padding:'12px 20px',marginBottom:14,textAlign:'center'}}>
        <div style={{fontSize:22,fontWeight:900,color:'white',letterSpacing:2}}>BRAIN DUMP 🧠</div>
      </div>
      <Grid2>
        <div style={{...S.box(c,{marginBottom:0}),borderRadius:28,transform:'rotate(-1deg)'}}>
          <div style={S.title(c)}>💡 Creative Notes</div>
          <Lines c={c} n={5} />
        </div>
        <div style={{...S.box(c,{marginBottom:0}),borderRadius:28,transform:'rotate(1deg)'}}>
          <div style={S.title(c)}>💖 Currently Loving</div>
          {['⭐ ___________','⭐ ___________','⭐ ___________','⭐ ___________','⭐ ___________'].map((t,i)=><div key={i} style={{fontSize:12,color:c.text,marginBottom:8}}>{t}</div>)}
        </div>
      </Grid2>
      <Grid2>
        <div style={S.box(c,{marginBottom:0})}>
          <div style={S.title(c)}>🎨 Mood Tracker</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
            {['😍','🤩','😊','😐','😤','😭','🤯'].map((m,i)=><div key={i} style={{...S.circle(c,32),fontSize:18}}>{m}</div>)}
          </div>
        </div>
        <div style={S.box(c,{marginBottom:0})}>
          <div style={S.title(c)}>🌟 Weekly Highlights</div>
          <Lines c={c} n={5} />
        </div>
      </Grid2>
    </>
  ),

  zen: (c) => (
    <>
      <div style={{textAlign:'center',marginBottom:16}}>
        <div style={{fontSize:20,fontWeight:300,color:c.text,fontFamily:'Georgia'}}>Daily Mindfulness 🕊</div>
      </div>
      <Grid2>
        <div style={S.box(c,{marginBottom:0})}>
          <div style={S.title(c)}>🌬 Breathing</div>
          <div style={{display:'flex',justifyContent:'center',padding:'8px 0'}}>
            <div style={{...S.circle(c,80),flexDirection:'column',gap:3,fontSize:10,color:c.accent}}>
              <span>Inhale</span><span>Hold</span><span>Exhale</span>
            </div>
          </div>
        </div>
        <div style={S.box(c,{marginBottom:0})}>
          <div style={S.title(c)}>🎯 Intentions</div>
          <Lines c={c} n={4} />
        </div>
      </Grid2>
      <Grid2>
        <div style={S.box(c,{marginBottom:0})}>
          <div style={S.title(c)}>🙏 Gratitude</div>
          <Lines c={c} n={4} />
        </div>
        <div style={S.box(c,{marginBottom:0})}>
          <div style={S.title(c)}>🌊 Mood Reflection</div>
          <MoodRow c={c} moods={['😌','🙂','😐','😔','😤']} />
          <Lines c={c} n={2} />
        </div>
      </Grid2>
    </>
  ),

  prayer: (c) => (
    <>
      <div style={{textAlign:'center',marginBottom:14}}>
        <div style={{fontSize:22,fontWeight:400,fontFamily:'Georgia',color:c.text}}>✝ Prayer Journal</div>
      </div>
      <div style={S.box(c)}>
        <div style={S.title(c)}>🙏 Prayer Requests & Praise</div>
        <Lines c={c} n={5} />
      </div>
      <Grid2>
        <div style={S.box(c,{marginBottom:0})}>
          <div style={S.title(c)}>📖 Scripture of the Day</div>
          <div style={{fontSize:10,color:c.text,fontStyle:'italic',marginBottom:8}}>Verse: _________________</div>
          <Lines c={c} n={4} />
        </div>
        <div style={S.box(c,{marginBottom:0})}>
          <div style={S.title(c)}>✅ Answered Prayers</div>
          {Array.from({length:6}).map((_,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:6,marginBottom:8}}>
              <div style={{width:8,height:8,borderRadius:'50%',background:c.accent,flexShrink:0}} />
              <div style={{flex:1,borderBottom:`1px solid ${c.border}`}} />
            </div>
          ))}
        </div>
      </Grid2>
      <div style={S.box(c)}>
        <div style={S.title(c)}>⏰ Prayer Time Log</div>
        <WeekBoxes c={c} />
      </div>
      <div style={S.box(c)}>
        <div style={S.title(c)}>💭 Today's Reflections</div>
        <Lines c={c} n={3} />
      </div>
    </>
  ),

  parenting: (c) => (
    <>
      <div style={{textAlign:'center',marginBottom:14}}>
        <div style={{fontSize:22,fontWeight:600,color:c.text}}>👨‍👩‍👧‍👦 Family Planner</div>
      </div>
      <Grid2>
        <div style={S.box(c,{marginBottom:0})}>
          <div style={S.title(c)}>📅 Kids' Schedule</div>
          {['☀️ Morning','🌤 Afternoon','🌙 Evening','🛏 Bedtime'].map((t,i)=>(
            <div key={i} style={{marginBottom:10}}>
              <div style={{fontSize:11,fontWeight:600,color:c.text,marginBottom:3}}>{t}</div>
              <div style={S.line(c,0)} />
            </div>
          ))}
        </div>
        <div style={S.box(c,{marginBottom:0})}>
          <div style={S.title(c)}>🍽 Meal Planning</div>
          {['Breakfast','Lunch','Dinner','Snacks'].map((t,i)=>(
            <div key={i} style={{display:'flex',gap:8,marginBottom:8,alignItems:'center'}}>
              <div style={{width:8,height:8,borderRadius:'50%',background:c.accent,flexShrink:0}} />
              <span style={{fontSize:11,fontWeight:600,color:c.text,width:65}}>{t}</span>
              <div style={{flex:1,borderBottom:`1px solid ${c.border}`}} />
            </div>
          ))}
        </div>
      </Grid2>
      <div style={S.box(c)}>
        <div style={S.title(c)}>🛒 Shopping List</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8}}>
          {Array.from({length:9}).map((_,i)=>(
            <div key={i} style={S.check(c)}>
              <div style={{width:12,height:12,border:`1.5px solid ${c.border}`,borderRadius:2,flexShrink:0}} />
              <div style={{flex:1,borderBottom:`1px solid ${c.border}`,minHeight:16}} />
            </div>
          ))}
        </div>
      </div>
      <div style={S.box(c)}>
        <div style={S.title(c)}>❤️ Grateful For...</div>
        <Lines c={c} n={3} />
      </div>
    </>
  ),

  money: (c) => (
    <>
      <div style={{background:c.accent,borderRadius:10,padding:'12px 18px',marginBottom:14,textAlign:'center'}}>
        <div style={{fontSize:20,fontWeight:700,color:'white'}}>💰 Financial Tracker</div>
      </div>
      <Grid2>
        <div style={S.box(c,{marginBottom:0})}>
          <div style={S.title(c)}>📈 Income</div>
          {['Salary','Side Hustle','Other','─── TOTAL'].map((t,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',marginBottom:8,borderBottom:`1px solid ${i===3?c.accent:c.border}`,paddingBottom:4}}>
              <span style={{fontSize:11,color:c.text,fontWeight:i===3?700:400}}>{t}</span>
              <span style={{fontSize:11,color:c.accent}}>$_______</span>
            </div>
          ))}
        </div>
        <div style={S.box(c,{marginBottom:0})}>
          <div style={S.title(c)}>📉 Expenses</div>
          {['Housing','Food','Transport','Other','─── TOTAL'].map((t,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',marginBottom:8,borderBottom:`1px solid ${i===4?c.accent:c.border}`,paddingBottom:4}}>
              <span style={{fontSize:11,color:c.text,fontWeight:i===4?700:400}}>{t}</span>
              <span style={{fontSize:11,color:c.accent}}>$_______</span>
            </div>
          ))}
        </div>
      </Grid2>
      <div style={S.box(c)}>
        <div style={S.title(c)}>🎯 Savings Goals</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}>
          {['Goal 1','Goal 2','Goal 3'].map((g,i)=>(
            <div key={i} style={{background:'white',border:`1.5px solid ${c.border}`,borderRadius:8,padding:10}}>
              <div style={{fontSize:12,fontWeight:600,color:c.text,marginBottom:6}}>{g}</div>
              <div style={{fontSize:10,color:c.text}}>Target: $</div>
              <div style={S.line(c,6)} />
              <div style={{fontSize:10,color:c.text}}>Saved: $</div>
              <div style={S.line(c,0)} />
            </div>
          ))}
        </div>
      </div>
      <div style={S.box(c)}>
        <div style={S.title(c)}>📋 Budget — 50/30/20</div>
        <ProgressBar c={c} label="Needs (50%)" />
        <ProgressBar c={c} label="Wants (30%)" />
        <ProgressBar c={c} label="Savings (20%)" />
      </div>
    </>
  ),

  professional: (c) => (
    <>
      <div style={{background:c.accent,padding:'12px 18px',borderRadius:8,marginBottom:14}}>
        <div style={{fontSize:20,fontWeight:700,color:'white',letterSpacing:2,textAlign:'center'}}>DAILY PLANNER</div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1.2fr 0.8fr',gap:14}}>
        <div style={S.box(c,{marginBottom:0})}>
          <div style={S.title(c)}>🕐 Schedule</div>
          {['8:00','9:00','10:00','11:00','12:00','1:00','2:00','3:00','4:00','5:00'].map((t,i)=>(
            <div key={i} style={{display:'flex',gap:10,marginBottom:7,alignItems:'center'}}>
              <span style={{fontSize:10,color:c.accent,fontWeight:600,width:42,flexShrink:0}}>{t}</span>
              <div style={{flex:1,background:'white',border:`1px solid ${c.border}`,borderRadius:4,height:20}} />
            </div>
          ))}
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <div style={S.box(c,{marginBottom:0})}>
            <div style={S.title(c)}>⚡ Priority Tasks</div>
            {[1,2,3,4,5,6,7].map(i=>(
              <div key={i} style={S.check(c)}>
                <div style={{...S.circle(c,14),marginRight:0,flexShrink:0,fontSize:9,fontWeight:700,color:c.accent}}>{i}</div>
                <div style={{flex:1,borderBottom:`1px solid ${c.border}`,minHeight:16}} />
              </div>
            ))}
          </div>
          <div style={S.box(c,{marginBottom:0})}>
            <div style={S.title(c)}>🎯 Goals</div>
            {['Today','This Week','This Month'].map((p,i)=>(
              <div key={i} style={{marginBottom:8}}>
                <div style={{fontSize:10,fontWeight:600,color:c.accent}}>{p}</div>
                <div style={S.line(c,0)} />
              </div>
            ))}
          </div>
          <div style={S.box(c,{marginBottom:0})}>
            <div style={S.title(c)}>📞 Meetings</div>
            {Array.from({length:3}).map((_,i)=>(
              <div key={i} style={{marginBottom:8,fontSize:10,color:c.text}}>
                <div><span style={{fontWeight:600}}>Time:</span> <span style={{borderBottom:`1px solid ${c.border}`,display:'inline-block',width:80}} /></div>
                <div style={{marginTop:4}}><span style={{fontWeight:600}}>Topic:</span> <span style={{borderBottom:`1px solid ${c.border}`,display:'inline-block',width:70}} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  ),

  cozy: (c) => (
    <>
      <div style={{textAlign:'center',marginBottom:14}}>
        <div style={{fontSize:22,fontWeight:500,fontFamily:'Georgia',color:c.text}}>☕ Cozy Day Planner</div>
      </div>
      <Grid2>
        <div style={{...S.box(c,{marginBottom:0}),borderRadius:24}}>
          <div style={S.title(c)}>☀️ Morning Routine</div>
          {['Wake up','Breakfast','Self-care','Start work'].map((t,i)=>(
            <div key={i} style={{display:'flex',gap:8,alignItems:'center',marginBottom:8}}>
              <div style={{width:8,height:8,borderRadius:'50%',background:c.accent,flexShrink:0}} />
              <span style={{fontSize:11,color:c.text}}>{t}</span>
              <div style={{flex:1,borderBottom:`1px solid ${c.border}`}} />
            </div>
          ))}
        </div>
        <div style={{...S.box(c,{marginBottom:0}),borderRadius:24}}>
          <div style={S.title(c)}>✨ Cozy Activities</div>
          {['Reading','Tea break','Creative','Relax'].map((t,i)=>(
            <div key={i} style={{background:'white',border:`1px solid ${c.border}`,borderRadius:14,padding:'5px 10px',marginBottom:6,fontSize:11,color:c.text,textAlign:'center'}}>{t}</div>
          ))}
        </div>
      </Grid2>
      <div style={{...S.box(c),borderRadius:24}}>
        <div style={S.title(c)}>💧 Nourishment</div>
        <div style={{display:'flex',gap:10,alignItems:'center'}}>
          <span style={{fontSize:11,fontWeight:600,color:c.text}}>Water:</span>
          {Array.from({length:8}).map((_,i)=><div key={i} style={{...S.circle(c,22),fontSize:12}}>💧</div>)}
        </div>
      </div>
      <div style={{...S.box(c),borderRadius:24}}>
        <div style={S.title(c)}>🌙 Evening Wind Down</div>
        <Lines c={c} n={4} />
      </div>
    </>
  ),

  selfWellness: (c) => (
    <>
      <div style={{textAlign:'center',marginBottom:14}}>
        <div style={{fontSize:20,fontWeight:400,fontFamily:'Georgia',color:c.text}}>🌿 Wellness Journey</div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12,marginBottom:14}}>
        {[
          {icon:'🧠',title:'MIND',items:['Meditation','Journaling','Learning','Mindfulness']},
          {icon:'💪',title:'BODY',items:['Movement','Nutrition','Hydration','Rest']},
          {icon:'✨',title:'SPIRIT',items:['Gratitude','Connection','Joy','Purpose']}
        ].map((col,i)=>(
          <div key={i} style={S.box(c,{marginBottom:0})}>
            <div style={S.title(c)}>{col.icon} {col.title}</div>
            {col.items.map((item,j)=>(
              <div key={j} style={S.check(c)}>
                <div style={{...S.circle(c,14),marginRight:0,flexShrink:0}} />
                <span style={{fontSize:10}}>{item}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={S.box(c)}>
        <div style={S.title(c)}>⚡ Energy Levels</div>
        <WeekBoxes c={c} />
      </div>
      <div style={S.box(c)}>
        <div style={S.title(c)}>💆 Self-Care Activities</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8}}>
          {Array.from({length:6}).map((_,i)=>(
            <div key={i} style={{background:'white',border:`1.5px solid ${c.accent}`,borderRadius:8,padding:8,minHeight:40}} />
          ))}
        </div>
      </div>
    </>
  ),

  artistic: (c) => (
    <>
      <div style={{textAlign:'center',marginBottom:14,fontStyle:'italic'}}>
        <div style={{fontSize:24,fontWeight:700,color:c.text,fontFamily:'Georgia'}}>Creative Journal 🎨</div>
      </div>
      <Grid2>
        <div style={S.box(c,{marginBottom:0})}>
          <div style={S.title(c)}>💡 Creative Prompts</div>
          {[1,2,3,4,5].map(i=>(
            <div key={i} style={{display:'flex',gap:8,alignItems:'center',marginBottom:8}}>
              <div style={{...S.circle(c,20),fontSize:10,color:c.accent,flexShrink:0}}>{i}</div>
              <div style={{flex:1,borderBottom:`1px solid ${c.border}`}} />
            </div>
          ))}
        </div>
        <div style={S.box(c,{marginBottom:0})}>
          <div style={S.title(c)}>🖼 Inspiration Board</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
            {Array.from({length:4}).map((_,i)=>(
              <div key={i} style={{background:'white',border:`2px dashed ${c.accent}`,borderRadius:8,height:55}} />
            ))}
          </div>
        </div>
      </Grid2>
      <div style={S.box(c)}>
        <div style={S.title(c)}>✏️ Daily Sketch Space</div>
        <div style={{background:'white',border:`2px dashed ${c.border}`,borderRadius:8,height:100}} />
      </div>
      <Grid2>
        <div style={S.box(c,{marginBottom:0})}>
          <div style={S.title(c)}>🌈 Color Mood</div>
          <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
            {['Red','Orange','Yellow','Green','Blue','Purple'].map((col,i)=>(
              <div key={i} style={{textAlign:'center'}}>
                <div style={{...S.circle(c,26),marginBottom:2}} />
                <div style={{fontSize:8,color:c.text}}>{col}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={S.box(c,{marginBottom:0})}>
          <div style={S.title(c)}>📝 Creative Notes</div>
          <Lines c={c} n={5} />
        </div>
      </Grid2>
    </>
  ),

  whimsical: (c) => (
    <>
      <div style={{textAlign:'center',marginBottom:14}}>
        <div style={{fontSize:24,fontWeight:600,fontFamily:'cursive',color:c.text}}>🦋 Dream Diary ✨</div>
      </div>
      <Grid2>
        <div style={{...S.box(c,{marginBottom:0}),borderRadius:40}}>
          <div style={S.title(c)}>✨ Dreams</div>
          <Lines c={c} n={4} />
        </div>
        <div style={{...S.box(c,{marginBottom:0}),borderRadius:40}}>
          <div style={S.title(c)}>🌙 Wishes</div>
          <Lines c={c} n={4} />
        </div>
      </Grid2>
      <div style={S.box(c)}>
        <div style={S.title(c)}>✨ Daily Magic Moments</div>
        <div style={{display:'flex',gap:8,justifyContent:'space-around',padding:'4px 0'}}>
          {Array.from({length:7}).map((_,i)=>(
            <div key={i} style={{...S.circle(c,34),fontSize:18}}>⭐</div>
          ))}
        </div>
      </div>
      <div style={{...S.box(c),borderRadius:30}}>
        <div style={S.title(c)}>🦋 Today's Story</div>
        <Lines c={c} n={5} />
      </div>
      <div style={S.box(c)}>
        <div style={S.title(c)}>🌈 Mood Rainbow</div>
        <MoodRow c={c} moods={['🌞','🌤','🌈','⭐','🌙']} />
      </div>
    </>
  ),

  luxury: (c) => (
    <div style={{border:`3px solid ${c.accent}`,borderRadius:4,padding:4}}>
      <div style={{border:`1px solid ${c.accent}`,borderRadius:2,padding:16}}>
        <div style={{textAlign:'center',marginBottom:16}}>
          <div style={{fontSize:26,fontWeight:700,color:c.accent,fontFamily:'serif',letterSpacing:4}}>PLANNER</div>
          <div style={{borderBottom:`2px solid ${c.accent}`,margin:'8px auto',width:200}} />
        </div>
        <div style={S.box(c)}>
          <div style={{...S.title(c),letterSpacing:3}}>PRIORITIES</div>
          {[1,2,3,4,5].map(i=>(
            <div key={i} style={{display:'flex',gap:12,alignItems:'center',padding:'8px 0',borderBottom:`1px solid ${c.border}`}}>
              <span style={{fontSize:18,fontWeight:700,color:c.accent,width:20}}>{i}</span>
              <div style={{flex:1,minHeight:18}} />
            </div>
          ))}
        </div>
        <div style={S.box(c)}>
          <div style={{...S.title(c),letterSpacing:3}}>SCHEDULE</div>
          {['MORNING','AFTERNOON','EVENING'].map((p,i)=>(
            <div key={i} style={{...S.box(c,{marginBottom:10})}}>
              <div style={{fontSize:11,color:c.accent,fontWeight:700,letterSpacing:3,marginBottom:6}}>{p}</div>
              <Lines c={c} n={2} />
            </div>
          ))}
        </div>
        <div style={S.box(c,{marginBottom:0})}>
          <div style={{...S.title(c),letterSpacing:3}}>NOTES</div>
          <Lines c={c} n={3} />
        </div>
      </div>
    </div>
  ),

  elegant: (c) => (
    <>
      <div style={{textAlign:'center',marginBottom:14}}>
        <div style={{fontSize:24,fontWeight:400,fontFamily:'Georgia',color:c.text}}>Daily Planner</div>
        <div style={{borderBottom:`1px solid ${c.accent}`,margin:'6px auto',width:180}} />
        <div style={{borderBottom:'0.5px solid '+c.accent,margin:'2px auto',width:150}} />
      </div>
      {['Morning','Afternoon','Evening'].map((period,i)=>(
        <div key={i} style={S.box(c)}>
          <div style={{fontFamily:'Georgia',fontSize:13,color:c.accent,marginBottom:8,fontStyle:'italic'}}>{period}</div>
          <Lines c={c} n={3} />
        </div>
      ))}
      <Grid2>
        <div style={S.box(c,{marginBottom:0})}>
          <div style={{fontFamily:'Georgia',fontSize:13,color:c.accent,marginBottom:8}}>Important Tasks</div>
          {Array.from({length:5}).map((_,i)=>(
            <div key={i} style={S.check(c)}>
              <div style={{...S.circle(c,12),flexShrink:0}} />
              <div style={{flex:1,borderBottom:`0.5px solid ${c.border}`,minHeight:16}} />
            </div>
          ))}
        </div>
        <div style={S.box(c,{marginBottom:0})}>
          <div style={{fontFamily:'Georgia',fontSize:13,color:c.accent,marginBottom:8}}>Notes</div>
          <Lines c={c} n={6} />
        </div>
      </Grid2>
    </>
  ),

  journal: (c) => (
    <div style={{padding:'0 10px'}}>
      <div style={{textAlign:'center',marginBottom:16}}>
        <div style={{fontSize:26,fontWeight:400,fontFamily:'Georgia',color:c.text}}>Journal</div>
        <div style={{borderBottom:`1px solid ${c.accent}`,margin:'6px auto',width:100}} />
      </div>
      <div style={{display:'flex',gap:20,marginBottom:12}}>
        <span style={{fontSize:11,color:c.text}}>Date: _______________</span>
        <span style={{fontSize:11,color:c.text}}>Day: _______________</span>
      </div>
      <div style={{position:'relative'}}>
        <div style={{position:'absolute',left:28,top:0,bottom:0,borderLeft:`1px solid ${c.accent}`,opacity:0.3}} />
        {Array.from({length:28}).map((_,i)=>(
          <div key={i} style={{borderBottom:`1px solid ${c.border}`,height:24,opacity:0.7}} />
        ))}
      </div>
    </div>
  ),

  dreamJournal: (c) => (
    <>
      <div style={{textAlign:'center',marginBottom:14}}>
        <div style={{fontSize:22,fontWeight:500,fontFamily:'Georgia',color:c.text}}>🌙 Dream Journal</div>
      </div>
      <div style={S.box(c)}>
        <div style={{display:'flex',gap:20,flexWrap:'wrap',fontSize:11,color:c.text}}>
          <span>Date: ___________</span>
          <span>Bedtime: ___________</span>
          <span>Wake: ___________</span>
        </div>
      </div>
      <div style={S.box(c)}>
        <div style={S.title(c)}>🌙 Dream Description</div>
        <Lines c={c} n={6} />
      </div>
      <Grid2>
        <div style={S.box(c,{marginBottom:0})}>
          <div style={S.title(c)}>🔑 Key Elements</div>
          {['People','Places','Objects','Emotions'].map((t,i)=>(
            <div key={i} style={{marginBottom:8}}>
              <span style={{fontSize:10,fontWeight:600,color:c.text}}>{t}: </span>
              <div style={S.line(c,0)} />
            </div>
          ))}
        </div>
        <div style={S.box(c,{marginBottom:0})}>
          <div style={S.title(c)}>💫 Dream Mood</div>
          {['Happy','Calm','Confused','Scary','Exciting'].map((m,i)=>(
            <div key={i} style={S.check(c)}>
              <div style={{...S.circle(c,12),flexShrink:0}} />
              <span style={{fontSize:11}}>{m}</span>
            </div>
          ))}
        </div>
      </Grid2>
      <div style={S.box(c)}>
        <div style={S.title(c)}>🔮 Symbols & Meanings</div>
        <Lines c={c} n={3} />
      </div>
      <div style={S.box(c,{marginBottom:0})}>
        <div style={S.title(c)}>💭 My Interpretation</div>
        <Lines c={c} n={3} />
      </div>
    </>
  ),

  kidsChores: (c) => (
    <>
      <div style={{background:c.accent,borderRadius:16,padding:'14px 20px',marginBottom:14,textAlign:'center'}}>
        <div style={{fontSize:22,fontWeight:700,color:'white'}}>⭐ MY CHORE CHART ⭐</div>
        <div style={{fontSize:13,color:'white',marginTop:4}}>Name: _______________</div>
      </div>
      <Grid2>
        {[
          {icon:'🐾',title:'PET CARE',  items:['Feed pets','Water bowl','Walk dog','Clean cage']},
          {icon:'📚',title:'HOMEWORK',  items:['Reading','Math','Writing','Study time']},
          {icon:'🛁',title:'HYGIENE',   items:['Brush teeth AM','Brush teeth PM','Shower/Bath','Wash hands']},
          {icon:'🧹',title:'CLEANING',  items:['Make bed','Clean room','Put away toys','Help dishes']}
        ].map((sec,i)=>(
          <div key={i} style={{...S.box(c,{marginBottom:0}),borderRadius:16,border:`3px solid ${c.border}`}}>
            <div style={S.title(c,12)}>{sec.icon} {sec.title}</div>
            <CheckList c={c} items={sec.items} days={true} />
          </div>
        ))}
      </Grid2>
      <div style={S.box(c)}>
        <div style={S.title(c)}>📅 Weekly Tracker</div>
        <WeekBoxes c={c} />
      </div>
      <div style={{background:c.accent,borderRadius:16,padding:16}}>
        <div style={{fontSize:15,fontWeight:700,color:'white',textAlign:'center',marginBottom:12}}>🎁 REWARDS & GOALS 🎁</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          <div style={{background:'white',borderRadius:10,padding:12}}>
            <div style={{fontSize:12,fontWeight:600,color:c.text,marginBottom:8}}>Goal for this week:</div>
            <Lines c={c} n={2} />
          </div>
          <div style={{background:'white',borderRadius:10,padding:12}}>
            <div style={{fontSize:12,fontWeight:600,color:c.text,marginBottom:8}}>Reward when done:</div>
            <Lines c={c} n={2} />
          </div>
        </div>
      </div>
    </>
  ),
};

/* ─── OPTIONAL SECTIONS ──────────────────────────────────────────────────── */
const OPTIONAL = {
  monthlyReset:    { name:'Monthly Reset',       render:(c)=>(<div style={S.box(c)}><div style={S.title(c)}>🔄 Monthly Reset</div><Lines c={c} n={2} label="What worked:"/><Lines c={c} n={2} label="To improve:"/><Lines c={c} n={2} label="Next focus:"/></div>) },
  weeklyCheckin:   { name:'Weekly Check-in',      render:(c)=>(<div style={S.box(c)}><div style={S.title(c)}>✅ Weekly Check-in</div>{['Wins','Challenges','Lessons'].map((t,i)=><div key={i}><Lines c={c} n={2} label={t+':'}/></div>)}</div>) },
  moodTracker:     { name:'Mood Tracker',         render:(c)=>(<div style={S.box(c)}><div style={S.title(c)}>😊 Mood Tracker</div><MoodRow c={c}/></div>) },
  habitStreaks:    { name:'Habit Streaks',        render:(c)=>(<div style={S.box(c)}><div style={S.title(c)}>🔥 Habit Streaks</div><CheckList c={c} items={['Habit 1','Habit 2','Habit 3']} days={true}/></div>) },
  progressBars:    { name:'Progress Bars',        render:(c)=>(<div style={S.box(c)}><div style={S.title(c)}>📊 Progress Tracker</div>{['Goal 1','Goal 2','Goal 3','Goal 4'].map((g,i)=><ProgressBar key={i} c={c} label={g}/>)}</div>) },
  winsLessons:     { name:'Wins & Lessons',       render:(c)=>(<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}><div style={S.box(c,{marginBottom:0})}><div style={S.title(c)}>🎉 Wins</div><Lines c={c} n={4}/></div><div style={S.box(c,{marginBottom:0})}><div style={S.title(c)}>📚 Lessons</div><Lines c={c} n={4}/></div></div>) },
  affirmations:    { name:'Affirmations',         render:(c)=>(<div style={S.box(c)}><div style={S.title(c)}>✨ Affirmations</div><Lines c={c} n={5}/></div>) },
  gratitude:       { name:'Gratitude',            render:(c)=>(<div style={S.box(c)}><div style={S.title(c)}>🙏 Gratitude</div><Lines c={c} n={5}/></div>) },
  notesDoodle:     { name:'Notes & Doodles',      render:(c)=>(<div style={S.box(c)}><div style={S.title(c)}>📝 Notes & Doodles</div><div style={{background:'white',border:`2px dashed ${c.border}`,borderRadius:8,height:120}}/></div>) },
  lettingGo:       { name:'Letting Go',           render:(c)=>(<div style={S.box(c)}><div style={S.title(c)}>🍃 Letting Go</div>{Array.from({length:4}).map((_,i)=><div key={i} style={{display:'flex',gap:8,alignItems:'center',marginBottom:10}}><div style={{width:8,height:8,borderRadius:'50%',border:`2px solid ${c.accent}`,flexShrink:0}}/><div style={{flex:1,borderBottom:`1px solid ${c.border}`}}/></div>)}</div>) },
  excitedAbout:    { name:'Excited About',        render:(c)=>(<div style={S.box(c)}><div style={S.title(c)}>⭐ Excited About</div>{Array.from({length:4}).map((_,i)=><div key={i} style={{display:'flex',gap:8,alignItems:'center',marginBottom:10}}><span style={{color:c.accent,fontSize:14}}>★</span><div style={{flex:1,borderBottom:`1px solid ${c.border}`}}/></div>)}</div>) },
  dailyJournal:    { name:'Daily Journal',        render:(c)=>(<div style={S.box(c)}><div style={S.title(c)}>📓 Daily Journal</div><div style={{fontSize:10,color:c.text,marginBottom:8}}>Date: _______  Mood: _______</div><Lines c={c} n={8}/></div>) },
  visionBoard:     { name:'Vision Board',         render:(c)=>(<div style={S.box(c)}><div style={S.title(c)}>✨ Vision Board</div><div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8}}>{Array.from({length:6}).map((_,i)=><div key={i} style={{background:'white',border:`2px dashed ${c.accent}`,borderRadius:8,height:70}}/>)}</div></div>) },
  gentleReminders: { name:'Gentle Reminders',     render:(c)=>(<div style={S.box(c)}><div style={S.title(c)}>💝 Gentle Reminders</div>{['✨ You are doing your best','🌸 Progress, not perfection','💫 Rest is productive too','🌟 Small steps count'].map((r,i)=><div key={i} style={{background:'white',border:`1px solid ${c.accent}`,borderRadius:20,padding:'5px 14px',marginBottom:6,fontSize:11,color:c.text,textAlign:'center'}}>{r}</div>)}</div>) },
  sleepLog:        { name:'Sleep Log',            render:(c)=>(<div style={S.box(c)}><div style={S.title(c)}>💤 Sleep Log</div><WeekBoxes c={c}/></div>) },
  stressScale:     { name:'Stress Scale',         render:(c)=>(<div style={S.box(c)}><div style={S.title(c)}>🌊 Stress Scale</div><div style={{display:'flex',justifyContent:'space-between',padding:'6px 0'}}>{[1,2,3,4,5,6,7,8,9,10].map(n=><div key={n} style={{textAlign:'center'}}><div style={{...S.circle(c,22),fontSize:10}}>{n}</div></div>)}</div></div>) },
  doodleSpace:     { name:'Doodle Space',         render:(c)=>(<div style={S.box(c)}><div style={S.title(c)}>✏️ Doodle Space</div><div style={{background:'white',border:`2px dashed ${c.border}`,borderRadius:8,height:160}}/></div>) },
  weeklyReview:    { name:'Weekly Goal Review',   render:(c)=>(<div style={S.box(c)}><div style={S.title(c)}>🎯 Weekly Review</div><Lines c={c} n={3} label="Accomplished:"/><Lines c={c} n={2} label="Next week:"/></div>) },
  stickerElements: { name:'Sticker Elements',     render:(c)=>(<div style={S.box(c)}><div style={S.title(c)}>✨ Stickers</div><div style={{display:'flex',flexWrap:'wrap',gap:6}}>{'⭐💫🌸🌙☀️💖🦋🌈✨🎀🌺🍀'.split('').filter(x=>x.trim()).map((st,i)=><div key={i} style={{...S.circle(c,36),fontSize:20}}>{st}</div>)}</div></div>) },
};

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────── */
export default function PlannerGenerator() {
  const [auth, setAuth] = useState(false);
  const [code, setCode] = useState('');
  const [tmpl, setTmpl] = useState('minimalist');
  const [optionals, setOptionals] = useState([]);
  const [customColors, setCustomColors] = useState(null);
  const [font, setFont] = useState("'Segoe UI', sans-serif");
  const [exporting, setExporting] = useState(false);
  const previewRef = useRef(null);

  const c = { ...TEMPLATES[tmpl], ...(customColors || {}) };

  const login = () => { if (code === 'PLAN2024') setAuth(true); else alert('Invalid code'); };

  const toggleOptional = (key) => setOptionals(prev => prev.includes(key) ? prev.filter(k=>k!==key) : [...prev, key]);

  const loadScript = (src) => new Promise((res, rej) => {
    if (document.querySelector(`script[src="${src}"]`)) { res(); return; }
    const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s);
  });

  const exportPNG = async () => {
    setExporting(true);
    try {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
      const canvas = await window.html2canvas(previewRef.current, { scale: 3, useCORS: true, backgroundColor: c.bg, logging: false });
      const link = document.createElement('a');
      link.download = `${tmpl}-planner.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch(e) { alert('PNG export failed: ' + e.message); }
    setExporting(false);
  };

  const exportPDF = async () => {
    setExporting(true);
    try {
      await Promise.all([
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'),
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'),
      ]);
      const canvas = await window.html2canvas(previewRef.current, { scale: 2, useCORS: true, backgroundColor: c.bg, logging: false });
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const imgData = canvas.toDataURL('image/png');
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = (canvas.height * pdfW) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfW, pdfH);
      pdf.save(`${tmpl}-planner.pdf`);
      alert('✅ PDF saved! To edit in Canva:\n1. canva.com → Upload\n2. Upload the PDF\n3. Each section becomes editable!');
    } catch(e) { alert('PDF export failed: ' + e.message); }
    setExporting(false);
  };

  if (!auth) return (
    <div style={{minHeight:'100vh',background:'linear-gradient(135deg,#fce4ec,#e3f2fd)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif'}}>
      <div style={{background:'white',borderRadius:24,boxShadow:'0 20px 60px rgba(0,0,0,0.15)',padding:40,width:360,textAlign:'center'}}>
        <div style={{fontSize:40,marginBottom:16}}>🔒</div>
        <h1 style={{fontSize:24,fontWeight:700,marginBottom:8,margin:'0 0 8px'}}>Planner Generator</h1>
        <p style={{color:'#666',marginBottom:24,fontSize:14}}>Enter your access code</p>
        <input value={code} onChange={e=>setCode(e.target.value)} onKeyPress={e=>e.key==='Enter'&&login()} placeholder="Access Code" style={{width:'100%',padding:'12px 16px',border:'2px solid #eee',borderRadius:12,fontSize:14,marginBottom:16,boxSizing:'border-box',outline:'none'}} />
        <button onClick={login} style={{width:'100%',padding:13,background:'linear-gradient(135deg,#f06292,#ab47bc)',color:'white',border:'none',borderRadius:12,fontSize:15,fontWeight:600,cursor:'pointer'}}>Enter →</button>
        <p style={{color:'#aaa',fontSize:11,marginTop:16}}>Code: PLAN2024</p>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:'100vh',background:'#f1f3f5',fontFamily:'sans-serif'}}>
      {/* Header */}
      <div style={{background:'white',borderBottom:'1px solid #e9ecef',padding:'12px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
        <h1 style={{fontSize:18,fontWeight:700,margin:0}}>✨ Planner Generator</h1>
        <div style={{display:'flex',gap:8}}>
          <button onClick={exportPNG} disabled={exporting} style={{padding:'8px 14px',background:'linear-gradient(135deg,#43a047,#26c6da)',color:'white',border:'none',borderRadius:8,fontSize:12,fontWeight:600,cursor:'pointer'}}>
            ↓ PNG
          </button>
          <button onClick={exportPDF} disabled={exporting} style={{padding:'8px 14px',background:'linear-gradient(135deg,#7c3aed,#db2777)',color:'white',border:'none',borderRadius:8,fontSize:12,fontWeight:600,cursor:'pointer'}}>
            ↓ {exporting ? 'Exporting…' : 'PDF for Canva'}
          </button>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'280px 1fr',height:'calc(100vh - 53px)'}}>
        {/* Sidebar */}
        <div style={{background:'white',borderRight:'1px solid #e9ecef',overflowY:'auto',padding:16}}>

          <div style={{marginBottom:16}}>
            <div style={{fontSize:11,fontWeight:700,color:'#6c757d',marginBottom:6,textTransform:'uppercase',letterSpacing:1}}>Template</div>
            <select value={tmpl} onChange={e=>{setTmpl(e.target.value);setCustomColors(null);}} style={{width:'100%',padding:'8px 10px',border:'2px solid #e9ecef',borderRadius:8,fontSize:13,outline:'none'}}>
              {Object.entries(TEMPLATES).map(([k,t])=><option key={k} value={k}>{t.name}</option>)}
            </select>
          </div>

          <div style={{marginBottom:16}}>
            <div style={{fontSize:11,fontWeight:700,color:'#6c757d',marginBottom:6,textTransform:'uppercase',letterSpacing:1}}>Font</div>
            <select value={font} onChange={e=>setFont(e.target.value)} style={{width:'100%',padding:'8px 10px',border:'2px solid #e9ecef',borderRadius:8,fontSize:13,outline:'none'}}>
              <option value="'Segoe UI',sans-serif">Default</option>
              <option value="Georgia,serif">Serif</option>
              <option value="cursive">Handwriting</option>
              <option value="'Courier New',monospace">Typewriter</option>
            </select>
          </div>

          <div style={{marginBottom:16}}>
            <div style={{fontSize:11,fontWeight:700,color:'#6c757d',marginBottom:6,textTransform:'uppercase',letterSpacing:1}}>Colors</div>
            {[['accent','Accent'],['border','Border'],['text','Text'],['bg','Background'],['primary','Fill']].map(([key,label])=>(
              <div key={key} style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
                <span style={{fontSize:11,color:'#666',width:72}}>{label}</span>
                <input type="color" value={(customColors?.[key])||c[key]} onChange={e=>setCustomColors(prev=>({...(prev||{}),[key]:e.target.value}))} style={{width:32,height:24,border:'2px solid #e9ecef',borderRadius:4,cursor:'pointer',padding:2}} />
              </div>
            ))}
            <button onClick={()=>setCustomColors(null)} style={{fontSize:11,color:'#888',background:'none',border:'1px solid #ddd',borderRadius:6,padding:'3px 8px',cursor:'pointer',marginTop:4}}>Reset</button>
          </div>

          <div>
            <div style={{fontSize:11,fontWeight:700,color:'#6c757d',marginBottom:6,textTransform:'uppercase',letterSpacing:1}}>Optional Sections</div>
            {Object.entries(OPTIONAL).map(([key,sec])=>(
              <label key={key} style={{display:'flex',alignItems:'center',gap:8,padding:'5px 8px',borderRadius:7,cursor:'pointer',marginBottom:3,background:optionals.includes(key)?c.primary:'transparent',border:`1px solid ${optionals.includes(key)?c.accent:'#e9ecef'}`}}>
                <input type="checkbox" checked={optionals.includes(key)} onChange={()=>toggleOptional(key)} style={{accentColor:c.accent}} />
                <span style={{fontSize:11,color:'#333'}}>{sec.name}</span>
              </label>
            ))}
          </div>

        </div>

        {/* Preview */}
        <div style={{overflowY:'auto',background:'#e9ecef',padding:24}}>
          <div style={{background:'white',borderRadius:4,boxShadow:'0 4px 24px rgba(0,0,0,0.12)',maxWidth:794,margin:'0 auto'}}>
            <div ref={previewRef} style={{background:c.bg,fontFamily:font,padding:36,minHeight:1000}}>
              {/* Page top */}
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,paddingBottom:12,borderBottom:`2px solid ${c.border}`}}>
                <div style={{fontSize:11,color:c.accent,fontWeight:600,letterSpacing:2,textTransform:'uppercase'}}>{TEMPLATES[tmpl].name}</div>
                <div style={{fontSize:11,color:c.text}}>Date: _______________</div>
              </div>

              {/* Template */}
              {LAYOUTS[tmpl] ? LAYOUTS[tmpl](c) : <div>Template not found</div>}

              {/* Optional sections */}
              {optionals.length > 0 && (
                <div style={{marginTop:20,paddingTop:16,borderTop:`2px solid ${c.border}`}}>
                  {optionals.map(key=>(
                    <div key={key} style={{marginBottom:14}}>
                      {OPTIONAL[key].render(c)}
                    </div>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div style={{marginTop:20,paddingTop:10,borderTop:`1px solid ${c.border}`,textAlign:'center',fontSize:9,color:c.border}}>
                Made with Planner Generator
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
