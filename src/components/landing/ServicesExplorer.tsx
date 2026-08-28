import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type KeyboardEvent,
} from "react";

import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

import {
  Truck,
  CalendarCheck,
  MapPin,
  Route,
  Radio,
  PackageSearch,
  Navigation,
  RotateCcw,
  Handshake,
  UserCheck,
  ChartNoAxesCombined,
  FileSignature,
  Network,
  Warehouse,
  Database,
  ClipboardCheck,
  PackageCheck,
  AlertCircle,
  BellRing,
  MonitorCog,
  DatabaseZap,
  Boxes,
  Users,
  ArrowLeftRight,
  CalendarClock,
  ShieldCheck,
  ShoppingCart,
  BarChart3,
  MessageSquare,
  Store,
  ListChecks,
  ReceiptText,
  ChevronRight,
  ArrowUpRight,
  X,
  ArrowRight,
} from "lucide-react";

import { serviceCategories } from "../../data/brickwork";

type SubKeyService = {
  name: string;
  href: string;
  icon: ElementType;
};

type KeyService = {
  name: string;
  href: string;
  subServices: SubKeyService[];
  color: string;
  icon: ElementType;
};

const LOGO_COLORS = {
  blue: "#0072CE",
  green: "#78BE20",
  orange: "#FF8200",
  pink: "#E00070",
};

function shuffleBrandColors(colors: string[]): string[] {
  const next = [...colors];

  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }

  return next;
}

function getActiveRingColor(angleDeg: number): string {
  const normalizedAngle = ((angleDeg % 360) + 360) % 360;

  // Painted ring quadrants (0° = right, clockwise, y-down):
  // Blue: top → right, Green: right → bottom,
  // Orange: bottom → left, Pink: left → top
  if (normalizedAngle >= 0 && normalizedAngle < 90) {
    return LOGO_COLORS.green;
  } else if (normalizedAngle >= 90 && normalizedAngle < 180) {
    return LOGO_COLORS.orange;
  } else if (normalizedAngle >= 180 && normalizedAngle < 270) {
    return LOGO_COLORS.pink;
  } else {
    return LOGO_COLORS.blue;
  }
}

