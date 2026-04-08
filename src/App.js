import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const BACKEND_URL = 'https://cbg-backend-production-fdd7.up.railway.app';

/* ─── Fallback static data ─── */
const STATIC_CURVE = [
  {date:"Jan 1",nav:9999.9},{date:"Jan 2",nav:10033.82},{date:"Jan 3",nav:10044.16},
  {date:"Jan 4",nav:10051.29},{date:"Jan 5",nav:10153.42},{date:"Jan 6",nav:10183.84},
  {date:"Jan 7",nav:10169.08},{date:"Jan 8",nav:10173.87},{date:"Jan 9",nav:10145.63},
  {date:"Jan 10",nav:10041.98},{date:"Jan 11",nav:10047.08},{date:"Jan 12",nav:10051.11},
  {date:"Jan 13",nav:10059.26},{date:"Jan 14",nav:10091.35},{date:"Jan 15",nav:10114.39},
  {date:"Jan 16",nav:10140.43},{date:"Jan 17",nav:10140.48},{date:"Jan 18",nav:10138.5},
  {date:"Jan 19",nav:10133.42},{date:"Jan 20",nav:10104.63},{date:"Jan 21",nav:10097.21},
  {date:"Jan 22",nav:10097.36},{date:"Jan 23",nav:10098.72},{date:"Jan 24",nav:10100.54},
  {date:"Jan 25",nav:10090.69},{date:"Jan 26",nav:10089.82},{date:"Jan 27",nav:10133.08},
  {date:"Jan 28",nav:10171.47},{date:"Jan 29",nav:10157.68},{date:"Jan 30",nav:10161.32},
  {date:"Jan 31",nav:10180.61},{date:"Feb 1",nav:10170.71},{date:"Feb 2",nav:10185.43},
  {date:"Feb 3",nav:10184.89},{date:"Feb 4",nav:10181.85},{date:"Feb 5",nav:10109.91},
  {date:"Feb 6",nav:10206.73},{date:"Feb 7",nav:10188.11},{date:"Feb 8",nav:10192.12},
  {date:"Feb 9",nav:10168.37},{date:"Feb 10",nav:10212.35},{date:"Feb 11",nav:10299.67},
  {date:"Feb 12",nav:10341.51},{date:"Feb 13",nav:10349.95},{date:"Feb 14",nav:10339.27},
  {date:"Feb 15",nav:10332.33},{date:"Feb 16",nav:10301.93},{date:"Feb 17",nav:10309.53},
  {date:"Feb 18",nav:10312.04},{date:"Feb 19",nav:10316.29},{date:"Feb 20",nav:10328.55},
  {date:"Feb 21",nav:10327.67},{date:"Feb 22",nav:10308.43},{date:"Feb 23",nav:10308.64},
  {date:"Feb 24",nav:10302.41},{date:"Feb 25",nav:10322.51},{date:"Feb 26",nav:10325.99},
  {date:"Feb 27",nav:10344.68},{date:"Feb 28",nav:10338.49},{date:"Mar 1",nav:10335.43},
  {date:"Mar 2",nav:10333.47},{date:"Mar 3",nav:10344.72},{date:"Mar 4",nav:10362.05},
  {date:"Mar 5",nav:10345.79},{date:"Mar 6",nav:10360.31},{date:"Mar 7",nav:10360.18},
  {date:"Mar 8",nav:10370.31},{date:"Mar 9",nav:10379.41},{date:"Mar 10",nav:10388.57},
  {date:"Mar 11",nav:10390.62},{date:"Mar 12",nav:10438.32},{date:"Mar 13",nav:10439.37},
  {date:"Mar 14",nav:10434.69},{date:"Mar 15",nav:10446.75},{date:"Mar 16",nav:10484.23},
  {date:"Mar 17",nav:10490.06},{date:"Mar 18",nav:10442.61},{date:"Mar 19",nav:10417.78},
  {date:"Mar 20",nav:10404.52},{date:"Mar 22",nav:10396.65},{date:"Mar 23",nav:10427.4},
  {date:"Mar 24",nav:10490.59},{date:"Mar 25",nav:10502.33},{date:"Mar 26",nav:10512.7},
  {date:"Mar 27",nav:10524.03},{date:"Mar 29",nav:10521.48},{date:"Mar 30",nav:10501.01},
  {date:"Mar 31",nav:10456.91},
];

