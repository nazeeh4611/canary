import type { DrawingMotif } from "@/types";

/**
 * Architectural line drawings used as honest stand-ins until real Canary
 * photography is supplied. They are pure SVG (no network, no JS) and are
 * designed to crop well with `preserveAspectRatio="xMidYMid slice"`.
 *
 * Stroke weights follow drawing convention: cut walls heavy, objects medium,
 * hatching and dimensions fine.
 */

const W = 1200;
const H = 900;

const heavy = { strokeWidth: 7, stroke: "currentColor", fill: "none" } as const;
const medium = { strokeWidth: 2.2, stroke: "currentColor", fill: "none" } as const;
const fine = { strokeWidth: 1, stroke: "currentColor", fill: "none", opacity: 0.55 } as const;
const label = { fontSize: 13, letterSpacing: 2, fill: "currentColor", opacity: 0.7, fontFamily: "Helvetica, Arial, sans-serif" } as const;

function range(n: number) {
  return Array.from({ length: n }, (_, i) => i);
}

function Dim({ x1, y1, x2, y2, text, offset = 0 }: { x1: number; y1: number; x2: number; y2: number; text: string; offset?: number }) {
  const horizontal = y1 === y2;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return (
    <g {...fine} opacity={0.6}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      <line x1={x1 - 6} y1={y1 + 6} x2={x1 + 6} y2={y1 - 6} strokeWidth={1.6} />
      <line x1={x2 - 6} y1={y2 + 6} x2={x2 + 6} y2={y2 - 6} strokeWidth={1.6} />
      <text
        {...label}
        stroke="none"
        textAnchor="middle"
        x={horizontal ? mx : mx - 12 - offset}
        y={horizontal ? my - 10 - offset : my}
        transform={horizontal ? undefined : `rotate(-90 ${mx - 12 - offset} ${my})`}
      >
        {text}
      </text>
    </g>
  );
}

function Door({ x, y, r, rotate = 0 }: { x: number; y: number; r: number; rotate?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <line x1={0} y1={0} x2={0} y2={-r} {...medium} />
      <path d={`M 0 ${-r} A ${r} ${r} 0 0 1 ${r} 0`} {...fine} strokeDasharray="4 4" />
    </g>
  );
}

/* ---------- motifs ---------- */

