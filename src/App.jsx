import { useState, useRef } from "react";

/* ── TEMPLATES ──────────────────────────────────────────────────────────── */
const TEMPLATES = {
  minimalist:   { name:"Minimalist",    bg:"#FFFFFF", primary:"#F5F5F5", accent:"#555555", border:"#CCCCCC", text:"#333333" },
  boho:         { name:"Boho",          bg:"#FFF8F0", primary:"#F4E4D7", accent:"#A67C52", border:"#D4C4B0", text:"#5C4033" },
  funky:        { name:"Funky",         bg:"#FFF9E6", primary:"#FFE5B4", accent:"#FF6B9D", border:"#FFB84D", text:"#2D1B4E" },
  zen:          { name:"Zen",           bg:"#F7F9F9", primary:"#E8EEEE", accent:"#6B7F7F", border:"#C2D1D1", text:"#3A4848" },
  prayer:       { name:"Prayer",        bg:"#F3F0FF", primary:"#E6DEFF", accent:"#7C3AED", border:"#C4B5FD", text:"#5B21B6" },
  parenting:    { name:"Parenting",     bg:"#FFF5E6", primary:"#FFE8CC", accent:"#FF8C42", border:"#FFD4A3", text:"#8B4513" },
  money:        { name:"Money",         bg:"#F0F8F0", primary:"#D4EDDA", accent:"#28A745", border:"#A8D5BA", text:"#155724" },
  professional: { name:"Professional",  bg:"#F8F9FA", primary:"#E9ECEF", accent:"#2C5F8D", border:"#CED4DA", text:"#212529" },
  cozy:         { name:"Cozy",          bg:"#FFF9F5", primary:"#FFE4D6", accent:"#D4885C", border:"#E8C4A8", text:"#5D3A1A" },
  selfWellness: { name:"Self Wellness", bg:"#F5FFFA", primary:"#E0F7F4", accent:"#20B2AA", border:"#B0E5DF", text:"#2F4F4F" },
  artistic:     { name:"Artistic",      bg:"#FFFBF5", primary:"#FFE5D9", accent:"#E63946", border:"#FFCDB2", text:"#1D3557" },
  whimsical:    { name:"Whimsical",     bg:"#FFF8FC", primary:"#F8E8FF", accent:"#C77DFF", border:"#E0AAFF", text:"#5A189A" },
  luxury:       { name:"Luxury",        bg:"#1A1A1A", primary:"#2D2D2D", accent:"#D4AF37", border:"#8B7300", text:"#F5F5F5" },
  elegant:      { name:"Elegant",       bg:"#FEFEFE", primary:"#F8F6F4", accent:"#8B7355", border:"#D4C4B0", text:"#2C2416" },
  journal:      { name:"Journal",       bg:"#FFFFF8", primary:"#FFF9E6", accent:"#8B7355", border:"#D4C4B0", text:"#2C2416" },
  dreamJournal: { name:"Dream Journal", bg:"#F5F3FF", primary:"#EDE9FE", accent:"#7C3AED", border:"#C4B5FD", text:"#5B21B6" },
  kidsChores:   { name:"Kids Chores",   bg:"#FFF9E6", primary:"#FFE5CC", accent:"#FF9500", border:"#FFD4A3", text:"#8B4513" },
};

/* ── EDITABLE FIELD COMPONENTS ──────────────────────────────────────────── */

// Single editable line
const ELine = ({ id, vals, onChange, c, placeholder = "Type here…", style = {} }) => (
  <div style={{ borderBottom: `1px solid ${c.border}`, marginBottom: 8, minHeight: 24, ...style }}>
    <input
      value={vals[id] || ""}
      onChange={e => onChange(id, e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%", border: "none", background: "transparent",
        fontSize: 12, color: c.text, outline: "none", padding: "2px 0",
        fontFamily: "inherit", boxSizing: "border-box",
      }}
    />
  </div>
);

// Multi-line textarea
const EArea = ({ id, vals, onChange, c, placeholder = "Write here…", rows = 3 }) => (
  <textarea
    value={vals[id] || ""}
    onChange={e => onChange(id, e.target.value)}
    placeholder={placeholder}
    rows={rows}
    style={{
      width: "100%", border: `1px dashed ${c.border}`, background: "white",
      fontSize: 12, color: c.text, outline: "none", padding: 8,
      fontFamily: "inherit", boxSizing: "border-box", borderRadius: 6,
      resize: "vertical", lineHeight: 1.6,
    }}
  />
);

// Checkbox row with editable label
const ECheck = ({ id, vals, onChange, c, defaultLabel = "" }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
    <input
      type="checkbox"
      checked={vals[id + "_done"] || false}
      onChange={e => onChange(id + "_done", e.target.checked)}
      style={{ accentColor: c.accent, width: 14, height: 14, flexShrink: 0, cursor: "pointer" }}
    />
    <input
      value={vals[id] || ""}
      onChange={e => onChange(id, e.target.value)}
      placeholder={defaultLabel}
      style={{
        flex: 1, border: "none", borderBottom: `1px solid ${c.border}`,
        background: "transparent", fontSize: 12, color: c.text,
        outline: "none", padding: "2px 0", fontFamily: "inherit",
        textDecoration: vals[id + "_done"] ? "line-through" : "none",
        opacity: vals[id + "_done"] ? 0.5 : 1,
      }}
    />
  </div>
);

