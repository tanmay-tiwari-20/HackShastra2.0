import React, { useEffect, useRef } from 'react';

interface FuzzyTextProps {
  children: React.ReactNode;
  fontSize?: number | string;
  fontWeight?: string | number;
  fontFamily?: string;
  enableHover?: boolean;
  baseIntensity?: number;
  hoverIntensity?: number;
}

const FuzzyText: React.FC<FuzzyTextProps> = ({
  children,
  fontSize = 'clamp(2rem, 8vw, 8rem)',
  fontWeight = 900,
  fontFamily = 'inherit',
  enableHover = true,
  baseIntensity = 0.18,
  hoverIntensity = 0.5
}) => {
  const canvasRef =
    useRef<HTMLCanvasElement & { cleanupFuzzyText?: () => void }>(null);

  useEffect(() => {
    let animationFrameId = 0;
    let isCancelled = false;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const getResolvedColor = () =>
      document.documentElement.classList.contains('dark')
        ? '#FA0001'
        : '#0DA5F0';

    const init = async () => {
      canvas.cleanupFuzzyText?.();

      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
      if (isCancelled) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const computedFontFamily =
        fontFamily === 'inherit'
          ? window.getComputedStyle(canvas).fontFamily || 'sans-serif'
          : fontFamily;

      const fontSizeStr =
        typeof fontSize === 'number' ? `${fontSize}px` : fontSize;

      let numericFontSize: number;
      if (typeof fontSize === 'number') {
        numericFontSize = fontSize;
      } else {
        const temp = document.createElement('span');
        temp.style.fontSize = fontSize;
        document.body.appendChild(temp);
        numericFontSize = parseFloat(
          window.getComputedStyle(temp).fontSize
        );
        document.body.removeChild(temp);
      }

      const text = React.Children.toArray(children).join('');

      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = 'alphabetic';

      const metrics = offCtx.measureText(text);

      const actualLeft = metrics.actualBoundingBoxLeft ?? 0;
      const actualRight =
        metrics.actualBoundingBoxRight ?? metrics.width;
      const actualAscent =
        metrics.actualBoundingBoxAscent ?? numericFontSize;
      const actualDescent =
        metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;

      const textBoundingWidth = Math.ceil(
        actualLeft + actualRight
      );
      const tightHeight = Math.ceil(
        actualAscent + actualDescent
      );

      const extraWidthBuffer = 10;
      const offscreenWidth = textBoundingWidth + extraWidthBuffer;

      offscreen.width = offscreenWidth;
      offscreen.height = tightHeight;

      const xOffset = extraWidthBuffer / 2;

      const drawOffscreenText = () => {
        offCtx.clearRect(
          0,
          0,
          offscreen.width,
          offscreen.height
        );
        offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
        offCtx.textBaseline = 'alphabetic';
        offCtx.fillStyle = getResolvedColor();
        offCtx.fillText(
          text,
          xOffset - actualLeft,
          actualAscent
        );
      };

      drawOffscreenText();

      const horizontalMargin = 50;
      canvas.width = offscreenWidth + horizontalMargin * 2;
      canvas.height = tightHeight;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.translate(horizontalMargin, 0);

      let isHovering = false;
      const fuzzRange = 30;

      const run = () => {
        if (isCancelled) return;

        drawOffscreenText();

        ctx.clearRect(
          -fuzzRange,
          -fuzzRange,
          offscreenWidth + 2 * fuzzRange,
          tightHeight + 2 * fuzzRange
        );

        const intensity = isHovering
          ? hoverIntensity
          : baseIntensity;

        for (let j = 0; j < tightHeight; j++) {
          const dx = Math.floor(
            intensity * (Math.random() - 0.5) * fuzzRange
          );
          ctx.drawImage(
            offscreen,
            0,
            j,
            offscreenWidth,
            1,
            dx,
            j,
            offscreenWidth,
            1
          );
        }

        animationFrameId = requestAnimationFrame(run);
      };

      run();

      const handleMouseMove = () => {
        if (enableHover) isHovering = true;
      };

      const handleMouseLeave = () => {
        isHovering = false;
      };

      if (enableHover) {
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
      }

      canvas.cleanupFuzzyText = () => {
        cancelAnimationFrame(animationFrameId);
        canvas.removeEventListener(
          'mousemove',
          handleMouseMove
        );
        canvas.removeEventListener(
          'mouseleave',
          handleMouseLeave
        );
      };
    };

    init();

    // 🔁 Resize handling (RESPONSIVE PART)
    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);

    // 🌙 Theme change observer
    const observer = new MutationObserver(() => {
      init();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      isCancelled = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      canvas.cleanupFuzzyText?.();
    };
  }, [
    children,
    fontSize,
    fontWeight,
    fontFamily,
    enableHover,
    baseIntensity,
    hoverIntensity
  ]);

  return <canvas ref={canvasRef} className="max-w-full h-auto" />;
};

export default FuzzyText;