function LivingPerspective() {
  const vp = { x: 600, y: 470 };
  const p = (x: number, y: number, z: number) => {
    const s = 1 / (1 + z);
    return [vp.x + (x - vp.x) * s, vp.y + (y - vp.y) * s] as const;
  };
  const zb = 1.727;
  const pts = (arr: (readonly [number, number])[]) => arr.map((a) => a.join(",")).join(" ");
  const [blx, bty] = p(0, 0, zb);
  const [brx, bby] = p(W, H, zb);
  return (
    <g>
      {/* room box */}
      <g {...medium}>
        <rect x={blx} y={bty} width={brx - blx} height={bby - bty} />
        {[[0, 0], [W, 0], [0, H], [W, H]].map(([x, y]) => {
          const [ex, ey] = p(x, y, zb);
          return <line key={`${x}${y}`} x1={x} y1={y} x2={ex} y2={ey} />;
        })}
      </g>
      {/* floor boards */}
      <g {...fine}>
        {range(15).map((i) => {
          const x = -200 + i * 115;
          const [a, b] = p(x, H, 0);
          const [c, d] = p(x, H, zb);
          return <line key={i} x1={a} y1={b} x2={c} y2={d} />;
        })}
      </g>
      {/* ceiling cove */}
      <polyline points={pts([p(0, 46, 0), p(0, 46, zb), p(W, 46, zb), p(W, 46, 0)])} {...fine} />
      {/* tall window, right wall */}
      <g {...medium}>
        <polygon points={pts([p(W, 110, 0.25), p(W, 110, 1.25), p(W, 780, 1.25), p(W, 780, 0.25)])} />
        {[0.58, 0.92].map((z) => {
          const [a, b] = p(W, 110, z);
          const [c, d] = p(W, 780, z);
          return <line key={z} x1={a} y1={b} x2={c} y2={d} {...fine} opacity={0.8} />;
        })}
      </g>
      {/* light falling on floor */}
      <g {...fine} opacity={0.35}>
        {range(9).map((i) => {
          const [a, b] = p(W - 40 - i * 34, H, 0.3 + i * 0.02);
          const [c, d] = p(W - 260 - i * 34, H, 1.2);
          return <line key={i} x1={a} y1={b} x2={c} y2={d} />;
        })}
      </g>
      {/* back wall: niche + artwork */}
      <g {...medium}>
        {(() => {
          const [x1, y1] = p(480, 230, zb);
          const [x2, y2] = p(720, 590, zb);
          return <rect x={x1} y={y1} width={x2 - x1} height={y2 - y1} />;
        })()}
        {(() => {
          const [x1, y1] = p(525, 285, zb);
          const [x2, y2] = p(675, 500, zb);
          return <rect x={x1} y={y1} width={x2 - x1} height={y2 - y1} {...fine} />;
        })()}
      </g>
      {/* low sofa against the back wall: seat block, backrest, arms */}
      <g {...medium}>
        <polygon points={pts([p(330, 790, 1.0), p(870, 790, 1.0), p(870, H, 1.0), p(330, H, 1.0)])} />
        <polygon points={pts([p(330, 790, 1.0), p(870, 790, 1.0), p(870, 790, 1.3), p(330, 790, 1.3)])} {...fine} opacity={0.8} />
        <polygon points={pts([p(330, 650, 1.3), p(870, 650, 1.3), p(870, 790, 1.3), p(330, 790, 1.3)])} />
        {[330, 870].map((x) => (
          <polygon key={x} points={pts([p(x, 740, 1.0), p(x, 740, 1.3), p(x, H, 1.3), p(x, H, 1.0)])} {...fine} opacity={0.9} />
        ))}
        <line x1={p(600, 790, 1.0)[0]} y1={p(600, 790, 1.0)[1]} x2={p(600, 790, 1.3)[0]} y2={p(600, 790, 1.3)[1]} {...fine} />
      </g>
      {/* rug + coffee table in the foreground */}
      <polygon points={pts([p(250, H, 0.2), p(950, H, 0.2), p(950, H, 0.95), p(250, H, 0.95)])} {...fine} opacity={0.5} />
      <g {...medium}>
        {(() => {
          const [, ty] = p(600, 820, 0.35);
          const [, fy] = p(600, H, 0.35);
          return (
            <>
              <ellipse cx={600} cy={ty} rx={140} ry={22} />
              <line x1={510} y1={ty + 14} x2={510} y2={fy} {...fine} />
              <line x1={690} y1={ty + 14} x2={690} y2={fy} {...fine} />
            </>
          );
        })()}
      </g>
      {/* pendant */}
      <g {...medium}>
        <line x1={p(600, 0, 0.7)[0]} y1={p(600, 0, 0.7)[1]} x2={600} y2={300} {...fine} />
        <path d="M 560 330 Q 600 290 640 330 Z" />
      </g>
      {/* plant left */}
      <g {...fine} opacity={0.75}>
        <rect x={110} y={730} width={70} height={110} />
        {range(7).map((i) => (
          <path key={i} d={`M 145 730 Q ${80 + i * 22} ${600 - (i % 3) * 30} ${60 + i * 28} ${520 + (i % 2) * 40}`} />
        ))}
      </g>
    </g>
  );
}