// Section title box
const SBox = ({ c, title, children, style = {} }) => (
  <div style={{
    background: c.primary, border: `2px solid ${c.border}`,
    borderRadius: 12, padding: "14px 16px", marginBottom: 14, ...style
  }}>
    <div style={{ color: c.accent, fontWeight: 700, fontSize: 13, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>
      {title}
    </div>
    {children}
  </div>
);

// Days-of-week tracker row
const DayTracker = ({ id, vals, onChange, c }) => (
  <div style={{ display: "flex", gap: 4, marginLeft: "auto" }}>
    {["M","T","W","T","F","S","S"].map((d, j) => (
      <div
        key={j}
        onClick={() => onChange(`${id}_day${j}`, !vals[`${id}_day${j}`])}
        style={{
          width: 16, height: 16, border: `1.5px solid ${c.accent}`, borderRadius: 3,
          fontSize: 8, display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", background: vals[`${id}_day${j}`] ? c.accent : "transparent",
          color: vals[`${id}_day${j}`] ? "white" : c.accent, fontWeight: 700,
        }}
      >{d}</div>
    ))}
  </div>
);

// Habit row: label + day tracker
const HabitRow = ({ id, vals, onChange, c, placeholder = "Habit name…" }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
    <input
      value={vals[id] || ""}
      onChange={e => onChange(id, e.target.value)}
      placeholder={placeholder}
      style={{
        flex: 1, border: "none", borderBottom: `1px solid ${c.border}`,
        background: "transparent", fontSize: 11, color: c.text,
        outline: "none", padding: "2px 0", fontFamily: "inherit",
      }}
    />
    <DayTracker id={id} vals={vals} onChange={onChange} c={c} />
  </div>
);

// Mood selector
const MoodPicker = ({ id, vals, onChange, c, moods = ["😊","😌","😐","😔","😢"] }) => (
  <div style={{ display: "flex", justifyContent: "space-around", padding: "6px 0" }}>
    {moods.map((m, i) => (
      <div
        key={i}
        onClick={() => onChange(id, i)}
        style={{
          textAlign: "center", cursor: "pointer",
          opacity: vals[id] === undefined || vals[id] === i ? 1 : 0.35,
          transform: vals[id] === i ? "scale(1.3)" : "scale(1)",
          transition: "all 0.15s",
        }}
      >
        <div style={{ fontSize: 24 }}>{m}</div>
        <div style={{ fontSize: 9, color: c.text, marginTop: 2 }}>Day __</div>
      </div>
    ))}
  </div>
);

/* ── TEMPLATE LAYOUTS ───────────────────────────────────────────────────── */
const LAYOUTS = {

  minimalist: (c, v, upd) => (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <SBox c={c} title="✓ To-Do List">
          {Array.from({length:10}).map((_,i) => <ECheck key={i} id={`todo${i}`} vals={v} onChange={upd} c={c} defaultLabel={`Task ${i+1}`} />)}
        </SBox>
        <div>
          <SBox c={c} title="📅 Monthly Overview">
            {Array.from({length:5}).map((_,i) => <ELine key={i} id={`mo${i}`} vals={v} onChange={upd} c={c} />)}
          </SBox>
          <SBox c={c} title="🔁 Habit Tracker">
            {Array.from({length:4}).map((_,i) => <HabitRow key={i} id={`hab${i}`} vals={v} onChange={upd} c={c} placeholder={`Habit ${i+1}`} />)}
          </SBox>
        </div>
      </div>
      <SBox c={c} title="💭 Reflections">
        <EArea id="reflect" vals={v} onChange={upd} c={c} rows={4} />
      </SBox>
    </>
  ),

  boho: (c, v, upd) => (
    <>
      <div style={{ textAlign:"center", marginBottom:14 }}>
        <div style={{ fontSize:20, fontWeight:400, color:c.text, fontFamily:"Georgia" }}>Monthly Intentions</div>
        <div style={{ borderBottom:`2px solid ${c.accent}`, width:120, margin:"6px auto 0" }} />
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
        <SBox c={c} title="🌿 Gratitude" style={{ borderRadius:40 }}>
          {Array.from({length:4}).map((_,i) => <ELine key={i} id={`grat${i}`} vals={v} onChange={upd} c={c} />)}
        </SBox>
        <SBox c={c} title="✨ Self-Care" style={{ borderRadius:40 }}>
          {Array.from({length:4}).map((_,i) => <ELine key={i} id={`sc${i}`} vals={v} onChange={upd} c={c} />)}
        </SBox>
      </div>
      <SBox c={c} title="🌙 Mood Tracker">
        <MoodPicker id="mood" vals={v} onChange={upd} c={c} moods={["🌞","🌤","⛅","🌧","⛈"]} />
      </SBox>
      <SBox c={c} title="🌸 Daily Affirmations">
        {Array.from({length:5}).map((_,i) => <ELine key={i} id={`aff${i}`} vals={v} onChange={upd} c={c} />)}
      </SBox>
    </>
  ),

  funky: (c, v, upd) => (
    <>
      <div style={{ background:c.accent, borderRadius:20, padding:"12px 20px", marginBottom:14, textAlign:"center" }}>
        <div style={{ fontSize:22, fontWeight:900, color:"white", letterSpacing:2 }}>BRAIN DUMP 🧠</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
        <SBox c={c} title="💡 Creative Notes" style={{ borderRadius:28, transform:"rotate(-1deg)" }}>
          <EArea id="creative" vals={v} onChange={upd} c={c} rows={6} />
        </SBox>
        <SBox c={c} title="💖 Currently Loving" style={{ borderRadius:28, transform:"rotate(1deg)" }}>
          {Array.from({length:5}).map((_,i) => <ELine key={i} id={`love${i}`} vals={v} onChange={upd} c={c} placeholder={`⭐ Something I love…`} />)}
        </SBox>
        <SBox c={c} title="🎨 Mood Tracker">
          <MoodPicker id="mood" vals={v} onChange={upd} c={c} moods={["😍","🤩","😊","😐","😤","😭","🤯"]} />
        </SBox>
        <SBox c={c} title="🌟 Weekly Highlights">
          {Array.from({length:5}).map((_,i) => <ELine key={i} id={`hl${i}`} vals={v} onChange={upd} c={c} />)}
        </SBox>
      </div>
    </>
  ),

  zen: (c, v, upd) => (
    <>
      <div style={{ textAlign:"center", marginBottom:14 }}>
        <div style={{ fontSize:20, fontWeight:300, color:c.text, fontFamily:"Georgia" }}>Daily Mindfulness 🕊</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
        <SBox c={c} title="🌬 Breathing Exercise">
          <div style={{ textAlign:"center", padding:"10px 0" }}>
            <div style={{ width:80, height:80, borderRadius:"50%", border:`2px solid ${c.accent}`, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", fontSize:10, color:c.accent }}>
              <span>Inhale</span><span>Hold</span><span>Exhale</span>
            </div>
          </div>
          <ELine id="breath_note" vals={v} onChange={upd} c={c} placeholder="Notes…" />
        </SBox>
        <SBox c={c} title="🎯 Today's Intentions">
          {Array.from({length:4}).map((_,i) => <ELine key={i} id={`int${i}`} vals={v} onChange={upd} c={c} />)}
        </SBox>
        <SBox c={c} title="🙏 Gratitude">
          {Array.from({length:4}).map((_,i) => <ELine key={i} id={`grat${i}`} vals={v} onChange={upd} c={c} />)}
        </SBox>
        <SBox c={c} title="🌊 Mood Reflection">
          <MoodPicker id="mood" vals={v} onChange={upd} c={c} />
          {Array.from({length:2}).map((_,i) => <ELine key={i} id={`mref${i}`} vals={v} onChange={upd} c={c} />)}
        </SBox>
      </div>
    </>
  ),

  prayer: (c, v, upd) => (
    <>
      <div style={{ textAlign:"center", marginBottom:14 }}>
        <div style={{ fontSize:22, fontWeight:400, fontFamily:"Georgia", color:c.text }}>✝ Prayer Journal</div>
      </div>
      <SBox c={c} title="🙏 Prayer Requests & Praise">
        {Array.from({length:5}).map((_,i) => <ELine key={i} id={`pr${i}`} vals={v} onChange={upd} c={c} />)}
      </SBox>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
        <SBox c={c} title="📖 Scripture of the Day">
          <ELine id="verse_ref" vals={v} onChange={upd} c={c} placeholder="Verse reference…" />
          <EArea id="verse_text" vals={v} onChange={upd} c={c} rows={4} placeholder="Write the verse…" />
        </SBox>
        <SBox c={c} title="✅ Answered Prayers">
          {Array.from({length:5}).map((_,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:c.accent, flexShrink:0 }} />
              <ELine id={`ans${i}`} vals={v} onChange={upd} c={c} style={{ flex:1, marginBottom:0 }} />
            </div>
          ))}
        </SBox>
      </div>
      <SBox c={c} title="⏰ Prayer Time Log">
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:4 }}>
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d,i) => (
            <div key={i} style={{ background:"white", border:`1.5px solid ${c.accent}`, borderRadius:8, padding:"6px 4px", textAlign:"center" }}>
              <div style={{ fontSize:10, fontWeight:700, color:c.text, marginBottom:4 }}>{d}</div>
              <input value={v[`ptl${i}`]||""} onChange={e=>upd(`ptl${i}`,e.target.value)} placeholder="min" style={{ width:"100%", border:"none", borderBottom:`1px solid ${c.border}`, background:"transparent", fontSize:10, textAlign:"center", outline:"none", fontFamily:"inherit", color:c.text }} />
            </div>
          ))}
        </div>
      </SBox>
      <SBox c={c} title="💭 Today's Reflections">
        <EArea id="pray_reflect" vals={v} onChange={upd} c={c} rows={3} />
      </SBox>
    </>
  ),

  parenting: (c, v, upd) => (
    <>
      <div style={{ textAlign:"center", marginBottom:14 }}>
        <div style={{ fontSize:22, fontWeight:600, color:c.text }}>👨‍👩‍👧‍👦 Family Planner</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
        <SBox c={c} title="📅 Kids' Schedule">
          {["☀️ Morning","🌤 Afternoon","🌙 Evening","🛏 Bedtime"].map((t,i) => (
            <div key={i} style={{ marginBottom:10 }}>
              <div style={{ fontSize:11, fontWeight:600, color:c.text, marginBottom:3 }}>{t}</div>
              <ELine id={`sch${i}`} vals={v} onChange={upd} c={c} style={{ marginBottom:0 }} />
            </div>
          ))}
        </SBox>
        <SBox c={c} title="🍽 Meal Planning">
          {["Breakfast","Lunch","Dinner","Snacks"].map((t,i) => (
            <div key={i} style={{ display:"flex", gap:8, marginBottom:8, alignItems:"center" }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:c.accent, flexShrink:0 }} />
              <span style={{ fontSize:11, fontWeight:600, color:c.text, width:65, flexShrink:0 }}>{t}</span>
              <ELine id={`meal${i}`} vals={v} onChange={upd} c={c} style={{ flex:1, marginBottom:0 }} />
            </div>
          ))}
        </SBox>
      </div>
      <SBox c={c} title="🛒 Shopping List">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
          {Array.from({length:9}).map((_,i) => <ECheck key={i} id={`shop${i}`} vals={v} onChange={upd} c={c} defaultLabel={`Item ${i+1}`} />)}
        </div>
      </SBox>
      <SBox c={c} title="🎉 Activities & Appointments">
        {Array.from({length:3}).map((_,i) => <ELine key={i} id={`act${i}`} vals={v} onChange={upd} c={c} />)}
      </SBox>
      <SBox c={c} title="❤️ Grateful For…">
        {Array.from({length:3}).map((_,i) => <ELine key={i} id={`pgrat${i}`} vals={v} onChange={upd} c={c} />)}
      </SBox>
    </>
  ),

  money: (c, v, upd) => (
    <>
      <div style={{ background:c.accent, borderRadius:10, padding:"12px 18px", marginBottom:14, textAlign:"center" }}>
        <div style={{ fontSize:20, fontWeight:700, color:"white" }}>💰 Financial Tracker</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
        <SBox c={c} title="📈 Income">
          {["Salary","Side Hustle","Other"].map((t,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8, borderBottom:`1px solid ${c.border}`, paddingBottom:4 }}>
              <span style={{ fontSize:11, color:c.text, width:80, flexShrink:0 }}>{t}</span>
              <input value={v[`inc${i}`]||""} onChange={e=>upd(`inc${i}`,e.target.value)} placeholder="$0.00" style={{ flex:1, border:"none", background:"transparent", fontSize:11, color:c.accent, textAlign:"right", outline:"none", fontFamily:"inherit" }} />
            </div>
          ))}
          <div style={{ display:"flex", justifyContent:"space-between", fontWeight:700, fontSize:12, color:c.accent }}>
            <span>TOTAL</span><span>${(["inc0","inc1","inc2"].reduce((s,k)=>s+(parseFloat(v[k])||0),0)).toFixed(2)}</span>
          </div>
        </SBox>
        <SBox c={c} title="📉 Expenses">
          {["Housing","Food","Transport","Other"].map((t,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8, borderBottom:`1px solid ${c.border}`, paddingBottom:4 }}>
              <span style={{ fontSize:11, color:c.text, width:80, flexShrink:0 }}>{t}</span>
              <input value={v[`exp${i}`]||""} onChange={e=>upd(`exp${i}`,e.target.value)} placeholder="$0.00" style={{ flex:1, border:"none", background:"transparent", fontSize:11, color:c.accent, textAlign:"right", outline:"none", fontFamily:"inherit" }} />
            </div>
          ))}
          <div style={{ display:"flex", justifyContent:"space-between", fontWeight:700, fontSize:12, color:c.accent }}>
            <span>TOTAL</span><span>${(["exp0","exp1","exp2","exp3"].reduce((s,k)=>s+(parseFloat(v[k])||0),0)).toFixed(2)}</span>
          </div>
        </SBox>
      </div>
      <SBox c={c} title="🎯 Savings Goals">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ background:"white", border:`1.5px solid ${c.border}`, borderRadius:8, padding:10 }}>
              <ELine id={`gname${i}`} vals={v} onChange={upd} c={c} placeholder={`Goal ${i+1}`} />
              <div style={{ fontSize:10, color:c.text, marginBottom:2 }}>Target:</div>
              <ELine id={`gtgt${i}`} vals={v} onChange={upd} c={c} placeholder="$0.00" />
              <div style={{ fontSize:10, color:c.text, marginBottom:2 }}>Saved:</div>
              <ELine id={`gsav${i}`} vals={v} onChange={upd} c={c} placeholder="$0.00" style={{ marginBottom:0 }} />
            </div>
          ))}
        </div>
      </SBox>
      <SBox c={c} title="📝 Financial Notes">
        <EArea id="moneynotes" vals={v} onChange={upd} c={c} rows={3} />
      </SBox>
    </>
  ),

  professional: (c, v, upd) => (
    <>
      <div style={{ background:c.accent, padding:"12px 18px", borderRadius:8, marginBottom:14 }}>
        <div style={{ fontSize:20, fontWeight:700, color:"white", letterSpacing:2, textAlign:"center" }}>DAILY PLANNER</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1.2fr 0.8fr", gap:14 }}>
        <SBox c={c} title="🕐 Schedule">
          {["8:00","9:00","10:00","11:00","12:00","1:00","2:00","3:00","4:00","5:00"].map((t,i) => (
            <div key={i} style={{ display:"flex", gap:10, marginBottom:7, alignItems:"center" }}>
              <span style={{ fontSize:10, color:c.accent, fontWeight:600, width:42, flexShrink:0 }}>{t}</span>
              <ELine id={`sched${i}`} vals={v} onChange={upd} c={c} style={{ flex:1, marginBottom:0 }} />
            </div>
          ))}
        </SBox>
        <div>
          <SBox c={c} title="⚡ Priority Tasks">
            {Array.from({length:7}).map((_,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
                <div style={{ width:16, height:16, borderRadius:"50%", border:`2px solid ${c.accent}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, color:c.accent, flexShrink:0 }}>{i+1}</div>
                <ELine id={`pri${i}`} vals={v} onChange={upd} c={c} style={{ flex:1, marginBottom:0 }} />
              </div>
            ))}
          </SBox>
          <SBox c={c} title="🎯 Goals">
            {["Today","This Week","This Month"].map((p,i) => (
              <div key={i} style={{ marginBottom:8 }}>
                <div style={{ fontSize:10, fontWeight:600, color:c.accent }}>{p}</div>
                <ELine id={`goal${i}`} vals={v} onChange={upd} c={c} style={{ marginBottom:0 }} />
              </div>
            ))}
          </SBox>
          <SBox c={c} title="📞 Meetings">
            {Array.from({length:3}).map((_,i) => (
              <div key={i} style={{ marginBottom:10 }}>
                <div style={{ display:"flex", gap:6, marginBottom:4 }}>
                  <span style={{ fontSize:10, fontWeight:600, color:c.text, width:30 }}>Time:</span>
                  <ELine id={`mtime${i}`} vals={v} onChange={upd} c={c} style={{ flex:1, marginBottom:0 }} />
                </div>
                <div style={{ display:"flex", gap:6 }}>
                  <span style={{ fontSize:10, fontWeight:600, color:c.text, width:30 }}>Topic:</span>
                  <ELine id={`mtopic${i}`} vals={v} onChange={upd} c={c} style={{ flex:1, marginBottom:0 }} />
                </div>
              </div>
            ))}
          </SBox>
        </div>
      </div>
    </>
  ),

  cozy: (c, v, upd) => (
    <>
      <div style={{ textAlign:"center", marginBottom:14 }}>
        <div style={{ fontSize:22, fontWeight:500, fontFamily:"Georgia", color:c.text }}>☕ Cozy Day Planner</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
        <SBox c={c} title="☀️ Morning Routine" style={{ borderRadius:24 }}>
          {["Wake up time","Breakfast","Self-care","Start work"].map((t,i) => (
            <div key={i} style={{ display:"flex", gap:8, alignItems:"center", marginBottom:8 }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:c.accent, flexShrink:0 }} />
              <ELine id={`morn${i}`} vals={v} onChange={upd} c={c} placeholder={t} style={{ flex:1, marginBottom:0 }} />
            </div>
          ))}
        </SBox>
        <SBox c={c} title="✨ Cozy Activities" style={{ borderRadius:24 }}>
          {Array.from({length:4}).map((_,i) => <ELine key={i} id={`cact${i}`} vals={v} onChange={upd} c={c} />)}
        </SBox>
      </div>
      <SBox c={c} title="💧 Nourishment Tracker" style={{ borderRadius:24 }}>
        <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
          <span style={{ fontSize:11, fontWeight:600, color:c.text }}>Water glasses:</span>
          {Array.from({length:8}).map((_,i) => (
            <div key={i} onClick={() => upd(`water${i}`, !v[`water${i}`])} style={{ width:26, height:26, borderRadius:"50%", border:`2px solid ${c.accent}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", background:v[`water${i}`]?c.accent:"transparent", fontSize:14 }}>
              {v[`water${i}`]?"✓":""}
            </div>
          ))}
        </div>
      </SBox>
      <SBox c={c} title="🌙 Evening Wind Down" style={{ borderRadius:24 }}>
        <EArea id="evening" vals={v} onChange={upd} c={c} rows={4} />
      </SBox>
    </>
  ),

  selfWellness: (c, v, upd) => (
    <>
      <div style={{ textAlign:"center", marginBottom:14 }}>
        <div style={{ fontSize:20, fontWeight:400, fontFamily:"Georgia", color:c.text }}>🌿 Wellness Journey</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:14 }}>
        {[{icon:"🧠",t:"MIND",items:["Meditation","Journaling","Learning","Mindfulness"]},
          {icon:"💪",t:"BODY",items:["Movement","Nutrition","Hydration","Rest"]},
          {icon:"✨",t:"SPIRIT",items:["Gratitude","Connection","Joy","Purpose"]}].map((col,ci)=>(
          <SBox key={ci} c={c} title={`${col.icon} ${col.t}`} style={{ marginBottom:0 }}>
            {col.items.map((item,j) => (
              <div key={j} style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
                <input type="checkbox" checked={v[`w${ci}_${j}`]||false} onChange={e=>upd(`w${ci}_${j}`,e.target.checked)} style={{ accentColor:c.accent, flexShrink:0, cursor:"pointer" }} />
                <span style={{ fontSize:11, color:c.text }}>{item}</span>
              </div>
            ))}
          </SBox>
        ))}
      </div>
      <SBox c={c} title="⚡ Energy Levels">
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:4 }}>
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d,i) => (
            <div key={i} style={{ background:"white", border:`1.5px solid ${c.accent}`, borderRadius:8, padding:"6px 4px", textAlign:"center" }}>
              <div style={{ fontSize:10, fontWeight:700, color:c.text, marginBottom:3 }}>{d}</div>
              <input value={v[`nrg${i}`]||""} onChange={e=>upd(`nrg${i}`,e.target.value)} placeholder="1-10" style={{ width:"100%", border:"none", borderBottom:`1px solid ${c.border}`, background:"transparent", fontSize:10, textAlign:"center", outline:"none", fontFamily:"inherit", color:c.text }} />
            </div>
          ))}
        </div>
      </SBox>
      <SBox c={c} title="💭 Reflections">
        <EArea id="wellreflect" vals={v} onChange={upd} c={c} rows={3} />
      </SBox>
    </>
  ),

  artistic: (c, v, upd) => (
    <>
      <div style={{ textAlign:"center", marginBottom:14, fontStyle:"italic" }}>
        <div style={{ fontSize:24, fontWeight:700, color:c.text, fontFamily:"Georgia" }}>Creative Journal 🎨</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
        <SBox c={c} title="💡 Creative Prompts">
          {Array.from({length:5}).map((_,i) => (
            <div key={i} style={{ display:"flex", gap:8, alignItems:"center", marginBottom:8 }}>
              <div style={{ width:20, height:20, borderRadius:"50%", border:`2px solid ${c.accent}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, color:c.accent, flexShrink:0 }}>{i+1}</div>
              <ELine id={`cp${i}`} vals={v} onChange={upd} c={c} style={{ flex:1, marginBottom:0 }} />
            </div>
          ))}
        </SBox>
        <SBox c={c} title="🖼 Sketch / Inspiration">
          <div style={{ background:"white", border:`2px dashed ${c.accent}`, borderRadius:8, height:120, display:"flex", alignItems:"center", justifyContent:"center", color:c.border, fontSize:12 }}>
            Sketch / paste inspiration here
          </div>
        </SBox>
      </div>
      <SBox c={c} title="🌈 Color Mood of the Day">
        <MoodPicker id="artmood" vals={v} onChange={upd} c={c} moods={["🔴","🟠","🟡","🟢","🔵","🟣","🩷"]} />
        <ELine id="artmood_note" vals={v} onChange={upd} c={c} placeholder="How does this color make you feel?" />
      </SBox>
      <SBox c={c} title="📝 Creative Notes">
        <EArea id="artnotes" vals={v} onChange={upd} c={c} rows={4} />
      </SBox>
    </>
  ),

  whimsical: (c, v, upd) => (
    <>
      <div style={{ textAlign:"center", marginBottom:14 }}>
        <div style={{ fontSize:24, fontWeight:600, fontFamily:"cursive", color:c.text }}>🦋 Dream Diary ✨</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
        <SBox c={c} title="✨ Dreams" style={{ borderRadius:40 }}>
          <EArea id="dreams" vals={v} onChange={upd} c={c} rows={4} />
        </SBox>
        <SBox c={c} title="🌙 Wishes" style={{ borderRadius:40 }}>
          {Array.from({length:4}).map((_,i) => <ELine key={i} id={`wish${i}`} vals={v} onChange={upd} c={c} placeholder="🌟 I wish…" />)}
        </SBox>
      </div>
      <SBox c={c} title="✨ Daily Magic Moments">
        <div style={{ display:"flex", gap:8, justifyContent:"space-around", padding:"4px 0", flexWrap:"wrap" }}>
          {Array.from({length:7}).map((_,i) => (
            <div key={i} style={{ textAlign:"center" }}>
              <div onClick={() => upd(`magic${i}`, !v[`magic${i}`])} style={{ width:34, height:34, borderRadius:"50%", border:`2px solid ${c.accent}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:18, background:v[`magic${i}`]?c.accent:"transparent" }}>⭐</div>
              <input value={v[`mtext${i}`]||""} onChange={e=>upd(`mtext${i}`,e.target.value)} placeholder="moment…" style={{ width:50, border:"none", borderBottom:`1px solid ${c.border}`, background:"transparent", fontSize:9, textAlign:"center", outline:"none", fontFamily:"inherit", color:c.text, marginTop:3 }} />
            </div>
          ))}
        </div>
      </SBox>
      <SBox c={c} title="🦋 Today's Story" style={{ borderRadius:30 }}>
        <EArea id="wstory" vals={v} onChange={upd} c={c} rows={4} />
      </SBox>
      <SBox c={c} title="🌈 Mood Rainbow">
        <MoodPicker id="wmood" vals={v} onChange={upd} c={c} moods={["🌞","🌤","🌈","⭐","🌙"]} />
      </SBox>
    </>
  ),

  luxury: (c, v, upd) => (
    <div style={{ border:`3px solid ${c.accent}`, borderRadius:4, padding:4 }}>
      <div style={{ border:`1px solid ${c.accent}`, borderRadius:2, padding:16 }}>
        <div style={{ textAlign:"center", marginBottom:16 }}>
          <div style={{ fontSize:26, fontWeight:700, color:c.accent, fontFamily:"serif", letterSpacing:4 }}>PLANNER</div>
          <div style={{ borderBottom:`2px solid ${c.accent}`, margin:"8px auto", width:200 }} />
        </div>
        <SBox c={c} title="PRIORITIES" style={{ letterSpacing:2 }}>
          {[1,2,3,4,5].map(i => (
            <div key={i} style={{ display:"flex", gap:12, alignItems:"center", padding:"6px 0", borderBottom:`1px solid ${c.border}` }}>
              <span style={{ fontSize:18, fontWeight:700, color:c.accent, width:20 }}>{i}</span>
              <ELine id={`lux${i}`} vals={v} onChange={upd} c={c} style={{ flex:1, marginBottom:0 }} />
            </div>
          ))}
        </SBox>
        <SBox c={c} title="SCHEDULE" style={{ letterSpacing:2 }}>
          {["MORNING","AFTERNOON","EVENING"].map((p,i) => (
            <div key={i} style={{ marginBottom:12 }}>
              <div style={{ fontSize:11, color:c.accent, fontWeight:700, letterSpacing:3, marginBottom:6 }}>{p}</div>
              <EArea id={`luxsched${i}`} vals={v} onChange={upd} c={c} rows={2} />
            </div>
          ))}
        </SBox>
        <SBox c={c} title="NOTES" style={{ letterSpacing:2, marginBottom:0 }}>
          <EArea id="luxnotes" vals={v} onChange={upd} c={c} rows={3} />
        </SBox>
      </div>
    </div>
  ),

  elegant: (c, v, upd) => (
    <>
      <div style={{ textAlign:"center", marginBottom:14 }}>
        <div style={{ fontSize:24, fontWeight:400, fontFamily:"Georgia", color:c.text }}>Daily Planner</div>
        <div style={{ borderBottom:`1px solid ${c.accent}`, margin:"6px auto", width:180 }} />
      </div>
      {["Morning","Afternoon","Evening"].map((period,i) => (
        <SBox key={i} c={c} title={period} style={{ fontFamily:"Georgia" }}>
          <EArea id={`eleg${i}`} vals={v} onChange={upd} c={c} rows={3} />
        </SBox>
      ))}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <SBox c={c} title="Important Tasks">
          {Array.from({length:5}).map((_,i) => <ECheck key={i} id={`etask${i}`} vals={v} onChange={upd} c={c} defaultLabel={`Task ${i+1}`} />)}
        </SBox>
        <SBox c={c} title="Notes" style={{ marginBottom:0 }}>
          <EArea id="elegnotes" vals={v} onChange={upd} c={c} rows={6} />
        </SBox>
      </div>
    </>
  ),

  journal: (c, v, upd) => (
    <div style={{ padding:"0 10px" }}>
      <div style={{ textAlign:"center", marginBottom:16 }}>
        <div style={{ fontSize:26, fontWeight:400, fontFamily:"Georgia", color:c.text }}>Journal</div>
        <div style={{ borderBottom:`1px solid ${c.accent}`, margin:"6px auto", width:100 }} />
      </div>
      <div style={{ display:"flex", gap:20, marginBottom:12 }}>
        <div style={{ display:"flex", gap:6, alignItems:"center" }}>
          <span style={{ fontSize:11, color:c.text }}>Date:</span>
          <ELine id="jdate" vals={v} onChange={upd} c={c} style={{ width:120, marginBottom:0 }} />
        </div>
        <div style={{ display:"flex", gap:6, alignItems:"center" }}>
          <span style={{ fontSize:11, color:c.text }}>Mood:</span>
          <ELine id="jmood" vals={v} onChange={upd} c={c} style={{ width:100, marginBottom:0 }} />
        </div>
      </div>
      <EArea id="jbody" vals={v} onChange={upd} c={c} rows={28} placeholder="Start writing…" />
    </div>
  ),

  dreamJournal: (c, v, upd) => (
    <>
      <div style={{ textAlign:"center", marginBottom:14 }}>
        <div style={{ fontSize:22, fontWeight:500, fontFamily:"Georgia", color:c.text }}>🌙 Dream Journal</div>
      </div>
      <SBox c={c} title="Sleep Info">
        <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
          {["Date","Bedtime","Wake time","Sleep quality (1-10)"].map((lbl,i) => (
            <div key={i} style={{ display:"flex", gap:6, alignItems:"center" }}>
              <span style={{ fontSize:11, color:c.text, whiteSpace:"nowrap" }}>{lbl}:</span>
              <ELine id={`dj_info${i}`} vals={v} onChange={upd} c={c} style={{ width:80, marginBottom:0 }} />
            </div>
          ))}
        </div>
      </SBox>
      <SBox c={c} title="🌙 Dream Description">
        <EArea id="djdesc" vals={v} onChange={upd} c={c} rows={5} placeholder="Describe your dream in detail…" />
      </SBox>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <SBox c={c} title="🔑 Key Elements">
          {["People","Places","Objects","Emotions"].map((t,i) => (
            <div key={i} style={{ display:"flex", gap:6, alignItems:"center", marginBottom:8 }}>
              <span style={{ fontSize:10, fontWeight:600, color:c.text, width:55, flexShrink:0 }}>{t}:</span>
              <ELine id={`djel${i}`} vals={v} onChange={upd} c={c} style={{ flex:1, marginBottom:0 }} />
            </div>
          ))}
        </SBox>
        <SBox c={c} title="💫 Dream Mood">
          <MoodPicker id="djmood" vals={v} onChange={upd} c={c} moods={["😊","😌","😐","😨","🤩"]} />
        </SBox>
      </div>
      <SBox c={c} title="🔮 Symbols & Meanings">
        <EArea id="djsymbols" vals={v} onChange={upd} c={c} rows={3} />
      </SBox>
      <SBox c={c} title="💭 My Interpretation">
        <EArea id="djinterp" vals={v} onChange={upd} c={c} rows={3} />
      </SBox>
    </>
  ),

  kidsChores: (c, v, upd) => (
    <>
      <div style={{ background:c.accent, borderRadius:16, padding:"14px 20px", marginBottom:14, textAlign:"center" }}>
        <div style={{ fontSize:22, fontWeight:700, color:"white" }}>⭐ MY CHORE CHART ⭐</div>
        <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:6, alignItems:"center" }}>
          <span style={{ fontSize:13, color:"white" }}>Name:</span>
          <input value={v["kidname"]||""} onChange={e=>upd("kidname",e.target.value)} placeholder="Your name" style={{ background:"rgba(255,255,255,0.3)", border:"none", borderBottom:"2px solid white", color:"white", fontSize:13, fontWeight:600, outline:"none", fontFamily:"inherit", padding:"2px 6px", width:120 }} />
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
        {[{icon:"🐾",t:"PET CARE",items:["Feed pets","Water bowl","Walk dog","Clean cage"]},
          {icon:"📚",t:"HOMEWORK",items:["Reading","Math","Writing","Study time"]},
          {icon:"🛁",t:"HYGIENE",items:["Brush teeth AM","Brush teeth PM","Shower/Bath","Wash hands"]},
          {icon:"🧹",t:"CLEANING",items:["Make bed","Clean room","Put away toys","Help dishes"]}
        ].map((sec,si) => (
          <SBox key={si} c={c} title={`${sec.icon} ${sec.t}`} style={{ borderRadius:16, border:`3px solid ${c.border}`, marginBottom:0 }}>
            {sec.items.map((item,j) => (
              <div key={j} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                <input type="checkbox" checked={v[`kc_${si}_${j}`]||false} onChange={e=>upd(`kc_${si}_${j}`,e.target.checked)} style={{ accentColor:c.accent, width:14, height:14, cursor:"pointer", flexShrink:0 }} />
                <span style={{ fontSize:11, color:c.text }}>{item}</span>
                <DayTracker id={`kcd_${si}_${j}`} vals={v} onChange={upd} c={c} />
              </div>
            ))}
          </SBox>
        ))}
      </div>
      <div style={{ background:"white", border:`3px solid ${c.accent}`, borderRadius:16, padding:14, marginBottom:12 }}>
        <div style={{ fontSize:13, fontWeight:700, color:c.accent, marginBottom:10, textTransform:"uppercase", letterSpacing:1 }}>🌟 Star Points</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:4 }}>
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d,i) => (
            <div key={i} style={{ textAlign:"center" }}>
              <div style={{ fontSize:10, fontWeight:700, color:c.text, marginBottom:4 }}>{d}</div>
              <input value={v[`stars${i}`]||""} onChange={e=>upd(`stars${i}`,e.target.value)} placeholder="⭐" style={{ width:"100%", border:"none", borderBottom:`2px solid ${c.accent}`, background:"transparent", fontSize:16, textAlign:"center", outline:"none", fontFamily:"inherit" }} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ background:c.accent, borderRadius:16, padding:16 }}>
        <div style={{ fontSize:15, fontWeight:700, color:"white", textAlign:"center", marginBottom:12 }}>🎁 REWARDS & GOALS 🎁</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {["Goal for this week","Reward when done"].map((lbl,i) => (
            <div key={i} style={{ background:"white", borderRadius:10, padding:12 }}>
              <div style={{ fontSize:12, fontWeight:600, color:c.text, marginBottom:6 }}>{lbl}:</div>
              <EArea id={`reward${i}`} vals={v} onChange={upd} c={c} rows={2} />
            </div>
          ))}
        </div>
      </div>
    </>
  ),
};

