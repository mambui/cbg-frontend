import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const BACKEND_URL = 'https://cbg-backend-production-fdd7.up.railway.app';
const BYBIT_LINK = 'https://www.bybit.com/copyTrade/trade-center/detail?leaderMark=gOerGIfY7IJ5keZeX0RfBg%3D%3D&copyFrom=Search&profileDay=90';
const TWITTER_LINK = 'https://x.com/elevano_capital';
const TELEGRAM_LINK = 'https://t.me/elevano_capital';
const CONTACT_EMAIL = 'elevanocapital@gmail.com';

/* ── Real NAV curve — $1,000 starting capital ── */
const CURVE = [
  {date:"Jan 1",nav:999.9,btc:1000.0},{date:"Jan 2",nav:1033.82,btc:943.06},
  {date:"Jan 3",nav:1044.16,btc:954.12},{date:"Jan 4",nav:1051.29,btc:957.45},
  {date:"Jan 5",nav:1153.42,btc:961.21},{date:"Jan 6",nav:1183.84,btc:992.64},
  {date:"Jan 7",nav:1169.08,btc:970.38},{date:"Jan 8",nav:1173.87,btc:966.66},
  {date:"Jan 9",nav:1145.63,btc:968.09},{date:"Jan 10",nav:1041.98,btc:973.4},
  {date:"Jan 11",nav:1047.08,btc:978.72},{date:"Jan 12",nav:1051.11,btc:984.04},
  {date:"Jan 13",nav:1059.26,btc:988.19},{date:"Jan 14",nav:1091.35,btc:1001.9},
  {date:"Jan 15",nav:1114.39,btc:1003.16},{date:"Jan 16",nav:1140.43,btc:1004.36},
  {date:"Jan 17",nav:1140.48,btc:1003.19},{date:"Jan 18",nav:1138.5,btc:1001.56},
  {date:"Jan 19",nav:1133.42,btc:978.72},{date:"Jan 20",nav:1104.63,btc:964.37},
  {date:"Jan 21",nav:1097.21,btc:957.45},{date:"Jan 22",nav:1097.36,btc:955.32},
  {date:"Jan 23",nav:1098.72,btc:952.27},{date:"Jan 24",nav:1100.54,btc:946.81},
  {date:"Jan 25",nav:1090.69,btc:941.49},{date:"Jan 26",nav:1089.82,btc:935.62},
  {date:"Jan 27",nav:1133.08,btc:938.94},{date:"Jan 28",nav:1171.47,btc:949.33},
  {date:"Jan 29",nav:1157.68,btc:932.71},{date:"Jan 30",nav:1161.32,btc:882.98},
  {date:"Jan 31",nav:1180.61,btc:848.82},{date:"Feb 1",nav:1170.71,btc:827.51},
  {date:"Feb 2",nav:1185.43,btc:821.98},{date:"Feb 3",nav:1184.89,btc:815.65},
  {date:"Feb 4",nav:1181.85,btc:779.99},{date:"Feb 5",nav:1109.91,btc:729.24},
  {date:"Feb 6",nav:1206.73,btc:662.53},{date:"Feb 7",nav:1188.11,btc:741.0},
  {date:"Feb 8",nav:1192.12,btc:750.4},{date:"Feb 9",nav:1168.37,btc:744.68},
  {date:"Feb 10",nav:1212.35,btc:739.4},{date:"Feb 11",nav:1299.67,btc:709.59},
  {date:"Feb 12",nav:1341.51,btc:718.56},{date:"Feb 13",nav:1349.95,btc:717.03},
  {date:"Feb 14",nav:1339.27,btc:726.31},{date:"Feb 15",nav:1332.33,btc:725.53},
  {date:"Feb 16",nav:1301.93,btc:724.47},{date:"Feb 17",nav:1309.53,btc:724.24},
  {date:"Feb 18",nav:1312.04,btc:719.1},{date:"Feb 19",nav:1316.29,btc:720.21},
  {date:"Feb 20",nav:1328.55,btc:721.24},{date:"Feb 21",nav:1327.67,btc:718.09},
  {date:"Feb 22",nav:1308.43,btc:711.7},{date:"Feb 23",nav:1308.64,btc:704.86},
  {date:"Feb 24",nav:1302.41,btc:673.57},{date:"Feb 25",nav:1322.51,btc:691.49},
  {date:"Feb 26",nav:1325.99,btc:716.03},{date:"Feb 27",nav:1344.68,btc:704.13},
  {date:"Feb 28",nav:1338.49,btc:678.61},{date:"Mar 1",nav:1335.43,btc:706.14},
  {date:"Mar 2",nav:1333.47,btc:715.9},{date:"Mar 3",nav:1344.72,btc:723.35},
  {date:"Mar 4",nav:1362.05,btc:745.64},{date:"Mar 5",nav:1345.79,btc:758.56},
  {date:"Mar 6",nav:1360.31,btc:754.85},{date:"Mar 7",nav:1360.18,btc:729.96},
  {date:"Mar 8",nav:1370.31,btc:728.72},{date:"Mar 9",nav:1379.41,btc:728.0},
  {date:"Mar 10",nav:1388.57,btc:738.91},{date:"Mar 11",nav:1390.62,btc:743.0},
  {date:"Mar 12",nav:1438.32,btc:743.11},{date:"Mar 13",nav:1439.37,btc:753.97},
  {date:"Mar 14",nav:1434.69,btc:750.88},{date:"Mar 15",nav:1446.75,btc:755.04},
  {date:"Mar 16",nav:1484.23,btc:772.99},{date:"Mar 17",nav:1490.06,btc:774.62},
  {date:"Mar 18",nav:1442.61,btc:766.98},{date:"Mar 19",nav:1417.78,btc:752.24},
  {date:"Mar 20",nav:1404.52,btc:740.84},{date:"Mar 22",nav:1396.65,btc:739.36},
  {date:"Mar 23",nav:1427.4,btc:753.3},{date:"Mar 24",nav:1490.59,btc:746.61},
  {date:"Mar 25",nav:1502.33,btc:758.78},{date:"Mar 26",nav:1512.7,btc:745.07},
  {date:"Mar 27",nav:1524.03,btc:725.24},{date:"Mar 29",nav:1521.48,btc:717.43},
  {date:"Mar 30",nav:1501.01,btc:717.5},{date:"Mar 31",nav:1456.91,btc:714.89},
];

