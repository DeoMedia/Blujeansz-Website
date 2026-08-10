import { motion } from "motion/react";
import worldMap from "figma:asset/371b362666fec4eef3a303e9ea9caf7412150c85.png";
import { CountUp } from "../CountUp";

const locations = [
  {
    name: "London",
    country: "United Kingdom",
    flag: "🇬🇧",
    position: { top: "17.0%", left: "49%" },
    cardAnchor: "right",
    address: ["Deo Media Limited UK", "Kent, United Kingdom"],
  },
  {
    name: "Dubai",
    country: "United Arab Emirates",
    flag: "🇦🇪",
    position: { top: "35.9%", left: "64%" },
    cardAnchor: "left",
    address: ["Sanafre FZC LLC", "Sharjah"],
  },
  {
    name: "Nigeria",
    country: "Lagos",
    flag: "🇳🇬",
    position: { top: "50.0%", left: "46%" },
    cardAnchor: "right",
    address: ["Olabode House", "Lagos"],
  },
  {
    name: "East Africa",
    country: "Rwanda",
    flag: "🇷🇼",
    position: { top: "57.1%", left: "58%" },
    cardAnchor: "left",
    address: ["Kigali Office"],
  },
  {
    name: "South Africa",
    country: "Johannesburg",
    flag: "🇿🇦",
    position: { top: "78.3%", left: "52%" },
    cardAnchor: "bottom",
    isHQ: true,
    address: ["Johannesburg, Randburg"],
  },
];

// Pin coordinates are percentages of .map-container. That only lines up with
// the landmasses while the container's aspect ratio matches the map artwork
// (869x415). If they diverge, object-fit:contain letterboxes the image inside
// the box while the pins keep using the full box, and they drift off the map.
const connections = [
  { x1: "52%", y1: "78.3%", x2: "49%", y2: "17.0%" },
  { x1: "52%", y1: "78.3%", x2: "64%", y2: "35.9%" },
  { x1: "52%", y1: "78.3%", x2: "46%", y2: "50.0%" },
  { x1: "52%", y1: "78.3%", x2: "58%", y2: "57.1%" },
];

export function GlobalFootprintSection() {
  return (
    <section className="global-section">

      {/* HEADER */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="header"
      >
        <h2>Our Global Presence</h2>

        <p className="subtitle">
          Strategically positioned across Africa, Europe, and the Middle East
          to serve clients worldwide.
        </p>
      </motion.div>

      {/* MAP */}

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="map-container"
      >

        {/* MAP BACKGROUND */}

        <div className="map-background">
          <img src={worldMap} alt="World map" className="world-map" />
        </div>

        {/* CONNECTION LINES */}

        <svg className="connections" preserveAspectRatio="none">

          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          {connections.map((c, i) => (
            <motion.line
              key={i}
              x1={c.x1}
              y1={c.y1}
              x2={c.x2}
              y2={c.y2}
              stroke="url(#lineGrad)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.3, duration: 1.5 }}
            />
          ))}

        </svg>

        {/* MAP NODES */}

        {locations.map((loc, i) => (
          <motion.div
            key={loc.name}
            className="map-node"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: loc.isHQ ? 0.4 : 1 + i * 0.15,
              type: "spring",
              stiffness: 200,
            }}
            style={{
              top: loc.position.top,
              left: loc.position.left,
            }}
          >

            <div className={`node-glow ${loc.isHQ ? "hq" : ""}`} />
            <div className={`node-dot ${loc.isHQ ? "hq" : ""}`} />

            <div className={`map-card ${loc.cardAnchor}`}>

              <div className="card-title">
                <span>{loc.flag}</span>
                <span>
                  {loc.name}
                  {loc.isHQ && <span className="hq-tag"> (HQ)</span>}
                </span>
              </div>

              {loc.address.map((line, j) => (
                <div key={j} className="card-line">{line}</div>
              ))}

            </div>

          </motion.div>
        ))}

      </motion.div>

      {/* STATS */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.4 }}
        className="stats"
      >
        {[
          { num: "5", label: "GLOBAL OFFICES" },
          { num: "12+", label: "COUNTRIES SERVED" },
          { num: "100+", label: "HAPPY CLIENTS" },
          { num: "20+", label: "YEARS OF EXPERIENCE" },
        ].map((s, i) => {
          const hasSuffix = s.num.includes("+");
          const numValue = parseInt(s.num);
          
          return (
            <div key={i} className="stat">
              <div className="stat-number">
                <CountUp end={numValue} suffix={hasSuffix ? "+" : ""} duration={2} />
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          );
        })}
      </motion.div>