function ApartmentPlan() {
  return (
    <g>
      <g {...heavy}>
        <path d="M 160 140 H 1040 V 760 H 160 Z" />
        <path d="M 520 140 V 330 M 520 400 V 470 H 690 M 760 470 H 1040" />
        <path d="M 780 140 V 290 M 780 360 V 470" />
        <path d="M 160 470 H 270 M 340 470 H 440" />
      </g>
      {/* windows */}
      <g {...medium}>
        {[[240, 140, 440, 140], [600, 140, 720, 140], [860, 140, 990, 140], [160, 560, 160, 700], [1040, 560, 1040, 700]].map(([a, b, c, d], i) => (
          <g key={i}>
            <line x1={a} y1={b - 6} x2={c} y2={d - 6} />
            <line x1={a} y1={b + 6} x2={c} y2={d + 6} />
          </g>
        ))}
      </g>
      <Door x={520} y={400} r={70} rotate={180} />
      <Door x={780} y={360} r={70} rotate={180} />
      <Door x={690} y={470} r={70} rotate={90} />
      <Door x={270} y={470} r={70} rotate={90} />
      {/* bed 01 */}
      <g {...medium}>
        <rect x={250} y={190} width={190} height={220} />
        <rect x={262} y={198} width={78} height={44} {...fine} />
        <rect x={350} y={198} width={78} height={44} {...fine} />
        <line x1={250} y1={265} x2={440} y2={265} {...fine} />
        <rect x={200} y={190} width={40} height={40} {...fine} />
      </g>
      {/* bed 02 */}
      <g {...medium}>
        <rect x={590} y={190} width={130} height={210} />
        <rect x={602} y={198} width={106} height={40} {...fine} />
        <rect x={540} y={410} width={230} height={50} {...fine} />
      </g>
      {/* bathrooms */}
      <g {...fine} opacity={0.8}>
        <rect x={830} y={160} width={190} height={80} />
        <ellipse cx={870} cy={420} rx={22} ry={28} />
        <rect x={940} y={380} width={80} height={70} />
        <line x1={940} y1={380} x2={1020} y2={450} />
      </g>
      {/* living */}
      <g {...medium}>
        <path d="M 210 560 h 260 v 60 h -200 v 120 h -60 Z" />
        <rect x={330} y={650} width={120} height={70} {...fine} />
        <circle cx={640} cy={620} r={70} />
        {range(6).map((i) => {
          const a = (i / 6) * Math.PI * 2;
          return <rect key={i} x={640 + Math.cos(a) * 100 - 16} y={620 + Math.sin(a) * 100 - 16} width={32} height={32} {...fine} />;
        })}
      </g>
      {/* kitchen */}
      <g {...medium}>
        <path d="M 820 500 H 1020 V 740 H 960 V 560 H 820 Z" />
        <circle cx={990} cy={600} r={14} {...fine} />
        <circle cx={990} cy={640} r={14} {...fine} />
        <rect x={800} y={620} width={110} height={60} {...fine} />
      </g>
      {/* hatch on cut walls is implied; labels */}
      <g>
        <text {...label} x={300} y={445}>BED 01</text>
        <text {...label} x={600} y={448}>BED 02</text>
        <text {...label} x={300} y={540}>LIVING</text>
        <text {...label} x={605} y={735}>DINING</text>
        <text {...label} x={840} y={725}>KITCHEN</text>
      </g>
      <Dim x1={160} y1={90} x2={1040} y2={90} text="11 400" />
      <Dim x1={110} y1={140} x2={110} y2={760} text="8 100" />
      <g {...fine}>
        <circle cx={1110} cy={820} r={26} />
        <path d="M 1110 790 L 1102 822 L 1110 816 L 1118 822 Z" fill="currentColor" />
      </g>
    </g>
  );
}