/* ─── Styles ─── */
const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Bricolage+Grotesque:wght@300;400;500;600;700;800&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    body,#root{font-family:'Inter',sans-serif;background:#f8f9ff;color:#0f1117;min-height:100vh;}
    ::-webkit-scrollbar{width:4px;}
    ::-webkit-scrollbar-thumb{background:#d0d5ea;border-radius:2px;}
    @keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
    @keyframes floatCard{0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);}}
    .fade-up{animation:fadeUp 0.8s cubic-bezier(.16,1,.3,1) both;}
    .d1{animation-delay:0.05s;}.d2{animation-delay:0.15s;}.d3{animation-delay:0.25s;}
    .d4{animation-delay:0.35s;}.d5{animation-delay:0.45s;}
    .pill{display:inline-flex;align-items:center;gap:6px;background:#fff;border:1.5px solid #e2e7f5;border-radius:999px;padding:5px 14px;font-size:12px;font-weight:500;color:#4a6fa5;}
    .pill-num{width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,#4f8ef7,#a78bfa);color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;}
    .nav{position:sticky;top:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:18px 48px;background:rgba(248,249,255,0.85);backdrop-filter:blur(16px);border-bottom:1px solid rgba(200,210,240,0.4);}
    .logo{font-family:'Bricolage Grotesque',sans-serif;font-size:16px;font-weight:700;color:#0f1117;letter-spacing:-0.02em;}
    .logo span{color:#4f8ef7;}
    .nav-btn{background:linear-gradient(135deg,#4f8ef7,#6d6bf5);color:#fff;border:none;border-radius:999px;padding:9px 22px;font-size:13px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:opacity 0.2s;}
    .nav-btn:hover{opacity:0.88;}
    .live-dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:#22c55e;margin-right:6px;animation:pulse 2s infinite;}
    @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.4;}}
    .hero{min-height:calc(100vh - 61px);display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;padding:60px 48px 80px;max-width:1200px;margin:0 auto;}
    @media(max-width:900px){.hero{grid-template-columns:1fr;padding:40px 24px;}}
    .hero-badge{margin-bottom:28px;}
    .hero-title{font-family:'Bricolage Grotesque',sans-serif;font-size:clamp(36px,4.5vw,58px);font-weight:800;line-height:1.08;letter-spacing:-0.03em;color:#0a0e1a;margin-bottom:20px;}
    .hero-sub{font-size:16px;line-height:1.7;color:#5a6478;max-width:480px;margin-bottom:36px;}
    .btn-row{display:flex;gap:14px;flex-wrap:wrap;}
    .btn-primary{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#4f8ef7,#6d6bf5);color:#fff;border:none;border-radius:999px;padding:13px 28px;font-size:14px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.2s;}
    .btn-primary:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(79,142,247,0.35);}
    .btn-outline{display:inline-flex;align-items:center;gap:8px;background:#fff;color:#0f1117;border:1.5px solid #d8dff0;border-radius:999px;padding:13px 28px;font-size:14px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.2s;}
    .btn-outline:hover{border-color:#4f8ef7;color:#4f8ef7;}
    .perf-card{background:#fff;border-radius:20px;border:1px solid #e8edf8;padding:28px;animation:floatCard 5s ease-in-out infinite;box-shadow:0 4px 32px rgba(79,142,247,0.08),0 1px 4px rgba(0,0,0,0.04);}
    .perf-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px;}
    .perf-title{font-size:15px;font-weight:600;color:#0a0e1a;}
    .perf-sub{font-size:12px;color:#9aa3b5;margin-top:2px;}
    .nav-dot{display:flex;align-items:center;gap:6px;font-size:12px;color:#4a6fa5;font-weight:500;}
    .nav-dot::before{content:'';display:block;width:7px;height:7px;border-radius:50%;background:#4f8ef7;}
    .perf-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:20px 0;}
    .pstat-val{font-size:22px;font-weight:700;color:#0a0e1a;letter-spacing:-0.02em;}
    .pstat-val.green{color:#1a9e6e;}
    .pstat-label{font-size:11px;color:#1a9e6e;font-weight:500;margin-top:2px;}
    .pstat-label.gray{color:#9aa3b5;}
    .chart-caption{text-align:center;font-size:11px;color:#9aa3b5;margin-top:6px;padding-top:12px;border-top:1px solid #f0f3fc;}
    .perf-footer{background:linear-gradient(135deg,rgba(79,142,247,0.06),rgba(167,139,250,0.06));border-radius:10px;padding:14px 16px;margin-top:16px;font-size:12px;color:#4a6fa5;line-height:1.6;}
    .perf-footer strong{color:#1a9e6e;}
    .stats-section{background:#fff;border-top:1px solid #edf0fb;border-bottom:1px solid #edf0fb;padding:48px;}
    .stats-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(6,1fr);gap:0;}
    @media(max-width:900px){.stats-inner{grid-template-columns:repeat(3,1fr);}}
    .stat-item{padding:16px 20px;border-right:1px solid #edf0fb;text-align:center;}
    .stat-item:last-child{border-right:none;}
    .stat-v{font-family:'Bricolage Grotesque',sans-serif;font-size:22px;font-weight:700;color:#0a0e1a;letter-spacing:-0.02em;}
    .stat-v.pos{color:#1a9e6e;}
    .stat-l{font-size:11px;color:#9aa3b5;margin-top:3px;font-weight:500;}
    .section2{padding:120px 48px;max-width:1200px;margin:0 auto;}
    @media(max-width:900px){.section2{padding:60px 24px;}}
    .gradient-headline{font-family:'Bricolage Grotesque',sans-serif;font-size:clamp(32px,4.5vw,54px);font-weight:700;line-height:1.12;letter-spacing:-0.02em;background:linear-gradient(135deg,#4f8ef7 0%,#a78bfa 35%,#f472b6 70%,#fb923c 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:60px;}
    .features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
    @media(max-width:900px){.features-grid{grid-template-columns:1fr;}}
    .feat-card{background:#fff;border-radius:16px;border:1.5px solid #e8edf8;padding:28px 24px;transition:all 0.25s;position:relative;overflow:hidden;}
    .feat-card:hover{border-color:#b8c8f0;transform:translateY(-2px);}
    .feat-card:nth-child(even){border-color:#ead8f0;}
    .feat-card:nth-child(even):hover{border-color:#c898e0;}
    .feat-icon{width:36px;height:36px;margin-bottom:18px;display:flex;align-items:center;justify-content:center;}
    .feat-icon svg{width:24px;height:24px;stroke:#4a6fa5;stroke-width:1.5;fill:none;}
    .feat-name{font-size:14px;font-weight:700;color:#0a0e1a;margin-bottom:10px;}
    .feat-desc{font-size:13px;line-height:1.65;color:#6b7a99;}
    .section4-wrap{background:linear-gradient(180deg,#f8f9ff 0%,#f0f4ff 100%);border-top:1px solid #e8edf8;padding:120px 48px 80px;}
    @media(max-width:900px){.section4-wrap{padding:60px 24px;}}
    .section4{max-width:900px;margin:0 auto;}
    .s4-title{font-family:'Bricolage Grotesque',sans-serif;font-size:clamp(28px,4vw,44px);font-weight:700;letter-spacing:-0.02em;color:#0a0e1a;text-align:center;margin-bottom:14px;line-height:1.15;}
    .s4-sub{text-align:center;font-size:15px;color:#6b7a99;max-width:560px;margin:0 auto 48px;line-height:1.6;}
    .socials{display:flex;justify-content:center;gap:20px;margin-bottom:56px;}
    .social-btn{width:56px;height:56px;border-radius:16px;background:#fff;border:1.5px solid #e2e7f5;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s;}
    .social-btn:hover{border-color:#4f8ef7;transform:translateY(-2px);box-shadow:0 6px 20px rgba(79,142,247,0.15);}
    .contact-card{background:linear-gradient(135deg,#4f8ef7,#8b73f5,#c97af0,#e879a8);border-radius:24px;padding:48px;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;}
    @media(max-width:700px){.contact-card{grid-template-columns:1fr;gap:32px;}}
    .contact-left{color:#fff;}
    .contact-badge{display:inline-block;background:rgba(255,255,255,0.2);border:1px solid rgba(255,255,255,0.35);border-radius:999px;padding:5px 14px;font-size:12px;font-weight:500;color:#fff;margin-bottom:20px;}
    .contact-title{font-family:'Bricolage Grotesque',sans-serif;font-size:28px;font-weight:700;margin-bottom:12px;letter-spacing:-0.02em;}
    .contact-desc{font-size:14px;line-height:1.65;color:rgba(255,255,255,0.8);}
    .contact-form{background:#fff;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:14px;}
    .form-input{width:100%;padding:12px 16px;border:1.5px solid #e2e7f5;border-radius:10px;font-size:14px;font-family:'Inter',sans-serif;color:#0f1117;outline:none;transition:border-color 0.2s;}
    .form-input::placeholder{color:#b0b8cc;}
    .form-input:focus{border-color:#4f8ef7;}
    .form-submit{width:100%;padding:13px;border:none;border-radius:999px;background:linear-gradient(135deg,#4f8ef7,#6d6bf5);color:#fff;font-size:14px;font-weight:600;font-family:'Inter',sans-serif;cursor:pointer;transition:opacity 0.2s;}
    .form-submit:hover{opacity:0.88;}
    .footer{text-align:center;padding:32px 24px;font-size:11px;color:#b0b8cc;border-top:1px solid #edf0fb;}
  `}</style>
);

/* ─── Tooltip ─── */
const ChartTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:"#fff", border:"1px solid #e2e7f5", borderRadius:8, padding:"8px 12px", fontFamily:"Inter,sans-serif", fontSize:11 }}>
      <div style={{ color:"#9aa3b5", marginBottom:3 }}>{label}</div>
      <div style={{ color:"#4f8ef7", fontWeight:700 }}>
        ${Number(payload[0].value).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}
      </div>
    </div>
  );
};

/* ─── Icons ─── */
const icons = {
  brain: <svg viewBox="0 0 24 24"><path d="M12 2C8.5 2 6 4.5 6 7.5c0 1.5.5 2.8 1.4 3.8C6.5 12.3 6 13.6 6 15a6 6 0 0012 0c0-1.4-.5-2.7-1.4-3.7.9-1 1.4-2.3 1.4-3.8C18 4.5 15.5 2 12 2z"/><line x1="12" y1="2" x2="12" y2="22"/></svg>,
  shield: <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  chart: <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  hash: <svg viewBox="0 0 24 24"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>,
  server: <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>,
  globe: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
};

const FEATURES = [
  { icon:"brain", name:"Quantitative Intelligence", desc:"Mid-frequency systematic strategies built on rigorous quantitative models, stress-tested across multiple market regimes and volatility environments." },
  { icon:"shield", name:"Risk-First Approach", desc:"Every position is governed by hard drawdown limits and dynamic position sizing. Capital preservation is the first mandate — returns follow." },
  { icon:"chart", name:"Consistent Returns", desc:"A mean-reversion and momentum framework delivering steady performance with controlled drawdowns, even across volatile crypto market cycles." },
  { icon:"hash", name:"On-Chain Transparency", desc:"All operations executed and verifiable on Bybit. Real-time visibility into performance, trades, and fund flows — no black boxes." },
  { icon:"server", name:"Institutional Infrastructure", desc:"Automated execution, independent accounting, and battle-tested risk systems — bringing professional-grade infrastructure to every citizen." },
  { icon:"globe", name:"Accessible to All", desc:"As a Bybit Copy Trading strategy, the Central Bank of Geneva opens institutional-quality systematic trading to citizens worldwide." },
];

/* ─── Helper: extract live stats from Bybit API response ─── */
function extractLiveStats(liveData) {
  if (!liveData || !liveData.wallet) return null;
  try {
    const coin = liveData.wallet.list?.[0]?.coin?.find(c => c.coin === 'USDT');
    if (!coin) return null;
    const equity = parseFloat(coin.equity).toFixed(2);
    const unrealisedPnl = parseFloat(coin.unrealisedPnl).toFixed(2);
    return { equity, unrealisedPnl };
  } catch (e) {
    return null;
  }
}

/* ─── Main App ─── */
export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [sent, setSent] = useState(false);
  const [liveData, setLiveData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const fetchLive = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/stats`);
        const data = await res.json();
        setLiveData(data);
        setLastUpdated(data.lastUpdated);
      } catch (e) {
        console.error('API error:', e);
      }
    };
    fetchLive();
    const interval = setInterval(fetchLive, 60000);
    return () => clearInterval(interval);
  }, []);

  const liveStats = extractLiveStats(liveData);

  const CURVE = STATIC_CURVE;
  const minNav = Math.min(...CURVE.map(d => d.nav));
  const maxNav = Math.max(...CURVE.map(d => d.nav));

  // Live equity display
  const displayEquity = liveStats ? `$${Number(liveStats.equity).toLocaleString(undefined,{minimumFractionDigits:2})}` : "$10,456.91";
  const displayPnl = liveStats ? `${parseFloat(liveStats.unrealisedPnl) >= 0 ? '+' : ''}${Number(liveStats.unrealisedPnl).toLocaleString(undefined,{minimumFractionDigits:2})} USDT unrealised` : "";

  return (
    <>
      <G />

      {/* ── NAVBAR ── */}
      <nav className="nav">
        <div className="logo">Central <span>Bank</span> of Geneva</div>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          {lastUpdated && (
            <span style={{ fontSize:11, color:"#9aa3b5", fontFamily:"Inter,sans-serif" }}>
              <span className="live-dot" />
              Live
            </span>
          )}
          <button className="nav-btn">Copy Trade →</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="hero">
        <div>
          <div className="hero-badge fade-up">
            <div className="pill"><span className="pill-num">1</span>Purpose</div>
          </div>
          <div className="fade-up" style={{ fontSize:13, color:"#4a6fa5", fontWeight:500, marginBottom:16, letterSpacing:"0.04em" }}>
            @Bank_of_Geneva &nbsp;·&nbsp; On Bybit Copy Trading
          </div>
          <h1 className="hero-title fade-up d1">
            The Automated<br />
            <span style={{ background:"linear-gradient(135deg,#4f8ef7,#a78bfa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Central Bank
            </span>
            <br />of Geneva
          </h1>
          <p className="hero-sub fade-up d2">
            First of its kind — a fully automated Central Bank deploying mid-frequency long/short systematic strategies to serve its citizens with institutional-grade returns.
          </p>
          <div className="btn-row fade-up d3">
            <button className="btn-primary">Copy Trade →</button>
            <button className="btn-outline">Learn More</button>
          </div>
        </div>

        {/* Performance Card */}
        <div className="fade-up d2">
          <div className="perf-card">
            <div className="perf-header">
              <div>
                <div className="perf-title">Performance</div>
                <div className="perf-sub">
                  {lastUpdated
                    ? `Live · Updated ${new Date(lastUpdated).toLocaleTimeString()}`
                    : "Daily updates · Since Jan 2026"}
                </div>
              </div>
              <div className="nav-dot">NAV</div>
            </div>

            <div className="perf-stats">
              <div>
                <div className="pstat-val green">+4.57%</div>
                <div className="pstat-label">Return Since Inception</div>
                <div style={{ fontSize:10, color:"#b0b8cc", marginTop:1 }}>Since Jan 2026</div>
              </div>
              <div>
                <div className="pstat-val">4.40</div>
                <div className="pstat-label">Sharpe Ratio</div>
                <div style={{ fontSize:10, color:"#b0b8cc", marginTop:1 }}>Annualised</div>
              </div>
              <div>
                <div className="pstat-val">20.36%</div>
                <div className="pstat-label gray">Annual APY</div>
                <div style={{ fontSize:10, color:"#b0b8cc", marginTop:1 }}>Projected</div>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={CURVE} margin={{ top:4, right:4, left:0, bottom:0 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f8ef7" stopOpacity={0.18}/>
                    <stop offset="100%" stopColor="#4f8ef7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f3fc" vertical={false}/>
                <XAxis dataKey="date" hide={false}
                  tick={{ fill:"#c0c8dc", fontSize:9, fontFamily:"Inter,sans-serif" }}
                  axisLine={false} tickLine={false}
                  ticks={["Jan 1","Feb 1","Mar 1","Mar 31"]}
                />
                <YAxis domain={[minNav * 0.995, maxNav * 1.003]} hide />
                <Tooltip content={<ChartTip/>}/>
                <Area type="monotone" dataKey="nav" stroke="#4f8ef7" strokeWidth={2}
                  fill="url(#g1)" dot={false} activeDot={{ r:3, fill:"#4f8ef7", strokeWidth:0 }}/>
              </AreaChart>
            </ResponsiveContainer>

            <div className="chart-caption">$10,000 invested in Central Bank of Geneva since inception</div>

            <div className="perf-footer">
              <strong>Current NAV: {displayEquity}</strong>
              {displayPnl && <span> · {displayPnl}</span>}
              <br/>
              Since January 2026 — <strong>+$456.91 USDT</strong> closed PnL across <strong>3,595 trades</strong>, max drawdown <strong>1.39%</strong>.
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div className="stats-section">
        <div className="stats-inner">
          {[
            { v:"+4.57%", l:"Total Return", pos:true },
            { v:"+20.36%", l:"Ann. Return", pos:true },
            { v:"4.40", l:"Sharpe Ratio" },
            { v:"1.39%", l:"Max Drawdown" },
            { v:"59.1%", l:"Win Rate (days)" },
            { v:"3,595", l:"Closed Trades" },
          ].map((s, i) => (
            <div className="stat-item" key={i}>
              <div className={`stat-v ${s.pos ? "pos" : ""}`}>{s.v}</div>
              <div className="stat-l">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 2 – FEATURES ── */}
      <section className="section2">
        <div className="fade-up" style={{ marginBottom:40 }}>
          <div className="pill"><span className="pill-num">2</span>Features</div>
        </div>
        <div className="gradient-headline fade-up d1">
          Applied to futures contracts on a diverse portfolio of cryptocurrencies, the strategy leverages long and short positions to turn market volatility into its greatest advantage.
        </div>
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div className="feat-card fade-up" key={f.name} style={{ animationDelay:`${0.05*i}s` }}>
              <div className="feat-icon">{icons[f.icon]}</div>
              <div className="feat-name">{f.name}</div>
              <div className="feat-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 4 – CONTACT ── */}
      <div className="section4-wrap">
        <div className="section4">
          <div style={{ textAlign:"center", marginBottom:8 }} className="fade-up">
            <div className="pill" style={{ display:"inline-flex" }}><span className="pill-num">4</span>Contact</div>
          </div>
          <h2 className="s4-title fade-up d1">
            We provide maximum value<br />through direct communication
          </h2>
          <p className="s4-sub fade-up d2">
            Connect with us through our preferred channels. The Central Bank of Geneva believes in transparent, direct communication to deliver the best value to its citizens.
          </p>
          <div className="socials fade-up d3">
            <button className="social-btn" title="Twitter / X">
              <svg viewBox="0 0 24 24" style={{ width:20, height:20, fill:"#0f1117" }}>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
              </svg>
            </button>
            <button className="social-btn" title="Telegram">
              <svg viewBox="0 0 24 24" style={{ width:22, height:22, fill:"#0088cc" }}>
                <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </button>
            <button className="social-btn" title="Discord">
              <svg viewBox="0 0 24 24" style={{ width:22, height:22, fill:"#5865F2" }}>
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057c.001.022.015.04.036.052a19.9 19.9 0 005.993 3.03.077.077 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/>
              </svg>
            </button>
          </div>
          <div className="contact-card fade-up d2">
            <div className="contact-left">
              <div className="contact-badge">Speak with the founders</div>
              <h3 className="contact-title">For Institutions</h3>
              <p className="contact-desc">
                The Central Bank of Geneva provides solutions to institutions and is open to hearing about potential partnerships, integrations, and collaborative opportunities.
              </p>
            </div>
            <div className="contact-form">
              <input className="form-input" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
              <input className="form-input" placeholder="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} />
              <input className="form-input" placeholder="Company (optional)" value={company} onChange={e => setCompany(e.target.value)} />
              <button className="form-submit" onClick={() => setSent(true)}>
                {sent ? "✓ Message sent" : "Let's talk"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="footer">
        © {new Date().getFullYear()} Central Bank of Geneva · @Bank_of_Geneva · For informational purposes only. Past performance is not indicative of future results.
      </div>
    </>
  );
}