<style>{`

.global-section{
  background:#FFFFFF;
  padding:120px 40px 80px;
  display:flex;
  flex-direction:column;
  align-items:center;
}

.header{
  text-align:center;
  margin-bottom:64px;
  max-width:800px;
}

.header h2{
  font-size:clamp(40px,5vw,64px);
  font-weight:700;
  color:#0B1C2C;
  margin-bottom:20px;
}

.subtitle{
  font-size:18px;
  color:#64748B;
}

.map-container{
  position:relative;
  width:100%;
  max-width:1200px;
  /* Matches the map artwork (869x415) exactly, so the image fills the box with
     no letterboxing and container-% is the same coordinate space as image-%.
     Do not change this without recalculating every pin position. */
  aspect-ratio:869/415;
  margin-bottom:64px;
}

.map-background{
  position:absolute;
  inset:0;
  border-radius:16px;
  overflow:hidden;
  background:#FFFFFF;
  border:1px solid rgba(11,28,44,0.08);
}

.world-map{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  object-fit:contain;
  opacity:0.3;
  filter:grayscale(100%) brightness(0.95);
}

.connections{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  pointer-events:none;
}

.map-node{
  position:absolute;
  transform:translate(-50%,-50%);
}

.node-glow{
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  width:44px;
  height:44px;
  border-radius:50%;
  background:radial-gradient(circle, rgba(14,165,233,0.25), transparent 70%);
  animation:mapPulse 2.4s infinite;
}

.node-glow.hq{
  width:64px;
  height:64px;
}

.node-dot{
  width:18px;
  height:18px;
  border-radius:50%;
  background:#0ea5e9;
  box-shadow:0 0 0 4px rgba(14,165,233,0.25);
}

.node-dot.hq{
  width:26px;
  height:26px;
  background:linear-gradient(135deg,#0ea5e9,#0284c7);
  box-shadow:
  0 0 0 6px rgba(14,165,233,0.25),
  0 0 18px rgba(14,165,233,0.5);
}

.map-card{
  position:absolute;
  opacity:0;
  transform:translateY(8px);
  transition:.3s;
  background:#FFFFFF;
  border:1px solid rgba(11,28,44,0.12);
  border-radius:12px;
  padding:12px 16px;
  min-width:180px;
  box-shadow:0 8px 24px rgba(11,28,44,0.12);
}

.map-node:hover .map-card{
  opacity:1;
  transform:translateY(0);
}

.map-card.right{right:calc(100% + 16px);top:50%;transform:translateY(-50%);}
.map-card.left{left:calc(100% + 16px);top:50%;transform:translateY(-50%);}
.map-card.bottom{top:calc(100% + 18px);left:50%;transform:translateX(-50%);}

.card-title{
  display:flex;
  gap:8px;
  align-items:center;
  font-size:15px;
  font-weight:600;
  margin-bottom:6px;
}

.card-line{
  font-size:12px;
  color:#64748B;
}

.stats{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  width:100%;
  max-width:1200px;
  border-top:1px solid rgba(11,28,44,0.1);
  padding-top:48px;
}

.stat{text-align:center;}

.stat-number{
  font-size:48px;
  font-weight:700;
  color:#0B1C2C;
}

.stat-label{
  font-size:12px;
  color:#64748B;
  letter-spacing:1.5px;
}

@keyframes mapPulse{
  0%,100%{transform:translate(-50%,-50%) scale(1);opacity:.5;}
  50%{transform:translate(-50%,-50%) scale(1.6);opacity:0;}
}

@media(max-width:768px){
  .global-section{
    padding:80px 24px 60px;
  }
  
  .header{
    margin-bottom:48px;
  }
  
  .map-container{
    /* Deliberately NOT overridden to 1/1. A square box letterboxed the map into
       a band across the middle while the pins stayed spread over the full
       square, which put them on blank white space. The ratio is kept and the
       nodes are scaled down instead.

       A 2.09:1 map is inherently short on a phone, so it runs edge to edge and
       reclaims the section's 24px side padding as height. */
    width:calc(100% + 48px);
    margin-left:-24px;
    margin-right:-24px;
    margin-bottom:48px;
  }

  .map-background{
    /* Square off the corners once it is full bleed. */
    border-radius:0;
    border-left:none;
    border-right:none;
  }

  .node-dot{
    width:12px;
    height:12px;
    box-shadow:0 0 0 3px rgba(14,165,233,0.25);
  }

  .node-dot.hq{
    width:17px;
    height:17px;
    box-shadow:
      0 0 0 4px rgba(14,165,233,0.25),
      0 0 12px rgba(14,165,233,0.5);
  }

  .node-glow{
    width:30px;
    height:30px;
  }

  .node-glow.hq{
    width:42px;
    height:42px;
  }
  
  .map-card{
    display:none;
  }
  
  .stats{
    grid-template-columns:repeat(2,1fr);
    gap:32px 16px;
  }
  
  .stat-number{
    font-size:36px;
  }
}

`}</style>

    </section>
  );
}