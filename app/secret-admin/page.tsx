"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Event } from "@/lib/types";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useTheme } from "next-themes";
import {
  Trash2,
  Edit3,
  Plus,
  ExternalLink,
  Calendar,
  MapPin,
} from "lucide-react";

// ─── Simple password gate ─────────────────────────────────────────────────
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const { resolvedTheme } = useTheme();
  const accent = resolvedTheme === "dark" ? "#FA0001" : "#0DA5F0";

  const attempt = () => {
    if (value === ADMIN_PASSWORD) {
      sessionStorage.setItem("hs_admin_unlocked", "1");
      onUnlock();
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm"
      >
        <div className="mb-8 text-center">
          <div
            className="text-[10px] uppercase tracking-[0.4em] font-bold mb-3"
            style={{ color: accent }}
          >
            Admin Portal
          </div>
          <h1 className="text-4xl font-black tracking-tighter dark:text-white text-black">
            Identify <span style={{ color: accent }}>Yourself</span>
          </h1>
        </div>

        <motion.div
          animate={shaking ? { x: [0, -10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          <input
            type="password"
            placeholder="••••••••"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && attempt()}
            className={`w-full dark:bg-white/5 bg-black/5 border px-5 py-4 dark:text-white text-black text-sm outline-none transition-all duration-300 placeholder:opacity-30 rounded-xl ${
              error
                ? "border-red-500/50"
                : "border-black/10 dark:border-white/10 focus:border-opacity-100"
            }`}
            style={{ borderColor: !error && value ? accent + "40" : undefined }}
          />
          <button
            onClick={attempt}
            className="w-full text-white text-xs font-black uppercase tracking-widest py-4 transition-all duration-300 active:scale-[0.98] rounded-xl"
            style={{ backgroundColor: accent }}
          >
            Unlock System
          </button>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-[10px] text-center font-bold uppercase tracking-wider"
            >
              Access Denied
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Notification Toast ────────────────────────────────────────────────────
function Toast({
  message,
  type,
}: {
  message: string;
  type: "success" | "error";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: -20, x: "-50%" }}
      className={`fixed top-6 left-1/2 z-50 px-5 py-3 text-sm font-semibold shadow-xl rounded-full ${
        type === "success"
          ? "bg-emerald-500 text-white"
          : "bg-red-500 text-white"
      }`}
    >
      {message}
    </motion.div>
  );
}

// ─── Event Form ─────────────────────────────────────────────────────────────
const emptyForm = {
  title: "",
  date: "",
  venue: "",
  format: "",
  description: "",
  cover_image: "",
  registration_link: "",
  is_upcoming: true,
};

function EventForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: typeof emptyForm;
  onSave: (data: typeof emptyForm) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState(initial);
  const { resolvedTheme } = useTheme();
  const accent = resolvedTheme === "dark" ? "#FA0001" : "#0DA5F0";

  const set = (key: string, val: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const labelStyle =
    "block text-[10px] uppercase tracking-widest dark:text-white/40 text-black/40 mb-2 font-bold";
  const inputStyle =
    "w-full dark:bg-white/5 bg-black/5 border dark:border-white/10 border-black/10 px-4 py-3 dark:text-white text-black text-sm outline-none focus:border-opacity-100 transition-all duration-300 rounded-lg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="dark:bg-zinc-900 bg-zinc-50 border dark:border-white/10 border-black/10 p-6 md:p-8 space-y-8 rounded-2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className={labelStyle}>Event Title *</label>
          <input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. SnowHackIPEC 2024"
            className={inputStyle}
            style={{
              borderLeft: form.title ? `3px solid ${accent}` : undefined,
            }}
          />
        </div>
        <div>
          <label className={labelStyle}>Execution Date *</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            className={inputStyle}
          />
        </div>
        <div>
          <label className={labelStyle}>Venue / Location *</label>
          <input
            value={form.venue}
            onChange={(e) => set("venue", e.target.value)}
            placeholder="e.g. IPEC Campus"
            className={inputStyle}
          />
        </div>
        <div>
          <label className={labelStyle}>Event Format *</label>
          <input
            value={form.format}
            onChange={(e) => set("format", e.target.value)}
            placeholder="e.g. Physical Hackathon"
            className={inputStyle}
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelStyle}>Description Abstract</label>
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            rows={4}
            className={inputStyle + " resize-none"}
            placeholder="Tell us more about the event goals..."
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelStyle}>Visual Identity (Cover URL)</label>
          <input
            value={form.cover_image}
            onChange={(e) => set("cover_image", e.target.value)}
            placeholder="Direct link to image..."
            className={inputStyle}
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelStyle}>External Registration Gateway</label>
          <input
            value={form.registration_link}
            onChange={(e) => set("registration_link", e.target.value)}
            placeholder="Unstop / Devfolio / Form link..."
            className={inputStyle}
          />
        </div>

        <div className="md:col-span-2 flex items-center justify-between p-4 dark:bg-white/5 bg-black/5">
          <div>
            <span className="text-sm font-bold block dark:text-white text-black">
              Timeline Status
            </span>
            <span className="text-[10px] uppercase tracking-wider opacity-40">
              {form.is_upcoming ? "Live/Future Event" : "Historical Event"}
            </span>
          </div>
          <button
            type="button"
            onClick={() => set("is_upcoming", !form.is_upcoming)}
            className={`relative w-12 h-6 rounded-full transition-all duration-500 ${form.is_upcoming ? "" : "opacity-50"}`}
            style={{ backgroundColor: form.is_upcoming ? accent : "#ccc" }}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-500 shadow-md ${form.is_upcoming ? "right-1" : "left-1"}`}
            />
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => onSave(form)}
          disabled={saving || !form.title || !form.date || !form.venue}
          className="flex-1 text-white text-[10px] font-black uppercase tracking-[0.2em] py-4 transition-all active:scale-[0.98] disabled:opacity-20 rounded-lg"
          style={{ backgroundColor: accent }}
        >
          {saving ? "Processing..." : "Commit Event"}
        </button>
        <button
          onClick={onCancel}
          className="px-8 dark:bg-white/5 bg-black/5 dark:text-white text-black text-[10px] font-black uppercase tracking-[0.2em] py-4 hover:opacity-70 transition-all rounded-lg"
        >
          Abort
        </button>
      </div>
    </motion.div>
  );
}

// ─── Event Row ───────────────────────────────────────────────────────────────
function EventRow({
  event,
  onEdit,
  onDelete,
}: {
  event: Event;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const { resolvedTheme } = useTheme();
  const accent = resolvedTheme === "dark" ? "#FA0001" : "#0DA5F0";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group flex items-center gap-4 dark:bg-zinc-900 bg-white border dark:border-white/10 border-black/10 p-4 md:p-5 hover:border-opacity-100 transition-all duration-300 rounded-xl"
      style={{ borderColor: event.is_upcoming ? accent + "30" : undefined }}
    >
      <div className="relative w-20 h-14 hidden sm:block overflow-hidden bg-black/5 dark:bg-white/5 rounded-lg">
        {event.cover_image ? (
          <Image
            src={event.cover_image}
            alt=""
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-20">
            📸
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h3 className="text-sm font-black dark:text-white text-black truncate max-w-[200px] sm:max-w-none tracking-tighter">
            {event.title}
          </h3>
          <span
            className="text-[9px] px-2 py-0.5 font-black tracking-widest border rounded"
            style={{
              color: event.is_upcoming ? accent : "inherit",
              borderColor: event.is_upcoming ? accent + "40" : "currentColor",
              opacity: event.is_upcoming ? 1 : 0.3,
            }}
          >
            {event.is_upcoming ? "Live" : "Event Data"}
          </span>
          {event.registration_link && (
            <span className="text-[9px] text-emerald-500 font-black tracking-widest flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-500" /> Past
              Event
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] dark:text-white/40 text-black/40 font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <Calendar size={10} />{" "}
            {new Date(event.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1 sm:hidden">
            <MapPin size={10} /> {event.venue.substring(0, 15)}...
          </span>
          <span className="hidden sm:flex items-center gap-1">
            <MapPin size={10} /> {event.venue}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="p-2.5 dark:bg-white/5 bg-black/5 hover:bg-black/10 dark:hover:bg-white/10 dark:text-white text-black transition-all rounded-lg"
          title="Edit Record"
        >
          <Edit3 size={14} />
        </button>
        <button
          onClick={onDelete}
          className="p-2.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white transition-all rounded-lg"
          title="Purge Record"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Admin Page ─────────────────────────────────────────────────────────
export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const { resolvedTheme } = useTheme();
  const accent = resolvedTheme === "dark" ? "#FA0001" : "#0DA5F0";

  useEffect(() => {
    if (sessionStorage.getItem("hs_admin_unlocked") === "1") setUnlocked(true);
  }, []);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchEvents = async () => {
    setLoading(true);
    const res = await fetch("/api/events");
    if (res.ok) {
      const data = await res.json();
      setEvents(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (unlocked) fetchEvents();
  }, [unlocked]);

  const handleSave = async (formData: typeof emptyForm) => {
    setSaving(true);
    try {
      let res: Response;
      if (editingEvent) {
        res = await fetch(`/api/events?id=${editingEvent._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error((await res.json()).error);
        showToast("Data Synced Correctly", "success");
      } else {
        res = await fetch("/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error((await res.json()).error);
        showToast("Event Initialized", "success");
      }
      setShowForm(false);
      setEditingEvent(null);
      await fetchEvents();
    } catch (err: any) {
      showToast(err.message || "Sync Failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id || !confirm("PURGE RECORD? This action cannot be undone.")) return;
    const res = await fetch(`/api/events?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      showToast("Record Purged", "success");
      await fetchEvents();
    } else {
      showToast("Purge Failed", "error");
    }
  };

  if (!unlocked)
    return (
      <>
        <Navbar isReady={true} />
        <PasswordGate onUnlock={() => setUnlocked(true)} />
      </>
    );

  return (
    <div className="min-h-screen dark:bg-[oklch(0.145_0_0)] bg-white transition-colors duration-500">
      <Navbar isReady={true} />
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} />}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 pt-40 pb-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-16">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] font-black opacity-40 mb-2 dark:text-white text-black">
              System Terminal
            </div>
            <h1 className="text-5xl font-black tracking-tighter dark:text-white text-black uppercase">
              Event <span style={{ color: accent }}>Manager</span>
            </h1>
          </div>
          {!showForm && (
            <button
              onClick={() => {
                setEditingEvent(null);
                setShowForm(true);
              }}
              className="flex items-center gap-3 text-white text-[10px] font-black uppercase tracking-widest px-8 py-4 transition-all active:scale-[0.98] shadow-xl rounded-xl"
              style={{ backgroundColor: accent }}
            >
              <Plus size={16} /> New Record
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Event List Section */}
          <div
            className={`${showForm ? "lg:col-span-12" : "lg:col-span-12"} space-y-4`}
          >
            <AnimatePresence mode="wait">
              {showForm ? (
                <EventForm
                  key="form"
                  initial={
                    editingEvent
                      ? {
                          title: editingEvent.title,
                          date: editingEvent.date,
                          venue: editingEvent.venue,
                          format: editingEvent.format,
                          description: editingEvent.description || "",
                          cover_image: editingEvent.cover_image || "",
                          registration_link:
                            editingEvent.registration_link || "",
                          is_upcoming: editingEvent.is_upcoming,
                        }
                      : emptyForm
                  }
                  onSave={handleSave}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingEvent(null);
                  }}
                  saving={saving}
                />
              ) : (
                <div
                  key="list"
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {loading ? (
                    [1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-32 dark:bg-white/5 bg-black/5 animate-pulse"
                      />
                    ))
                  ) : (
                    <>
                      {events.length === 0 ? (
                        <div className="col-span-full py-20 text-center dark:text-white/20 text-black/20 font-black uppercase tracking-widest">
                          No Records Found
                        </div>
                      ) : (
                        events.map((event) => (
                          <EventRow
                            key={event._id}
                            event={event}
                            onEdit={() => {
                              setEditingEvent(event);
                              setShowForm(true);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            onDelete={() => handleDelete(event._id)}
                          />
                        ))
                      )}
                    </>
                  )}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