function ITNetworkBackground() {
  const circuits = [
    "M0 100 H120 L175 145 H280",
    "M0 220 H90 L145 275 H250",
    "M0 395 H125 L180 345 H290",
    "M0 510 H100 L155 460 H260",
    "M820 100 H700 L645 145 H540",
    "M820 220 H730 L675 275 H570",
    "M820 395 H695 L640 345 H530",
    "M820 510 H720 L665 460 H560",
    "M105 0 V70 L160 125",
    "M270 0 V75 L325 130",
    "M550 0 V75 L495 130",
    "M715 0 V70 L660 125",
    "M105 610 V540 L160 485",
    "M270 610 V535 L325 480",
    "M550 610 V535 L495 480",
    "M715 610 V540 L660 485",
    "M0 305 H125 L180 250 H300",
    "M820 305 H695 L640 360 H520",
  ];

  const nodes = [
    [120, 100], [175, 145], [90, 220], [145, 275],
    [125, 395], [180, 345], [100, 510], [155, 460],
    [700, 100], [645, 145], [730, 220], [675, 275],
    [695, 395], [640, 345], [720, 510], [665, 460],
    [125, 305], [695, 305],
  ];

  const particles = Array.from({ length: 70 }, (_, i) => ({
    x: 12 + ((i * 137) % 796),
    y: 15 + ((i * 79) % 570),
    r: i % 9 === 0 ? 2 : i % 3 === 0 ? 1.25 : 0.75,
  }));

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Soft white / blush-pink base. This is the ONLY large-area color change. */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 48%, rgba(255,255,255,1) 0%, rgba(255,250,250,1) 35%, rgba(255,239,242,1) 68%, rgba(255,224,231,1) 100%)",
        }}
        animate={{ scale: [1, 1.012, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle technical grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(225,55,85,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(225,55,85,.055) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(circle at center, #000 10%, rgba(0,0,0,.75) 60%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, #000 10%, rgba(0,0,0,.75) 60%, transparent 100%)",
        }}
      />

      {/* Ambient pink light */}
      <motion.div
        className="absolute -left-40 -top-32 h-[430px] w-[430px] rounded-full blur-3xl"
        style={{ background: "rgba(244,86,105,.16)" }}
        animate={{
          x: [0, 55, 0], y: [0, 35, 0], scale: [1, 1.12, 1],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -right-40 bottom-[-160px] h-[500px] w-[500px] rounded-full blur-3xl"
        style={{ background: "rgba(238,72,105,.13)" }}
        animate={{
          x: [0, -55, 0], y: [0, -35, 0], scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 820 610"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="hr-pink-wave" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#F0445D" stopOpacity="0" />
            <stop offset=".25" stopColor="#F0445D" stopOpacity=".10" />
            <stop offset=".5" stopColor="#E00070" stopOpacity=".18" />
            <stop offset=".75" stopColor="#F0445D" stopOpacity=".10" />
            <stop offset="1" stopColor="#F0445D" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="hr-pink-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#F0445D" stopOpacity="0" />
            <stop offset=".5" stopColor="#F0445D" stopOpacity=".35" />
            <stop offset="1" stopColor="#E00070" stopOpacity="0" />
          </linearGradient>

          <filter id="hr-pink-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="hr-soft-glow" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Large flowing upper wave */}
        <motion.path
          d="M-40 115 C120 20 230 50 330 135 C430 220 520 215 620 130 C710 55 780 70 860 115"
          stroke="url(#hr-pink-wave)"
          strokeWidth="80"
          strokeLinecap="round"
          opacity=".7"
          animate={{
            d: [
              "M-40 115 C120 20 230 50 330 135 C430 220 520 215 620 130 C710 55 780 70 860 115",
              "M-40 145 C120 55 235 70 330 150 C425 230 525 225 625 145 C720 70 785 85 860 135",
              "M-40 115 C120 20 230 50 330 135 C430 220 520 215 620 130 C710 55 780 70 860 115",
            ],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Lower flowing wave */}
        <motion.path
          d="M-40 500 C130 430 210 455 330 520 C450 585 560 580 650 500 C730 430 790 430 860 455"
          stroke="url(#hr-pink-wave)"
          strokeWidth="65"
          strokeLinecap="round"
          opacity=".5"
          animate={{ x: [0, 12, 0], y: [0, -8, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Fine animated wave lines */}
        {Array.from({ length: 8 }, (_, i) => {
          const y = 105 + i * 10;
          return (
            <motion.path
              key={`wave-${i}`}
              d={`M-20 ${y} C100 ${y - 35} 190 ${y - 25} 285 ${y + 20} C385 ${y + 70} 480 ${y + 65} 580 ${y + 10} C680 ${y - 45} 760 ${y - 25} 850 ${y + 5}`}
              stroke="url(#hr-pink-line)"
              strokeWidth={i === 0 ? 1.5 : 0.7}
              strokeDasharray="2 12"
              opacity={0.18 + i * 0.015}
              animate={{ strokeDashoffset: [0, -180] }}
              transition={{ duration: 7 + i * 0.4, repeat: Infinity, ease: "linear" }}
            />
          );
        })}

        {/* Background circuit paths */}
        {circuits.map((path, i) => (
          <motion.path
            key={`circuit-${i}`}
            d={path}
            stroke={i % 3 === 0 ? "#F0445D" : "#E00070"}
            strokeWidth={i % 5 === 0 ? 1.4 : 0.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="2 13"
            opacity=".18"
            animate={{ strokeDashoffset: [0, -100], opacity: [0.10, 0.28, 0.10] }}
            transition={{ duration: 5 + (i % 4), repeat: Infinity, ease: "linear", delay: i * 0.08 }}
          />
        ))}

        {/* Background glowing nodes */}
        {nodes.map(([x, y], i) => (
          <g key={`node-${i}`}>
            <motion.circle
              cx={x}
              cy={y}
              r="10"
              fill="#F0445D"
              opacity=".08"
              filter="url(#hr-soft-glow)"
              animate={{ r: [6, 15, 6], opacity: [0.03, 0.14, 0.03] }}
              transition={{ duration: 2.8 + (i % 4) * 0.5, delay: i * 0.12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx={x}
              cy={y}
              r="3"
              fill="#F0445D"
              filter="url(#hr-pink-glow)"
              animate={{ r: [2, 4.5, 2], opacity: [0.25, 0.85, 0.25] }}
              transition={{ duration: 2.2 + (i % 3) * 0.4, delay: i * 0.08, repeat: Infinity, ease: "easeInOut" }}
            />
            <circle cx={x} cy={y} r="1" fill="#FFFFFF" opacity=".8" />
          </g>
        ))}

        {/* Floating background particles */}
        {particles.map((particle, i) => (
          <motion.circle
            key={`particle-${i}`}
            cx={particle.x}
            cy={particle.y}
            r={particle.r}
            fill={i % 4 === 0 ? "#F0445D" : i % 4 === 1 ? "#E00070" : "#FFFFFF"}
            animate={{
              opacity: [0.04, 0.4, 0.04],
              y: [particle.y, particle.y - 8, particle.y],
              scale: [0.7, 1.25, 0.7],
            }}
            transition={{ duration: 3 + (i % 5) * 0.7, delay: i * 0.06, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* Moving background signals */}
        <motion.path
          d="M0 185 H130 L185 240 H300"
          stroke="#F0445D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="2 100"
          opacity=".35"
          animate={{ strokeDashoffset: [0, -220] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />

        <motion.path
          d="M820 430 H690 L635 375 H520"
          stroke="#E00070"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="2 100"
          opacity=".3"
          animate={{ strokeDashoffset: [0, -220] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Very subtle decorative background arcs */}
        <motion.circle
          cx="410"
          cy="305"
          r="255"
          fill="none"
          stroke="#F0445D"
          strokeWidth="1"
          strokeDasharray="2 20"
          opacity=".08"
          animate={{ rotate: 360 }}
          style={{ transformOrigin: "410px 305px" }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        />

        <motion.circle
          cx="410"
          cy="305"
          r="290"
          fill="none"
          stroke="#E00070"
          strokeWidth="1"
          strokeDasharray="3 25"
          opacity=".06"
          animate={{ rotate: -360 }}
          style={{ transformOrigin: "410px 305px" }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* Keeps the center visually clean without touching the foreground hub */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,.28) 0%, rgba(255,255,255,.08) 38%, rgba(210,35,70,.06) 100%)",
        }}
      />
    </div>
  );
}

export function ServicesExplorer() {
  // const executiveAdmin = serviceCategories.find(
  //   (service) =>
  //     service.title.trim().toLowerCase() === "executive admin services"
  // );

const baseKeyServices: KeyService[] = [
  {
    name: "Logistics Management",
    href: "https://www.brickworkindia.com/supply-chain-operations/logistics-management",
    color: LOGO_COLORS.green,
    icon: Truck,
    subServices: [
      ["Freight Scheduling and Carrier Coordination", CalendarCheck],
      ["Real-Time Shipment Monitoring", MapPin],
      ["Route Research and Optimization Support", Route],
      ["Fleet and Telematics Review", Radio],
      ["In-Transit Inventory Visibility", PackageSearch],
      ["Last-Mile Delivery Support", Navigation],
      ["Reverse Logistics Management", RotateCcw],
    ].map(([name, icon]) => ({
      name: name as string,
      href: "https://www.brickworkindia.com/supply-chain-operations/logistics-management",
      icon: icon as ElementType,
    })),
  },

  {
    name: "Vendor Management",
    href: "https://www.brickworkindia.com/supply-chain-operations/vendor-management",
    color: LOGO_COLORS.green,
    icon: Handshake,
    subServices: [
      ["Supplier and Vendor Onboarding and Credentialing", UserCheck],
      ["Vendor Performance Monitoring and SLA Reporting", ChartNoAxesCombined],
      ["Rate and Contract Negotiation Support", FileSignature],
      ["Logistics Provider Coordination with 3PL and 4PL", Network],
    ].map(([name, icon]) => ({
      name: name as string,
      href: "https://www.brickworkindia.com/supply-chain-operations/vendor-management",
      icon: icon as ElementType,
    })),
  },

  {
    name: "Warehouse & Fulfillment",
    href: "https://www.brickworkindia.com/supply-chain-operations/warehouse-and-fulfillment",
    color: LOGO_COLORS.green,
    icon: Warehouse,
    subServices: [
      ["Inventory Data Management", Database],
      ["Stock Audits & Reconciliation", ClipboardCheck],
      ["Order Processing & Tracking", PackageCheck],
      ["Backorder & Exception Management", AlertCircle],
      ["Inventory Threshold Alerts & Replenishment Triggers", BellRing],
    ].map(([name, icon]) => ({
      name: name as string,
      href: "https://www.brickworkindia.com/supply-chain-operations/warehouse-and-fulfillment",
      icon: icon as ElementType,
    })),
  },

  {
    name: "Digital Fulfillment Ops",
    href: "https://www.brickworkindia.com/supply-chain-operations/digital-fulfillment-ops",
    color: LOGO_COLORS.green,
    icon: MonitorCog,
    subServices: [
      ["EDI and ERP Order Fulfillment", DatabaseZap],
      ["Digital Pick-Pack Ship Coordination", PackageCheck],
      ["Returns and Reverse Fulfillment", RotateCcw],
      ["Warehouse Management Support", Warehouse],
    ].map(([name, icon]) => ({
      name: name as string,
      href: "https://www.brickworkindia.com/supply-chain-operations/digital-fulfillment-ops",
      icon: icon as ElementType,
    })),
  },

  {
    name: "Warehouse Coordination",
    href: "https://www.brickworkindia.com/supply-chain-operations/warehouse-coordination",
    color: LOGO_COLORS.green,
    icon: Boxes,
    subServices: [
      ["Labor Scheduling and Task Allocation", Users],
      ["Data Entry for Inbound and Outbound Operations", ArrowLeftRight],
      ["Dock Appointment Scheduling", CalendarClock],
      ["Safety and Compliance Documentation", ShieldCheck],
    ].map(([name, icon]) => ({
      name: name as string,
      href: "https://www.brickworkindia.com/supply-chain-operations/warehouse-coordination",
      icon: icon as ElementType,
    })),
  },

  {
    name: "e-Commerce & Customer Operations",
    href: "https://www.brickworkindia.com/supply-chain-operations/ecommerce-and-customer-operations",
    color: LOGO_COLORS.green,
    icon: ShoppingCart,
    subServices: [
      ["Inventory Stock Level Updates", BarChart3],
      ["Marketplace Message Handling", MessageSquare],
      ["Online Store Management", Store],
      ["Order Fulfillment Tracking", PackageSearch],
      ["Product Listings and Updates", ListChecks],
      ["Return and Refund Case Management", ReceiptText],
    ].map(([name, icon]) => ({
      name: name as string,
      href: "https://www.brickworkindia.com/supply-chain-operations/ecommerce-and-customer-operations",
      icon: icon as ElementType,
    })),
  },
];
  // const shuffledPalette = shuffleBrandColors(
  //   Object.values(LOGO_COLORS)
  // );

  // const keyServices: KeyService[] = baseKeyServices.map(
  //   (service, index) => ({
  //     ...service,
  //     color: shuffledPalette[index % shuffledPalette.length],
  //   })
  // );

  const palette = Object.values(LOGO_COLORS);

const keyServices: KeyService[] = baseKeyServices.map(
  (service, index) => ({
    ...service,
    color: palette[index % palette.length],
  })
);

  const [activeService, setActiveService] = useState<string | null>(null);
  const [isHoveredOver, setIsHoveredOver] = useState(false);
  const [stageViewportWidth, setStageViewportWidth] = useState(2000);
  const stageViewportRef = useRef<HTMLDivElement>(null);
  const suppressLeaveRef = useRef(false);

  const selectedService =
    keyServices.find((service) => service.name === activeService) ?? null;

  const openService = (
    serviceName: string,
    pillEl?: HTMLElement | null
  ) => {
    setActiveService(serviceName);
    setIsHoveredOver(true);

    if (!pillEl) return;

    const pillRect = pillEl.getBoundingClientRect();
    const viewportH = window.innerHeight;

    if (pillRect.top > viewportH * 0.5) {
      const section = document.getElementById("services");
      if (!section) return;

      suppressLeaveRef.current = true;
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      window.setTimeout(() => {
        suppressLeaveRef.current = false;
      }, 900);
    }
  };

  const closeAllServices = () => {
    if (suppressLeaveRef.current) return;
    setActiveService(null);
    setIsHoveredOver(false);
  };

  const handleKeyDown = (
    e: KeyboardEvent,
    serviceName: string
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openService(
        serviceName,
        e.currentTarget as HTMLElement
      );
    }
  };

  const orbitRotation = useMotionValue(0);

  const counterRotation = useTransform(
    orbitRotation,
    (value) => -value
  );

  const animControls =
    useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    animControls.current = animate(
      orbitRotation,
      360,
      {
        duration: 75,
        repeat: Infinity,
        ease: "linear",
      }
    );

    return () => {
      animControls.current?.stop();
    };
  }, [orbitRotation]);

  useEffect(() => {
    if (isHoveredOver) {
      animControls.current?.pause();
    } else {
      animControls.current?.play();
    }
  }, [isHoveredOver]);

  useEffect(() => {
    const el = stageViewportRef.current;
    if (!el) return;

    const updateWidth = () => {
      setStageViewportWidth(el.getBoundingClientRect().width);
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  // if (!executiveAdmin) {
  //   return null;
  // }

  /*
   * =========================================================
   * DESKTOP GEOMETRY
   * =========================================================
   */

  const STAGE_SIZE = 820;
  const CENTER_XY = STAGE_SIZE / 2;
  const ORBIT_RADIUS = 315;
  const CENTER_RADIUS = 100;

  const CARD_WIDTH = 222;
  const CARD_HEIGHT = 64;
  const HUB_VISUAL_SPAN = (ORBIT_RADIUS * 2 + CARD_WIDTH) * 1.1;
  const fitScale =
    stageViewportWidth < 40
      ? 1
      : Math.min(
          1,
          Math.max(0.58, stageViewportWidth / HUB_VISUAL_SPAN)
        );

  const servicePositions = keyServices.map((_, index) => {
    const angle =
      -90 + index * (360 / keyServices.length);

    const radians = (angle * Math.PI) / 180;

    return {
      x:
        CENTER_XY +
        ORBIT_RADIUS * Math.cos(radians),

      y:
        CENTER_XY +
        ORBIT_RADIUS * Math.sin(radians),

      angle,
      radians,
    };
  });

  /*
   * =========================================================
   * MOBILE GEOMETRY
   *
   * IMPORTANT:
   * ONLY MOBILE VALUES ARE REDUCED.
   * Desktop values above are untouched.
   * =========================================================
   */

  const MOBILE_STAGE_WIDTH = 430;
  const MOBILE_STAGE_HEIGHT = 430;

  const MOBILE_CENTER_X =
    MOBILE_STAGE_WIDTH / 2;

  const MOBILE_CENTER_Y =
    MOBILE_STAGE_HEIGHT / 2;

  /*
   * Smaller ellipse so all 7 cards remain
   * comfortably inside the mobile viewport.
   */
  const MOBILE_ORBIT_X = 132;
  const MOBILE_ORBIT_Y = 118;

  /*
   * Smaller fixed center.
   * The center itself NEVER rotates.
   */
  const MOBILE_CENTER_SIZE = 76;

  /*
   * Smaller cards prevent adjacent cards
   * from touching/overlapping during rotation.
   */
  const MOBILE_CARD_WIDTH = 92;
  const MOBILE_CARD_HEIGHT = 34;

  const mobileServicePositions = keyServices.map(
    (_, index) => {
      const angle =
        -90 + index * (360 / keyServices.length);

      const radians =
        (angle * Math.PI) / 180;

      return {
        x:
          MOBILE_CENTER_X +
          MOBILE_ORBIT_X * Math.cos(radians),

        y:
          MOBILE_CENTER_Y +
          MOBILE_ORBIT_Y * Math.sin(radians),

        angle,
        radians,
      };
    }
  );

  return (
    <section
      id="services"
      className="
        relative
        overflow-hidden
        bg-slate-950
        pt-6
        pb-2
        sm:pt-6
        sm:pb-0
        lg:pt-6
        lg:pb-4
        text-white
      "
    >
      <style>{`
        @keyframes pulseFlow {
          0% {
            stroke-dashoffset: 24;
          }

          100% {
            stroke-dashoffset: 0;
          }
        }

        .animate-spoke-flow {
          animation:
            pulseFlow
            1.2s
            linear
            infinite;
        }

        @media (max-width: 1023px) {
          .mobile-service-scroll {
            scrollbar-width: thin;
            scrollbar-color: rgba(148,163,184,.55) rgba(15,23,42,.45);
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: contain;
          }

          .mobile-service-scroll::-webkit-scrollbar {
            width: 5px;
          }

          .mobile-service-scroll::-webkit-scrollbar-track {
            background: rgba(15,23,42,.45);
            border-radius: 999px;
          }

          .mobile-service-scroll::-webkit-scrollbar-thumb {
            background: rgba(148,163,184,.55);
            border-radius: 999px;
          }
        }
      `}</style>

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="
              mt-2
              text-balance
              text-2xl
              font-black
              text-white
              sm:text-4xl
              lg:text-5xl
            "
          >
            Supply Chain Operations 
          </h2>
        </div>

        {/* =====================================================
            MAIN CONTAINER
        ====================================================== */}

        <div className="mx-auto mt-3 w-full sm:mt-8">

          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              border
              border-slate-800
              bg-slate-950
              shadow-2xl
              backdrop-blur-2xl
              sm:rounded-[2.5rem]
            "
            onMouseLeave={closeAllServices}
          >

            {/* BRAND TOP BAR */}

            <div
              className="
                absolute
                inset-x-0
                top-0
                z-[100]
                h-[3px]
              "
              style={{
                background:
                  `linear-gradient(
                    90deg,
                    ${LOGO_COLORS.blue},
                    ${LOGO_COLORS.green},
                    ${LOGO_COLORS.orange},
                    ${LOGO_COLORS.pink}
                  )`,
              }}
            />

            {/* =================================================
                DESKTOP VERSION
            ================================================== */}

            <div
              className="
                relative
                hidden
                min-h-[500px]
                items-stretch
                overflow-hidden
                lg:flex
              "
            >

              <ITNetworkBackground />

              {/* DESKTOP STAGE */}

              <div
                ref={stageViewportRef}
                className="
                  relative
                  z-20
                  flex
                  min-h-0
                  min-w-0
                  flex-1
                  items-center
                  justify-center
                  overflow-hidden
                  bg-transparent
                "
              >
              <motion.div
                className="
                  relative
                  flex
                  items-center
                  justify-center
                "
                style={{
                  width: `${STAGE_SIZE}px`,
                  height: `${STAGE_SIZE}px`,
                  transformOrigin: "center center",
                }}
                animate={{
                  scale: fitScale,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >

                {/* ROTATING ORBIT */}

                <motion.div
                  className="absolute inset-0"
                  style={{
                    rotate: orbitRotation,
                    transformOrigin:
                      "50% 50%",
                  }}
                >

                  {/* CONNECTOR SVG */}

                  <svg
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      h-full
                      w-full
                      overflow-visible
                    "
                    viewBox={`0 0 ${STAGE_SIZE} ${STAGE_SIZE}`}
                    fill="none"
                  >

                    <defs>
                      {servicePositions.map(
                        (_, index) => (
                          <filter
                            id={`glow-spoke-${index}`}
                            key={`filter-${index}`}
                            x="-20%"
                            y="-20%"
                            width="140%"
                            height="140%"
                          >
                            <feGaussianBlur
                              stdDeviation="3"
                              result="blur"
                            />

                            <feComposite
                              in="SourceGraphic"
                              in2="blur"
                              operator="over"
                            />
                          </filter>
                        )
                      )}
                    </defs>

                    {servicePositions.map(
                      (position, index) => {
                        const service =
                          keyServices[index];

                        const isHovered =
                          activeService ===
                          service.name;

                        const activeSliceColor =
                          isHovered
                            ? service.color
                            : getActiveRingColor(
                                position.angle
                              );

                        const startX =
                          CENTER_XY +
                          CENTER_RADIUS *
                            Math.cos(
                              position.radians
                            );

                        const startY =
                          CENTER_XY +
                          CENTER_RADIUS *
                            Math.sin(
                              position.radians
                            );

                        return (
                          <g
                            key={`spoke-${index}`}
                          >

                            <line
                              x1={startX}
                              y1={startY}
                              x2={position.x}
                              y2={position.y}
                              stroke={
                                service.color
                              }
                              strokeWidth={
                                isHovered
                                  ? "2.5"
                                  : "1.2"
                              }
                              opacity={
                                isHovered
                                  ? 0.9
                                  : 0.3
                              }
                              className="
                                transition-all
                                duration-300
                              "
                            />

                            <line
                              x1={startX}
                              y1={startY}
                              x2={position.x}
                              y2={position.y}
                              stroke={
                                service.color
                              }
                              strokeWidth={
                                isHovered
                                  ? "4"
                                  : "2"
                              }
                              strokeDasharray="6 12"
                              strokeLinecap="round"
                              opacity={
                                isHovered
                                  ? 1
                                  : 0.75
                              }
                              filter={
                                isHovered
                                  ? `url(#glow-spoke-${index})`
                                  : undefined
                              }
                              className="
                                animate-spoke-flow
                                transition-all
                                duration-300
                              "
                            />

                            {isHovered && (
                              <circle
                                cx={
                                  (startX +
                                    position.x) /
                                  2
                                }
                                cy={
                                  (startY +
                                    position.y) /
                                  2
                                }
                                r="4"
                                fill="#FFFFFF"
                                filter={`url(#glow-spoke-${index})`}
                              />
                            )}

                          </g>
                        );
                      }
                    )}

                  </svg>

                  {/* DESKTOP KEY SERVICE CARDS */}

                  {keyServices.map(
                    (service, index) => {
                      const position =
                        servicePositions[index];

                      const isActive =
                        activeService ===
                        service.name;

                      const nodeRingColor =
                        service.color;

                      const ServiceIcon =
                        service.icon;

                      return (
                        <div
                          key={service.name}
                          className="
                            absolute
                            z-30
                          "
                          style={{
                            left:
                              `${position.x -
                                CARD_WIDTH / 2}px`,
                            top:
                              `${position.y -
                                CARD_HEIGHT / 2}px`,
                            width:
                              `${CARD_WIDTH}px`,
                            height:
                              `${CARD_HEIGHT}px`,
                          }}
                        >

                          <motion.div
                            className="
                              h-full
                              w-full
                            "
                            style={{
                              rotate:
                                counterRotation,
                              transformOrigin:
                                "50% 50%",
                            }}
                          >

                            <a
                              href={service.href}
                              target="_blank"
                              rel="noreferrer"

                              // onClick={(e) => {
                              //   e.preventDefault();
                              //   openService(
                              //     service.name,
                              //     e.currentTarget
                              //   );
                              // }}

                              onMouseEnter={(e) =>
                                openService(
                                  service.name,
                                  e.currentTarget
                                )
                              }

                              onFocus={(e) =>
                                openService(
                                  service.name,
                                  e.currentTarget
                                )
                              }

                              onKeyDown={(e) =>
                                handleKeyDown(
                                  e,
                                  service.name
                                )
                              }

                              tabIndex={0}
                              aria-expanded={
                                isActive
                              }

                              className="
                                group
                                relative
                                flex
                                h-full
                                w-full
                                items-center
                                justify-between
                                rounded-full
                                border
                                bg-slate-900/90
                                pl-2
                                pr-4
                                shadow-xl
                                backdrop-blur-xl
                                transition-all
                                duration-300
                                hover:scale-105
                                hover:bg-slate-900
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                              "

                              style={{
                                borderColor:
                                  isActive
                                    ? service.color
                                    : "rgba(71,85,105,.6)",

                                boxShadow:
                                  isActive
                                    ? `0 0 32px -2px ${service.color}B0,
                                       0 0 12px 0 ${service.color}60`
                                    : `0 8px 20px -6px rgba(0,0,0,.6)`,
                              }}
                            >

                              <div
                                className="
                                  flex
                                  size-11
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-full
                                  text-white
                                  shadow-md
                                  transition-transform
                                  duration-300
                                  group-hover:scale-110
                                "
                                style={{
                                  backgroundColor:
                                    nodeRingColor,
                                }}
                              >
                                <ServiceIcon
                                  className="size-5"
                                  strokeWidth={2.2}
                                />
                              </div>

                              <div
                                className="
                                  flex
                                  flex-1
                                  items-center
                                  justify-start
                                  pl-3
                                "
                              >
                                <span
                                  className="
                                    text-sm
                                    font-bold
                                    leading-tight
                                    text-slate-100
                                    transition-colors
                                    duration-200
                                    group-hover:text-white
                                  "
                                >
                                  {service.name}
                                </span>
                              </div>

                              <ChevronRight
                                className="
                                  size-4
                                  shrink-0
                                  text-slate-500
                                  transition-all
                                  duration-300
                                  group-hover:translate-x-1
                                  group-hover:text-white
                                "
                              />

                            </a>

                          </motion.div>
                        </div>
                      );
                    }
                  )}

                </motion.div>

                {/* =================================================
                    FIXED CENTER HUB
                ================================================== */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-1/2
                    z-10
                    flex
                    -translate-x-1/2
                    -translate-y-1/2
                    flex-col
                    items-center
                    justify-center
                  "
                >

                  <div
                    className="
                      relative
                      flex
                      size-[220px]
                      items-center
                      justify-center
                    "
                  >

                    <motion.svg
                      className="
                        absolute
                        inset-0
                        size-full
                        overflow-visible
                      "
                      viewBox="0 0 200 200"
                      fill="none"
                      style={{
                        rotate:
                          orbitRotation,
                        transformOrigin:
                          "50% 50%",
                      }}
                    >
                      <path
                        d="M 100,10 A 90,90 0 0,1 190,100 L 165,100 A 65,65 0 0,0 100,35 Z"
                        fill={
                          LOGO_COLORS.blue
                        }
                      />

                      <path
                        d="M 190,100 A 90,90 0 0,1 100,190 L 100,165 A 65,65 0 0,0 165,100 Z"
                        fill={
                          LOGO_COLORS.green
                        }
                      />

                      <path
                        d="M 100,190 A 90,90 0 0,1 10,100 L 35,100 A 65,65 0 0,0 100,165 Z"
                        fill={
                          LOGO_COLORS.orange
                        }
                      />

                      <path
                        d="M 10,100 A 90,90 0 0,1 100,10 L 100,35 A 65,65 0 0,0 35,100 Z"
                        fill={
                          LOGO_COLORS.pink
                        }
                      />
                    </motion.svg>

                    {/* CENTER ITSELF DOES NOT ROTATE */}

                    <a
                      href="https://www.brickworkindia.com/services/supply-chain-operations"
                      target="_blank"
                      rel="noreferrer"
                      title="Global Business Support Services & Business Process Outsourcing | Brickwork"
                      className="
                        pointer-events-auto
                        group
                        relative
                        flex
                        size-[132px]
                        overflow-hidden
                        flex-col
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-blue-500/40
                        bg-slate-950/90
                        p-4
                        text-center
                        shadow-[0_0_25px_rgba(0,114,206,0.25)]
                        backdrop-blur-xl
                        transition-all
                        duration-300
                        hover:scale-105
                        hover:border-blue-400
                        hover:shadow-[0_0_35px_rgba(0,114,206,0.6)]
                      "
                    >

                      <motion.svg
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          size-full
                          opacity-40
                          transition-opacity
                          group-hover:opacity-75
                        "
                        viewBox="0 0 100 100"
                        animate={{
                          rotate: -360,
                        }}
                        transition={{
                          duration: 25,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          stroke="rgba(59,130,246,.3)"
                          strokeWidth="1"
                          strokeDasharray="3 3"
                          fill="none"
                        />

                        <circle
                          cx="50"
                          cy="50"
                          r="32"
                          stroke="rgba(224,0,112,.2)"
                          strokeWidth="1"
                          strokeDasharray="6 4"
                          fill="none"
                        />

                        <circle
                          cx="50"
                          cy="50"
                          r="4"
                          fill="#0072CE"
                        />

                        <circle
                          cx="82"
                          cy="50"
                          r="2.5"
                          fill="#78BE20"
                        />

                        <circle
                          cx="50"
                          cy="18"
                          r="2.5"
                          fill="#FF8200"
                        />

                        <circle
                          cx="18"
                          cy="50"
                          r="2.5"
                          fill="#E00070"
                        />
                      </motion.svg>

                      <div
                        className="
                          absolute
                          inset-0
                          rounded-full
                          bg-gradient-to-tr
                          from-blue-600/20
                          via-transparent
                          to-pink-600/20
                          opacity-30
                          transition-opacity
                          duration-300
                          group-hover:opacity-100
                        "
                      />

                      <span
                        className="
                          relative
                          z-10
                          text-sm
                          font-black
                          leading-tight
                          text-white
                          transition-colors
                          duration-200
                          group-hover:text-blue-200
                        "
                      >
                        Supply Chain Operations
                      </span>

                    </a>
                  </div>
                </div>

              </motion.div>
              </div>

              {/* =================================================
                  DESKTOP RIGHT DRAWER
              ================================================== */}

              <AnimatePresence>
                {selectedService && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: 80,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: 80,
                    }}
                    transition={{
                      duration: 0.35,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                    className="
                      relative
                      z-40
                      flex
                      w-[min(400px,38%)]
                      min-w-[320px]
                      max-w-[400px]
                      shrink-0
                      flex-col
                      self-stretch
                      border-l
                      border-slate-700/80
                      bg-slate-900/90
                      p-7
                      text-white
                      shadow-2xl
                      backdrop-blur-2xl
                    "
                  >

                    {/* DRAWER HEADER */}

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-slate-700/80
                        pb-6
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-4
                        "
                      >

                        <span
                          className="
                            flex
                            size-12
                            items-center
                            justify-center
                            rounded-2xl
                            text-white
                            shadow-xl
                            ring-2
                            ring-white/20
                          "
                          style={{
                            background:
                              selectedService.color,
                          }}
                        >
                          <selectedService.icon
                            className="size-6"
                          />
                        </span>

                        <div>
                          <h3
                            className="
                              text-2xl
                              font-black
                              leading-tight
                              text-white
                            "
                          >
                            {selectedService.name}
                          </h3>
                        </div>

                      </div>

                      <button
                        type="button"
                        onClick={
                          closeAllServices
                        }
                        aria-label="Close details drawer"
                        className="
                          rounded-full
                          p-2.5
                          text-slate-400
                          transition-colors
                          hover:bg-slate-800
                          hover:text-white
                        "
                      >
                        <X className="size-5" />
                      </button>

                    </div>

                    {/* SUB SERVICES */}

                    <div
                      className="
                        mt-6
                        flex-1
                        space-y-3
                        overflow-y-auto
                        pr-2
                      "
                    >

                      <div
                        className="
                          mb-2
                          flex
                          items-center
                          justify-between
                        "
                      >
                        <p
                          className="
                            text-xs
                            font-extrabold
                            uppercase
                            tracking-wider
                            text-slate-400
                          "
                        >
                          Specialized Capabilities
                        </p>
                      </div>

                      {selectedService.subServices.map(
                        (subService, idx) => {
                          const SubIcon =
                            subService.icon;

                          return (
                            <motion.a
                              key={idx}
                              href={
                                subService.href
                              }
                              target="_blank"
                              rel="noreferrer"
                              initial={{
                                opacity: 0,
                                y: 20,
                                scale: 0.96,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                              }}
                              transition={{
                                duration: 0.3,
                                delay:
                                  idx * 0.07,
                                ease: [
                                  0.22,
                                  1,
                                  0.36,
                                  1,
                                ],
                              }}
                              className="
                                group
                                relative
                                flex
                                items-center
                                justify-between
                                rounded-2xl
                                border
                                border-slate-700/60
                                bg-slate-800/80
                                p-4
                                transition-all
                                duration-300
                                hover:scale-[1.02]
                                hover:border-slate-500
                                hover:bg-slate-800
                                hover:shadow-lg
                              "
                            >

                              <div
                                className="
                                  absolute
                                  left-0
                                  top-2
                                  bottom-2
                                  w-1
                                  rounded-r-full
                                  opacity-0
                                  transition-opacity
                                  duration-300
                                  group-hover:opacity-100
                                "
                                style={{
                                  background:
                                    selectedService.color,
                                }}
                              />

                              <div
                                className="
                                  flex
                                  items-center
                                  gap-4
                                  pl-1
                                "
                              >

                                <span
                                  className="
                                    flex
                                    size-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    transition-all
                                    duration-300
                                    group-hover:scale-110
                                  "
                                  style={{
                                    backgroundColor: `${selectedService.color}22`,
                                    color: selectedService.color,
                                    border: `1px solid ${selectedService.color}55`,
                                    boxShadow: `0 0 16px ${selectedService.color}22`,
                                  }}
                                >
                                  <SubIcon
                                    className="size-5"
                                    strokeWidth={2.2}
                                  />
                                </span>

                                <span
                                  className="
                                    text-[12px]
                                    font-bold
                                    leading-snug
                                    text-white
                                    transition-colors
                                    duration-200
                                    group-hover:text-white
                                  "
                                >
                                  {subService.name}
                                </span>

                              </div>

                              <ArrowUpRight
                                className="
                                  size-5
                                  text-slate-400
                                  opacity-60
                                  transition-all
                                  duration-300
                                  group-hover:-translate-y-0.5
                                  group-hover:translate-x-0.5
                                  group-hover:text-white
                                  group-hover:opacity-100
                                "
                              />

                            </motion.a>
                          );
                        }
                      )}

                    </div>

                    {/* DRAWER FOOTER */}

                    <div
                      className="
                        border-t
                        border-slate-700/80
                        pt-5
                      "
                    >
                      <a
                        href={
                          selectedService.href
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="
                          flex
                          w-full
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          px-5
                          py-3.5
                          text-[10px]
                          font-bold
                          text-white
                          shadow-xl
                          transition-all
                          duration-200
                          hover:opacity-95
                          active:scale-[0.98]
                        "
                        style={{
                          background:
                            selectedService.color,
                        }}
                      >
                        <span>
                          Explore Full Executive Capability
                        </span>

                        <ArrowRight className="size-4" />
                      </a>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* =================================================
                MOBILE CREATIVE VERSION
            ================================================== */}

            <div
              className="
                block
                lg:hidden
              "
            >

              {/* =================================================
                  MOBILE ORBIT AREA
              ================================================== */}

              <div
                className="
                  relative
                  overflow-hidden
                  bg-transparent
                "
                style={{
                  /*
                   * Enough room for the reduced orbit.
                   * Sub-services remain BELOW this area.
                   */
                  height:
                    selectedService
                      ? "430px"
                      : "460px",
                }}
              >

                <ITNetworkBackground />

                {/* =================================================
                    MOBILE ROTATING STAGE
                ================================================== */}

                <motion.div
                  className="
                    absolute
                    left-1/2
                    top-1/2
                  "
                  style={{
                    width:
                      `${MOBILE_STAGE_WIDTH}px`,
                    height:
                      `${MOBILE_STAGE_HEIGHT}px`,
                    marginLeft:
                      `-${MOBILE_STAGE_WIDTH / 2}px`,
                    marginTop:
                      `-${MOBILE_STAGE_HEIGHT / 2}px`,
                  }}
                >

                  {/* =================================================
                      ROTATING OUTER ORBIT
                  ================================================== */}

                  <motion.div
                    className="
                      absolute
                      inset-0
                    "
                    style={{
                      rotate:
                        orbitRotation,
                      transformOrigin:
                        "50% 50%",
                    }}
                  >

                    {/* MOBILE CONNECTORS */}

                    <svg
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        h-full
                        w-full
                        overflow-visible
                      "
                      viewBox={`
                        0
                        0
                        ${MOBILE_STAGE_WIDTH}
                        ${MOBILE_STAGE_HEIGHT}
                      `}
                      fill="none"
                    >

                      <defs>
                        {mobileServicePositions.map(
                          (_, index) => (
                            <filter
                              id={`mobile-glow-${index}`}
                              key={`mobile-filter-${index}`}
                              x="-30%"
                              y="-30%"
                              width="160%"
                              height="160%"
                            >
                              <feGaussianBlur
                                stdDeviation="3"
                                result="blur"
                              />

                              <feComposite
                                in="SourceGraphic"
                                in2="blur"
                                operator="over"
                              />
                            </filter>
                          )
                        )}
                      </defs>

                      {mobileServicePositions.map(
                        (position, index) => {
                          const service =
                            keyServices[index];

                          const isActive =
                            activeService ===
                            service.name;

                          const nodeRingColor =
                            service.color;

                          const startX =
                            MOBILE_CENTER_X +
                            (MOBILE_CENTER_SIZE /
                              2) *
                              Math.cos(
                                position.radians
                              );

                          const startY =
                            MOBILE_CENTER_Y +
                            (MOBILE_CENTER_SIZE /
                              2) *
                              Math.sin(
                                position.radians
                              );

                          return (
                            <g
                              key={`mobile-line-${index}`}
                            >

                              <line
                                x1={startX}
                                y1={startY}
                                x2={position.x}
                                y2={position.y}
                                stroke={
                                  nodeRingColor
                                }
                                strokeWidth={
                                  isActive
                                    ? "2"
                                    : "1"
                                }
                                strokeDasharray="5 9"
                                opacity={
                                  isActive
                                    ? 0.95
                                    : 0.55
                                }
                                filter={
                                  isActive
                                    ? `url(#mobile-glow-${index})`
                                    : undefined
                                }
                              />

                            </g>
                          );
                        }
                      )}

                    </svg>

                    {/* =================================================
                        MOBILE KEY SERVICE CARDS
                    ================================================== */}

                    {keyServices.map(
                      (service, index) => {
                        const position =
                          mobileServicePositions[
                            index
                          ];

                        const isActive =
                          activeService ===
                          service.name;

                        const nodeRingColor =
                          getActiveRingColor(
                            position.angle
                          );

                        const ServiceIcon =
                          service.icon;

                        return (
                          <div
                            key={
                              `mobile-service-${service.name}`
                            }
                            className="
                              absolute
                              z-30
                            "
                            style={{
                              left:
                                `${position.x -
                                  MOBILE_CARD_WIDTH /
                                    2}px`,

                              top:
                                `${position.y -
                                  MOBILE_CARD_HEIGHT /
                                    2}px`,

                              width:
                                `${MOBILE_CARD_WIDTH}px`,

                              height:
                                `${MOBILE_CARD_HEIGHT}px`,
                            }}
                          >

                            {/* COUNTER ROTATION
                                KEEPS CARD STRAIGHT */}

                            <motion.div
                              className="
                                h-full
                                w-full
                              "
                              style={{
                                rotate:
                                  counterRotation,
                                transformOrigin:
                                  "50% 50%",
                              }}
                            >

                              {/* KEY SERVICE OPENS
                                  SUB SERVICES ONLY */}

                              <button
                                type="button"
                                onClick={() => {
                                  if (
                                    isActive
                                  ) {
                                    closeAllServices();
                                  } else {
                                    openService(
                                      service.name
                                    );
                                  }
                                }}
                                onFocus={() =>
                                  openService(
                                    service.name
                                  )
                                }
                                aria-expanded={
                                  isActive
                                }
                                className="
                                  group
                                  flex
                                  h-full
                                  w-full
                                  items-center
                                  gap-1.5
                                  rounded-full
                                  border
                                  bg-slate-900/95
                                  px-1.5
                                  shadow-xl
                                  backdrop-blur-xl
                                  transition-all
                                  duration-300
                                  focus:outline-none
                                "
                                style={{
                                  borderColor:
                                    isActive
                                      ? service.color
                                      : "rgba(71,85,105,.65)",

                                  boxShadow:
                                    isActive
                                      ? `0 0 18px -3px ${service.color}AA`
                                      : "0 8px 18px -8px rgba(0,0,0,.8)",
                                }}
                              >

                                <span
                                  className="
                                    flex
                                    size-6
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    text-white
                                  "
                                  style={{
                                    backgroundColor:
                                      nodeRingColor,
                                  }}
                                >
                                  <ServiceIcon
                                    className="size-3"
                                    strokeWidth={2.3}
                                  />
                                </span>

                                <span
                                  className="
                                    min-w-0
                                    flex-1
                                    truncate
                                    text-left
                                    text-[8px]
                                    font-black
                                    leading-tight
                                    text-white
                                  "
                                >
                                  {service.name}
                                </span>

                                <ChevronRight
                                  className="
                                    size-2.5
                                    shrink-0
                                    text-slate-400
                                  "
                                />

                              </button>

                            </motion.div>

                          </div>
                        );
                      }
                    )}

                  </motion.div>

                  {/* =================================================
                      MOBILE FIXED CENTER
                  ================================================== */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      z-40
                    "
                    style={{
                      left:
                        `${MOBILE_CENTER_X}px`,
                      top:
                        `${MOBILE_CENTER_Y}px`,
                      transform:
                        "translate(-50%, -50%)",
                    }}
                  >

                    {/* CENTER RING ROTATES */}

                    <motion.div
                      className="
                        absolute
                        rounded-full
                      "
                      style={{
                        width:
                          `${MOBILE_CENTER_SIZE + 18}px`,
                        height:
                          `${MOBILE_CENTER_SIZE + 18}px`,
                        left:
                          "-9px",
                        top:
                          "-9px",
                        rotate:
                          orbitRotation,
                      }}
                    >

                      <svg
                        viewBox="0 0 200 200"
                        className="
                          h-full
                          w-full
                        "
                        fill="none"
                      >

                        <path
                          d="M 100,10 A 90,90 0 0,1 190,100 L 165,100 A 65,65 0 0,0 100,35 Z"
                          fill={
                            LOGO_COLORS.blue
                          }
                        />

                        <path
                          d="M 190,100 A 90,90 0 0,1 100,190 L 100,165 A 65,65 0 0,0 165,100 Z"
                          fill={
                            LOGO_COLORS.green
                          }
                        />

                        <path
                          d="M 100,190 A 90,90 0 0,1 10,100 L 35,100 A 65,65 0 0,0 100,165 Z"
                          fill={
                            LOGO_COLORS.orange
                          }
                        />

                        <path
                          d="M 10,100 A 90,90 0 0,1 100,10 L 100,35 A 65,65 0 0,0 35,100 Z"
                          fill={
                            LOGO_COLORS.pink
                          }
                        />

                      </svg>

                    </motion.div>

                    {/* =================================================
                        CENTER HUB ITSELF IS FIXED
                        IT DOES NOT ROTATE
                    ================================================== */}

                    <div
                      className="
                        pointer-events-auto
                        relative
                        flex
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-blue-500/50
                        bg-slate-950
                        text-center
                        shadow-[0_0_30px_rgba(0,114,206,.35)]
                      "
                      style={{
                        width:
                          `${MOBILE_CENTER_SIZE}px`,
                        height:
                          `${MOBILE_CENTER_SIZE}px`,
                      }}
                    >

                      <span
                        className="
                          max-w-[52px]
                          text-[8px]
                          font-black
                          leading-tight
                          text-white
                        "
                      >
                        IT
                        <br />
                        Consulting
                      
                      </span>

                    </div>

                  </div>

                </motion.div>

              </div>

              {/* =================================================
                  MOBILE SUB SERVICES AT BOTTOM
              ================================================== */}

              <AnimatePresence mode="wait">

                {selectedService && (
                  <motion.div
                    key={selectedService.name}
                    initial={{
                      opacity: 0,
                      y: 35,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: 35,
                    }}
                    transition={{
                      duration: 0.35,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                    className="
                      relative
                      z-50
                      border-t
                      border-slate-700
                      bg-slate-900
                    "
                  >

                    {/* MOBILE SELECTED SERVICE HEADER */}

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-slate-800
                        px-4
                        py-3
                      "
                    >

                      <div
                        className="
                          flex
                          min-w-0
                          items-center
                          gap-3
                        "
                      >

                        <span
                          className="
                            flex
                            size-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            text-white
                          "
                          style={{
                            background:
                              selectedService.color,
                          }}
                        >
                          <selectedService.icon
                            className="size-4.5"
                          />
                        </span>

                        <div className="min-w-0">

                          <p
                            className="
                              text-[9px]
                              font-extrabold
                              uppercase
                              tracking-wider
                              text-slate-400
                            "
                          >
                            Specialized Capabilities
                          </p>

                          <h3
                            className="
                              truncate
                              text-sm
                              font-black
                              text-white
                            "
                          >
                            {selectedService.name}
                          </h3>

                        </div>

                      </div>

                      <button
                        type="button"
                        onClick={
                          closeAllServices
                        }
                        className="
                          flex
                          size-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          text-slate-400
                          transition-colors
                          hover:bg-slate-800
                          hover:text-white
                        "
                        aria-label="Close sub services"
                      >
                        <X className="size-4" />
                      </button>

                    </div>

                    {/* =================================================
                        SCROLLABLE SUB SERVICES
                    ================================================== */}

                    <div
                      className="
                        mobile-service-scroll
                        max-h-[250px]
                        overflow-y-auto
                        overscroll-contain
                        px-3
                        py-3
                      "
                      style={{
                        WebkitOverflowScrolling:
                          "touch",
                        touchAction: "pan-y",
                      }}
                    >

                      <div className="space-y-2">

                        {selectedService.subServices.map(
                          (subService, idx) => {
                            const SubIcon =
                              subService.icon;

                            return (
                              <motion.a
                                key={idx}
                                href={
                                  subService.href
                                }
                                target="_blank"
                                rel="noreferrer"
                                initial={{
                                  opacity: 0,
                                  y: 12,
                                }}
                                animate={{
                                  opacity: 1,
                                  y: 0,
                                }}
                                transition={{
                                  duration: 0.25,
                                  delay:
                                    idx * 0.05,
                                }}
                                className="
                                  flex
                                  min-h-[48px]
                                  items-center
                                  justify-between
                                  rounded-xl
                                  border
                                  border-slate-800
                                  bg-slate-950
                                  px-3
                                  py-2
                                  transition-all
                                  active:scale-[.98]
                                "
                              >

                                <div
                                  className="
                                    flex
                                    min-w-0
                                    items-center
                                    gap-3
                                  "
                                >

                                  <span
                                    className="
                                      flex
                                      size-8
                                      shrink-0
                                      items-center
                                      justify-center
                                      rounded-lg
                                      transition-all
                                      duration-300
                                    "
                                    style={{
                                      backgroundColor: `${selectedService.color}22`,
                                      color: selectedService.color,
                                      border: `1px solid ${selectedService.color}55`,
                                      boxShadow: `0 0 12px ${selectedService.color}18`,
                                    }}
                                  >
                                    <SubIcon
                                      className="size-4"
                                      strokeWidth={2.2}
                                    />
                                  </span>

                                  <span
                                    className="
                                      min-w-0
                                      text-[14px]
                                      font-bold
                                      leading-snug
                                      text-white
                                    "
                                  >
                                    {
                                      subService.name
                                    }
                                  </span>

                                </div>

                                <ArrowUpRight
                                  className="
                                    ml-2
                                    size-4
                                    shrink-0
                                    text-slate-400
                                  "
                                />

                              </motion.a>
                            );
                          }
                        )}

                      </div>

                    </div>

                    {/* MOBILE FULL CATEGORY BUTTON */}

                    <div
                      className="
                        border-t
                        border-slate-800
                        p-3
                      "
                    >

                      <a
                        href={
                          selectedService.href
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="
                          flex
                          w-full
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          px-4
                          py-3
                          text-xs
                          font-bold
                          text-white
                          shadow-lg
                          transition-all
                          active:scale-[.98]
                        "
                        style={{
                          background:
                            selectedService.color,
                        }}
                      >

                        <span>
                          View Full Category Details
                        </span>

                        <ArrowRight className="size-3.5" />

                      </a>

                    </div>

                  </motion.div>
                )}

              </AnimatePresence>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}