/* ── OPTIONAL SECTIONS ───────────────────────────────────────────────────── */
const OPTIONAL = {
  monthlyReset:    { name:"Monthly Reset",       render:(c,v,u)=>(<SBox c={c} title="🔄 Monthly Reset"><EArea id="opt_mr1" vals={v} onChange={u} c={c} rows={2} placeholder="What worked this month…"/><EArea id="opt_mr2" vals={v} onChange={u} c={c} rows={2} placeholder="What to improve…"/><EArea id="opt_mr3" vals={v} onChange={u} c={c} rows={2} placeholder="Next month's focus…"/></SBox>) },
  weeklyCheckin:   { name:"Weekly Check-in",      render:(c,v,u)=>(<SBox c={c} title="✅ Weekly Check-in">{["Wins","Challenges","Lessons"].map((t,i)=><div key={i} style={{marginBottom:10}}><div style={{fontSize:11,fontWeight:600,color:c.text,marginBottom:4}}>{t}:</div><EArea id={`opt_wci${i}`} vals={v} onChange={u} c={c} rows={2}/></div>)}</SBox>) },
  moodTracker:     { name:"Mood Tracker",         render:(c,v,u)=>(<SBox c={c} title="😊 Mood Tracker"><MoodPicker id="opt_mood" vals={v} onChange={u} c={c}/></SBox>) },
  habitStreaks:    { name:"Habit Streaks 🔥",     render:(c,v,u)=>(<SBox c={c} title="🔥 Habit Streaks">{[0,1,2,3].map(i=><HabitRow key={i} id={`opt_hab${i}`} vals={v} onChange={u} c={c} placeholder={`Habit ${i+1}`}/>)}</SBox>) },
  progressBars:    { name:"Progress Tracker",     render:(c,v,u)=>(<SBox c={c} title="📊 Progress Tracker">{[0,1,2,3].map(i=><div key={i} style={{marginBottom:10}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><input value={v[`opt_pg_lbl${i}`]||""} onChange={e=>u(`opt_pg_lbl${i}`,e.target.value)} placeholder={`Goal ${i+1}`} style={{border:"none",borderBottom:`1px solid ${c.border}`,background:"transparent",fontSize:11,color:c.text,outline:"none",fontFamily:"inherit",width:140}}/><input value={v[`opt_pg_pct${i}`]||""} onChange={e=>u(`opt_pg_pct${i}`,e.target.value)} placeholder="%" style={{border:"none",borderBottom:`1px solid ${c.border}`,background:"transparent",fontSize:11,color:c.accent,textAlign:"right",outline:"none",fontFamily:"inherit",width:40}}/></div><div style={{height:10,background:"white",borderRadius:5,border:`1px solid ${c.border}`}}><div style={{height:"100%",borderRadius:5,background:c.accent,width:`${Math.min(parseFloat(v[`opt_pg_pct${i}`])||0,100)}%`,transition:"width 0.3s"}}/></div></div>)}</SBox>) },
  winsLessons:     { name:"Wins & Lessons",       render:(c,v,u)=>(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}><SBox c={c} title="🎉 Wins"><EArea id="opt_wins" vals={v} onChange={u} c={c} rows={4}/></SBox><SBox c={c} title="📚 Lessons"><EArea id="opt_lessons" vals={v} onChange={u} c={c} rows={4}/></SBox></div>) },
  affirmations:    { name:"Affirmations",         render:(c,v,u)=>(<SBox c={c} title="✨ Daily Affirmations">{[0,1,2,3,4].map(i=><ELine key={i} id={`opt_aff${i}`} vals={v} onChange={u} c={c} placeholder="I am…"/>)}</SBox>) },
  gratitude:       { name:"Gratitude",            render:(c,v,u)=>(<SBox c={c} title="🙏 Gratitude">{[0,1,2,3,4].map(i=><ELine key={i} id={`opt_grat${i}`} vals={v} onChange={u} c={c} placeholder="I'm grateful for…"/>)}</SBox>) },
  lettingGo:       { name:"Letting Go",           render:(c,v,u)=>(<SBox c={c} title="🍃 Things I'm Letting Go">{[0,1,2,3].map(i=><ELine key={i} id={`opt_lg${i}`} vals={v} onChange={u} c={c}/>)}</SBox>) },
  excitedAbout:    { name:"Excited About",        render:(c,v,u)=>(<SBox c={c} title="⭐ Things I'm Excited About">{[0,1,2,3].map(i=><ELine key={i} id={`opt_ea${i}`} vals={v} onChange={u} c={c} placeholder="⭐ I'm excited about…"/>)}</SBox>) },
  dailyJournal:    { name:"Daily Journal",        render:(c,v,u)=>(<SBox c={c} title="📓 Daily Journal"><EArea id="opt_dj" vals={v} onChange={u} c={c} rows={6}/></SBox>) },
  visionBoard:     { name:"Vision Board",         render:(c,v,u)=>(<SBox c={c} title="✨ Vision Board"><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>{[0,1,2,3,4,5].map(i=><div key={i} style={{background:"white",border:`2px dashed ${c.accent}`,borderRadius:8,padding:6,minHeight:70}}><EArea id={`opt_vb${i}`} vals={v} onChange={u} c={c} rows={2}/></div>)}</div></SBox>) },
  gentleReminders: { name:"Gentle Reminders",     render:(c,v,u)=>(<SBox c={c} title="💝 Gentle Reminders">{["✨ You are doing your best","🌸 Progress, not perfection","💫 Rest is productive too","🌟 Small steps count"].map((r,i)=><div key={i} style={{background:"white",border:`1px solid ${c.accent}`,borderRadius:20,padding:"5px 14px",marginBottom:6,fontSize:11,color:c.text,textAlign:"center"}}>{r}</div>)}</SBox>) },
  sleepLog:        { name:"Sleep Log",            render:(c,v,u)=>(<SBox c={c} title="💤 Sleep Log"><div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4}}>{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d,i)=><div key={i} style={{textAlign:"center",background:"white",border:`1.5px solid ${c.accent}`,borderRadius:8,padding:"6px 4px"}}><div style={{fontSize:10,fontWeight:700,color:c.text,marginBottom:4}}>{d}</div><input value={v[`opt_sl${i}`]||""} onChange={e=>u(`opt_sl${i}`,e.target.value)} placeholder="hrs" style={{width:"100%",border:"none",borderBottom:`1px solid ${c.border}`,background:"transparent",fontSize:10,textAlign:"center",outline:"none",fontFamily:"inherit",color:c.text}}/></div>)}</div></SBox>) },
  stressScale:     { name:"Stress Scale",         render:(c,v,u)=>(<SBox c={c} title="🌊 Stress Scale"><div style={{display:"flex",justifyContent:"space-between",padding:"6px 0"}}>{[1,2,3,4,5,6,7,8,9,10].map(n=><div key={n} onClick={()=>u("opt_stress",n)} style={{width:26,height:26,borderRadius:"50%",border:`2px solid ${c.accent}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:11,fontWeight:700,background:v["opt_stress"]===n?c.accent:"transparent",color:v["opt_stress"]===n?"white":c.accent}}>{n}</div>)}</div><ELine id="opt_stress_note" vals={v} onChange={u} c={c} placeholder="Notes about your stress…"/></SBox>) },
  doodleSpace:     { name:"Doodle Space",         render:(c,v,u)=>(<SBox c={c} title="✏️ Doodle Space / Notes"><EArea id="opt_doodle" vals={v} onChange={u} c={c} rows={8}/></SBox>) },
  weeklyReview:    { name:"Weekly Review",        render:(c,v,u)=>(<SBox c={c} title="🎯 Weekly Review"><EArea id="opt_wr1" vals={v} onChange={u} c={c} rows={3} placeholder="What I accomplished…"/><EArea id="opt_wr2" vals={v} onChange={u} c={c} rows={2} placeholder="Next week's focus…"/></SBox>) },
};

/* ── MAIN APP ────────────────────────────────────────────────────────────── */
export default function PlannerGenerator() {
  const [auth, setAuth]           = useState(false);
  const [code, setCode]           = useState("");
  const [tmpl, setTmpl]           = useState("minimalist");
  const [optionals, setOptionals] = useState([]);
  const [customColors, setCC]     = useState(null);
  const [font, setFont]           = useState("'Segoe UI',sans-serif");
  const [values, setValues]       = useState({});
  const [exporting, setExp]       = useState(false);
  const previewRef                = useRef(null);

  const c   = { ...TEMPLATES[tmpl], ...(customColors || {}) };
  const upd = (k, val) => setValues(prev => ({ ...prev, [k]: val }));

  const login = () => { if (code === "PLAN2024") setAuth(true); else alert("Invalid code"); };

  const loadScript = (src) => new Promise((res, rej) => {
    if (document.querySelector(`script[src="${src}"]`)) { res(); return; }
    const s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s);
  });

  const exportPDF = async () => {
    setExp(true);
    try {
      await Promise.all([
        loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"),
        loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"),
      ]);
      const el = previewRef.current;
      const canvas = await window.html2canvas(el, { scale: 2, useCORS: true, backgroundColor: c.bg, logging: false, width: el.offsetWidth, height: el.offsetHeight });
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pw = pdf.internal.pageSize.getWidth();
      const ph = pdf.internal.pageSize.getHeight();
      const iw = canvas.width;
      const ih = canvas.height;
      const ratio = iw / ih;
      let finalW = pw, finalH = pw / ratio;
      if (finalH > ph) { finalH = ph; finalW = ph * ratio; }
      const xOff = (pw - finalW) / 2;
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", xOff, 0, finalW, finalH);
      pdf.save(`${tmpl}-planner-filled.pdf`);
    } catch(e) { alert("PDF export failed: " + e.message); }
    setExp(false);
  };

  const exportPNG = async () => {
    setExp(true);
    try {
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
      const el = previewRef.current;
      const canvas = await window.html2canvas(el, { scale: 3, useCORS: true, backgroundColor: c.bg, logging: false });
      const link = document.createElement("a");
      link.download = `${tmpl}-planner-filled.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch(e) { alert("PNG export failed: " + e.message); }
    setExp(false);
  };

  const clearAll = () => { if (window.confirm("Clear all filled-in text?")) setValues({}); };

  /* ── Login ── */
  if (!auth) return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#fce4ec,#e3f2fd)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"sans-serif" }}>
      <div style={{ background:"white", borderRadius:24, boxShadow:"0 20px 60px rgba(0,0,0,0.15)", padding:40, width:360, textAlign:"center" }}>
        <div style={{ fontSize:40, marginBottom:16 }}>🔒</div>
        <h1 style={{ fontSize:24, fontWeight:700, margin:"0 0 8px" }}>Planner Generator</h1>
        <p style={{ color:"#666", marginBottom:24, fontSize:14 }}>Enter your access code</p>
        <input value={code} onChange={e=>setCode(e.target.value)} onKeyPress={e=>e.key==="Enter"&&login()} placeholder="Access Code" style={{ width:"100%", padding:"12px 16px", border:"2px solid #eee", borderRadius:12, fontSize:14, marginBottom:16, boxSizing:"border-box", outline:"none" }} />
        <button onClick={login} style={{ width:"100%", padding:13, background:"linear-gradient(135deg,#f06292,#ab47bc)", color:"white", border:"none", borderRadius:12, fontSize:15, fontWeight:600, cursor:"pointer" }}>Enter →</button>
        <p style={{ color:"#aaa", fontSize:11, marginTop:16 }}>Code: PLAN2024</p>
      </div>
    </div>
  );

  /* ── App ── */
  return (
    <div style={{ minHeight:"100vh", background:"#f1f3f5", fontFamily:"sans-serif" }}>

      {/* Header */}
      <div style={{ background:"white", borderBottom:"1px solid #e9ecef", padding:"10px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
        <h1 style={{ fontSize:18, fontWeight:700, margin:0 }}>✨ Planner Generator</h1>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <button onClick={clearAll} style={{ padding:"7px 12px", background:"#f8f9fa", color:"#666", border:"1px solid #dee2e6", borderRadius:8, fontSize:12, cursor:"pointer" }}>
            🗑 Clear
          </button>
          <button onClick={exportPNG} disabled={exporting} style={{ padding:"7px 14px", background:"linear-gradient(135deg,#43a047,#26c6da)", color:"white", border:"none", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer" }}>
            ↓ PNG
          </button>
          <button onClick={exportPDF} disabled={exporting} style={{ padding:"7px 14px", background:"linear-gradient(135deg,#7c3aed,#db2777)", color:"white", border:"none", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer" }}>
            ↓ {exporting ? "Exporting…" : "Save as PDF"}
          </button>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"270px 1fr", height:"calc(100vh - 53px)" }}>

        {/* Sidebar */}
        <div style={{ background:"white", borderRight:"1px solid #e9ecef", overflowY:"auto", padding:16 }}>

          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#6c757d", marginBottom:6, textTransform:"uppercase", letterSpacing:1 }}>Template</div>
            <select value={tmpl} onChange={e=>{ setTmpl(e.target.value); setCC(null); setValues({}); }} style={{ width:"100%", padding:"8px 10px", border:"2px solid #e9ecef", borderRadius:8, fontSize:13, outline:"none" }}>
              {Object.entries(TEMPLATES).map(([k,t])=><option key={k} value={k}>{t.name}</option>)}
            </select>
          </div>

          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#6c757d", marginBottom:6, textTransform:"uppercase", letterSpacing:1 }}>Font</div>
            <select value={font} onChange={e=>setFont(e.target.value)} style={{ width:"100%", padding:"8px 10px", border:"2px solid #e9ecef", borderRadius:8, fontSize:13, outline:"none" }}>
              <option value="'Segoe UI',sans-serif">Default</option>
              <option value="Georgia,serif">Serif</option>
              <option value="cursive">Handwriting</option>
              <option value="'Courier New',monospace">Typewriter</option>
            </select>
          </div>

          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#6c757d", marginBottom:6, textTransform:"uppercase", letterSpacing:1 }}>Colors</div>
            {[["accent","Accent"],["border","Border"],["text","Text"],["bg","Background"],["primary","Section Fill"]].map(([key,label])=>(
              <div key={key} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                <span style={{ fontSize:11, color:"#666", width:80 }}>{label}</span>
                <input type="color" value={(customColors?.[key])||c[key]} onChange={e=>setCC(prev=>({...(prev||{}),[key]:e.target.value}))} style={{ width:32, height:24, border:"2px solid #e9ecef", borderRadius:4, cursor:"pointer", padding:2 }} />
              </div>
            ))}
            <button onClick={()=>setCC(null)} style={{ fontSize:11, color:"#888", background:"none", border:"1px solid #ddd", borderRadius:6, padding:"3px 8px", cursor:"pointer", marginTop:4 }}>Reset Colors</button>
          </div>

          <div>
            <div style={{ fontSize:11, fontWeight:700, color:"#6c757d", marginBottom:6, textTransform:"uppercase", letterSpacing:1 }}>Optional Sections</div>
            {Object.entries(OPTIONAL).map(([key,sec])=>(
              <label key={key} style={{ display:"flex", alignItems:"center", gap:8, padding:"5px 8px", borderRadius:7, cursor:"pointer", marginBottom:3, background:optionals.includes(key)?c.primary:"transparent", border:`1px solid ${optionals.includes(key)?c.accent:"#e9ecef"}` }}>
                <input type="checkbox" checked={optionals.includes(key)} onChange={()=>setOptionals(prev=>prev.includes(key)?prev.filter(k=>k!==key):[...prev,key])} style={{ accentColor:c.accent }} />
                <span style={{ fontSize:11, color:"#333" }}>{sec.name}</span>
              </label>
            ))}
          </div>

        </div>

        {/* Preview / Edit area */}
        <div style={{ overflowY:"auto", background:"#e9ecef", padding:24 }}>
          <div style={{ background:"white", borderRadius:4, boxShadow:"0 4px 24px rgba(0,0,0,0.12)", maxWidth:794, margin:"0 auto" }}>
            <div ref={previewRef} style={{ background:c.bg, fontFamily:font, padding:36, minHeight:1000 }}>

              {/* Top row */}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20, paddingBottom:12, borderBottom:`2px solid ${c.border}` }}>
                <div style={{ fontSize:11, color:c.accent, fontWeight:600, letterSpacing:2, textTransform:"uppercase" }}>{TEMPLATES[tmpl].name}</div>
                <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                  <span style={{ fontSize:11, color:c.text }}>Date:</span>
                  <input value={values["page_date"]||""} onChange={e=>upd("page_date",e.target.value)} placeholder="Today's date" style={{ border:"none", borderBottom:`1px solid ${c.border}`, background:"transparent", fontSize:11, color:c.text, outline:"none", fontFamily:"inherit", width:130 }} />
                </div>
              </div>

              {/* Template layout */}
              {LAYOUTS[tmpl] ? LAYOUTS[tmpl](c, values, upd) : <div>Template not found</div>}

              {/* Optional sections */}
              {optionals.length > 0 && (
                <div style={{ marginTop:20, paddingTop:16, borderTop:`2px solid ${c.border}` }}>
                  {optionals.map(key => (
                    <div key={key}>{OPTIONAL[key].render(c, values, upd)}</div>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div style={{ marginTop:20, paddingTop:10, borderTop:`1px solid ${c.border}`, textAlign:"center", fontSize:9, color:c.border }}>
                Made with Planner Generator
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
