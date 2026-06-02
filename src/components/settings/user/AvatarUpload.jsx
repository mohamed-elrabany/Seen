import { useState, useRef, useEffect } from "react";
import { IoPerson } from "react-icons/io5";
import {
  FiUpload, FiTrash2, FiCamera, FiCheck,
  FiX, FiRotateCw, FiRefreshCw,
} from "react-icons/fi";

/**
 * AvatarUpload — enhanced cropper
 *
 * Props:
 *   currentImage  {string|null}  existing profileImg URL from Redux/API
 *   onChange      {function}     called with 512×512 base64 JPEG, or null on remove
 *   borderColor   {string}       Tailwind border class e.g. "border-[#6976EB]"
 */
export default function AvatarUpload({
  currentImage = null,
  onChange,
  borderColor = "border-[#6976EB]",
}) {
  const SIZE = 280;
  const OUTPUT_SIZE = 512;
  const MIN_ZOOM = 0.4;
  const MAX_ZOOM = 6;

  const [phase, setPhase] = useState(currentImage ? "result" : "upload");
  const [draggingOver, setDraggingOver] = useState(false);
  const [rotate, setRotate] = useState(0);
  const [zoomLabel, setZoomLabel] = useState(null);

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // crop state kept in refs — no re-renders while dragging/zooming
  const imgRef = useRef(null);
  const zoomRef = useRef(1);
  const oxRef = useRef(0);
  const oyRef = useRef(0);
  const rotateRef = useRef(0);
  const drag = useRef({ active: false, x: 0, y: 0 });
  const pinch = useRef({ active: false, dist: 0 });
  const badgeTimer = useRef(null);
  const rafId = useRef(null);
  const resultSrc = useRef(currentImage);

  useEffect(() => {
    resultSrc.current = currentImage;
    setPhase(currentImage ? "result" : "upload");
  }, [currentImage]);

  // ─── Drawing ────────────────────────────────────────────────────────────────
  // Draw is stored in a ref so it always closes over the latest ref values.
  // Never wrap in useCallback — a stale closure would cache imgRef.current=null.

  function roundedRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  const drawRef = useRef(null);
  drawRef.current = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    const { naturalWidth: nw, naturalHeight: nh } = img;
    const z = zoomRef.current;
    const ox = oxRef.current;
    const oy = oyRef.current;
    const rot = rotateRef.current;

    ctx.clearRect(0, 0, SIZE, SIZE);

    // 1. clip to rounded rect so image never draws outside the crop shape
    ctx.save();
    roundedRect(ctx, 0, 0, SIZE, SIZE, 22);
    ctx.clip();
    ctx.translate(SIZE / 2 + ox, SIZE / 2 + oy);
    ctx.rotate((rot * Math.PI) / 180);
    ctx.drawImage(img, (-nw * z) / 2, (-nh * z) / 2, nw * z, nh * z);
    ctx.restore();

    // rule-of-thirds grid
    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 0.5;
    for (let i = 1; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo((SIZE * i) / 3, 0);
      ctx.lineTo((SIZE * i) / 3, SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, (SIZE * i) / 3);
      ctx.lineTo(SIZE, (SIZE * i) / 3);
      ctx.stroke();
    }
    ctx.restore();

    // crop border
    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,0.9)";
    ctx.lineWidth = 1.5;
    roundedRect(ctx, 0, 0, SIZE, SIZE, 22);
    ctx.stroke();
    ctx.restore();

    // corner handles
    ctx.save();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    const cs = 18;
    [
      [0, 0, 1, 1],
      [SIZE, 0, -1, 1],
      [0, SIZE, 1, -1],
      [SIZE, SIZE, -1, -1],
    ].forEach(([cx, cy, dx, dy]) => {
      ctx.beginPath();
      ctx.moveTo(cx + dx * cs, cy);
      ctx.lineTo(cx, cy);
      ctx.lineTo(cx, cy + dy * cs);
      ctx.stroke();
    });
    ctx.restore();
  };

  // scheduleDraw always calls drawRef.current — never stale
  function scheduleDraw() {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => drawRef.current());
  }

  // Re-draw on rotate slider change
  useEffect(() => {
    if (phase === "crop" && imgRef.current) scheduleDraw();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rotate, phase]);

  // ─── Zoom helpers ────────────────────────────────────────────────────────────

  function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
  }

  function applyZoom(delta, pivotX = 0, pivotY = 0) {
    const prev = zoomRef.current;
    zoomRef.current = clamp(prev * (1 + delta), MIN_ZOOM, MAX_ZOOM);
    const ratio = zoomRef.current / prev;
    oxRef.current = pivotX + (oxRef.current - pivotX) * ratio;
    oyRef.current = pivotY + (oyRef.current - pivotY) * ratio;
    flashZoomBadge();
    scheduleDraw();
  }

  function flashZoomBadge() {
    setZoomLabel(Math.round(zoomRef.current * 100) + "%");
    clearTimeout(badgeTimer.current);
    badgeTimer.current = setTimeout(() => setZoomLabel(null), 900);
  }

  // ─── Load image ──────────────────────────────────────────────────────────────

  function loadImage(src) {
    const image = new Image();
    image.onload = () => {
      imgRef.current = image;
      const { naturalWidth: nw, naturalHeight: nh } = image;
      zoomRef.current = Math.max(SIZE / nw, SIZE / nh);
      oxRef.current = 0;
      oyRef.current = 0;
      rotateRef.current = 0;
      setRotate(0);
      // setPhase triggers a React re-render; the canvas only exists in the DOM
      // after that render completes. setTimeout(0) yields to React first, then
      // draws into the now-mounted canvas element.
      setPhase("crop");
      setTimeout(() => scheduleDraw(), 0);
    };
    image.src = src;
  }

  // ─── File / drag input ───────────────────────────────────────────────────────

  function handleFile(file) {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("File too large — max 5 MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => loadImage(e.target.result);
    reader.readAsDataURL(file);
  }

  // ─── Canvas mouse events ─────────────────────────────────────────────────────

  function onMouseDown(e) {
    drag.current = { active: true, x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
  }
  function onMouseMove(e) {
    if (!drag.current.active) return;
    const { offsetX, offsetY } = e.nativeEvent;
    oxRef.current += offsetX - drag.current.x;
    oyRef.current += offsetY - drag.current.y;
    drag.current.x = offsetX;
    drag.current.y = offsetY;
    scheduleDraw();
  }
  function onMouseUp() {
    drag.current.active = false;
  }

  // scroll-wheel zoom — pivot on cursor position
  function onWheel(e) {
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left - SIZE / 2;
    const py = e.clientY - rect.top - SIZE / 2;
    applyZoom(e.deltaY < 0 ? 0.08 : -0.08, px, py);
  }

  // ─── Touch events ────────────────────────────────────────────────────────────

  function onTouchStart(e) {
    const ts = Array.from(e.touches);
    if (ts.length === 2) {
      const dx = ts[0].clientX - ts[1].clientX;
      const dy = ts[0].clientY - ts[1].clientY;
      pinch.current = { active: true, dist: Math.hypot(dx, dy) };
      drag.current.active = false;
    } else {
      drag.current = { active: true, x: ts[0].clientX, y: ts[0].clientY };
      pinch.current.active = false;
    }
    e.preventDefault();
  }

  function onTouchMove(e) {
    const ts = Array.from(e.touches);
    if (ts.length === 2 && pinch.current.active) {
      const dx = ts[0].clientX - ts[1].clientX;
      const dy = ts[0].clientY - ts[1].clientY;
      const dist = Math.hypot(dx, dy);
      const rect = canvasRef.current.getBoundingClientRect();
      const midX = (ts[0].clientX + ts[1].clientX) / 2 - rect.left - SIZE / 2;
      const midY = (ts[0].clientY + ts[1].clientY) / 2 - rect.top - SIZE / 2;
      applyZoom((dist - pinch.current.dist) / 220, midX, midY);
      pinch.current.dist = dist;
    } else if (ts.length === 1 && drag.current.active) {
      oxRef.current += ts[0].clientX - drag.current.x;
      oyRef.current += ts[0].clientY - drag.current.y;
      drag.current.x = ts[0].clientX;
      drag.current.y = ts[0].clientY;
      scheduleDraw();
    }
    e.preventDefault();
  }

  function onTouchEnd(e) {
    if (e.touches.length < 2) pinch.current.active = false;
    if (e.touches.length === 0) drag.current.active = false;
  }

  // ─── Rotate slider ───────────────────────────────────────────────────────────

  function handleRotate(v) {
    rotateRef.current = Number(v);
    setRotate(Number(v));
  }

  // ─── Reset ───────────────────────────────────────────────────────────────────

  function resetAll() {
    if (!imgRef.current) return;
    const { naturalWidth: nw, naturalHeight: nh } = imgRef.current;
    zoomRef.current = Math.max(SIZE / nw, SIZE / nh);
    oxRef.current = 0;
    oyRef.current = 0;
    rotateRef.current = 0;
    setRotate(0);
    scheduleDraw();
  }

  // ─── Apply crop ──────────────────────────────────────────────────────────────

  function applyCrop() {
    const out = document.createElement("canvas");
    out.width = out.height = OUTPUT_SIZE;
    const oc = out.getContext("2d");
    const scale = OUTPUT_SIZE / SIZE;
    const img = imgRef.current;
    const z = zoomRef.current * scale;
    oc.save();
    oc.translate(OUTPUT_SIZE / 2 + oxRef.current * scale, OUTPUT_SIZE / 2 + oyRef.current * scale);
    oc.rotate((rotateRef.current * Math.PI) / 180);
    oc.drawImage(img, (-img.naturalWidth * z) / 2, (-img.naturalHeight * z) / 2, img.naturalWidth * z, img.naturalHeight * z);
    oc.restore();
    const dataUrl = out.toDataURL("image/jpeg", 0.93);
    resultSrc.current = dataUrl;
    setPhase("result");
    onChange?.(dataUrl);
  }

  function cancelCrop() {
    imgRef.current = null;
    setPhase("upload");
  }

  function removePhoto() {
    resultSrc.current = null;
    imgRef.current = null;
    setPhase("upload");
    onChange?.(null);
  }

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div
      className={`rounded-2xl p-6 flex flex-col items-center gap-5
        bg-white bg-none border-2 shadow-lg
        border-[#D9D9D9]/30
        dark:bg-gradient-to-br dark:from-[#1F1A5F] dark:to-[#161A41] dark:border-white/10
        transition-all duration-200
        ${draggingOver ? "ring-2 ring-[#6976EB] ring-offset-2" : ""}`}
      onDragOver={(e) => { e.preventDefault(); setDraggingOver(true); }}
      onDragLeave={() => setDraggingOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDraggingOver(false);
        handleFile(e.dataTransfer.files[0]);
      }}
    >
      {/* ── Upload state ── */}
      {phase === "upload" && (
        <div
          className={`w-full flex flex-col items-center gap-3 py-8 px-4 rounded-xl
            border-2 border-dashed cursor-pointer transition-colors duration-150
            ${draggingOver
              ? "border-[#6976EB] bg-[#6976EB]/5"
              : "border-[#D9D9D9]/60 dark:border-white/15 hover:border-[#6976EB]/60"
            }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="w-14 h-14 rounded-2xl bg-[#F8F9FF] dark:bg-white/5 flex items-center justify-center">
            <FiUpload className="w-6 h-6 text-[#6976EB]" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-[#161A41] dark:text-white">
              {draggingOver ? "Drop to upload" : "Drop your photo here"}
            </p>
            <p className="text-xs text-[#808080] dark:text-gray-500 mt-1">
              or click to browse · JPG, PNG, WEBP · max 5 MB
            </p>
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
            className="mt-1 flex items-center gap-2 px-5 py-2 text-sm rounded-xl cursor-pointer
              border border-[#D9D9D9]/50 dark:border-white/15
              text-[#161A41] dark:text-white
              hover:bg-[#F8F9FF] dark:hover:bg-white/10
              transition-colors duration-150"
          >
            Choose file
          </button>
        </div>
      )}

      {/* ── Crop state ── */}
      {phase === "crop" && (
        <div className="flex flex-col items-center gap-4 w-full">
          {/* canvas */}
          <div className="relative rounded-3xl overflow-hidden"
            style={{ width: SIZE, height: SIZE, lineHeight: 0 }}>
            <canvas
              ref={canvasRef}
              width={SIZE}
              height={SIZE}
              className="block cursor-grab active:cursor-grabbing touch-none"
              style={{ width: SIZE, height: SIZE }}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onWheel={onWheel}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            />
            {/* zoom badge */}
            {zoomLabel && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2
                bg-black/60 text-white text-[11px] font-medium
                px-3 py-1 rounded-full pointer-events-none">
                {zoomLabel}
              </div>
            )}
          </div>

          {/* gesture hints */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {[
              { icon: "✥", label: "Drag to move" },
              { icon: "⊕", label: "Scroll to zoom" },
              { icon: "⊙", label: "Pinch to zoom" },
            ].map(({ icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 text-[11px] text-[#808080] dark:text-gray-500">
                <span className="text-[#6976EB]">{icon}</span> {label}
              </span>
            ))}
          </div>

          {/* rotate row */}
          <div className="flex items-center gap-3 w-full">
            <FiRotateCw className="w-4 h-4 text-[#6976EB] shrink-0" />
            <input
              type="range"
              min="-45"
              max="45"
              step="1"
              value={rotate}
              onChange={(e) => handleRotate(e.target.value)}
              className="flex-1 accent-[#6976EB]"
              aria-label="Rotate image"
            />
            <span className="text-xs text-[#808080] dark:text-gray-400 w-9 text-right tabular-nums">
              {rotate}°
            </span>
            <button
              type="button"
              onClick={resetAll}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg cursor-pointer
                border border-[#D9D9D9]/50 dark:border-white/15
                text-[#808080] dark:text-gray-400
                hover:bg-[#F8F9FF] dark:hover:bg-white/10
                transition-colors duration-150"
            >
              <FiRefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* actions */}
          <div className="flex gap-2 w-full justify-end pt-1">
            <button
              type="button"
              onClick={cancelCrop}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl cursor-pointer
                border border-[#D9D9D9]/50 dark:border-white/15
                text-[#808080] dark:text-gray-400
                hover:bg-[#F8F9FF] dark:hover:bg-white/10
                transition-colors duration-150"
            >
              <FiX className="w-4 h-4" /> Cancel
            </button>
            <button
              type="button"
              onClick={applyCrop}
              className="flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-xl
                text-white cursor-pointer
                bg-gradient-to-r from-[#6976EB] via-[#4A55C3] to-[#2B3695]
                hover:opacity-90 active:scale-[0.98] transition-all duration-150"
            >
              <FiCheck className="w-4 h-4" /> Apply crop
            </button>
          </div>
        </div>
      )}

      {/* ── Result state ── */}
      {phase === "result" && (
        <div className="flex flex-col items-center gap-4">
          <div className={`relative w-28 h-28 rounded-3xl border-2 ${borderColor} overflow-hidden`}>
            {resultSrc.current ? (
              <img src={resultSrc.current} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#F8F9FF] dark:bg-white/5">
                <IoPerson className="w-14 h-14 text-gray-400" />
              </div>
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 flex flex-col items-center justify-center gap-1
                bg-black/45 opacity-0 hover:opacity-100 transition-opacity duration-150
                rounded-[22px]"
              aria-label="Change photo"
            >
              <FiCamera className="w-5 h-5 text-white" />
              <span className="text-white text-[11px] font-medium">Change</span>
            </button>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl
                border border-[#D9D9D9]/50 dark:border-white/15
                text-[#161A41] dark:text-white
                hover:bg-[#F8F9FF] dark:hover:bg-white/10
                transition-colors duration-150"
            >
              <FiUpload className="w-4 h-4" /> Change photo
            </button>
            <button
              type="button"
              onClick={removePhoto}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl
                border border-red-200 dark:border-red-500/30
                text-red-500 dark:text-red-400
                hover:bg-red-50 dark:hover:bg-red-500/10
                transition-colors duration-150"
            >
              <FiTrash2 className="w-4 h-4" /> Remove
            </button>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => { handleFile(e.target.files[0]); e.target.value = ""; }}
      />
    </div>
  );
}