function VillaElevation() {
  return (
    <g>
      <line x1={0} y1={760} x2={W} y2={760} {...heavy} strokeWidth={4} />
      <g {...fine}>
        {range(40).map((i) => (
          <line key={i} x1={i * 32} y1={762} x2={i * 32 - 22} y2={800} />
        ))}
      </g>
      {/* ground volume */}
      <g {...medium}>
        <rect x={180} y={480} width={760} height={280} />
        {/* upper volume, cantilevered */}
        <rect x={320} y={260} width={720} height={220} />
        <line x1={300} y1={260} x2={1060} y2={260} strokeWidth={4} />
        {/* glazing ground */}
        <rect x={220} y={540} width={300} height={220} />
        <rect x={232} y={552} width={276} height={208} {...fine} />
        {[320, 420].map((x) => <line key={x} x1={x} y1={552} x2={x} y2={760} {...fine} />)}
        {/* door */}
        <rect x={600} y={560} width={110} height={200} />
        <line x1={690} y1={650} x2={690} y2={680} />
        {/* upper windows deep reveals */}
        {[380, 600, 820].map((x) => (
          <g key={x}>
            <rect x={x} y={310} width={150} height={120} />
            <rect x={x + 14} y={322} width={122} height={96} {...fine} />
          </g>
        ))}
        {/* screen fins */}
        {range(10).map((i) => <line key={i} x1={760 + i * 16} y1={500} x2={760 + i * 16} y2={740} {...fine} />)}
      </g>
      {/* shading on volumes */}
      <g {...fine} opacity={0.3}>
        {range(22).map((i) => <line key={i} x1={320 + i * 33} y1={480} x2={320 + i * 33 + 30} y2={510} />)}
      </g>
      {/* palm */}
      <g {...medium}>
        <path d="M 1110 760 C 1100 640 1100 560 1090 470" />
        {range(7).map((i) => {
          const a = -Math.PI + (i / 6) * Math.PI;
          return <path key={i} d={`M 1090 470 Q ${1090 + Math.cos(a) * 60} ${430 + Math.sin(a) * 30} ${1090 + Math.cos(a) * 110} ${480 + Math.abs(Math.sin(a)) * -10 + (i % 2) * 30}`} {...fine} />;
        })}
      </g>
      {/* figure for scale */}
      <g {...medium}>
        <circle cx={560} cy={652} r={11} />
        <path d="M 560 664 L 560 715 M 560 715 L 548 760 M 560 715 L 572 760 M 560 680 L 545 705 M 560 680 L 575 705" />
      </g>
      <Dim x1={140} y1={480} x2={140} y2={760} text="3 600" />
      <Dim x1={140} y1={260} x2={140} y2={480} text="3 200" offset={0} />
      <text {...label} x={180} y={850}>SOUTH ELEVATION · 1:100</text>
    </g>
  );
}

function JoineryElevation() {
  const doors = range(6);
  return (
    <g>
      <line x1={80} y1={800} x2={1120} y2={800} {...heavy} strokeWidth={4} />
      <line x1={80} y1={110} x2={1120} y2={110} {...medium} />
      <g {...medium}>
        <rect x={150} y={130} width={600} height={670} />
        {doors.map((i) => (
          <g key={i}>
            <rect x={150 + i * 100 + 3} y={133} width={94} height={664} />
            <line x1={150 + i * 100 + (i % 2 ? 12 : 88)} y1={430} x2={150 + i * 100 + (i % 2 ? 12 : 88)} y2={520} {...fine} strokeWidth={2} />
          </g>
        ))}
        {/* open niche with shelves */}
        <rect x={770} y={130} width={280} height={670} />
        <rect x={790} y={150} width={240} height={420} {...fine} />
        {[250, 350, 450].map((y) => <line key={y} x1={790} y1={y} x2={1030} y2={y} />)}
        <line x1={795} y1={156} x2={1025} y2={156} {...fine} opacity={0.9} strokeDasharray="2 3" />
        <rect x={790} y={590} width={240} height={190} />
        <line x1={910} y1={590} x2={910} y2={780} {...fine} />
      </g>
      {/* objects on shelves */}
      <g {...fine} opacity={0.75}>
        <rect x={810} y={210} width={30} height={40} />
        <circle cx={980} cy={225} r={24} />
        <path d="M 820 350 h 70 v -14 h -70 Z M 826 336 h 58 v -12 h -58 Z" />
        <path d="M 960 450 q 20 -60 40 0" />
      </g>
      {/* grain on doors */}
      <g {...fine} opacity={0.25}>
        {range(30).map((i) => <path key={i} d={`M ${160 + i * 20} 140 q 6 330 -2 650`} />)}
      </g>
      <Dim x1={150} y1={80} x2={750} y2={80} text="3 600" />
      <Dim x1={110} y1={130} x2={110} y2={800} text="2 700" />
      <text {...label} x={150} y={850}>WARDROBE WALL · ELEVATION A</text>
    </g>
  );
}