const FEATURES = [
  { icon:"brain", name:"Quantitative Intelligence", desc:"Mid-frequency systematic strategies built on rigorous quantitative models, stress-tested across multiple market regimes." },
  { icon:"shield", name:"Risk-First Approach", desc:"Every position is governed by hard drawdown limits and dynamic position sizing. Capital preservation is the first mandate." },
  { icon:"chart", name:"Consistent Returns", desc:"A mean-reversion and momentum framework delivering steady performance with controlled drawdowns, even in volatile markets." },
  { icon:"hash", name:"On-Chain Transparency", desc:"All operations executed and verifiable on Bybit. Real-time visibility into performance, trades, and fund flows — no black boxes." },
  { icon:"server", name:"Institutional Infrastructure", desc:"Automated execution, independent accounting, and battle-tested risk systems bringing professional-grade infrastructure to every user." },
  { icon:"globe", name:"Accessible to All", desc:"As a Bybit Copy Trading strategy, Elevano Capital opens institutional-quality systematic trading to users worldwide." },
];

const Ic = ({name}) => {
  const s = {width:22,height:22,stroke:"#c07a8a",strokeWidth:1.5,fill:"none"};
  if(name==="brain") return <svg viewBox="0 0 24 24" style={s}><path d="M12 2C8.5 2 6 4.5 6 7.5c0 1.5.5 2.8 1.4 3.8C6.5 12.3 6 13.6 6 15a6 6 0 0012 0c0-1.4-.5-2.7-1.4-3.7.9-1 1.4-2.3 1.4-3.8C18 4.5 15.5 2 12 2z"/><line x1="12" y1="2" x2="12" y2="22"/></svg>;
  if(name==="shield") return <svg viewBox="0 0 24 24" style={s}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
  if(name==="chart") return <svg viewBox="0 0 24 24" style={s}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
  if(name==="hash") return <svg viewBox="0 0 24 24" style={s}><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>;
  if(name==="server") return <svg viewBox="0 0 24 24" style={s}><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/></svg>;
  if(name==="globe") return <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>;
  return null;
};

