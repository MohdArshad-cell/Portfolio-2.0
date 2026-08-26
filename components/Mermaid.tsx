"use client";
import React, { useEffect, useRef, useId } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const baseId = useId();
  const id = `mermaid-${baseId.replace(/:/g, '')}`;

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        primaryColor: '#05060a',
        primaryTextColor: '#fff',
        primaryBorderColor: '#00f3ff',
        lineColor: '#7000ff',
        secondaryColor: '#0b0d17',
        tertiaryColor: '#05060a'
      },
      securityLevel: 'loose',
      fontFamily: 'monospace',
    });

    const renderChart = async () => {
      if (containerRef.current) {
        try {
          const { svg } = await mermaid.render(id, chart);
          if (containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        } catch (error) {
          console.error("Mermaid rendering failed", error);
        }
      }
    };

    renderChart();
  }, [chart, id]);

  return <div ref={containerRef} className="w-full overflow-auto flex justify-center py-10" />;
}