function KitchenElevation() {
  return (
    <g>
      <line x1={60} y1={800} x2={1140} y2={800} {...heavy} strokeWidth={4} />
      <g {...medium}>
        {/* tall units */}
        <rect x={100} y={140} width={240} height={660} />
        <line x1={220} y1={140} x2={220} y2={800} />
        <rect x={140} y={420} width={60} height={4} {...fine} />
        {/* base run */}
        <rect x={340} y={560} width={720} height={240} />
        <line x1={340} y1={590} x2={1060} y2={590} strokeWidth={3} />
        {[520, 700, 880].map((x) => <line key={x} x1={x} y1={590} x2={x} y2={800} {...fine} />)}
        <line x1={340} y1={690} x2={520} y2={690} {...fine} />
        {/* hob + extractor */}
        <line x1={730} y1={556} x2={860} y2={556} strokeWidth={4} />
        <path d="M 760 230 h 70 l 30 120 h -130 Z" />
        {/* open shelf */}
        <line x1={380} y1={330} x2={680} y2={330} strokeWidth={4} />
        <line x1={900} y1={330} x2={1060} y2={330} strokeWidth={4} />
      </g>
      {/* stone splashback with veining */}
      <g {...fine} opacity={0.4}>
        <rect x={340} y={380} width={720} height={180} />
        <path d="M 340 470 C 460 420 520 520 640 470 S 860 420 1060 500" />
        <path d="M 400 560 C 470 500 560 520 600 420" />
        <path d="M 860 380 C 900 450 980 470 1060 440" />
      </g>
      {/* objects */}
      <g {...fine} opacity={0.7}>
        <path d="M 420 330 v -40 h 30 v 40 M 480 330 q 20 -70 40 0 M 600 330 v -24 h 50 v 24" />
        <path d="M 940 330 q 0 -40 30 -40 q 30 0 30 40" />
      </g>
      {/* pendants */}
      <g {...medium}>
        {[470, 600].map((x) => (
          <g key={x}>
            <line x1={x} y1={0} x2={x} y2={180} {...fine} />
            <path d={`M ${x - 26} 210 Q ${x} 160 ${x + 26} 210 Z`} />
          </g>
        ))}
      </g>
      <Dim x1={1100} y1={560} x2={1100} y2={800} text="900" />
      <text {...label} x={100} y={850}>KITCHEN · ELEVATION B</text>
    </g>
  );
}

function ArchStair() {
  return (
    <g>
      <line x1={0} y1={800} x2={W} y2={800} {...heavy} strokeWidth={4} />
      {/* wall with arch */}
      <g {...medium}>
        <path d="M 360 800 V 360 A 200 200 0 0 1 760 360 V 800" strokeWidth={3.5} />
        <path d="M 384 800 V 360 A 176 176 0 0 1 736 360 V 800" {...fine} />
      </g>
      {/* stair beyond */}
      <g {...medium}>
        {range(11).map((i) => {
          const x = 420 + i * 30;
          const y = 790 - i * 46;
          return <path key={i} d={`M ${x} ${y} h 30 v -46`} />;
        })}
        <path d="M 420 760 L 750 280" {...fine} />
        <path d="M 440 700 L 760 230" />
      </g>
      {/* light through */}
      <g {...fine} opacity={0.28}>
        {range(16).map((i) => <line key={i} x1={760 + i * 18} y1={250} x2={420 + i * 34} y2={800} />)}
      </g>
      {/* plaster texture */}
      <g {...fine} opacity={0.2}>
        {range(60).map((i) => (
          <circle key={i} cx={(i * 197) % 340 + 10} cy={(i * 131) % 700 + 90} r={1.5} />
        ))}
        {range(60).map((i) => (
          <circle key={`r${i}`} cx={(i * 173) % 400 + 790} cy={(i * 113) % 700 + 90} r={1.5} />
        ))}
      </g>
      {/* bench */}
      <g {...medium}>
        <rect x={830} y={700} width={250} height={100} />
        <line x1={830} y1={716} x2={1080} y2={716} {...fine} />
      </g>
      <text {...label} x={360} y={850}>ENTRANCE HALL · SECTION C</text>
    </g>
  );
}

