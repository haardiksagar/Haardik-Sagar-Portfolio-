"use client";

import React, { useEffect, useRef } from "react";

export default function NeuralNoise() {
  const holderRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const holder = holderRef.current;
    const canvas = canvasRef.current;
    if (!holder || !canvas) return;

    let gl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let frameId: number | null = null;
    let devicePixelRatio = 1;

    const pointer = {
      x: 0.5,
      y: 0.5,
      targetX: 0.5,
      targetY: 0.5,
    };

    const state = {
      uniforms: {} as Record<string, WebGLUniformLocation | null>,
      startTime: 0,
    };

    const handlePointerMove = (event: PointerEvent | MouseEvent) => {
      pointer.targetX = event.clientX / window.innerWidth;
      pointer.targetY = 1 - event.clientY / window.innerHeight;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!event.touches?.length) return;
      const touch = event.touches[0];
      pointer.targetX = touch.clientX / window.innerWidth;
      pointer.targetY = 1 - touch.clientY / window.innerHeight;
    };

    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 vUv;

      void main() {
        vUv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0., 1.);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;

      varying vec2 vUv;
      uniform float u_time;
      uniform float u_ratio;
      uniform vec2 u_pointer_position;
      uniform float u_scroll_progress;

      vec2 rotate(vec2 uv, float th) {
        return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
      }

      float neuro_shape(vec2 uv, float t, float p) {
        vec2 sine_acc = vec2(0.);
        vec2 res = vec2(0.);
        float scale = 6.5;

        for (int j = 0; j < 14; j++) {
          uv = rotate(uv, 1.);
          sine_acc = rotate(sine_acc, 1.);
          vec2 layer = uv * scale + float(j) + sine_acc - t;
          sine_acc += sin(layer) + 2.1 * p;
          res += (0.5 + 0.5 * cos(layer)) / scale;
          scale *= 1.18;
        }
        return res.x + res.y;
      }

      vec3 themeColor(float progress) {
        vec3 darkWarm = vec3(0.45, 0.35, 0.95);
        vec3 darkCool = vec3(1.0, 1.0, 1.0);
        return clamp(mix(darkWarm, darkCool, 0.5 + 0.5 * cos(progress)), 0.0, 1.0);
      }

      void main() {
        vec2 uv = 0.3 * vUv;
        uv.x *= u_ratio;

        vec2 pointer = vUv - u_pointer_position;
        pointer.x *= u_ratio;
        float p = clamp(length(pointer), 0., 1.);
        p = 0.18 * pow(1. - p, 2.4);

        float t = 0.00007 * u_time;
        float noise = neuro_shape(uv, t, p);

        noise = 0.95 * pow(noise, 3.);
        noise += 0.45 * pow(noise, 5.);
        noise = max(0.0, noise - 0.35);

        float vignette = smoothstep(1.08, 0.28, length(vUv - 0.5));
        float intensity = clamp(noise * vignette, 0.0, 1.0);

        vec3 base = vec3(0.04, 0.07, 0.18);
        vec3 accent = themeColor(u_scroll_progress);
        vec3 blend = mix(base, accent, clamp(pow(intensity, 0.85), 0.0, 1.0));
        vec3 color = mix(base, blend, 0.75) + accent * (intensity * 0.25);
        color = clamp(color, 0.0, 1.0);

        float alpha = smoothstep(0.0, 0.85, intensity) * 0.6;
        gl_FragColor = vec4(color, alpha);
      }
    `;

    function compileShader(type: number, source: string) {
      if (!gl) return null;
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    function initContext() {
      devicePixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      gl = (canvas!.getContext("webgl", { antialias: true, alpha: true }) ||
        canvas!.getContext("experimental-webgl")) as WebGLRenderingContext;

      if (!gl) return;

      const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
      const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
      if (!vertexShader || !fragmentShader) return;

      program = gl.createProgram();
      if (!program) return;

      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Unable to initialise shader program:", gl.getProgramInfoLog(program));
        program = null;
        return;
      }

      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);

      gl.useProgram(program);

      const positionLocation = gl.getAttribLocation(program, "a_position");
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(positionLocation);

      state.uniforms = {
        u_time: gl.getUniformLocation(program, "u_time"),
        u_ratio: gl.getUniformLocation(program, "u_ratio"),
        u_pointer_position: gl.getUniformLocation(program, "u_pointer_position"),
        u_scroll_progress: gl.getUniformLocation(program, "u_scroll_progress"),
      };

      gl.disable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      resizeCanvas();
    }

    function resizeCanvas() {
      if (!gl || !canvas || !holder) return;

      const width = holder.offsetWidth || window.innerWidth;
      const height = holder.offsetHeight || window.innerHeight;

      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      gl.viewport(0, 0, canvas.width, canvas.height);

      if (state.uniforms.u_ratio) {
        gl.uniform1f(state.uniforms.u_ratio, canvas.width / canvas.height);
      }
    }

    function renderFrame(now: number) {
      if (!gl || !program) return;

      pointer.x += (pointer.targetX - pointer.x) * 0.05;
      pointer.y += (pointer.targetY - pointer.y) * 0.05;

      const scrollMax = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const scrollProgress = Math.min(window.scrollY / scrollMax, 1);
      const elapsed = now - state.startTime;

      gl.uniform1f(state.uniforms.u_time!, elapsed);
      gl.uniform2f(state.uniforms.u_pointer_position!, pointer.x, pointer.y);
      gl.uniform1f(state.uniforms.u_scroll_progress!, scrollProgress);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      frameId = requestAnimationFrame(renderFrame);
    }

    initContext();
    if (gl) {
      window.addEventListener("pointermove", handlePointerMove as any, { passive: true });
      window.addEventListener("touchmove", handleTouchMove as any, { passive: true });
      window.addEventListener("resize", resizeCanvas, { passive: true });

      state.startTime = performance.now();
      frameId = requestAnimationFrame(renderFrame);
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove as any);
      window.removeEventListener("touchmove", handleTouchMove as any);
      window.removeEventListener("resize", resizeCanvas);

      if (frameId !== null) cancelAnimationFrame(frameId);

      if (gl && program) {
        gl.deleteProgram(program);
      }
    };
  }, []);

  return (
    <div ref={holderRef} className="fixed inset-0 pointer-events-none -z-10">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