const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Bricolage+Grotesque:wght@300;400;500;600;700;800&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    body,#root{font-family:'Inter',sans-serif;background:#fdf8f8;color:#1a0f0f;min-height:100vh;}
    ::-webkit-scrollbar{width:4px;}
    ::-webkit-scrollbar-thumb{background:#e8c8cc;border-radius:2px;}
    @keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
    @keyframes floatCard{0%,100%{transform:translateY(0);}50%{transform:translateY(-4px);}}
    @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.4;}}
    .fade-up{animation:fadeUp 0.7s cubic-bezier(.16,1,.3,1) both;}
    .d1{animation-delay:.06s;}.d2{animation-delay:.14s;}.d3{animation-delay:.22s;}
    .nav{position:sticky;top:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:14px 48px;background:rgba(253,248,248,0.92);backdrop-filter:blur(16px);border-bottom:1px solid rgba(210,180,185,0.35);}
    @media(max-width:700px){.nav{padding:12px 18px;}}
    .nav-logo{display:flex;align-items:center;gap:10px;}
    .nav-logo img{width:32px;height:32px;border-radius:8px;object-fit:cover;}
    .nav-logo-text{font-family:'Bricolage Grotesque',sans-serif;font-size:14px;font-weight:700;color:#1a0f0f;letter-spacing:-0.02em;}
    .nav-logo-text span{color:#c07a8a;}
    .nav-right{display:flex;align-items:center;gap:14px;}
    .live-badge{display:flex;align-items:center;gap:6px;font-size:12px;color:#2da876;font-weight:700;background:rgba(45,168,118,0.08);border:1px solid rgba(45,168,118,0.25);border-radius:999px;padding:4px 12px;}
    .live-dot{width:8px;height:8px;border-radius:50%;background:#2da876;animation:pulse 1.2s infinite;box-shadow:0 0 0 0 rgba(45,168,118,0.4);}
    .nav-btn{background:linear-gradient(135deg,#c07a8a,#a05a8a);color:#fff;border:none;border-radius:999px;padding:8px 20px;font-size:13px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:opacity 0.2s;text-decoration:none;display:inline-flex;align-items:center;gap:6px;}
    .nav-btn:hover{opacity:0.85;}
    .pill{display:inline-flex;align-items:center;gap:6px;background:#fff;border:1.5px solid #e8c8cc;border-radius:999px;padding:5px 14px;font-size:12px;font-weight:500;color:#c07a8a;}
    .pill-num{width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,#c07a8a,#a05a8a);color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;}
    .hero{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;padding:48px 48px 36px;max-width:1200px;margin:0 auto;}
    @media(max-width:900px){.hero{grid-template-columns:1fr;padding:28px 18px 20px;}}
    .hero-badge{margin-bottom:18px;}
    .hero-handle{font-size:12px;color:#c07a8a;font-weight:500;margin-bottom:12px;letter-spacing:0.04em;}
    .hero-title{font-family:'Bricolage Grotesque',sans-serif;font-size:clamp(32px,3.8vw,52px);font-weight:800;line-height:1.08;letter-spacing:-0.03em;color:#1a0f0f;margin-bottom:14px;}
    .hero-title span{background:linear-gradient(135deg,#c07a8a,#8a5a9a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
    .hero-sub{font-size:15px;line-height:1.7;color:#6b4a50;max-width:460px;margin-bottom:26px;}
    .btn-row{display:flex;gap:12px;flex-wrap:wrap;}
    .btn-primary{display:inline-flex;align-items:center;gap:7px;background:linear-gradient(135deg,#c07a8a,#a05a8a);color:#fff;border:none;border-radius:999px;padding:11px 24px;font-size:14px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.2s;text-decoration:none;}
    .btn-primary:hover{transform:translateY(-1px);box-shadow:0 8px 20px rgba(192,122,138,0.35);}
    .btn-outline{display:inline-flex;align-items:center;gap:7px;background:#fff;color:#1a0f0f;border:1.5px solid #e0c0c4;border-radius:999px;padding:11px 24px;font-size:14px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.2s;text-decoration:none;}
    .btn-outline:hover{border-color:#c07a8a;color:#c07a8a;}
    .perf-card{background:#fff;border-radius:20px;border:1px solid #f0d8dc;padding:24px;animation:floatCard 5s ease-in-out infinite;box-shadow:0 4px 28px rgba(192,122,138,0.1),0 1px 4px rgba(0,0,0,0.03);}
    .perf-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px;}
    .perf-title{font-size:14px;font-weight:600;color:#1a0f0f;}
    .perf-sub{font-size:11px;color:#b09098;margin-top:2px;}
    .nav-dot{display:flex;align-items:center;gap:5px;font-size:11px;color:#c07a8a;font-weight:500;}
    .nav-dot::before{content:'';display:block;width:6px;height:6px;border-radius:50%;background:#c07a8a;}
    .perf-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:14px 0;}
    .pstat-val{font-size:20px;font-weight:700;color:#1a0f0f;letter-spacing:-0.02em;}
    .pstat-val.pos{color:#1a9e6e;}.pstat-val.neg{color:#e05050;}
    .pstat-label{font-size:10px;color:#1a9e6e;font-weight:500;margin-top:2px;}
    .pstat-label.gray{color:#b09098;}.pstat-label.neg{color:#e05050;}
    .chart-legend{display:flex;gap:16px;margin-bottom:8px;}
    .legend-item{display:flex;align-items:center;gap:6px;font-size:11px;color:#8a6a70;font-weight:500;}
    .legend-dot{width:12px;height:3px;border-radius:2px;}
    .chart-caption{text-align:center;font-size:10px;color:#b09098;margin-top:6px;padding-top:8px;border-top:1px solid #f8eef0;}
    .perf-footer{background:linear-gradient(135deg,rgba(192,122,138,0.07),rgba(160,90,138,0.05));border-radius:10px;padding:12px 14px;margin-top:12px;font-size:11px;color:#8a5a6a;line-height:1.7;}
    .perf-footer strong{color:#1a9e6e;}.perf-footer .neg{color:#e05050;}
    .monthly-pills{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;}
    .m-pill{background:#fff;border:1px solid #f0d8dc;border-radius:8px;padding:4px 10px;font-size:10px;font-weight:600;color:#1a9e6e;}
    .stats-bar{background:#fff;border-top:1px solid #f0d8dc;border-bottom:1px solid #f0d8dc;padding:24px 48px;}
    @media(max-width:700px){.stats-bar{padding:16px 18px;}}
    .stats-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(7,1fr);}
    @media(max-width:900px){.stats-inner{grid-template-columns:repeat(3,1fr);}}
    .stat-item{padding:10px 14px;border-right:1px solid #f0d8dc;text-align:center;}
    .stat-item:last-child{border-right:none;}
    .stat-v{font-family:'Bricolage Grotesque',sans-serif;font-size:19px;font-weight:700;color:#1a0f0f;letter-spacing:-0.02em;}
    .stat-v.pos{color:#1a9e6e;}.stat-v.neg{color:#e05050;}
    .stat-l{font-size:10px;color:#b09098;margin-top:2px;font-weight:500;}
    .section2{padding:40px 48px 32px;max-width:1200px;margin:0 auto;}
    @media(max-width:900px){.section2{padding:24px 18px 18px;}}
    .gradient-headline{font-family:'Bricolage Grotesque',sans-serif;font-size:clamp(24px,3.2vw,40px);font-weight:700;line-height:1.15;letter-spacing:-0.02em;background:linear-gradient(135deg,#c07a8a 0%,#8a5a9a 40%,#5a6aaa 80%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:28px;}
    .features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
    @media(max-width:900px){.features-grid{grid-template-columns:1fr;}}
    .feat-card{background:#fff;border-radius:14px;border:1.5px solid #f0d8dc;padding:22px 18px;transition:all 0.2s;}
    .feat-card:hover{border-color:#c07a8a;transform:translateY(-2px);box-shadow:0 6px 20px rgba(192,122,138,0.1);}
    .feat-icon{margin-bottom:12px;}
    .feat-name{font-size:13px;font-weight:700;color:#1a0f0f;margin-bottom:6px;}
    .feat-desc{font-size:12px;line-height:1.65;color:#7a5060;}
    .section3-wrap{background:linear-gradient(180deg,#fdf8f8 0%,#faf0f2 100%);border-top:1px solid #f0d8dc;padding:40px 48px 32px;}
    @media(max-width:900px){.section3-wrap{padding:24px 18px 18px;}}
    .section3{max-width:860px;margin:0 auto;}
    .s3-title{font-family:'Bricolage Grotesque',sans-serif;font-size:clamp(22px,3vw,36px);font-weight:700;letter-spacing:-0.02em;color:#1a0f0f;text-align:center;margin-bottom:8px;line-height:1.15;}
    .s3-sub{text-align:center;font-size:14px;color:#7a5060;max-width:500px;margin:0 auto 28px;line-height:1.6;}
    .socials{display:flex;justify-content:center;gap:14px;margin-bottom:32px;}
    .social-btn{width:48px;height:48px;border-radius:13px;background:#fff;border:1.5px solid #f0d8dc;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s;text-decoration:none;}
    .social-btn:hover{border-color:#c07a8a;transform:translateY(-2px);box-shadow:0 5px 16px rgba(192,122,138,0.18);}
    .contact-card{background:linear-gradient(135deg,#c07a8a,#9a6a9a,#7a6aaa);border-radius:18px;padding:36px;display:grid;grid-template-columns:1fr 1fr;gap:36px;align-items:center;}
    @media(max-width:700px){.contact-card{grid-template-columns:1fr;gap:20px;padding:24px 18px;}}
    .contact-left{color:#fff;}
    .contact-badge{display:inline-block;background:rgba(255,255,255,0.2);border:1px solid rgba(255,255,255,0.35);border-radius:999px;padding:4px 14px;font-size:11px;font-weight:500;color:#fff;margin-bottom:14px;}
    .contact-title{font-family:'Bricolage Grotesque',sans-serif;font-size:22px;font-weight:700;margin-bottom:8px;letter-spacing:-0.02em;}
    .contact-desc{font-size:13px;line-height:1.65;color:rgba(255,255,255,0.82);}
    .contact-form{background:#fff;border-radius:13px;padding:22px;display:flex;flex-direction:column;gap:10px;}
    .form-input{width:100%;padding:10px 13px;border:1.5px solid #f0d8dc;border-radius:8px;font-size:13px;font-family:'Inter',sans-serif;color:#1a0f0f;outline:none;transition:border-color 0.2s;}
    .form-input::placeholder{color:#c0a0a8;}
    .form-input:focus{border-color:#c07a8a;}
    .form-submit{width:100%;padding:10px;border:none;border-radius:999px;background:linear-gradient(135deg,#c07a8a,#9a6a9a);color:#fff;font-size:13px;font-weight:600;font-family:'Inter',sans-serif;cursor:pointer;transition:all 0.2s;}
    .form-submit:hover{opacity:0.88;}.form-submit.sent{background:#1a9e6e;}
    .data-notice{background:#fff8f9;border:1px solid #f0d8dc;border-radius:10px;padding:14px 18px;margin-top:20px;font-size:11px;color:#8a6a70;line-height:1.6;}
    .data-notice strong{color:#c07a8a;}
    .footer{text-align:center;padding:20px 24px;font-size:10px;color:#c0a0a8;border-top:1px solid #f0d8dc;line-height:1.9;}
    .footer a{color:#c07a8a;text-decoration:none;}
  `}</style>
);

const ChartTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{background:"#fff",border:"1px solid #f0d8dc",borderRadius:8,padding:"10px 14px",fontFamily:"Inter,sans-serif",fontSize:11,minWidth:150}}>
      <div style={{color:"#b09098",marginBottom:6,fontWeight:600}}>{label}</div>
      {payload.map((p,i) => (
        <div key={i} style={{display:"flex",justifyContent:"space-between",gap:16,marginBottom:3}}>
          <span style={{color:p.color,fontWeight:600}}>{p.dataKey==="nav"?"Elevano Capital":"Bitcoin"}</span>
          <span style={{color:"#1a0f0f",fontWeight:700}}>${Number(p.value).toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
};

function extractLive(data) {
  try {
    const coin = data?.wallet?.list?.[0]?.coin?.find(c => c.coin==='USDT');
    if (!coin) return null;
    return { equity: parseFloat(coin.equity).toFixed(2), unrealisedPnl: parseFloat(coin.unrealisedPnl).toFixed(2) };
  } catch { return null; }
}

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [sent, setSent] = useState(false);
  const [liveData, setLiveData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [chartFilter, setChartFilter] = useState("YTD");

  const FILTERS = ["1D","5D","1M","6M","YTD","1Y","Max"];

  const getRawSlice = () => {
    if (chartFilter === "1D") return CURVE.slice(-1);
    if (chartFilter === "5D") return CURVE.slice(-5);
    if (chartFilter === "1M") return CURVE.slice(-30);
    if (chartFilter === "6M") return CURVE.slice(-180);
    return CURVE;
  };

  // Normalize both lines to start at 1000
  const rawSlice = getRawSlice();
  const navBase = rawSlice[0]?.nav || 1000;
  const btcBase = rawSlice[0]?.btc || 1000;
  const filteredCurve = rawSlice.map(d => ({
    ...d,
    nav: parseFloat((d.nav / navBase * 1000).toFixed(2)),
    btc: parseFloat((d.btc / btcBase * 1000).toFixed(2)),
  }));

  // ── Dynamic metrics computed from rawSlice ──
  const n = rawSlice.length;
  const navStart = rawSlice[0]?.nav || 1000;
  const navEnd = rawSlice[n-1]?.nav || 1000;
  const btcStart = rawSlice[0]?.btc || 1000;
  const btcEnd = rawSlice[n-1]?.btc || 1000;

  const navReturn = n > 1 ? ((navEnd - navStart) / navStart * 100).toFixed(1) : "0.0";
  const btcReturn = n > 1 ? ((btcEnd - btcStart) / btcStart * 100).toFixed(1) : "0.0";
  const navReturnLabel = parseFloat(navReturn) >= 0 ? `+${navReturn}%` : `${navReturn}%`;
  const btcReturnLabel = parseFloat(btcReturn) >= 0 ? `+${btcReturn}%` : `${btcReturn}%`;

  // Max drawdown
  let peak = rawSlice[0]?.nav || 1000, maxDD = 0;
  for (const d of rawSlice) {
    if (d.nav > peak) peak = d.nav;
    const dd = (peak - d.nav) / peak;
    if (dd > maxDD) maxDD = dd;
  }
  const maxDDLabel = (maxDD * 100).toFixed(1) + "%";

  // Daily returns for Sharpe + win rate
  const dailyRets = rawSlice.slice(1).map((d, i) =>
    (d.nav - rawSlice[i].nav) / rawSlice[i].nav
  );
  const meanRet = dailyRets.length ? dailyRets.reduce((a,b)=>a+b,0)/dailyRets.length : 0;
  const stdRet = dailyRets.length > 1
    ? Math.sqrt(dailyRets.reduce((a,b)=>a+(b-meanRet)**2,0)/dailyRets.length)
    : 0;
  const sharpe = stdRet > 0 ? ((meanRet / stdRet) * Math.sqrt(365)).toFixed(2) : "—";

  // APY = (return% / number of days) * 365
  const apyVal = n > 1 ? (parseFloat(navReturn) / n * 365) : 0;
  const apy = n > 1 ? apyVal.toFixed(0) + "%" : "—";

  // Win rate
  const winDays = dailyRets.filter(r => r > 0).length;
  const winRate = dailyRets.length ? ((winDays / dailyRets.length) * 100).toFixed(1) + "%" : "—";

  const periodLabel = chartFilter === "YTD" ? "Since Jan 2026" : chartFilter === "Max" ? "All time" : `Last ${chartFilter}`;

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/stats`);
        const data = await res.json();
        setLiveData(data); setLastUpdated(data.lastUpdated);
      } catch {}
    };
    fetch_(); const iv = setInterval(fetch_, 60000); return () => clearInterval(iv);
  }, []);

  const live = extractLive(liveData);
  const minVal = Math.min(...filteredCurve.map(d => Math.min(d.nav, d.btc)));
  const maxVal = Math.max(...filteredCurve.map(d => Math.max(d.nav, d.btc)));

  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email) return;
    setSending(true);
    try {
      const res = await fetch("https://formspree.io/f/myklykel", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ name, email, message: company }),
      });
      if (res.ok) { setSent(true); }
      else { alert("Error. Please email us at " + CONTACT_EMAIL); }
    } catch {
      alert("Error. Please email us at " + CONTACT_EMAIL);
    }
    setSending(false);
  };

  return (
    <>
      <G />

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">
          <span className="nav-logo-text">Elevano <span>Capital</span></span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:"#b09098",fontWeight:500}}>
          <span>Swiss made</span>
          <svg viewBox="0 0 20 20" width="18" height="18" style={{borderRadius:2,flexShrink:0}}>
            <rect width="20" height="20" fill="#FF0000"/>
            <rect x="8.5" y="3" width="3" height="14" fill="white"/>
            <rect x="3" y="8.5" width="14" height="3" fill="white"/>
          </svg>
        </div>
        <div className="nav-right">
          {lastUpdated && <div className="live-badge"><span className="live-dot"/>Live</div>}
          <a href={BYBIT_LINK} target="_blank" rel="noreferrer" className="nav-btn">Copy Trade →</a>
        </div>
      </nav>

      {/* SECTION 1 */}
      <div className="hero">
        <div>
          <div className="hero-badge fade-up">
            <div className="pill"><span className="pill-num">1</span>Purpose</div>
          </div>
          <div className="fade-up d1" style={{display:"flex",alignItems:"center",gap:8,margin:"12px 0 16px",fontSize:13,color:"#8a6a70",fontWeight:500}}>
            <span>Operating in</span>
            <div style={{display:"flex",alignItems:"center",gap:6,background:"#fff",border:"1.5px solid #f0d8dc",borderRadius:999,padding:"5px 16px"}}>
              <svg viewBox="0 0 80 24" style={{height:18,width:"auto"}} xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="18" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="20" fill="#0f1117" letterSpacing="-1">BYB</text>
                <rect x="52" y="2" width="4" height="20" fill="#f7931a"/>
                <text x="57" y="18" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="20" fill="#0f1117">T</text>
              </svg>
            </div>
          </div>
          <h1 className="hero-title fade-up d2">
            Elevano<br/>Capital<br/>
            <span style={{fontSize:"0.55em",fontWeight:700,letterSpacing:"-0.01em"}}>Crypto Hedge Fund</span>
          </h1>
          <p className="hero-sub fade-up d3" style={{fontStyle:"normal",marginBottom:26}}>
            First of its kind, a fully automated crypto hedge fund deploying mid-frequency long/short systematic strategies, <strong style={{color:"#c07a8a"}}>without leverage</strong>. Combining trend following, mean reversion, and whale tracking, giving you institutional-grade returns.
          </p>
          <div className="btn-row fade-up d3">
            <a href={BYBIT_LINK} target="_blank" rel="noreferrer" className="btn-primary">Copy Trade →</a>
            <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer" className="btn-outline">Join Channel</a>
          </div>
        </div>

        <div className="fade-up d2">
          <div className="perf-card">
            <div className="perf-header">
              <div>
                <div className="perf-title">Performance vs Bitcoin</div>
                <div className="perf-sub" style={{display:"flex",alignItems:"center",gap:6}}>
                  {lastUpdated
                    ? <><span className="live-dot" style={{width:6,height:6,flexShrink:0}}/><span style={{color:"#2da876",fontWeight:600}}>Live</span><span style={{color:"#b09098"}}>· {new Date(lastUpdated).toLocaleTimeString()}</span></>
                    : "Since Jan 2026 · $1,000 base"
                  }
                </div>
              </div>
              <div className="nav-dot">NAV</div>
            </div>

            <div className="perf-stats">
              <div>
                <div className={`pstat-val ${parseFloat(navReturn)>=0?"pos":"neg"}`}>{navReturnLabel}</div>
                <div className="pstat-label">Elevano Capital</div>
                <div style={{fontSize:9,color:"#c0a0a8",marginTop:1}}>{periodLabel} · net of fees</div>
              </div>
              <div>
                <div className={`pstat-val ${parseFloat(btcReturn)>=0?"pos":"neg"}`}>{btcReturnLabel}</div>
                <div className={`pstat-label ${parseFloat(btcReturn)>=0?"":"neg"}`}>Bitcoin</div>
                <div style={{fontSize:9,color:"#c0a0a8",marginTop:1}}>Same period</div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:0}}>
                <div style={{display:"flex",gap:20,alignItems:"flex-start"}}>
                  <div>
                    <div className="pstat-val">{sharpe}</div>
                    <div className="pstat-label gray">Sharpe Ratio</div>
                    <div style={{fontSize:9,color:"#c0a0a8",marginTop:1}}>Annualised</div>
                  </div>
                  <div>
                    <div className="pstat-val">{apy}</div>
                    <div className="pstat-label gray">Annual APY</div>
                    <div style={{fontSize:9,color:"#c0a0a8",marginTop:1}}>Annualised</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <div className="chart-legend" style={{margin:0}}>
                <div className="legend-item"><div className="legend-dot" style={{background:"#c07a8a"}}/>Return Since Inception</div>
                <div className="legend-item"><div className="legend-dot" style={{background:"#f7931a",opacity:0.7}}/>Bitcoin (BTC)</div>
              </div>
              <div style={{display:"flex",gap:3}}>
                {FILTERS.map(f => (
                  <button key={f} onClick={()=>setChartFilter(f)} style={{
                    padding:"2px 7px",borderRadius:5,border:"1px solid",fontSize:9,fontWeight:600,cursor:"pointer",
                    fontFamily:"Inter,sans-serif",transition:"all 0.15s",
                    background: chartFilter===f ? "#c07a8a" : "transparent",
                    color: chartFilter===f ? "#fff" : "#b09098",
                    borderColor: chartFilter===f ? "#c07a8a" : "#f0d8dc",
                  }}>{f}</button>
                ))}
              </div>
            </div>

            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={filteredCurve} margin={{top:4,right:4,left:0,bottom:0}}>
                <defs>
                  <linearGradient id="gNav" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c07a8a" stopOpacity={0.22}/>
                    <stop offset="90%" stopColor="#c07a8a" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gBtc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f7931a" stopOpacity={0.12}/>
                    <stop offset="90%" stopColor="#f7931a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f8eef0" vertical={false}/>
                <XAxis dataKey="date" tick={{fill:"#d0b0b8",fontSize:9,fontFamily:"Inter,sans-serif"}}
                  axisLine={false} tickLine={false} ticks={["Jan 1","Feb 1","Mar 1","Mar 31"]}/>
                <YAxis domain={[minVal*0.93, maxVal*1.02]} hide/>
                <Tooltip content={<ChartTip/>}/>
                <Area type="monotone" dataKey="btc" stroke="#f7931a" strokeWidth={1.5}
                  fill="url(#gBtc)" dot={false} strokeDasharray="4 2"
                  activeDot={{r:3,fill:"#f7931a",strokeWidth:0}}/>
                <Area type="monotone" dataKey="nav" stroke="#c07a8a" strokeWidth={2.5}
                  fill="url(#gNav)" dot={false}
                  activeDot={{r:4,fill:"#c07a8a",strokeWidth:0}}/>
              </AreaChart>
            </ResponsiveContainer>

            <div className="chart-caption">$1,000 invested in Elevano Capital — since Jan 2026</div>

            <div className="perf-footer">
              <strong>Elevano Capital: {navReturnLabel}</strong> vs <span className="neg">BTC: {btcReturnLabel}</span> · {periodLabel}<br/>
              Max drawdown <strong>{maxDDLabel}</strong> · Sharpe <strong>{sharpe}</strong> · Win rate <strong>{winRate}</strong>
              <div className="monthly-pills">
                <span className="m-pill">Jan +18.1%</span>
                <span className="m-pill">Feb +13.4%</span>
                <span className="m-pill">Mar +8.9%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="stats-bar">
        <div className="stats-inner">
          {[
            {v:navReturnLabel, l:`Elevano · ${periodLabel}`, pos:parseFloat(navReturn)>=0, neg:parseFloat(navReturn)<0},
            {v:btcReturnLabel, l:`BTC · ${periodLabel}`, pos:parseFloat(btcReturn)>=0, neg:parseFloat(btcReturn)<0},
            {v:"3 months", l:"Track Record"},
            {v:sharpe, l:"Sharpe Ratio"},
            {v:maxDDLabel, l:"Max Drawdown"},
            {v:winRate, l:"Win Rate"},
            {v:"3,595", l:"Closed Trades"},
          ].map((s,i)=>(
            <div className="stat-item" key={i}>
              <div className={`stat-v ${s.pos?"pos":s.neg?"neg":""}`}>{s.v}</div>
              <div className="stat-l">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2 */}
      <section className="section2">
        <div className="fade-up" style={{marginBottom:18}}>
          <div className="pill"><span className="pill-num">2</span>Features</div>
        </div>
        <div className="gradient-headline fade-up d1">
          Applied to futures contracts on a diverse portfolio of cryptocurrencies, the strategy leverages long and short positions to turn market volatility into its greatest advantage.
        </div>
        <div className="features-grid">
          {FEATURES.map((f,i)=>(
            <div className="feat-card fade-up" key={f.name} style={{animationDelay:`${0.05*i}s`}}>
              <div className="feat-icon"><Ic name={f.icon}/></div>
              <div className="feat-name">{f.name}</div>
              <div className="feat-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 */}
      <div className="section3-wrap">
        <div className="section3">
          <div style={{textAlign:"center",marginBottom:14}} className="fade-up">
            <div className="pill" style={{display:"inline-flex"}}><span className="pill-num">3</span>Contact</div>
          </div>
          <h2 className="s3-title fade-up d1">Maximum value through<br/>direct communication</h2>
          <p className="s3-sub fade-up d2">Connect with us through our preferred channels. Elevano Capital believes in transparent, direct communication to deliver the best value to its users.</p>

          <div className="socials fade-up d3">
            <a href={TWITTER_LINK} target="_blank" rel="noreferrer" className="social-btn" title="X / Twitter">
              <svg viewBox="0 0 24 24" style={{width:17,height:17,fill:"#1a0f0f"}}>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
              </svg>
            </a>
            <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer" className="social-btn" title="Telegram">
              <svg viewBox="0 0 24 24" style={{width:19,height:19,fill:"#0088cc"}}>
                <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </a>
            <a href={BYBIT_LINK} target="_blank" rel="noreferrer" className="social-btn" title="Bybit Copy Trading">
              <svg viewBox="0 0 80 24" style={{height:11,width:"auto"}} xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="18" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="20" fill="#0f1117" letterSpacing="-1">BYB</text>
                <rect x="52" y="2" width="4" height="20" fill="#f7931a"/>
                <text x="57" y="18" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="20" fill="#0f1117">T</text>
              </svg>
            </a>
          </div>

          <div className="contact-card fade-up d2">
            <div className="contact-left">
              <div className="contact-badge">Speak with the founders</div>
              <h3 className="contact-title">For Institutions</h3>
              <p className="contact-desc">Elevano Capital provides solutions to institutions and family offices. We are open to partnerships, managed accounts, and collaborative opportunities.</p>
            </div>
            <div className="contact-form">
              <input className="form-input" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)}/>
              <input className="form-input" placeholder="Email address" type="email" value={email} onChange={e=>setEmail(e.target.value)}/>
              <textarea className="form-input" placeholder="Your message or inquiry..." value={company} onChange={e=>setCompany(e.target.value)}
                style={{resize:"none",height:80,lineHeight:1.5}}/>
              <button className={`form-submit${sent?" sent":""}`} onClick={handleSubmit} disabled={sent||sending}>
                {sent?"✓ Message received":sending?"Sending...":"Let's talk"}
              </button>
            </div>
          </div>

          <div className="data-notice">
            <strong>Data Protection (nDSG / Swiss FADP)</strong> — By submitting this form, you agree that your name, email, and company name will be used solely to respond to your inquiry. Your data is stored securely, never shared with third parties, and will be deleted upon request. Contact <a href={`mailto:${CONTACT_EMAIL}`} style={{color:"#c07a8a"}}>{CONTACT_EMAIL}</a> to exercise your rights under Swiss law.{" "}
            <span style={{cursor:"pointer",textDecoration:"underline",color:"#c07a8a"}} onClick={()=>setPrivacyOpen(!privacyOpen)}>{privacyOpen?"Hide":"Learn more"}</span>
            {privacyOpen && <div style={{marginTop:8,paddingTop:8,borderTop:"1px solid #f0d8dc"}}>We process your data on the basis of your consent (Art. 6 nDSG). Data is stored on secure EU-region servers. No automated decision-making or profiling. Retention: 12 months from last contact.</div>}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="footer">
        © {new Date().getFullYear()} Elevano Capital · <a href={TWITTER_LINK} target="_blank" rel="noreferrer">@elevano_capital</a> · <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer">Telegram</a>
        <br/>
        For informational purposes only. Past performance is not indicative of future results. Trading crypto assets involves significant risk of loss.
      </div>
    </>
  );
}