function OfficePlan() {
  return (
    <g>
      <g {...heavy}>
        <path d="M 120 120 H 1080 V 780 H 120 Z" />
        <path d="M 760 120 V 380 H 860 M 930 380 H 1080" />
        <path d="M 760 470 V 780" />
        <path d="M 120 300 H 260 M 330 300 H 360 V 120" strokeWidth={4} />
      </g>
      <Door x={860} y={380} r={70} rotate={90} />
      {/* meeting room */}
      <g {...medium}>
        <rect x={830} y={190} width={180} height={100} rx={10} />
        {range(4).map((i) => <circle key={i} cx={860 + i * 40} cy={172} r={13} {...fine} />)}
        {range(4).map((i) => <circle key={`b${i}`} cx={860 + i * 40} cy={308} r={13} {...fine} />)}
      </g>
      {/* reception curve */}
      <g {...medium}>
        <path d="M 160 640 Q 260 560 360 640" strokeWidth={14} opacity={0.85} />
        <rect x={160} y={690} width={180} height={60} {...fine} />
      </g>
      {/* desk clusters */}
      <g {...medium}>
        {[0, 1].map((r) =>
          [0, 1, 2].map((c) => {
            const x = 420 + c * 110;
            const y = 180 + r * 290;
            return (
              <g key={`${r}${c}`}>
                <rect x={x} y={y} width={80} height={200} />
                <line x1={x + 40} y1={y} x2={x + 40} y2={y + 200} {...fine} />
                {[0, 1].map((k) => (
                  <g key={k}>
                    <circle cx={x - 14} cy={y + 50 + k * 100} r={12} {...fine} />
                    <circle cx={x + 94} cy={y + 50 + k * 100} r={12} {...fine} />
                  </g>
                ))}
              </g>
            );
          }),
        )}
      </g>
      {/* lounge */}
      <g {...medium}>
        <path d="M 800 560 h 220 v 60 h -160 v 120 h -60 Z" />
        <circle cx={940} cy={690} r={40} {...fine} />
      </g>
      <g {...fine} opacity={0.5}>
        {range(12).map((i) => <line key={i} x1={130} y1={130 + i * 14} x2={130 + i * 14} y2={130} />)}
      </g>
      <text {...label} x={160} y={290}>STORE</text>
      <text {...label} x={170} y={600}>RECEPTION</text>
      <text {...label} x={470} y={760}>OPEN STUDIO</text>
      <text {...label} x={850} y={360}>MEETING</text>
      <text {...label} x={810} y={760}>LOUNGE</text>
      <Dim x1={120} y1={70} x2={1080} y2={70} text="16 800" />
    </g>
  );
}

function ClinicPlan() {
  const rooms = range(4);
  return (
    <g>
      <g {...heavy}>
        <path d="M 120 140 H 1080 V 760 H 120 Z" />
        <path d="M 420 140 V 380 M 420 520 V 760" />
        {rooms.map((i) => <path key={i} d={`M ${420 + i * 165} 380 V 140`} strokeWidth={5} />)}
        <path d="M 420 380 H 470 M 540 380 H 635 M 705 380 H 800 M 870 380 H 965 M 1035 380 H 1080" strokeWidth={5} />
        <path d="M 420 520 H 760 M 830 520 H 1080 M 760 520 V 760" strokeWidth={5} />
      </g>
      {/* treatment couches */}
      <g {...medium}>
        {rooms.map((i) => (
          <g key={i}>
            <rect x={455 + i * 165} y={190} width={50} height={130} rx={6} />
            <rect x={530 + i * 165} y={170} width={36} height={36} {...fine} />
            <rect x={436 + i * 165} y={156} width={36} height={30} {...fine} />
          </g>
        ))}
      </g>
      {/* corridor guidance */}
      <line x1={420} y1={450} x2={1080} y2={450} {...fine} strokeDasharray="10 8" />
      {/* reception + waiting */}
      <g {...medium}>
        <path d="M 160 260 H 340 V 320" strokeWidth={12} opacity={0.85} />
        {range(5).map((i) => <rect key={i} x={160 + i * 46} y={560} width={38} height={38} rx={4} {...fine} />)}
        {range(5).map((i) => <rect key={`b${i}`} x={160 + i * 46} y={660} width={38} height={38} rx={4} {...fine} />)}
        <circle cx={350} cy={610} r={26} {...fine} />
      </g>
      <text {...label} x={160} y={230}>RECEPTION</text>
      <text {...label} x={160} y={540}>WAITING</text>
      <text {...label} x={450} y={360}>TR 01</text>
      <text {...label} x={615} y={360}>TR 02</text>
      <text {...label} x={780} y={360}>TR 03</text>
      <text {...label} x={945} y={360}>TR 04</text>
      <text {...label} x={460} y={650}>CONSULT</text>
      <text {...label} x={860} y={650}>STAFF</text>
      <Dim x1={120} y1={90} x2={1080} y2={90} text="14 200" />
    </g>
  );
}

