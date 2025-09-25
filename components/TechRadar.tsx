"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type RadarSeries = {
  label: string;
  values: Record<string, number>; // 0..100
  colorHex: string; // e.g. #10B981
};

export default function TechRadar({
  axes,
  series,
  size = 360,
}: {
  axes: string[];
  series: RadarSeries[];
  size?: number;
}) {
  // 中文：响应式尺寸：根据外层容器宽度动态取最小值，避免在 400x800 下溢出
  // English: Responsive chart size based on container width to avoid overflow on 400x800
  const wrapRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState<number>(size);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.getBoundingClientRect().width;
      setContainerW(Math.max(1, Math.floor(w)));
    });
    ro.observe(el);
    // 初始计算
    const w0 = el.getBoundingClientRect().width;
    setContainerW(Math.max(1, Math.floor(w0)));
    return () => ro.disconnect();
  }, []);

  const usedSize = useMemo(() => {
    // 预留内边距 8px，设置最小尺寸 180，最大不超过 props.size
    const s = Math.max(180, Math.min(size, containerW - 8));
    return isFinite(s) && s > 0 ? s : size;
  }, [containerW, size]);

  const levels = 5; // 网格圈数 grid levels
  const padding = 32;
  const radius = Math.max(50, (usedSize - padding * 2) / 2);
  const center = { x: usedSize / 2, y: usedSize / 2 };

  const angleFor = (i: number) => (Math.PI * 2 * i) / axes.length - Math.PI / 2; // 起点朝上 start at top

  const pointsFor = (vals: number[]) =>
    vals
      .map((v, i) => {
        const a = angleFor(i);
        const r = (v / 100) * radius;
        const x = center.x + r * Math.cos(a);
        const y = center.y + r * Math.sin(a);
        return `${x},${y}`;
      })
      .join(" ");

  const seriesPolys = useMemo(() => {
    return series.map((s) => {
      const vals = axes.map((ax) => Math.max(0, Math.min(100, s.values[ax] ?? 0)));
      return { label: s.label, color: s.colorHex, points: pointsFor(vals) };
    });
  }, [series, axes]);

  return (
    <div ref={wrapRef} className="relative w-full overflow-hidden">
      <svg width="100%" height={usedSize} viewBox={`0 0 ${usedSize} ${usedSize}`} role="img" aria-label="Skills radar chart">
        {/* 网格圆环 grid rings */}
        {[...Array(levels)].map((_, li) => {
          const r = radius * ((li + 1) / levels);
          return (
            <circle
              key={li}
              cx={center.x}
              cy={center.y}
              r={r}
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth={1}
            />
          );
        })}

        {/* 轴线 axes */}
        {axes.map((_, i) => {
          const a = angleFor(i);
          const x = center.x + radius * Math.cos(a);
          const y = center.y + radius * Math.sin(a);
          return (
            <line
              key={`axis-${i}`}
              x1={center.x}
              y1={center.y}
              x2={x}
              y2={y}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth={1}
            />
          );
        })}

        {/* 多边形 series polygons */}
        {seriesPolys.map((p, idx) => (
          <g key={p.label} aria-label={p.label}>
            <polygon points={p.points} fill={`${p.color}33`} stroke={p.color} strokeWidth={2} />
            {/* 顶点圆点 */}
            {p.points.split(" ").map((pt, i) => {
              const [x, y] = pt.split(",").map(Number);
              return <circle key={`${idx}-${i}`} cx={x} cy={y} r={3} fill={p.color} />;
            })}
          </g>
        ))}

        {/* 轴标签 axis labels */}
        {axes.map((ax, i) => {
          const a = angleFor(i);
          const r = radius + 18;
          const x = center.x + r * Math.cos(a);
          const y = center.y + r * Math.sin(a);
          return (
            <text
              key={`label-${i}`}
              x={x}
              y={y}
              fill="rgba(255,255,255,0.85)"
              fontSize={12}
              textAnchor={Math.cos(a) > 0.1 ? "start" : Math.cos(a) < -0.1 ? "end" : "middle"}
              dominantBaseline="middle"
            >
              {ax}
            </text>
          );
        })}
      </svg>
    </div>
  );
}


