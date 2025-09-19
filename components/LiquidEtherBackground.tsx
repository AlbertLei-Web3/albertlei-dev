"use client";

import { useEffect, useRef } from "react";
import LiquidEther from "./LiquidEther";

/**
 * 中文：
 * - 液体效果背景组件，用于全屏背景
 * - 客户端组件，支持 WebGL 和 Three.js
 * - 包含性能优化和像素比限制
 * 
 * English:
 * - Liquid Ether background component for full-screen effect
 * - Client component supporting WebGL and Three.js
 * - Includes performance optimizations and pixel ratio limiting
 */

export default function LiquidEtherBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 性能优化：限制像素比，避免高分辨率设备过度渲染
    const originalDevicePixelRatio = window.devicePixelRatio;
    const limitedPixelRatio = Math.min(originalDevicePixelRatio || 1, 2);
    
    // 临时修改 devicePixelRatio 以限制渲染分辨率
    Object.defineProperty(window, 'devicePixelRatio', {
      get: () => limitedPixelRatio,
      configurable: true
    });

    // 组件卸载时恢复原始值
    return () => {
      Object.defineProperty(window, 'devicePixelRatio', {
        get: () => originalDevicePixelRatio,
        configurable: true
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-auto"
      style={{
        // 性能优化样式
        transform: 'translateZ(0)', // 启用硬件加速
        willChange: 'transform', // 提示浏览器优化
        backfaceVisibility: 'hidden', // 避免背面渲染
        perspective: '1000px', // 启用3D变换优化
      }}
    >
      <LiquidEther
        colors={['#5227FF', '#FF9FFC', '#B19EEF']}
        mouseForce={20}
        cursorSize={100}
        isViscous={false}
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        autoDemo={true}
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
        style={{ 
          width: '100%', 
          height: '100%',
          // 额外的性能优化
          imageRendering: 'crisp-edges', // 优化图像渲染，避免模糊
        }}
      />
    </div>
  );
}