function PoolPlan() {
  return (
    <g>
      {/* house edge hatched */}
      <g {...heavy}>
        <path d="M 80 110 H 1120" />
      </g>
      <g {...fine} opacity={0.45}>
        {range(60).map((i) => <line key={i} x1={i * 22} y1={60} x2={i * 22 + 40} y2={108} />)}
      </g>
      {/* terrace + pergola */}
      <g {...medium}>
        <rect x={140} y={140} width={480} height={180} />
        {range(9).map((i) => <line key={i} x1={160 + i * 55} y1={140} x2={160 + i * 55} y2={320} {...fine} />)}
        <rect x={250} y={190} width={240} height={80} rx={6} />
      </g>
      {/* deck */}
      <g {...fine} opacity={0.6}>
        {range(16).map((i) => <line key={i} x1={660} y1={160 + i * 22} x2={1100} y2={160 + i * 22} />)}
      </g>
      {/* pool */}
      <g {...medium}>
        <rect x={200} y={420} width={620} height={220} strokeWidth={3.5} />
        <rect x={214} y={434} width={592} height={192} {...fine} />
        {range(5).map((i) => (
          <path key={i} d={`M ${260 + i * 100} ${480 + (i % 2) * 60} q 20 -10 40 0 t 40 0`} {...fine} />
        ))}
        {range(4).map((i) => <line key={i} x1={760} y1={460 + i * 20} x2={806} y2={460 + i * 20} {...fine} />)}
      </g>
      {/* loungers */}
      <g {...medium}>
        {range(3).map((i) => <rect key={i} x={880} y={440 + i * 70} width={170} height={48} rx={6} />)}
      </g>
      {/* trees */}
      <g {...medium}>
        {[[110, 760, 70], [980, 760, 90], [560, 780, 60], [1110, 470, 45]].map(([x, y, r], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={r} />
            <circle cx={x} cy={y} r={r * 0.6} {...fine} />
            <circle cx={x} cy={y} r={4} fill="currentColor" />
          </g>
        ))}
      </g>
      {/* planting band */}
      <g {...fine} opacity={0.6}>
        {range(26).map((i) => <circle key={i} cx={200 + i * 26} cy={700 + (i % 3) * 14} r={9} />)}
      </g>
      <text {...label} x={160} y={355}>SHADED TERRACE</text>
      <text {...label} x={220} y={410}>POOL · 12.0 × 4.2</text>
      <text {...label} x={880} y={420}>DECK</text>
    </g>
  );
}

function MaterialStone() {
  return (
    <g>
      <g {...medium} opacity={0.6}>
        {[0, 300, 600, 900].map((x) => <line key={x} x1={x} y1={0} x2={x} y2={H} strokeWidth={1.4} />)}
        {[0, 600].map((y) => <line key={y} x1={0} y1={y} x2={W} y2={y} strokeWidth={1.4} />)}
      </g>
      <g {...fine}>
        <path d="M -20 180 C 200 120 260 320 470 260 S 760 140 900 260 S 1120 380 1240 300" opacity={0.6} />
        <path d="M -20 230 C 160 200 300 360 520 330 S 820 260 1240 420" opacity={0.35} />
        <path d="M 120 900 C 220 700 420 720 560 560 S 820 380 1000 420 S 1160 300 1240 280" opacity={0.5} />
        <path d="M 300 900 C 380 780 520 820 640 700 S 880 600 1240 640" opacity={0.3} />
        <path d="M 470 260 C 500 330 470 420 560 560" opacity={0.4} />
        <path d="M 900 260 C 860 360 940 400 1000 420" opacity={0.4} />
      </g>
      <g {...fine} opacity={0.2}>
        {range(120).map((i) => <circle key={i} cx={(i * 211) % W} cy={(i * 97) % H} r={(i % 3) + 1} />)}
      </g>
    </g>
  );
}

function MaterialTimber() {
  return (
    <g>
      <g {...medium} opacity={0.55}>
        {range(7).map((i) => <line key={i} x1={0} y1={i * 150} x2={W} y2={i * 150} strokeWidth={1.4} />)}
        {range(7).map((i) => <line key={`j${i}`} x1={(i * 377) % W} y1={(i % 6) * 150} x2={(i * 377) % W} y2={(i % 6) * 150 + 150} strokeWidth={1.4} />)}
      </g>
      <g {...fine}>
        {range(6).map((row) =>
          range(5).map((k) => {
            const y = row * 150 + 22 + k * 26;
            const amp = 6 + ((row + k) % 3) * 4;
            return (
              <path
                key={`${row}-${k}`}
                d={`M 0 ${y} C 200 ${y - amp} 380 ${y + amp} 600 ${y} S 1000 ${y - amp} 1200 ${y}`}
                opacity={0.25 + (k % 2) * 0.2}
              />
            );
          }),
        )}
        <ellipse cx={420} cy={370} rx={36} ry={10} opacity={0.5} />
        <ellipse cx={420} cy={370} rx={18} ry={5} opacity={0.5} />
        <ellipse cx={900} cy={680} rx={30} ry={8} opacity={0.5} />
      </g>
    </g>
  );
}

function DetailSection() {
  return (
    <g>
      {/* slab with concrete hatch */}
      <rect x={0} y={80} width={W} height={120} {...medium} />
      <g {...fine} opacity={0.35}>
        {range(70).map((i) => <line key={i} x1={i * 20} y1={200} x2={i * 20 + 60} y2={80} />)}
        {range(40).map((i) => <circle key={`c${i}`} cx={(i * 131) % W} cy={100 + (i * 37) % 90} r={3} />)}
      </g>
      {/* wall */}
      <rect x={940} y={200} width={120} height={700} {...medium} />
      <g {...fine} opacity={0.35}>
        {range(36).map((i) => <line key={i} x1={940} y1={220 + i * 20} x2={1060} y2={160 + i * 20} />)}
      </g>
      <line x1={926} y1={460} x2={926} y2={900} {...medium} />
      {/* hangers + ceiling */}
      <g {...medium}>
        {[160, 400, 640].map((x) => <line key={x} x1={x} y1={200} x2={x} y2={420} {...fine} />)}
        <path d="M 60 430 H 760 V 470 H 60" />
        <path d="M 760 430 V 370 H 900 V 410" />
        <path d="M 760 470 H 840" />
        <rect x={60} y={420} width={700} height={10} {...fine} />
      </g>
      {/* cove light */}
      <g {...medium}>
        <rect x={790} y={388} width={36} height={18} />
        <g {...fine} opacity={0.6} strokeDasharray="3 5">
          {range(7).map((i) => <line key={i} x1={826} y1={400} x2={900 + i * 4} y2={460 + i * 50} />)}
        </g>
      </g>
      {/* leaders + notes */}
      <g {...fine} opacity={0.75}>
        <path d="M 300 430 L 260 560 H 120" />
        <path d="M 808 388 L 700 300 H 560" />
        <path d="M 926 600 L 820 680 H 680" />
        <path d="M 400 300 L 380 260 H 250" />
      </g>
      <text {...label} x={120} y={585}>12.5 MM GYPSUM BOARD</text>
      <text {...label} x={560} y={290}>LED LINEAR · 2700 K</text>
      <text {...label} x={680} y={705}>LIME PLASTER FINISH</text>
      <text {...label} x={250} y={250}>SUSPENSION ROD</text>
      <text {...label} x={60} y={850}>DETAIL 04 · CEILING COVE · 1:5</text>
    </g>
  );
}

export const drawings: Record<DrawingMotif, () => React.ReactElement> = {
  "living-perspective": LivingPerspective,
  "apartment-plan": ApartmentPlan,
  "villa-elevation": VillaElevation,
  "joinery-elevation": JoineryElevation,
  "kitchen-elevation": KitchenElevation,
  "arch-stair": ArchStair,
  "office-plan": OfficePlan,
  "clinic-plan": ClinicPlan,
  "pool-plan": PoolPlan,
  "material-stone": MaterialStone,
  "material-timber": MaterialTimber,
  "detail-section": DetailSection,
};
